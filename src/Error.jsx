import styled from "styled-components";

const Error = () => {

  return (
    <Wrapper>
      <h1>404 not found!!</h1>
    </Wrapper>
  )
}

const Wrapper = styled.section`
*{
  margin: 0;
  padding: 0;
  background-color: blue;
  color: white;
 }

 h1{
   text-align: center;
 }
`;

export default Error;