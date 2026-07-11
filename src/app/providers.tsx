import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { store } from "./store";
import { router } from "./routers";
import { AuthInitializer } from "../modules/auth/ui/auth-initializer/auth-initializer";
import { GOOGLE_CLIENT_ID } from "../shared/constants/server";

export function Providers() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthInitializer>
          <RouterProvider router={router} />
        </AuthInitializer>
      </GoogleOAuthProvider>
    </Provider>
  );
}