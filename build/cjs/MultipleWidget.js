"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*SYSTEM IMPORTS*/
var react_1 = tslib_1.__importStar(require("react"));
var Widget_1 = tslib_1.__importDefault(require("./Widget"));
var underscore_1 = require("underscore");
var grommet_1 = require("grommet");
var grommet_icons_1 = require("grommet-icons");
var styled_components_1 = tslib_1.__importStar(require("styled-components"));
var core_1 = require("@dnd-kit/core");
var sortable_1 = require("@dnd-kit/sortable");
var sortable_2 = require("@dnd-kit/sortable");
var utilities_1 = require("@dnd-kit/utilities");
var array_move_1 = require("array-move");
var react_dom_1 = require("react-dom");
var StyledTab = (0, styled_components_1.default)(grommet_1.Box)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    ", "\n"], ["\n    ", "\n"])), function (_a) {
    var active = _a.active, theme = _a.theme;
    return (0, styled_components_1.css)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n        background-color: ", ";\n\n        ", "\n\n        user-select: none;\n    "], ["\n        background-color: ", ";\n\n        ", "\n\n        user-select: none;\n    "])), theme.global.colors["light-4"], active && "background-color: ".concat(theme.global.colors["accent-4"], ";"));
});
var TrashContainer = (0, styled_components_1.default)(grommet_1.Box)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n    position: absolute;\n    z-index: 2;\n    top: -60px;\n    left: 0px;\n    width: 100%;\n"], ["\n    position: absolute;\n    z-index: 2;\n    top: -60px;\n    left: 0px;\n    width: 100%;\n"])));
var SortableTab = function (_a) {
    var tabId = _a.tabId, props = tslib_1.__rest(_a, ["tabId"]);
    var _b = (0, sortable_2.useSortable)({ id: tabId }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform, transition = _b.transition;
    var style = {
        transform: utilities_1.CSS.Transform.toString(transform),
        transition: transition,
    };
    return (react_1.default.createElement(StyledTab, tslib_1.__assign({}, props, { ref: setNodeRef, style: style }, attributes, listeners)));
};
var TrashDroppable = function (props) {
    var _a = (0, core_1.useDroppable)({
        id: "trash",
    }), isOver = _a.isOver, setNodeRef = _a.setNodeRef;
    return (react_1.default.createElement(TrashContainer, { ref: setNodeRef, animation: { type: "fadeIn", duration: 300 }, border: {
            color: "status-critical",
            size: "small",
            style: "dashed",
        }, background: {
            color: isOver ? "status-critical" : "light-2",
        }, pad: "xsmall" },
        react_1.default.createElement(grommet_1.Text, null, "\u041E\u0442\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u0443\u0434\u0430\u043B\u0438\u0442\u044C")));
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
    return (react_1.default.createElement(core_1.DndContext, { sensors: sensors, 
        // collisionDetection={closestCenter}
        collisionDetection: collisionDetectionStrategy, 
        // modifiers={[restrictToHorizontalAxis]}
        onDragEnd: function (event) {
            console.log("[onDragEnd]", event);
            setActiveId(null);
            onSortEnd(event);
        }, onDragStart: function (event) {
            setActiveId(event.active.id);
        } },
        react_1.default.createElement(sortable_1.SortableContext, { id: "list", items: tabs, strategy: sortable_1.horizontalListSortingStrategy }, children),
        (0, react_dom_1.createPortal)(react_1.default.createElement(core_1.DragOverlay, null, currentIndex > -1 ? (react_1.default.createElement(SortableTab, { tabId: activeId },
            react_1.default.createElement(grommet_1.Box, { pad: "xsmall" },
                react_1.default.createElement(grommet_1.Text, null,
                    "#",
                    currentIndex + 1)))) : null), document.body),
        activeId !== null && react_1.default.createElement(TrashDroppable, null)));
};
var WidgetItem = function (props) {
    var id = props.id, value = props.value, scheme = props.scheme, onChange = props.onChange;
    (0, react_1.useEffect)(function () {
        if (!Boolean(id)) {
            console.error("WidgetItem: props id is required");
        }
    }, []);
    var handleChange = function (newValue) {
        onChange(newValue, id);
    };
    return react_1.default.createElement(Widget_1.default, { scheme: scheme, value: value, onChange: handleChange });
};
var MultipleWidget = function (props) {
    var value = props.value, scheme = props.scheme, defValue = props.defValue, onChange = props.onChange;
    var tabs = value;
    var _a = (0, react_1.useState)(function () {
        if ((0, underscore_1.isArray)(value) && value.length > 0) {
            return value[0].id;
        }
        return 1;
    }), tab = _a[0], setTab = _a[1];
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
    return (react_1.default.createElement(grommet_1.Box, { direction: "column", style: { position: "relative", zIndex: 1 } },
        react_1.default.createElement(grommet_1.Box, { direction: "row" },
            react_1.default.createElement(grommet_1.Box, { direction: "row" },
                react_1.default.createElement(SortableList, { tabs: tabs, onSortEnd: handleSortTabs }, tabs.map(function (val, index) { return (react_1.default.createElement(SortableTab, { key: val.id, tabId: val.id, hoverIndicator: true, active: tab === val.id, onClick: function () { return setTab(val.id); } },
                    react_1.default.createElement(grommet_1.Box, { pad: "xsmall" },
                        react_1.default.createElement(grommet_1.Text, null,
                            "#",
                            index + 1)))); }))),
            react_1.default.createElement(StyledTab, { hoverIndicator: true, onClick: handleAddTab },
                react_1.default.createElement(grommet_1.Box, { pad: "xsmall" },
                    react_1.default.createElement(grommet_icons_1.Add, null)))),
        currentItem !== null && (react_1.default.createElement(WidgetItem, { id: currentItem.id, scheme: scheme, value: currentItem, onChange: handleChange }))));
};
exports.default = MultipleWidget;
var templateObject_1, templateObject_2, templateObject_3;
