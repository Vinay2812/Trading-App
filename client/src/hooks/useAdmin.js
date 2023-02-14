import { useSelector } from "react-redux";

export const useAdmin = () => {
    const admin = useSelector((state) => state.adminReducer?.adminData?.admin);
    return admin;
}