// src/ArrayForm.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import FlatForm from "./FlatForm.mjs";
import { isArray } from "underscore";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  getFirstCollision,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  useDroppable,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayMoveImmutable } from "array-move";
import { createPortal } from "react-dom";
import { useJsonFormUi } from "./UiContext.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
var SortableTab = ({
  tabId,
  ...props
}) => {
  const Ui = useJsonFormUi();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: tabId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return /* @__PURE__ */ jsx(
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
var TrashDroppable = () => {
  const Ui = useJsonFormUi();
  const { isOver, setNodeRef } = useDroppable({
    id: "trash"
  });
  return /* @__PURE__ */ jsx(
    Ui.ArrayForm.TrashContainer,
    {
      isOver,
      ref: setNodeRef,
      label: "\u041E\u0442\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u0443\u0434\u0430\u043B\u0438\u0442\u044C"
    }
  );
};
var SortableList = ({
  tabs,
  onSortEnd,
  children
}) => {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20
      }
    })
  );
  const currentIndex = useMemo(() => {
    return tabs.findIndex((_i) => _i.id === activeId);
  }, [tabs, activeId]);
  const collisionDetectionStrategy = useCallback(
    (args) => {
      const pointerIntersections = pointerWithin(args);
      const intersections = pointerIntersections.length > 0 ? (
        // If there are droppables intersecting with the pointer, return those
        pointerIntersections
      ) : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");
      if (overId === "trash") {
        return intersections;
      }
      console.log(`[collisionDetectionStrategy][Over: ${overId}]`, args);
      if (overId !== null) {
        return closestCenter(args);
      }
      return [];
    },
    [activeId, tabs]
  );
  return /* @__PURE__ */ jsxs(
    DndContext,
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
        /* @__PURE__ */ jsx(
          SortableContext,
          {
            id: "list",
            items: tabs,
            strategy: horizontalListSortingStrategy,
            children
          }
        ),
        typeof document !== "undefined" && createPortal(
          /* @__PURE__ */ jsx(DragOverlay, { children: currentIndex > -1 ? /* @__PURE__ */ jsx(
            SortableTab,
            {
              tabId: activeId,
              label: `#${currentIndex + 1}`
            }
          ) : null }),
          document.body
        ),
        activeId !== null && /* @__PURE__ */ jsx(TrashDroppable, {})
      ]
    }
  );
};
var ArrayFormItem = (props) => {
  const { id, value, scheme, primary = false, onChange } = props;
  useEffect(() => {
    if (!id) {
      console.error("ArrayFormItem: props id is required");
    }
  }, []);
  const handleChange = (newValue) => {
    onChange(newValue, id);
  };
  return /* @__PURE__ */ jsx(
    FlatForm,
    {
      primary,
      scheme,
      value,
      onChange: handleChange
    }
  );
};
var ArrayForm = (props) => {
  const { value, scheme, primary = false, defValue, onChange } = props;
  const Ui = useJsonFormUi();
  const tabs = value;
  const [tab, setTab] = useState(() => {
    if (isArray(value) && value.length > 0) {
      return value[0].id;
    }
    return 1;
  });
  const handleChange = useCallback(
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
      onChange(arrayMoveImmutable(value, oldIndex, newIndex));
    }
  };
  const currentItem = useMemo(() => {
    const item = value.find((_i) => _i.id === tab);
    if (!item) {
      return null;
    }
    return item;
  }, [value, tab]);
  return /* @__PURE__ */ jsxs(Ui.ArrayForm, { style: { position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs(Ui.ArrayForm.Header, { children: [
      /* @__PURE__ */ jsx(Ui.ArrayForm.Tabs, { children: /* @__PURE__ */ jsx(SortableList, { tabs, onSortEnd: handleSortTabs, children: tabs.map((val, index) => /* @__PURE__ */ jsx(
        SortableTab,
        {
          label: `#${index + 1}`,
          tabId: val.id,
          active: tab === val.id,
          onSelect: () => setTab(val.id)
        },
        val.id
      )) }) }),
      /* @__PURE__ */ jsxs(Ui.ArrayForm.Tabs, { actions: true, children: [
        /* @__PURE__ */ jsx(Ui.Tab, { onSelect: () => handleRemoveTab(tab), children: /* @__PURE__ */ jsx(Ui.Icons.Tabs.Remove, {}) }),
        /* @__PURE__ */ jsx(Ui.Tab, { onSelect: handleAddTab, children: /* @__PURE__ */ jsx(Ui.Icons.Tabs.Add, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Ui.ArrayForm.Body, { children: currentItem !== null && /* @__PURE__ */ jsx(
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
export {
  ArrayForm_default as default
};
