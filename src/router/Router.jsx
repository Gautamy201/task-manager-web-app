import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const Router = () => {
  const isUserLogin = useSelector((state) => state.user.isUserLogin);
  console.log(isUserLogin);
  return !isUserLogin ? <Outlet /> : <Navigate to={"/login"} />;
};

export default Router;
