import styled from "styled-components";
import Image from "../Image/Image";
import { motion } from "framer-motion";
import BotsServer from "../../../BotsServer/BotsServer";
import { move } from "../../../api/api";

const Root = styled.div`
  --color: var(--${(props) => props.color});

  /* overflow: hidden; */
  padding-top: 141%;
  border-radius: calc(var(--cardWidth) / 10);

  box-shadow: ${(props) =>
    !props.disableShadow ? "0 0 10px #292727" : "none"};
  position: relative;
  transform-style: preserve-3d;

  cursor: ${(props) => (props.playable ? "pointer" : "inherit")};
  filter: ${(props) =>
    props.selectable && !props.playable ? "contrast(.5)" : "none"};

  .front,
  .back {
    border-radius: calc(var(--cardWidth) / 10);
    background: whitesmoke;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
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
      font-size: var(--fontBig);
      font-family: sans-serif;
      font-weight: bold;
      text-shadow: 5px 5px black;
      -webkit-text-stroke: black 2px;
    }

    .card-icon {
      width: 80%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .value-small {
      position: absolute;
      color: white;
      -webkit-text-stroke: black 2px;
      font-weight: bold;
      font-size: var(--fontSmall);
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

      @media screen and (max-width: 1000px) {
        -webkit-text-stroke: black 1px;

        .value {
          text-shadow: 3px 3px black;
        }

        &.value-tl {
          top: 9px;
          left: 13px;
        }

        &.value-br {
          bottom: 9px;
          right: 13px;
          transform: scale(-1);
        }
      }
    }

    .icon-small {
      position: absolute;
      width: 20%;
      &.icon-tl {
        top: 25px;
        left: 20px;
      }

      &.icon-br {
        bottom: 25px;
        right: 20px;
        transform: scale(-1);
      }
      @media screen and (max-width: 1000px) {
        &.icon-tl {
          top: 14px;
          left: 11px;
        }

        &.icon-br {
          bottom: 14px;
          right: 11px;
          transform: scale(-1);
        }
      }
    }
  }

  .back {
    transform: rotateY(180deg);
  }
`;

export default function Card({
  id = "",
  color = "green",
  digit = 4,
  action = "",
  flip = false,
  rotationY = 180,
  layoutId,
  selectable,
  playable,
  disableShadow = false,
}) {
  const onClick = () => {
    if (playable) move(false, id);
  };

  const getFrontContent = () => {
    if (color === "black" && action === "wild")
      return <Image src={`/assets/images/wild.png`} ratio={590 / 418} />;

    if (color === "black")
      return (
        <>
          <Image src={`/assets/images/front-${color}.png`} ratio={590 / 418} />
          <img src="/assets/images/draw4.png" className="card-icon" />
          <img
            className="icon-small icon-tl"
            src={`/assets/images/${action}-blank.png`}
          />
          <img
            className="icon-small icon-br"
            src={`/assets/images/${action}-blank.png`}
          />
        </>
      );

    if (action)
      return (
        <>
          <Image src={`/assets/images/front-${color}.png`} ratio={590 / 418} />
          <img
            src={`/assets/images/${action}-${color}.png`}
            className="card-icon"
          />
          <img
            className="icon-small icon-tl"
            src={`/assets/images/${action}-blank.png`}
          />
          <img
            className="icon-small icon-br"
            src={`/assets/images/${action}-blank.png`}
          />
        </>
      );
    return (
      <>
        <Image src={`/assets/images/front-${color}.png`} ratio={590 / 418} />
        <p className="value">{digit}</p>
        <p className="value-small value-tl">{digit}</p>
        <p className="value-small value-br">{digit}</p>
      </>
    );
  };

  return (
    <Root
      as={motion.div}
      color={color}
      className="noselect"
      layoutId={layoutId}
      initial={{
        rotateY: flip ? Math.abs(180 - rotationY) : rotationY,
        y: 0,
      }}
      whileHover={
        playable
          ? { y: -40, transition: { duration: 0.3 } }
          : { y: 0, transition: { duration: 0.3 } }
      }
      animate={{ rotateY: rotationY, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      selectable={selectable}
      playable={playable}
      disableShadow={disableShadow}
      onClick={onClick}
    >
      <div className="front">{getFrontContent()}</div>
      <div className="back">
        <Image src={`/assets/images/backside.png`} ratio={590 / 418} />
      </div>
    </Root>
  );
}
