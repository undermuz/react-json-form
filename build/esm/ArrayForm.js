import { __assign, __rest, __spreadArray } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*SYSTEM IMPORTS*/
import { useCallback, useEffect, useMemo, useState, } from "react";
import FlatForm from "./FlatForm";
import { isArray } from "underscore";
import { closestCenter, DndContext, DragOverlay, getFirstCollision, PointerSensor, pointerWithin, rectIntersection, useDroppable, useSensor, useSensors, } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext, } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayMoveImmutable } from "array-move";
import { createPortal } from "react-dom";
import { useJsonFormUi } from "./UiContext";
var SortableTab = function (_a) {
    var tabId = _a.tabId, props = __rest(_a, ["tabId"]);
    var Ui = useJsonFormUi();
    var _b = useSortable({ id: tabId }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform, transition = _b.transition;
    var style = {
        transform: CSS.Transform.toString(transform),
        transition: transition,
    };
    return (_jsx(Ui.Tab, __assign({}, props, { ref: setNodeRef, style: style }, attributes, listeners)));
};
var TrashDroppable = function () {
    var Ui = useJsonFormUi();
    var _a = useDroppable({
        id: "trash",
    }), isOver = _a.isOver, setNodeRef = _a.setNodeRef;
    return (_jsx(Ui.ArrayForm.TrashContainer, { isOver: isOver, ref: setNodeRef, label: "\u041E\u0442\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u0443\u0434\u0430\u043B\u0438\u0442\u044C" }));
};
var SortableList = function (_a) {
    var tabs = _a.tabs, onSortEnd = _a.onSortEnd, children = _a.children;
    var _b = useState(null), activeId = _b[0], setActiveId = _b[1];
    var sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 20,
        },
    }));
    var currentIndex = useMemo(function () {
        return tabs.findIndex(function (_i) { return _i.id === activeId; });
    }, [tabs, activeId]);
    var collisionDetectionStrategy = useCallback(function (args) {
        // Start by finding any intersecting droppable
        var pointerIntersections = pointerWithin(args);
        var intersections = pointerIntersections.length > 0
            ? // If there are droppables intersecting with the pointer, return those
                pointerIntersections
            : rectIntersection(args);
        var overId = getFirstCollision(intersections, "id");
        if (overId === "trash") {
            return intersections;
        }
        console.log("[collisionDetectionStrategy][Over: ".concat(overId, "]"), args);
        if (overId !== null) {
            return closestCenter(args);
        }
        return [];
    }, [activeId, tabs]);
    return (_jsxs(DndContext, __assign({ sensors: sensors, 
        // collisionDetection={closestCenter}
        collisionDetection: collisionDetectionStrategy, 
        // modifiers={[restrictToHorizontalAxis]}
        onDragEnd: function (event) {
            console.log("[onDragEnd]", event);
            setActiveId(null);
            onSortEnd(event);
        }, onDragStart: function (event) {
            setActiveId(event.active.id);
        } }, { children: [_jsx(SortableContext, __assign({ id: "list", items: tabs, strategy: horizontalListSortingStrategy }, { children: children })), createPortal(_jsx(DragOverlay, { children: currentIndex > -1 ? (_jsx(SortableTab, { tabId: activeId, label: "#".concat(currentIndex + 1) })) : null }), document.body), activeId !== null && _jsx(TrashDroppable, {})] })));
};
var WidgetItem = function (props) {
    var id = props.id, value = props.value, scheme = props.scheme, _a = props.primary, primary = _a === void 0 ? false : _a, onChange = props.onChange;
    useEffect(function () {
        if (!id) {
            console.error("WidgetItem: props id is required");
        }
    }, []);
    var handleChange = function (newValue) {
        onChange(newValue, id);
    };
    return (_jsx(FlatForm, { primary: primary, scheme: scheme, value: value, onChange: handleChange }));
};
var ArrayForm = function (props) {
    var value = props.value, scheme = props.scheme, _a = props.primary, primary = _a === void 0 ? false : _a, defValue = props.defValue, onChange = props.onChange;
    var Ui = useJsonFormUi();
    var tabs = value;
    var _b = useState(function () {
        if (isArray(value) && value.length > 0) {
            return value[0].id;
        }
        return 1;
    }), tab = _b[0], setTab = _b[1];
    var handleChange = useCallback(function (newValue, id) {
        if (id === void 0) { id = null; }
        var _newValue = value.map(function (item) {
            return item.id == id ? __assign(__assign({}, item), newValue) : item;
        });
        console.log("MultipleWidgetItem::handleChange", {
            id: id,
            item: newValue,
            oldValue: value,
            newValue: _newValue,
        });
        onChange(_newValue);
    }, [value, onChange]);
    var handleAddTab = function () {
        var _value = value;
        var def_value = __assign(__assign({}, defValue), { id: Math.max.apply(Math, _value.map(function (item) { return item.id; })) + 1 });
        var newList = __spreadArray(__spreadArray([], _value, true), [def_value], false);
        onChange(newList);
        setTab(newList.length - 1);
    };
    var handleRemoveTab = function (tab_id) {
        var _value = value;
        if (_value.length > 1) {
            if (window.confirm("Вы действительно хотите удалить?")) {
                var new_value = _value.filter(function (tab) { return tab.id != tab_id; });
                onChange(new_value);
                if (tab == tab_id) {
                    setTab(new_value[0].id);
                }
            }
        }
    };
    var handleSortTabs = function (event) {
        var active = event.active, over = event.over;
        if (active && over && active.id !== over.id) {
            if (over.id === "trash") {
                handleRemoveTab(active.id);
                return;
            }
            var oldIndex = value.findIndex(function (_i) { return _i.id === active.id; });
            var newIndex = value.findIndex(function (_i) { return _i.id === over.id; });
            onChange(arrayMoveImmutable(value, oldIndex, newIndex));
        }
    };
    var currentItem = useMemo(function () {
        var item = value.find(function (_i) { return _i.id === tab; });
        if (!item) {
            return null;
        }
        return item;
    }, [value, tab]);
    return (_jsxs(Ui.ArrayForm, __assign({ style: { position: "relative", zIndex: 1 } }, { children: [_jsxs(Ui.ArrayForm.Header, { children: [_jsx(Ui.ArrayForm.Tabs, { children: _jsx(SortableList, __assign({ tabs: tabs, onSortEnd: handleSortTabs }, { children: tabs.map(function (val, index) { return (_jsx(SortableTab, { label: "#".concat(index + 1), tabId: val.id, active: tab === val.id, onSelect: function () { return setTab(val.id); } }, val.id)); }) })) }), _jsxs(Ui.ArrayForm.Tabs, __assign({ actions: true }, { children: [_jsx(Ui.Tab, __assign({ onSelect: function () { return handleRemoveTab(tab); } }, { children: _jsx(Ui.Icons.Tabs.Remove, {}) })), _jsx(Ui.Tab, __assign({ onSelect: handleAddTab }, { children: _jsx(Ui.Icons.Tabs.Add, {}) }))] }))] }), _jsx(Ui.ArrayForm.Body, { children: currentItem !== null && (_jsx(WidgetItem, { id: currentItem.id, primary: primary, scheme: scheme, value: currentItem, onChange: handleChange }, currentItem.id)) })] })));
};
export default ArrayForm;
