import React, { useEffect } from "react";

const Alert = ({ message, close }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [close]);

  return (
    <div id="snackbar" className="flex items-center justify-between capitalize show">
      <span>{message}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-icon cursor-pointer"
        style={{
          width: "1em",
          height: "1em",
          verticalAlign: "middle",
          fill: "currentColor",
          overflow: "hidden",
        }}
        viewBox="0 0 1024 1024"
        onClick={() => {
          close();
        }}
      >
        <path d="M810.66 170.66q18.33 0 30.495 12.165t12.165 30.495q0 18.002-12.33 30.33L572.315 511.98 840.99 780.308q12.329 12.33 12.329 30.331 0 18.33-12.165 30.495T810.66 853.3q-18.002 0-30.331-12.329L512 572.293 243.671 840.97q-12.329 12.33-30.33 12.33-18.33 0-30.496-12.166T170.68 810.64q0-18.002 12.33-30.33l268.676-268.33L183.01 243.652q-12.329-12.33-12.329-30.331 0-18.33 12.165-30.495t30.495-12.165q18.002 0 30.331 12.329L512 451.666l268.329-268.677q12.329-12.33 30.33-12.33z" />
      </svg>
    </div>
  );
};

export default Alert;
