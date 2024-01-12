import {useState} from "react"
const Description = (props) => {
   const [description, setDescription] = useState(props.description.slice(0,30));
   const [term, setTerm] = useState("...show more");

  const handleChange = ()=>{
     if(description!==props.description){
       setTerm("   show less");
       setDescription(props.description);
     } else {
       setTerm("...show more");
       setDescription(props.description.slice(0,20));
     }
   }
  return (<>
    {description}<span onClick={handleChange} style={{color:"blue"}}>{term}</span>
    </>
  )
}

export default Description;