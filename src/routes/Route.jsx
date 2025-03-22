import { Route, Routes } from "react-router-dom";
import RestaurantDetails from "../components/restuarant/RestuarantDetails";
import HomePage from "../page/homepage";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import { ProfilePage } from "../components/profile/ProfilePage";
import AddMenuItemPage from "../components/Menu/AddMenuPage";
import { OrderConfirmation } from "../components/restuarant/OrderConfirmation";
import UpdateStatus from "../components/profile/OrderUpdate";

export default function Reouting() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" exact />
      <Route element={<RestaurantDetails />} path="/restaurant/:id" />
      <Route element={<LoginPage/>} path="/login" />
      <Route element={<RegisterPage/>} path="/register" />
      <Route element={<ProfilePage/>} path="/profile" />
      <Route element={<AddMenuItemPage/>} path="restaurant/:id/menu" />
      <Route element={<OrderConfirmation/>} path="/order-confirmation"/>
      <Route element={<UpdateStatus/>} path="/ordered/item" />
    </Routes>
  );
}
