import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Pages/Public/Home/Home";
import Login from "../Components/Pages/Public/Login/Login";
import Register from "../Components/Pages/Public/Register/Register";
import Shop from "../Components/Pages/Public/Shop/Shop";
import PublicLayout from "../Layout/PublicLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/shop',
                element: <Shop />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
        ],
    },
]);

export default router;