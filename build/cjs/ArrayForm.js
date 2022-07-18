"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
/*SYSTEM IMPORTS*/
var react_1 = require("react");
var FlatForm_1 = tslib_1.__importDefault(require("./FlatForm"));
var underscore_1 = require("underscore");
var core_1 = require("@dnd-kit/core");
var sortable_1 = require("@dnd-kit/sortable");
var sortable_2 = require("@dnd-kit/sortable");
var utilities_1 = require("@dnd-kit/utilities");
var array_move_1 = require("array-move");
var react_dom_1 = require("react-dom");
var UiContext_1 = require("./UiContext");
var SortableTab = function (_a) {
    var tabId = _a.tabId, props = tslib_1.__rest(_a, ["tabId"]);
    var Ui = (0, UiContext_1.useJsonFormUi)();
    var _b = (0, sortable_2.useSortable)({ id: tabId }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform, transition = _b.transition;
    var style = {
        transform: utilities_1.CSS.Transform.toString(transform),
        transition: transition,
    };
    return ((0, jsx_runtime_1.jsx)(Ui.Tab, tslib_1.__assign({}, props, { ref: setNodeRef, style: style }, attributes, listeners)));
};
var TrashDroppable = function () {
    var Ui = (0, UiContext_1.useJsonFormUi)();
    var _a = (0, core_1.useDroppable)({
        id: "trash",
    }), isOver = _a.isOver, setNodeRef = _a.setNodeRef;
    return ((0, jsx_runtime_1.jsx)(Ui.ArrayForm.TrashContainer, { isOver: isOver, ref: setNodeRef, label: "\u041E\u0442\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u0443\u0434\u0430\u043B\u0438\u0442\u044C" }));
};
var SortableList = function (_a) {
    var tabs = _a.tabs, onSortEnd = _a.onSortEnd, children = _a.children;
    var _b = (0, react_1.useState)(null), activeId = _b[0], setActiveId = _b[1];
    var sensors = (0, core_1.useSensors)((0, core_1.useSensor)(core_1.PointerSensor, {
        activationConstraint: {
            distance: 20,
        },
    }));
    var currentIndex = (0, react_1.useMemo)(function () {
        return tabs.findIndex(function (_i) { return _i.id === activeId; });
    }, [tabs, activeId]);
    var collisionDetectionStrategy = (0, react_1.useCallback)(function (args) {
        // Start by finding any intersecting droppable
        var pointerIntersections = (0, core_1.pointerWithin)(args);
        var intersections = pointerIntersections.length > 0
            ? // If there are droppables intersecting with the pointer, return those
                pointerIntersections
            : (0, core_1.rectIntersection)(args);
        var overId = (0, core_1.getFirstCollision)(intersections, "id");
        if (overId === "trash") {
            return intersections;
        }
        console.log("[collisionDetectionStrategy][Over: ".concat(overId, "]"), args);
        if (overId !== null) {
            return (0, core_1.closestCenter)(args);
        }
        return [];
    }, [activeId, tabs]);
    return ((0, jsx_runtime_1.jsxs)(core_1.DndContext, tslib_1.__assign({ sensors: sensors, 
        // collisionDetection={closestCenter}
        collisionDetection: collisionDetectionStrategy, 
        // modifiers={[restrictToHorizontalAxis]}
        onDragEnd: function (event) {
            console.log("[onDragEnd]", event);
            setActiveId(null);
            onSortEnd(event);
        }, onDragStart: function (event) {
            setActiveId(event.active.id);
        } }, { children: [(0, jsx_runtime_1.jsx)(sortable_1.SortableContext, tslib_1.__assign({ id: "list", items: tabs, strategy: sortable_1.horizontalListSortingStrategy }, { children: children })), (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)(core_1.DragOverlay, { children: currentIndex > -1 ? ((0, jsx_runtime_1.jsx)(SortableTab, { tabId: activeId, label: "#".concat(currentIndex + 1) })) : null }), document.body), activeId !== null && (0, jsx_runtime_1.jsx)(TrashDroppable, {})] })));
};
var WidgetItem = function (props) {
    var id = props.id, value = props.value, scheme = props.scheme, _a = props.primary, primary = _a === void 0 ? false : _a, onChange = props.onChange;
    (0, react_1.useEffect)(function () {
        if (!id) {
            console.error("WidgetItem: props id is required");
        }
    }, []);
    var handleChange = function (newValue) {
        onChange(newValue, id);
    };
    return ((0, jsx_runtime_1.jsx)(FlatForm_1.default, { primary: primary, scheme: scheme, value: value, onChange: handleChange }));
};
var ArrayForm = function (props) {
    var value = props.value, scheme = props.scheme, _a = props.primary, primary = _a === void 0 ? false : _a, defValue = props.defValue, onChange = props.onChange;
    var Ui = (0, UiContext_1.useJsonFormUi)();
    var tabs = value;
    var _b = (0, react_1.useState)(function () {
        if ((0, underscore_1.isArray)(value) && value.length > 0) {
            return value[0].id;
        }
        return 1;
    }), tab = _b[0], setTab = _b[1];
    var handleChange = (0, react_1.useCallback)(function (newValue, id) {
        if (id === void 0) { id = null; }
        var _newValue = value.map(function (item) {
            return item.id == id ? tslib_1.__assign(tslib_1.__assign({}, item), newValue) : item;
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
        var def_value = tslib_1.__assign(tslib_1.__assign({}, defValue), { id: Math.max.apply(Math, _value.map(function (item) { return item.id; })) + 1 });
        var newList = tslib_1.__spreadArray(tslib_1.__spreadArray([], _value, true), [def_value], false);
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
            onChange((0, array_move_1.arrayMoveImmutable)(value, oldIndex, newIndex));
        }
    };
    var currentItem = (0, react_1.useMemo)(function () {
        var item = value.find(function (_i) { return _i.id === tab; });
        if (!item) {
            return null;
        }
        return item;
    }, [value, tab]);
    return ((0, jsx_runtime_1.jsxs)(Ui.ArrayForm, tslib_1.__assign({ style: { position: "relative", zIndex: 1 } }, { children: [(0, jsx_runtime_1.jsxs)(Ui.ArrayForm.Header, { children: [(0, jsx_runtime_1.jsx)(Ui.ArrayForm.Tabs, { children: (0, jsx_runtime_1.jsx)(SortableList, tslib_1.__assign({ tabs: tabs, onSortEnd: handleSortTabs }, { children: tabs.map(function (val, index) { return ((0, jsx_runtime_1.jsx)(SortableTab, { label: "#".concat(index + 1), tabId: val.id, active: tab === val.id, onSelect: function () { return setTab(val.id); } }, val.id)); }) })) }), (0, jsx_runtime_1.jsxs)(Ui.ArrayForm.Tabs, tslib_1.__assign({ actions: true }, { children: [(0, jsx_runtime_1.jsx)(Ui.Tab, tslib_1.__assign({ onSelect: function () { return handleRemoveTab(tab); } }, { children: (0, jsx_runtime_1.jsx)(Ui.Icons.Tabs.Remove, {}) })), (0, jsx_runtime_1.jsx)(Ui.Tab, tslib_1.__assign({ onSelect: handleAddTab }, { children: (0, jsx_runtime_1.jsx)(Ui.Icons.Tabs.Add, {}) }))] }))] }), (0, jsx_runtime_1.jsx)(Ui.ArrayForm.Body, { children: currentItem !== null && ((0, jsx_runtime_1.jsx)(WidgetItem, { id: currentItem.id, primary: primary, scheme: scheme, value: currentItem, onChange: handleChange }, currentItem.id)) })] })));
};
exports.default = ArrayForm;
