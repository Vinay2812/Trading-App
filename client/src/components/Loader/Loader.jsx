import "./Loader.css";
import { RotatingLines } from "react-loader-spinner";
import { useContext, createContext, useState } from "react";
import { dismissToast } from "../Toast/Toast";

const LoaderContext = createContext();
export const useLoading = () => {
  return useContext(LoaderContext);
};

function Loader({ children }) {
  const [loading, setLoading] = useState(false);
  const loaderWrapper = async (promise) => {
    try {
      if (!(promise instanceof Promise)) {
        return promise;
      }
      setLoading(true);
      const res = await promise;
      setLoading(false);
      return res;
    } catch (err) {
      return null;
    }
  };
  return (
    <LoaderContext.Provider value={{ setLoading, loaderWrapper }}>
      {loading && (
        <div className="loader-container">
          <RotatingLines
            strokeColor="blueviolet"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
}

export default Loader;
