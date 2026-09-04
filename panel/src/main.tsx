import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";

import { App } from "@panel/App";

createRoot(document.getElementById("root")!).render(
    <MantineProvider defaultColorScheme="dark">
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </MantineProvider>
);