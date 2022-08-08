import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import filter from "../images/filter.svg";
import {
  SearchBar,
  SubmitButton,
  StyledInput,
  FilterButton,
} from "./Search.styles.js";

const SearchBox = ({ excelData, setDataSource }) => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    console.log(searchInput);
    if (searchInput === "") {
      setDataSource(excelData);
    }
  }, [searchInput]);

  const handleSeedInput = () => {
    let filteredSuggestions = excelData.filter(
      (d) =>
        JSON.stringify(d)
          .replace(" ", "")
          .toLowerCase()
          .indexOf(searchInput.replace(" ", "").toLowerCase()) > -1
    );
    setDataSource(filteredSuggestions);
  };

  return (
    <SearchBar style={{ width: "100%", display: "flex" }}>
      <StyledInput
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        type="text"
        placeholder="Search..."
        prefix={<SearchOutlined style={{ color: "grey" }} />}
      />
      <SubmitButton onClick={handleSeedInput}>Search</SubmitButton>
      {/* <FilterButton style={{ display: "none" }} icon={<FilterOutlined />}>
        Search With Filter
      </FilterButton> */}
    </SearchBar>
  );
};

export default SearchBox;
