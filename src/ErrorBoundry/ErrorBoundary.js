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
      reload: false,
    };
    this.handleReload = this.handleReload.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, caughtMessage: error };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hasError && prevState.hasError === this.state.hasError) {
      this.setState({ hasError: false, caughtMessage: null });
    }
  }

  handleReload() {
    window.location.assign("/");
  }

  render() {
    const { currentLang } = this.props;
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-wrapper">
            <h3 className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {languages[currentLang].errMessage +
                " " +
                this.state.caughtMessage}
              !
            </h3>
            <button className="error-reload" onClick={this.handleReload}>
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
