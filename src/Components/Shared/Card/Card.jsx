import styled from "styled-components";
import Image from "../Image/Image";

const Root = styled.div`
  --color: var(--${(props) => props.color});
  perspective: 2500px;

  /* overflow: hidden; */
  padding-top: 141%;
  border-radius: 10px;
  position: relative;
  transform-style: preserve-3d;
  animation: aa 2s infinite linear;

  @keyframes aa {
    from {
      transform: rotateY(0);
    }
    to {
      transform: rotateY(360deg);
    }
  }

  .front,
  .back {
    border-radius: 15px;
    background: whitesmoke;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    backface-visibility: hidden;
  }

  .front {
    transform: translateZ(1px);

    .value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--color);
      font-size: 7rem;
      font-family: sans-serif;
      font-weight: bold;
      text-shadow: 5px 5px black;
      -webkit-text-stroke: black 2px;
    }

    .value-small {
      position: absolute;
      color: white;
      -webkit-text-stroke: black 2px;
      font-weight: bold;
      font-size: 3rem;
      font-style: italic;

      &.value-tl {
        top: 14px;
        left: 22px;
      }

      &.value-br {
        bottom: 14px;
        right: 22px;
        transform: scale(-1);
      }
    }
  }

  .back {
    transform: rotateY(180deg);
  }
`;

export default function Card({ width = 200, color = "green", number = 4 }) {
  return (
    <Root width={width} color={color} className="noselect">
      <div className="front">
        <Image src={`/assets/images/front-${color}.png`} ratio={590 / 418} />
        <p className="value">{number}</p>
        <p className="value-small value-tl">{number}</p>
        <p className="value-small value-br">{number}</p>
      </div>
      <div className="back">
        <Image src={`/assets/images/backside.png`} ratio={590 / 418} />
      </div>
    </Root>
  );
}
