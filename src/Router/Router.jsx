import { createBrowserRouter } from "react-router-dom";
import AdminRoute from "../Components/Pages/Private/Admin/AdminRoute";
import Buyers from "../Components/Pages/Private/Admin/Buyers/Buyers";
import Sellers from "../Components/Pages/Private/Admin/Sellers/Sellers";
import BookingHistory from "../Components/Pages/Private/Buyer/BookingHistory/BookingHistory";
import MyBookings from "../Components/Pages/Private/Buyer/MyBookings/MyBookings";
import Payment from "../Components/Pages/Private/Buyer/Payment/Payment";
import ProductDetails from "../Components/Pages/Private/Buyer/ProductDetails/ProductDetails";
import Shop from "../Components/Pages/Private/Buyer/Shop/Shop";
import WishList from "../Components/Pages/Private/Buyer/WishList/WishList";
// import Myprofile from "../Components/Pages/Private/MyProfile/Myprofile";
import PrivateRoute from "../Components/Pages/Private/PrivateRoute";
import AddProducts from "../Components/Pages/Private/Seller/AddProducts/AddProducts";
import MyCustomers from "../Components/Pages/Private/Seller/MyCustomers/MyCustomers";
import MyProducts from "../Components/Pages/Private/Seller/MyProducts/MyProducts";
import SellerRoute from "../Components/Pages/Private/Seller/SellerRoute";
import Blog from "../Components/Pages/Public/Blog/Blog";
import CategoryPage from "../Components/Pages/Public/CategoryPage/CategoryPage";
import Error from "../Components/Pages/Public/Error/Error";
import Home from "../Components/Pages/Public/Home/Home";
import Login from "../Components/Pages/Public/Login/Login";
import Register from "../Components/Pages/Public/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import PublicLayout from "../Layout/PublicLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        errorElement: <Error />,
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
                path: '/blog',
                element: <Blog />,
            },
            {
                path: '/shop',
                element: <CategoryPage />,
            },
            {
                path: '/wishlist',
                element: (
                    <PrivateRoute>
                        <WishList />
                    </PrivateRoute>
                ),
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
        errorElement: <Error />,
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: '/dashboard',
                element: <BookingHistory />
            },
            {
                path: '/dashboard/mybookings',
                element: <MyBookings />
            },
            // {
            //     path: '/dashboard/booking-history',
            //     element: 
            // },
            {
                path: '/dashboard/myproducts',
                element: (
                    <SellerRoute>
                        <MyProducts />
                    </SellerRoute>
                )
            },
            {
                path: '/dashboard/customerbookings',
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
    },
    {
        path: '/payment/:id/:uid',
        errorElement: <Error />,
        loader: ({params}) => {
            const res = fetch(`${process.env.REACT_APP_PROD_SERVER_URL}/bookings/${params.id}/${params.uid}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                },
            })
            return res;
        },
        element: (
            <PrivateRoute>
                <Payment />
            </PrivateRoute>
        )
    }
]);

export default router;