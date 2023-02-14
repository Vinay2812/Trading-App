import { useSelector } from "react-redux";

export const useUser = () => {
    const user = useSelector((state) => state.authReducer?.authData?.userData);
    return user;
}