import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/home";
import { LocationPage } from "../../pages/location";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/location/:id", element: <LocationPage /> },
]);