import React, { useState } from "react";

type UseInput = [string, (e: React.ChangeEvent<HTMLInputElement>) => void];

export default function useInput(initialValue: string = ""): UseInput {
  const [value, setValue] = useState<string>(initialValue);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, handleChangeValue];
}
