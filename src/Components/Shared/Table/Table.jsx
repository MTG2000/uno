import React from "react";
import styled from "styled-components";
const CTableContainer = styled.div`
  min-height: 35vh;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 1rem;

  color: white;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px;
  max-height: 500px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    background-color: #07caea;
    border-radius: 0 1rem 1rem 0;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: #0109f9;
    border: 2px solid #07caea;
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
  border-bottom: 1px solid rgb(2 15 108);
  color: #fff;
`;
const CTableBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(min-content, max-content);
  padding: 0 20px 20px;
`;

const Table = ({ children }) => {
  return (
    <CTableContainer>
      <CTableHead>
        <CTableCell>Server Name</CTableCell>
        <CTableCell>Players Joined</CTableCell>
        <CTableCell>Is Private</CTableCell>
      </CTableHead>
      <CTableBody>{children}</CTableBody>
    </CTableContainer>
  );
};

export default Table;
