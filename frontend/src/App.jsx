import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadSeller, loadUser } from "../redux/actions/user.js"; 
import Store from "../redux/store.js";
import { 
    LoginPage, 
    SignupPage, 
    ActivationPage, 
    HomePage, 
    ProductsPage, 
    BestSellingPage, 
    EventsPage, 
    FAQPage,
    ProfilePage,
    CheckoutPage,
    ShopCreatePage,
    ShopLoginPage,
    PaymentPage, 
    OrderSuccessPage, 
} from "./routes/Routes.jsx";

import { ShopDashboardPage,ShopCreateProduct } from "./routes/ShopRoutes.jsx";
import { ShopHomePage } from "./routes/ShopRoutes.jsx"; 

import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";

function App() {
  useEffect(() => {
    Store.dispatch(loadUser()); 
    Store.dispatch(loadSeller());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        
        {/* User Profile */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />

        {/* New Payment Route */}
        <Route 
          path="/payment" 
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          } 
        />

        {/* New Order Success Route */}
        <Route 
          path="/order/success" 
          element={<OrderSuccessPage />} 
        />

        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        
        <Route 
          path="/shop/:id" 
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          } 
        />

        <Route 
          path="/dashboard" 
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard-create-product" 
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          } 
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;