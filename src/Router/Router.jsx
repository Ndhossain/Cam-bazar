import { createBrowserRouter } from "react-router-dom";
import Buyers from "../Components/Pages/Private/Admin/Buyers/Buyers";
import Sellers from "../Components/Pages/Private/Admin/Sellers/Sellers";
import MyBookings from "../Components/Pages/Private/Buyer/MyBookings";
import Myprofile from "../Components/Pages/Private/MyProfile/Myprofile";
import PrivateRoute from "../Components/Pages/Private/PrivateRoute";
import AddProducts from "../Components/Pages/Private/Seller/AddProducts/AddProducts";
import MyCustomers from "../Components/Pages/Private/Seller/MyCustomers/MyCustomers";
import MyProducts from "../Components/Pages/Private/Seller/MyProducts/MyProducts";
import Home from "../Components/Pages/Public/Home/Home";
import Login from "../Components/Pages/Public/Login/Login";
import Register from "../Components/Pages/Public/Register/Register";
import Shop from "../Components/Pages/Public/Shop/Shop";
import DashboardLayout from "../Layout/DashboardLayout";
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
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: '/dashboard',
                element: <Myprofile />
            },
            {
                path: '/dashboard/mybookings',
                element: <MyBookings />
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProducts />
            },
            {
                path: '/dashboard/mycustomers',
                element: <MyCustomers />
            },
            {
                path: '/dashboard/addproducts',
                element: <AddProducts />
            },
            {
                path: '/dashboard/buyers',
                element: <Buyers />
            },
            {
                path: '/dashboard/sellers',
                element: <Sellers />
            }
        ]
    }
]);

export default router;