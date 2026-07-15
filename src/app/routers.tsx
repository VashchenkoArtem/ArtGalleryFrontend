import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../modules/pictures/ui/main-page/main-page";
import { LoginPage } from "../modules/auth/ui/login-page/login-page";
import { RegisterPage } from "../modules/auth/ui/register-page/register-page";
import { ProfilePage } from "../modules/profile/ui/profile-page/profile-page";
import { ProtectedRoute } from "../shared/ui/protected-route/protected-route";
import { Layout } from "./layout/layout";
import '../styles/main.css';
import { PicturesPage } from "../modules/pictures/ui/pictures-page/pictures-page";
import { DetailPicturePage } from "../modules/pictures/ui/detail-picture-page/detail-picture-page";

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
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "profile",
                        element: <ProfilePage />
                    }
                ]
            },
            {
                path: "pictures",
                element: <PicturesPage/>
            },
            {
                path: "pictures/:id",
                element: <DetailPicturePage/>
            }
        ]
    },
    {
        path: "login",
        element: <LoginPage />
    },
    {
        path: "registration",
        element: <RegisterPage />
    },
]);