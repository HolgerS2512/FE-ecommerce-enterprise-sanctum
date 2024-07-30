import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import ROUTES from "../Settings/ROUTES";

const Middleware = () => {
  const { token } = useStateContext();

  return (token) ? <Outlet /> : <Navigate to={ROUTES.pages.HOME} />
}

export default Middleware
