import React from 'react';
function ErrorFallback(_a) {
    var error = _a.error, resetErrorBoundary = _a.resetErrorBoundary;
    return (React.createElement("div", { role: "alert" },
        React.createElement("p", null, "Something went wrong:"),
        React.createElement("pre", null, error.message),
        React.createElement("button", { onClick: resetErrorBoundary }, "Try again")));
}
export default ErrorFallback;
