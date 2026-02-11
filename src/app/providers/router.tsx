import { createBrowserRouter } from "react-router-dom";
import { HomePage, LocationPage } from '../../pages'

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/location/:id", element: <LocationPage /> },
]);