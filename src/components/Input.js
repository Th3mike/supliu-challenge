import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  height: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
`;

const Div = styled.div`
  font-size: 36px;
  text-align: center;
`;

const Input = ({ type, name, label, register, errorMsg }) => {
  return (
    <Div style={{ display: "flex", flexDirection: "column" }}>
      <strong>{label}:</strong>
      <InputStyle type={type} {...register(name)} />
      {errorMsg && <span style={{ color: "yellow", fontSize: "16px" }}>{errorMsg}</span>}
    </Div>
  );
};
export default Input;
