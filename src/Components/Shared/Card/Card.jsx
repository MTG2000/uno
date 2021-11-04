import styled from "styled-components";
import Image from "../Image/Image";
import BacksideImage from "./backside.png";

const Root = styled.div`
  width: ${(props) => props.width}px;
  background: whitesmoke;
  border-radius: 15px;
  .container {
    padding-top: 141%;
    background: white;
    border-radius: 10px;
  }
`;

export default function Card({ width = 200 }) {
  return (
    <Root width={width}>
      <Image src={BacksideImage} ratio={590 / 418} />
    </Root>
  );
}
