import React from "react";
import styled from "styled-components";
const CTableContainer = styled.div`
  min-height: 35vh;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  box-shadow: inset 0 0 8px black;
  color: white;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px;
  max-height: 35vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    background-color: rgb(233 19 19 / 80%);
    border-radius: 0 1rem 1rem 0;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: #f97301;
    border: 2px solid #bf1317;
  }
  ::-webkit-scrollbar-track-piece {
  }
`;
const CTableHead = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px;
`;
const CTableCell = styled.p`
  border-bottom: 1px solid #f90101;
  color: #ffd437;
`;
const CTableBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 20px 20px;
`;

const Table = ({ children }) => {
  return (
    <CTableContainer>
      <CTableHead>
        <CTableCell>Server Name</CTableCell>
        <CTableCell>Playered Join</CTableCell>
        <CTableCell>Is Private</CTableCell>
      </CTableHead>
      <CTableBody>{children}</CTableBody>
    </CTableContainer>
  );
};

export default Table;
