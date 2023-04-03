import React from "react";
import logger from "../../utils/logger";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    logger.log(error + "fallback")
    return { hasError: true };
  }

  componentDidCatch(error, info){
    console.error(error, info)
  }

  render(){
    if(this.state.hasError){
        return this.props.fallback;
    }
    return this.props.children;
  }
}
export default ErrorBoundary
