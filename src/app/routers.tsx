import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../modules/pictures/ui/main-page/main-page";
import { LoginPage } from "../modules/auth/ui/login-page/login-page";

import { ProtectedRoute } from "../shared/ui/protected-route/protected-route";
import { Layout } from "./layout/layout";
import '../styles/main.css';
import { RegisterPage } from "../modules/auth/ui/registration-page/registration-page";
import { ProfilePage } from "../modules/profile/ui/profile-page/profile-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <MainPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "profile",
                        element: <ProfilePage />
                    }
                ]
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage/>
    }
]);