import React from "react";
import logger from "../../utils/logger";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info){
    logger.log("caught error - ", error, info);
  }

  render(){
    if(this.state.hasError){
        return this.props.fallback;
    }
    return this.props.children;
  }
}
export default ErrorBoundary
