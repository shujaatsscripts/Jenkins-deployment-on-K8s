import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

const Search = ({
  handleSeedInput,
  setDataSource,
  searchInput,
  setSearchInput,
}) => {
  // const [searchInput, setSearchInput] = useState("");

  // useEffect(() => {
  //   if (searchInput === "") {
  //     setDataSource(excelData);
  //   }
  // }, [sea]);

  // const handleSeedInput = () => {
  //   let filteredSuggestions = excelData.filter(
  //     (d) =>
  //       JSON.stringify(d)
  //         .replace(" ", "")
  //         .toLowerCase()
  //         .indexOf(searchInput.replace(" ", "").toLowerCase()) > -1
  //   );
  //   setDataSource(filteredSuggestions);
  // };

  return (
    <StyledSearch>
      <div>
        <SearchOutlined
          style={{ fontSize: "15px", paddingTop: "0%", color: "silver" }}
        />
      </div>
      <StyledInput
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <a>
        <FilterOutlined
          style={{ fontSize: "16px", paddingTop: "25%", color: "#009bdb" }}
          onClick={handleSeedInput}
        />
      </a>
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  height: 33px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border: 2px solid white;
  border-radius: 7px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 15px 0 15px;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 95%;
  padding-left: 10px;
`;

export default Search;
