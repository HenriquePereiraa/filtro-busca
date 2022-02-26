import React, { useState } from "react";
import './SearchInput.css'
import useDebounce from "../useDebounce";

const SearchInput = ({ value, onChange }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const debouncedChange = useDebounce(onChange, 700);
  //passando a função onChange em uma função debounce para evitar requisições em excesso a api

  function handleChange(event) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }

  return (
    <>
      <input type="search" value={displayValue} onChange={handleChange} />
    </>
  );
};

export default SearchInput;

