import React from "react";
import styled from "styled-components";
const Cavatar = styled.img`
  width: 100%;
  max-width: 120px;

  border-radius: 50%;

  border: 2px solid rgb(2 15 108);

  outline: 1px solid #f3f2f1;
  box-shadow: 0px 0px 6px 3px rgb(2 15 108);
  object-fit: cover;
  object-position: top;
`;
const Avatar = ({ seed }) => {
  return (
    <Cavatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} alt="" />
  );
};

export default Avatar;
