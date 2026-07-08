import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../modules/pictures/ui/main-page/main-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>
    }
])