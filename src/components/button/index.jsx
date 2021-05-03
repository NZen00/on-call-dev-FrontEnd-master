import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  border: none;
  outline: none;
  color: #fff;
  padding: 6px 1em;
  font-size: ${({ size }) => (size ? size + "px" : "18px")};
  font-weight: 600;
  border-radius: 5px;
  background-color: #01bf71;
  /* white-space: nowrap; */
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: #21867a;
    color: #010606;
    transition: all 0.2s ease -in -out;
  }

  &:focus {
    outline: none;
  }
`;

 
 
 
 
 
  
// outline: none;
// border: none;
// cursor: pointer;
// transition: all 0.2s ease -in -out;
// text - decoration: none;

//   &: hover {
//   transition: all 0.2s ease -in -out;
//   background: #fff;
//   color: #010606;
// }


export function Button(props) {
  const { size } = props;

  return (
    <ButtonWrapper size={size} className={props.className}>
      {props.children}
    </ButtonWrapper>
  );
}
