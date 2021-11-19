import styled from "styled-components";

const CtextField = styled.input`
  display: inline-block;
  width: 75%;
  height: 30%;
  padding: 4%;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid rgb(2 15 108);
  border-radius: 1rem;
  text-align: center;
  font-size: large;
  ::placeholder {
    color: #fff;
    opacity: 1;
  }
  :focus {
    outline: none;
  }

  color: #fff;
`;
const TextField = (props) => {
  return <CtextField {...props} />;
};

export default TextField;
