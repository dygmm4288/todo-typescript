import { RefObject } from "react";
import styled from "styled-components";
export default function FloatingInput({
  id,
  value,
  onChange,
  placeholder,
  inputRef,
  ...args
}: {
  inputRef?: RefObject<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <StWrapper>
      <input
        value={value}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        ref={inputRef}
        {...args}
      />
      <label htmlFor={id}>{placeholder}</label>
    </StWrapper>
  );
}
const StWrapper = styled.div`
  position: relative;
  width: 100%;
  input {
    appearance: none;

    width: 100%;
    font-size: 1rem;
    font-weight: 400;

    border: 1px solid black;
    border-radius: 0.25rem;

    padding: 1rem 0.75rem;

    &::placeholder {
      opacity: 0;
    }
  }
  label {
    position: absolute;
    top: 1.125rem;
    left: 0.65rem;
    font-size: 1rem;
    transition: all 0.2s ease-in;
  }
  input:not(:placeholder-shown) + label,
  input:focus + label {
    top: 0.5rem;
    left: 0.5rem;
    font-size: 0.5rem;
  }
`;
