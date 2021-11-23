import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";

const Root = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  h2 {
    font-size: 5vmin;
  }

  p {
    margin-top: 24px;
    margin-bottom: 40px;
  }

  button {
  }
`;

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.error) {
      // Error path
      return (
        <Root>
          <h2>
            Oooop....
            <br />
            Something went wrong :(
          </h2>
          <p>We are very sorry for that, please reload the page</p>
          <Button href="/main-menu">Reload Page</Button>
          {/* <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details> */}
        </Root>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
