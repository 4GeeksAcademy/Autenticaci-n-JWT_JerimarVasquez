import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./pages/Layout.jsx";
import { StoreProvider } from "./hooks/useGlobalReducer";

ReactDOM.createRoot(document.getElementById("root")).render(
    <StoreProvider>
        <Layout />
    </StoreProvider>
);
