import styled from "styled-components";
import { SiApple, SiLenovo, SiSamsung, SiDell, SiNokia, SiAsus } from "react-icons/si";
const Company = (props) => {
  if (props.name === "apple") {
    return <span><SiApple className="logo" /></span>;
  } else if (props.name === "samsung") {
    return <span><SiSamsung className="logo" /></span>;
  } else if (props.name === "dell") {
    return <span><SiDell className="logo" /></span>;
  } else if (props.name === "nokia") {
    return <span><SiNokia className="logo" /></span>;
  } else if (props.name === "lenova") {
    return <span><SiLenovo className="logo" /></span>;
  } else if (props.name === "asus") {
    return <span><SiAsus className="logo" /></span>;
  } else {
    return <span>{props.name}</span>;
  }



}

const Wrapper = styled.section`
.logo{
  font-size: 100px;
}
`;

export default Company;

