import React, { useState } from 'react';
import styled from "styled-components";

const ColorDropdown = ({ props, value, onChange }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = props;


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange({
      target: {
        name: 'color',
        value: option,
      },
    });
    setIsOpen(false);
  };


  return (
    <Wrapper>
      <div className="form-select dropdown-container w-100">
        <div style={{ backgroundColor: (value === "--select--" || value === "all") ? "white" : selectedOption }} className={`dropdown-box ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
          {/* {value || 'Select an option'} */}
          {(value === "--select--" || value === "all") ? value : null}

        </div>
        {isOpen && (
          <div className="options-container">
            {options.map((option, index) => (
              <div
                key={index}
                style={{ backgroundColor: option }}

                className="option"
                onClick={() => handleOptionClick(option)}
              >
                {(option === "--select--" || option === "all") ? option : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
 /* Add these styles to your CSS file */

 .dropdown-container {
   z-index: 999;
   position: relative;
   width: 100px; /* Set the width of the dropdown container as per your requirement */
 }

 .dropdown-box {
   /* padding: 10px; */
  height: 25px;
   border: 1px solid #cdcdcd;
   cursor: pointer;
   background-color: #fff;
 }

 .dropdown-box.open {
   border-bottom: none;
 }

 .options-container {
   position: absolute;
   top: 100%;
   left: 0;
   width: 100%;
   /* height: 25px; */
   border: 1px solid #ccc;
   background-color: #fff;
 }

 .option {
   /* padding: 10px; */
   height: 25px;
   cursor: pointer;
   border-bottom: 1px solid #ccc;
 }

 .option:last-child {
   border-bottom: none;
 }

`;

export default ColorDropdown;