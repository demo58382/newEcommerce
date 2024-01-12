import styled from "styled-components";

const Footer = () => {

  return (
    <Wrapper>
      <h4>Footer</h4>
    </Wrapper>
  )
}

const Wrapper = styled.section`
*{background-color: green;
color: white;
margin: 0;
padding: 0;
 }
h4{
  text-align: center;
}
`;

export default Footer;