import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "pages/Dashboard";
import { CardsProvider } from "providers";
import Theme from "../../Theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Dashboard />}>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
    </Route>
  )
);

const App = () => {
  return (
    <Theme>
      <CardsProvider>
        <RouterProvider router={router} />
      </CardsProvider>
    </Theme>
  );
};

export default App;
