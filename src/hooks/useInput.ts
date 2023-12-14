import React, { useState } from "react";

type UseInput = [
  string,
  (e: React.ChangeEvent<HTMLInputElement> | string) => void,
];

export default function useInput(initialValue: string = ""): UseInput {
  const [value, setValue] = useState<string>(initialValue);

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement> | string,
  ) => {
    if (typeof e === "string") return setValue(e);

    setValue(e.target.value);
  };

  return [value, handleChangeValue];
}
