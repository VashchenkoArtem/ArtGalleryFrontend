import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { store } from "./store";
import { router } from "./routers";

export function Providers() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}