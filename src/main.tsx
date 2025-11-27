import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "./lib/i18n";
import {
  QueryProvider,
  DirectionProvider,
  ReduxProvider,
  ThemeProvider,
} from "./providers";
import { router } from "./router";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <ReduxProvider>
        <QueryProvider>
          <DirectionProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster position="top-right" />
          </DirectionProvider>
        </QueryProvider>
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>
);
