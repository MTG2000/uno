import React from "react";
import styled from "styled-components";
const Cavatar = styled.div`
  width: 100%;
  min-width: 100px;
  max-width: 120px;
  border-radius: 50%;
  border: 1px solid rgb(0 3 24);
  position: relative;
  padding-top: 100%;
  box-shadow: 0px 0px 6px 3px rgb(23 25 41);

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;

    object-fit: cover;
    object-position: top;
  }
`;
const Avatar = ({ seed }) => {
  return (
    <Cavatar>
      <img src={`https://avatars.dicebear.com/api/male/${seed}.svg`} alt="" />
    </Cavatar>
  );
};

export default Avatar;
