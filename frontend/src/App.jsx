import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadSeller, loadUser } from "../redux/actions/user.js"; // Ensure paths are correct
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
    ShopLoginPage
} from "./Routes.jsx";
import { ShopHomePage } from "./ShopRoutes.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProtectedRoute from "./ProtectedRoute.jsx";
import SellerProtectedRoute from "./SellerProtectedRoute.jsx";
import { useSelector } from "react-redux";

function App() {
  // Extracting user and seller state
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    // Initial data fetch
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
        
        {/* User Profile - Protected */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />

        {/* Shop Authentication Routes */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        
        {/* Protected Shop Home - FIX: Passed props for guard logic */}
        <Route 
          path="/shop/:id" 
          element={
            <SellerProtectedRoute isLoading={isLoading} isSeller={isSeller}>
              <ShopHomePage />
            </SellerProtectedRoute>
          } 
        />

        {/* Checkout - Protected */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;