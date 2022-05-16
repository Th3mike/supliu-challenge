import React from "react";
import { Audio } from "react-loader-spinner";

export default function LoadSpinner() {
  return <div style={{display: "flex", justifyContent: "center", marginTop: "15%"}}>
  <Audio height="100" width="100" color="green" ariaLabel="loading" />
  </div>
}
