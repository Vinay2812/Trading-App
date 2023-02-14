import { useSelector } from "react-redux"
import { setAdminTab } from "../redux/actions/adminActions";


export const useAdminActiveTab = ()=>{
    const {activeTab} = useSelector(state => state.adminReducer)
    return activeTab;
}

export const setAdminActiveTab = (tab, dispatch)=>{
    dispatch(setAdminTab(tab))
}