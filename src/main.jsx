import { StrictMode } from "react";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes.jsx";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
