import { createBrowserRouter } from "react-router-dom";
import AdminRoute from "../Components/Pages/Private/Admin/AdminRoute";
import Buyers from "../Components/Pages/Private/Admin/Buyers/Buyers";
import Sellers from "../Components/Pages/Private/Admin/Sellers/Sellers";
import MyBookings from "../Components/Pages/Private/Buyer/MyBookings";
import ProductDetails from "../Components/Pages/Private/Buyer/ProductDetails/ProductDetails";
import Shop from "../Components/Pages/Private/Buyer/Shop/Shop";
import Myprofile from "../Components/Pages/Private/MyProfile/Myprofile";
import PrivateRoute from "../Components/Pages/Private/PrivateRoute";
import AddProducts from "../Components/Pages/Private/Seller/AddProducts/AddProducts";
import MyCustomers from "../Components/Pages/Private/Seller/MyCustomers/MyCustomers";
import MyProducts from "../Components/Pages/Private/Seller/MyProducts/MyProducts";
import SellerRoute from "../Components/Pages/Private/Seller/SellerRoute";
import Home from "../Components/Pages/Public/Home/Home";
import Login from "../Components/Pages/Public/Login/Login";
import Register from "../Components/Pages/Public/Register/Register";
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
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/shop/:id',
                element: (
                    <PrivateRoute>
                        <Shop />
                    </PrivateRoute>
                ),
            },
            {
                path: '/product/:id',
                element: (
                    <PrivateRoute>
                        <ProductDetails />
                    </PrivateRoute>
                ),
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
                element: (
                    <SellerRoute>
                        <MyProducts />
                    </SellerRoute>
                )
            },
            {
                path: '/dashboard/mycustomers',
                element: (
                    <SellerRoute>
                        <MyCustomers />
                    </SellerRoute>
                )
            },
            {
                path: '/dashboard/addproducts',
                element: (
                    <SellerRoute>
                        <AddProducts />
                    </SellerRoute>
                )
            },
            {
                path: '/dashboard/buyers',
                element: (
                    <AdminRoute>
                        <Buyers />
                    </AdminRoute>
                ),
            },
            {
                path: '/dashboard/sellers',
                element: (
                    <AdminRoute>
                        <Sellers />
                    </AdminRoute>
                ),
            }
        ]
    }
]);

export default router;