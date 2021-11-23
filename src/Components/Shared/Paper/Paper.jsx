import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import styled from "styled-components";

const Paper = styled.div`
  background: var(--panel-bg);
  margin: 20vh 5vw;
  padding: 75px 42px 64px;
  text-align: center;
  min-height: 60vh;
  border-radius: 1rem;
  box-shadow: 1px 3px 18px rgb(0 6 50);
  position: relative;

  .uno-img {
    width: 150px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`;

const APaper = ({ children, ...props }) => {
  return (
    <Grid
      as={motion.div}
      initial={{ opacity: 0, x: 500 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -500 }}
      transition={{ duration: 0.7 }}
      container
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Grid item xs={12} md={10} lg={8}>
        <Paper>
          <img className="uno-img" src="assets/images/uno-logo.png" alt="" />
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default APaper;
