import { jsx, jsxs } from "react/jsx-runtime";
import { Panel } from "rsuite";
import styled from "styled-components";
import { useJsonFormUi } from "../../UiContext";
const UiHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const JsonFormComponent = (props) => {
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
