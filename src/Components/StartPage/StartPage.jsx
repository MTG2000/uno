import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;

  .img {
    width: 80%;
    max-width: 500px;

    img {
      width: 100%;
    }
  }

  .text {
    text-shadow: 1px 3px 16px black;
  }
`;

export default function StartPage() {
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate();

  const onClick = () => {
    if (localStorage.getItem("playerName")) navigate("/main-menu");
    else navigate("/create-user");
  };

  return (
    <Root
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.7 }}
      onClick={onClick}
    >
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, duration: 1 },
        }}
        className="img"
      >
        <img src="imges/unoLogo.png" alt="UNO Logo" />
      </motion.div>
      <Typography
        variant="h4"
        mt={8}
        className="text"
        component={motion.h3}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={
          mounted
            ? {
                opacity: 1,
                y: [0, -10, 0],
                transition: {
                  repeat: Infinity,
                  duration: 0.9,
                  times: [0.4, 0.6, 1],
                  ease: "easeInOut",
                },
              }
            : {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  duration: 1,
                  delay: 1,
                },
              }
        }
        onAnimationComplete={() => setMounted(true)}
      >
        Click anywhere to Start
      </Typography>
    </Root>
  );
}
