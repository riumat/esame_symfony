import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Layout/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserGames from "./pages/UserGames";
import Home from "./pages/Home";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import GameDetails from "./pages/GameDetails";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: false,
      retry: 0,
    },
    mutations: {
      throwOnError: false,
      retry: 0,
    },
  },
});

const ProtectedLayout = () => (
  <ProtectedRoute>
    <Navbar />
    <Outlet />
  </ProtectedRoute>
);

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/user", element: <UserGames /> },
      { path: "/games/:id", element: <GameDetails /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="bottom-center"/> 
    </QueryClientProvider>
  </StrictMode>
);
