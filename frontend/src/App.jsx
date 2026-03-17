import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "../redux/actions/user.js";
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
    ShopCreate
} from "./Routes.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { useSelector } from "react-redux";

function App() {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(loadUser()); 
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
        
        {/* Profile Route */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />

        <Route path="/shop-create" element={<ShopCreate />} />

        {/* Checkout Route */}
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