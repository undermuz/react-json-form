import { jsx, jsxs } from "react/jsx-runtime";
import { useJsonFormUi } from "../UiContext";
const JsonFormComponent = (props) => {
  const {
    id,
    title,
    header = null,
    multiple = false,
    primary = true,
    children
  } = props;
  const Ui = useJsonFormUi();
  return /* @__PURE__ */ jsxs(Ui.Container, { children: [
    /* @__PURE__ */ jsx(Ui.Header, { id, primary, title, children: header }),
    /* @__PURE__ */ jsx(Ui.Body, { primary, multiple, children })
  ] });
};
export {
  JsonFormComponent
};
