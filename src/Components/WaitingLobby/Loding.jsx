import React from "react";
import styled from "styled-components";
const CLoading = styled.span`
  display: inline-block;
  position: relative;
  span {
    animation: loading 1.2s ease-in-out infinite;
    position: absolute;
    width: 2px;
    background-color: white;
    box-shadow: 0 0 2px white;
  }

  span:nth-child(1) {
    left: 5px;
    animation-delay: -0.24s;
    display: inline-block;
  }

  span:nth-child(2) {
    left: 10px;
    animation-delay: -0.12s;
    display: inline-block;
  }
  span:nth-child(3) {
    left: 15px;
    animation-delay: 0s;
    display: inline-block;
  }
  @keyframes loading {
    0% {
      top: -1px;
      height: 1px;
    }
    50%,
    100% {
      top: -2px;
      height: 2px;
    }
  }
`;
const Loding = () => {
  return (
    <CLoading>
      <span></span>
      <span></span>
      <span></span>
    </CLoading>
  );
};

export default Loding;
