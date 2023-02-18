import { useEffect, useState } from "react";
import "./PublishList.css"
import Loader from "../Loader/Loader"
import PublishListItem from "./PublishListItem";
import { getTenderBalances } from "../../api/AdminRequest";

function PublishList({isPublishList=true, refresh, setRefresh}) {
    // hooks

    // selectors

    // useStates
    const [loading, setLoading] = useState(false);
    
    const [publishList, setPublishList] = useState([])

    // variables

    // useEffects
    useEffect(()=>{
      const controller = new AbortController();
      const signal = { signal: controller.signal } 

      if(refresh || (isPublishList !== null)){
        fetchPublishList(signal)
        setRefresh(false);
      }

      return ()=>{
        setRefresh(false)
        setLoading(false);
        controller.abort();
      }
    }, [refresh, isPublishList, window.onload])

    // functions
    async function fetchPublishList(signal = null){
      setLoading(true)
      try {
        const tenderBalances = await getTenderBalances(signal); 
        if(tenderBalances.status === 200){
          setPublishList(tenderBalances.data);
          setLoading(false)
        }
      } catch (err) {
        setLoading(false);
      }
    }

  return (
    <div className="publish-list-container">
      {loading ? <Loader /> : 
        <>
        <div className="publish-list-row head">
            <div className="publish-list-cell">T.no</div>
            <div className="publish-list-cell">Tender Date</div>
            <div className="publish-list-cell">Mill name</div>
            <div className="publish-list-cell">Item name</div>
            <div className="publish-list-cell">Payment to</div>
            <div className="publish-list-cell">Do name</div>
            <div className="publish-list-cell">Season</div>
            <div className="publish-list-cell">Grade</div>
            <div className="publish-list-cell">Unit</div>
            <div className="publish-list-cell">Qty</div>
            <div className="publish-list-cell">Lifting Date</div>
            <div className="publish-list-cell">Purchase Rate</div>
            <div className="publish-list-cell">Mill Rate</div>
            <div className="publish-list-cell">Sale Rate</div>
            <div className="publish-list-cell">Publish Quantal</div>
            <div className="publish-list-cell">Action</div>
        </div>
        {
          publishList.map((publishListItem, index)=>{
            return <PublishListItem key={index} publishListItem={publishListItem}/>
          })
        }
        
        </>
      }
    </div>
  )
}

export default PublishList