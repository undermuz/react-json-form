// src/components/ErrorFallback.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function ErrorFallback({ error, resetErrorBoundary }) {
  return /* @__PURE__ */ jsxs("div", { role: "alert", children: [
    /* @__PURE__ */ jsx("p", { children: "Something went wrong:" }),
    /* @__PURE__ */ jsx("pre", { children: error.message }),
    /* @__PURE__ */ jsx("button", { onClick: resetErrorBoundary, children: "Try again" })
  ] });
}
var ErrorFallback_default = ErrorFallback;
export {
  ErrorFallback_default as default
};
