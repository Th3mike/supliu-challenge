import React from "react";
import styled from "styled-components";

const SelectMain = styled.div`
  font-size: 36px;
  display: flex;
  flex-direction: column;
`;

const SelectStyle = styled.select`
  height: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
`;

const Option = styled.option`
  text-align: center;
  font-size: 18px;
`;

const Select = ({ values, name, label, register }) => {
  return (
    <SelectMain>
      {label}:
      <SelectStyle {...register(name)} style={{ fontSize: "18px" }}>
        <Option key="-1" value="-1" disabled>
          Selecione o album
        </Option>
        {values.map((value) => (
          <Option key={value.id} value={value.id}>
            {value.name}
          </Option>
        ))}
      </SelectStyle>
    </SelectMain>
  );
};
export default Select;
