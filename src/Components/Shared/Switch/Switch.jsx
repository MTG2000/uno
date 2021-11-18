import * as React from "react";
import { styled } from "@mui/system";
import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/core/SwitchUnstyled";

const Root = styled("span")`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 48px;
  height: 18px;
  cursor: pointer;
  border: 2px solid rgb(2 15 108);
  outline: 1px solid #f3f2f1;
  box-shadow: 0px 0px 6px 3px rgb(2 15 108);
  border-radius: 2rem;

  & .${switchUnstyledClasses.track} {
    background: #f7f7f7;
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    left: 27px;
    top: 0px;
    border-radius: 16px;
    box-shadow: 0 0 3px 0 #ffb100;
    background-color: rgb(2 15 108);
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 2px;
      top: 0px;
      box-shadow: 0 0 3px 0 #ffb100;
      background-color: rgb(2 15 108);
    }

    .${switchUnstyledClasses.track} {
      background: #f7f7f7;
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;

    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
`;

export default function UnstyledSwitches(props) {
  const label = { componentsProps: { input: { "aria-label": "switch" } } };

  return (
    <SwitchUnstyled component={Root} {...label} {...props} defaultChecked />
  );
}
