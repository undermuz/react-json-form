"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ArrayForm_exports = {};
__export(ArrayForm_exports, {
  default: () => ArrayForm_default
});
module.exports = __toCommonJS(ArrayForm_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
var import_FlatForm = __toESM(require("./FlatForm"), 1);
var import_underscore = require("underscore");
var import_core = require("@dnd-kit/core");
var import_sortable = require("@dnd-kit/sortable");
var import_sortable2 = require("@dnd-kit/sortable");
var import_utilities = require("@dnd-kit/utilities");
var import_array_move = require("array-move");
var import_react_dom = require("react-dom");
var import_UiContext = require("./UiContext");
const SortableTab = ({
  tabId,
  ...props
}) => {
  const Ui = (0, import_UiContext.useJsonFormUi)();
  const { attributes, listeners, setNodeRef, transform, transition } = (0, import_sortable2.useSortable)({ id: tabId });
  const style = {
    transform: import_utilities.CSS.Transform.toString(transform),
    transition
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Ui.Tab,
    {
      ...props,
      ref: setNodeRef,
      style,
      ...attributes,
      ...listeners
    }
  );
};
const TrashDroppable = () => {
  const Ui = (0, import_UiContext.useJsonFormUi)();
  const { isOver, setNodeRef } = (0, import_core.useDroppable)({
    id: "trash"
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Ui.ArrayForm.TrashContainer,
    {
      isOver,
      ref: setNodeRef,
      label: "\u041E\u0442\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u0443\u0434\u0430\u043B\u0438\u0442\u044C"
    }
  );
};
const SortableList = ({
  tabs,
  onSortEnd,
  children
}) => {
  const [activeId, setActiveId] = (0, import_react.useState)(null);
  const sensors = (0, import_core.useSensors)(
    (0, import_core.useSensor)(import_core.PointerSensor, {
      activationConstraint: {
        distance: 20
      }
    })
  );
  const currentIndex = (0, import_react.useMemo)(() => {
    return tabs.findIndex((_i) => _i.id === activeId);
  }, [tabs, activeId]);
  const collisionDetectionStrategy = (0, import_react.useCallback)(
    (args) => {
      const pointerIntersections = (0, import_core.pointerWithin)(args);
      const intersections = pointerIntersections.length > 0 ? (
        // If there are droppables intersecting with the pointer, return those
        pointerIntersections
      ) : (0, import_core.rectIntersection)(args);
      let overId = (0, import_core.getFirstCollision)(intersections, "id");
      if (overId === "trash") {
        return intersections;
      }
      console.log(`[collisionDetectionStrategy][Over: ${overId}]`, args);
      if (overId !== null) {
        return (0, import_core.closestCenter)(args);
      }
      return [];
    },
    [activeId, tabs]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_core.DndContext,
    {
      sensors,
      collisionDetection: collisionDetectionStrategy,
      onDragEnd: (event) => {
        console.log("[onDragEnd]", event);
        setActiveId(null);
        onSortEnd(event);
      },
      onDragStart: (event) => {
        setActiveId(event.active.id);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_sortable.SortableContext,
          {
            id: "list",
            items: tabs,
            strategy: import_sortable.horizontalListSortingStrategy,
            children
          }
        ),
        (0, import_react_dom.createPortal)(
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_core.DragOverlay, { children: currentIndex > -1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            SortableTab,
            {
              tabId: activeId,
              label: `#${currentIndex + 1}`
            }
          ) : null }),
          document.body
        ),
        activeId !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrashDroppable, {})
      ]
    }
  );
};
const ArrayFormItem = (props) => {
  const { id, value, scheme, primary = false, onChange } = props;
  (0, import_react.useEffect)(() => {
    if (!id) {
      console.error("ArrayFormItem: props id is required");
    }
  }, []);
  const handleChange = (newValue) => {
    onChange(newValue, id);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_FlatForm.default,
    {
      primary,
      scheme,
      value,
      onChange: handleChange
    }
  );
};
const ArrayForm = (props) => {
  const { value, scheme, primary = false, defValue, onChange } = props;
  const Ui = (0, import_UiContext.useJsonFormUi)();
  const tabs = value;
  const [tab, setTab] = (0, import_react.useState)(() => {
    if ((0, import_underscore.isArray)(value) && value.length > 0) {
      return value[0].id;
    }
    return 1;
  });
  const handleChange = (0, import_react.useCallback)(
    (newValue, id = null) => {
      const _newValue = value.map(
        (item) => item.id == id ? { ...item, ...newValue } : item
      );
      onChange(_newValue);
    },
    [value, onChange]
  );
  const handleAddTab = () => {
    const _value = value;
    const def_value = {
      ...defValue,
      id: Math.max(..._value.map((item) => item.id)) + 1
    };
    const newList = [..._value, def_value];
    onChange(newList);
    setTab(newList.length - 1);
  };
  const handleRemoveTab = (tab_id) => {
    const _value = value;
    if (_value.length > 1) {
      if (window.confirm("\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C?")) {
        const new_value = _value.filter((tab2) => tab2.id != tab_id);
        onChange(new_value);
        if (tab == tab_id) {
          setTab(new_value[0].id);
        }
      }
    }
  };
  const handleSortTabs = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      if (over.id === "trash") {
        handleRemoveTab(active.id);
        return;
      }
      const oldIndex = value.findIndex(
        (_i) => _i.id === active.id
      );
      const newIndex = value.findIndex(
        (_i) => _i.id === over.id
      );
      onChange((0, import_array_move.arrayMoveImmutable)(value, oldIndex, newIndex));
    }
  };
  const currentItem = (0, import_react.useMemo)(() => {
    const item = value.find((_i) => _i.id === tab);
    if (!item) {
      return null;
    }
    return item;
  }, [value, tab]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Ui.ArrayForm, { style: { position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Ui.ArrayForm.Header, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.ArrayForm.Tabs, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableList, { tabs, onSortEnd: handleSortTabs, children: tabs.map((val, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        SortableTab,
        {
          label: `#${index + 1}`,
          tabId: val.id,
          active: tab === val.id,
          onSelect: () => setTab(val.id)
        },
        val.id
      )) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Ui.ArrayForm.Tabs, { actions: true, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.Tab, { onSelect: () => handleRemoveTab(tab), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.Icons.Tabs.Remove, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.Tab, { onSelect: handleAddTab, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.Icons.Tabs.Add, {}) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.ArrayForm.Body, { children: currentItem !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ArrayFormItem,
      {
        id: currentItem.id,
        primary,
        scheme,
        value: currentItem,
        onChange: handleChange
      },
      currentItem.id
    ) })
  ] });
};
var ArrayForm_default = ArrayForm;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
