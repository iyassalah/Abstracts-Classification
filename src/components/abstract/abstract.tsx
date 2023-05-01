import React, { useState } from "react";
interface IProps {
  value: { abstract: string };
}

export default function abstract({ value }: IProps) {
  const [focus, setFocus] = useState(true);
  const isfocus: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setFocus((current) => !current);
  };

  return (
    <>
      <div
        className="overlay"
        style={{
          zIndex: focus ? "-1" : "3",
          visibility: focus ? "hidden" : "visible",
        }}
      ></div>

      <div className="abstract" onClick={isfocus}>
        <div className="idk">{value.abstract}</div>

        <div
          className="full-abstract"
          style={{
            zIndex: focus ? "-1" : "3",
            visibility: focus ? "hidden" : "visible",
          }}
        >
          {value.abstract}
        </div>
      </div>
    </>
  );
}
