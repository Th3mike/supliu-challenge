import React from "react";

const Input = ({ type, name, label, register, errorMsg }) => {
  

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {label}:
      <input type={type} {...register(name)}/>
      { errorMsg && <span style={{color: 'red'}}>{errorMsg}</span>}
    </div>
  );
};
export default Input;
