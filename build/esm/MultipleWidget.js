import { __assign, __makeTemplateObject, __rest, __spreadArray } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*SYSTEM IMPORTS*/
import { useCallback, useEffect, useMemo, useState, } from "react";
import Widget from "./Widget";
import { isArray } from "underscore";
import { Box, Text } from "grommet";
import { Add } from "grommet-icons";
import styled, { css } from "styled-components";
import { closestCenter, DndContext, DragOverlay, getFirstCollision, PointerSensor, pointerWithin, rectIntersection, useDroppable, useSensor, useSensors, } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext, } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayMoveImmutable } from "array-move";
import { createPortal } from "react-dom";
var StyledTab = styled(Box)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    ", "\n"], ["\n    ", "\n"])), function (_a) {
    var active = _a.active, theme = _a.theme;
    return css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        background-color: ", ";\n\n        ", "\n\n        user-select: none;\n    "], ["\n        background-color: ", ";\n\n        ", "\n\n        user-select: none;\n    "])), theme.global.colors["light-4"], active && "background-color: ".concat(theme.global.colors["accent-4"], ";"));
});
var TrashContainer = styled(Box)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    position: absolute;\n    z-index: 2;\n    top: -60px;\n    left: 0px;\n    width: 100%;\n"], ["\n    position: absolute;\n    z-index: 2;\n    top: -60px;\n    left: 0px;\n    width: 100%;\n"])));
var SortableTab = function (_a) {
    var tabId = _a.tabId, props = __rest(_a, ["tabId"]);
    var _b = useSortable({ id: tabId }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform, transition = _b.transition;
    var style = {
        transform: CSS.Transform.toString(transform),
        transition: transition,
    };
    return (_jsx(StyledTab, __assign({}, props, { ref: setNodeRef, style: style }, attributes, listeners)));
};
var TrashDroppable = function () {
    var _a = useDroppable({
        id: "trash",
    }), isOver = _a.isOver, setNodeRef = _a.setNodeRef;
    return (_jsx(TrashContainer, __assign({ ref: setNodeRef, animation: { type: "fadeIn", duration: 300 }, border: {
            color: "status-critical",
            size: "small",
            style: "dashed",
        }, background: {
            color: isOver ? "status-critical" : "light-2",
        }, pad: "xsmall" }, { children: _jsx(Text, { children: "\u041E\u0442\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u0443\u0434\u0430\u043B\u0438\u0442\u044C" }) })));
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
        } }, { children: [_jsx(SortableContext, __assign({ id: "list", items: tabs, strategy: horizontalListSortingStrategy }, { children: children })), createPortal(_jsx(DragOverlay, { children: currentIndex > -1 ? (_jsx(SortableTab, __assign({ tabId: activeId }, { children: _jsx(Box, __assign({ pad: "xsmall" }, { children: _jsxs(Text, { children: ["#", currentIndex + 1] }) })) }))) : null }), document.body), activeId !== null && _jsx(TrashDroppable, {})] })));
};
var WidgetItem = function (props) {
    var id = props.id, value = props.value, scheme = props.scheme, onChange = props.onChange;
    useEffect(function () {
        if (!id) {
            console.error("WidgetItem: props id is required");
        }
    }, []);
    var handleChange = function (newValue) {
        onChange(newValue, id);
    };
    return _jsx(Widget, { scheme: scheme, value: value, onChange: handleChange });
};
var MultipleWidget = function (props) {
    var value = props.value, scheme = props.scheme, defValue = props.defValue, onChange = props.onChange;
    var tabs = value;
    var _a = useState(function () {
        if (isArray(value) && value.length > 0) {
            return value[0].id;
        }
        return 1;
    }), tab = _a[0], setTab = _a[1];
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
    return (_jsxs(Box, __assign({ direction: "column", style: { position: "relative", zIndex: 1 } }, { children: [_jsxs(Box, __assign({ direction: "row" }, { children: [_jsx(Box, __assign({ direction: "row" }, { children: _jsx(SortableList, __assign({ tabs: tabs, onSortEnd: handleSortTabs }, { children: tabs.map(function (val, index) { return (_jsx(SortableTab, __assign({ tabId: val.id, hoverIndicator: true, active: tab === val.id, onClick: function () { return setTab(val.id); } }, { children: _jsx(Box, __assign({ pad: "xsmall" }, { children: _jsxs(Text, { children: ["#", index + 1] }) })) }), val.id)); }) })) })), _jsx(StyledTab, __assign({ hoverIndicator: true, onClick: handleAddTab }, { children: _jsx(Box, __assign({ pad: "xsmall" }, { children: _jsx(Add, {}) })) }))] })), currentItem !== null && (_jsx(WidgetItem, { id: currentItem.id, scheme: scheme, value: currentItem, onChange: handleChange }))] })));
};
export default MultipleWidget;
var templateObject_1, templateObject_2, templateObject_3;
