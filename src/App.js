import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import NavBar from "./components/utils/NavBar";
import Home_Page from "./page/Home_Page";
import Product_page from "./page/Product_page";
import Discount_page from "./page/Discount_page";
import Offer_page from "./page/Offer_page";
import Product_details_page from "./components/product/Product_details_page";
import Search_page from "./page/Search_page";
import CardPage from "./page/CardPage";
import LikePage from "./page/LikePage";
import SopningPage from "./page/SopningPage";
import PlaceOrderPage from "./page/PlaceOrderPage";
import PaymentMethod from "./page/PaymentMethod";
import SingUp from "./page/SingUp";
import SingIn from "./page/SingIn";
import ProfilePage from "./page/ProfilePage";
import Order_Page from "./page/Order-Page";
import NotFound from "./page/NotFound";
import UPdateProduct from "./page/UPdateProduct";


function App() {
  return (
    <BrowserRouter className="App">
       <NavBar/>
        <Routes>
          <Route path="/" element={<Home_Page />} />
          <Route path="/add_Product" element={<Product_page />} />
          <Route path="/Product/:slug" element={<Product_details_page />} />
          <Route path="/product" element={<Search_page />} />
          <Route path="/Dashboard" element={<CardPage />} />
          <Route path="/Favorite" element={<LikePage />} />
          <Route path="/shipping" element={<SopningPage />} />
          <Route path="/payment" element={<PaymentMethod />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route path="/order/:id" element={<Order_Page />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/UPdateProduct/:id" element={<UPdateProduct/>} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/signin" element={<SingIn />} />
          <Route path="*"  element={<NotFound/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
