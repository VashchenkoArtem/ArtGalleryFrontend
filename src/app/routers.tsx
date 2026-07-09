import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../modules/pictures/ui/main-page/main-page";
import { Layout } from "./layout/layout";
import '../styles/main.css';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <MainPage />
            }
        ]
    }
]);