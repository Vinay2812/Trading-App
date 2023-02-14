import "./Loader.css"
import { RotatingLines } from "react-loader-spinner"

function Loader() {
  return (
    <div className="loader-container">
         <RotatingLines
            strokeColor="blueviolet"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
        />
    </div>
   
  )
}

export default Loader