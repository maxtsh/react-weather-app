import React, { Component } from "react";

const languages = {
  English: {
    errMessage: "We are sorry about this but",
  },
  Persian: {
    errMessage: "متاسفانه خطایی رخ داده است که",
  },
};

// *** This Component Handles The Errors happening outside of Async Calls
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      caughtMessage: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, caughtMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { currentLang } = this.props;
    if (this.state.hasError) {
      return (
        <div className="error-wrapper">
          <i className="fas fa-exclamation-circle"></i>
          <h3 className="error-message">
            {languages[currentLang].errMessage + " " + this.state.caughtMessage}
            !
          </h3>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
