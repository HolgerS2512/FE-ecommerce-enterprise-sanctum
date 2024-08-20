import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import ROUTES from "../Settings/ROUTES";
import Loading from "../components/Helpers/Loading";

const Middleware = () => {
  const { token, error, isUserLaoding:isLoading } = useStateContext();

  if (isLoading) return <Loading/>;

  if (error) return <Navigate to={ROUTES.pages.HOME} />;
    
  return (token) ? <Outlet /> : <Navigate to={ROUTES.pages.HOME} />;
}

export default Middleware;
