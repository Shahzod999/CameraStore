import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/hooks";
import { selecteduserInfo } from "../../app/features/useInfoSlice";

const ProdtectedRoutes = () => {
  const userInfo = useAppSelector(selecteduserInfo);
  return <div>{userInfo ? <Outlet /> : <>NONONO</>}</div>;
};

export default ProdtectedRoutes;
