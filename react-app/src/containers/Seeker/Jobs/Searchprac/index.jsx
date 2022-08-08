import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const countryOptions = [
  { value: "pakistan", label: "Pakistan" },
  { value: "uae", label: "UAE" },
  { value: "iran", label: "Iran" },
];

const MySearch = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [country, setCountry] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const Data = { selectedOption, country };
    console.log(Data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <Select
          defaultValue={country}
          onChange={setCountry}
          bordered={false}
          options={countryOptions}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default MySearch;
