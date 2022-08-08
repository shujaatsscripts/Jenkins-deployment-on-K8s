import React, { useState } from "react";
import { Input, Button } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import filter from "../images/filter.svg";
import {
  SearchBar,
  SubmitButton,
  StyledInput,
  FilterButton,
} from "./Search.styles.js";

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);
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
      <SubmitButton type="submit">Search</SubmitButton>
      <FilterButton style={{ display: "none" }} icon={<FilterOutlined />}>
        Search With Filter
      </FilterButton>
    </SearchBar>
  );
};

export default SearchBox;
