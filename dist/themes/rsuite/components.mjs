// src/themes/rsuite/components.tsx
import { Panel } from "rsuite";
import styled from "styled-components";
import { useJsonFormUi } from "../../UiContext.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
var UiHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
var JsonFormComponent = (props) => {
  const { title, header = null, primary = true, children } = props;
  const Ui = useJsonFormUi();
  return /* @__PURE__ */ jsx(Ui.Container, { children: /* @__PURE__ */ jsx(
    Panel,
    {
      header: /* @__PURE__ */ jsxs(UiHeader, { children: [
        title,
        header
      ] }),
      shaded: !primary,
      children
    }
  ) });
};
export {
  JsonFormComponent
};
