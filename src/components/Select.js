import React from "react";

const Select = ({ values, name, label, register }) => {
  return (
    <>
      {label}:
      <select {...register(name)}>
        <option key="-1" value="-1" disabled>
          Selecione o album
        </option>
        {values.map((value) => (
          <option key={value.id} value={value.id}>
            {value.name}
          </option>
        ))}
      </select>
    </>
  );
};
export default Select;
