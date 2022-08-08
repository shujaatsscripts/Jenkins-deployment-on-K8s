import React, { useState, useMemo } from "react";
// import Select from "react-select";
import countryList from "react-select-country-list";
import { Select, Divider, Input, Form, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  StyledInput,
  StyledSelect,
  SubmitButton,
  SpanStyling,
  StyledForm,
  BorderStyling,
} from "./search.styles.js";
import CountryDropdown from "country-dropdown-with-flags-for-react";

const SearchBox = ({
  handleSeedInput,
  searchInput,
  setSearchInput,
  reload,
}) => {
  const { Option } = Select;
  const [countryName, setCountryName] = useState("");
  const [level, setLevel] = useState("");
  const [jobType, setJobType] = useState("");
  //   const options = useMemo(() => countryList().getData(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const searchData = { countryName, searchInput, expirience, salary };
    // console.log(searchData);
  };

  return (
    <>
      <StyledForm>
        <BorderStyling>
          <CountryDropdown
            // style={{ height: "20px" }}
            // height={20}
            className="CountryList"
            // showDefaultOption={false}
            // preferredCountries={["pk", "gb"]}
            value={countryName}
            handleChange={(event) => {
              let value = event.target.value.split(" (")[0];
              setCountryName(value);
            }}
            // required
          ></CountryDropdown>
          {/* <Select
            style={{
              fontFamily: "Montserrat-Regular",
              fontSize: "12px",
              width: "20%",
            }}
            bordered={false}
            value={countryName}
            onChange={(e) => setCountryName(e)}
          >
            <Option value="" selected>
              Country
            </Option>
            <Option value="pakistan">Pakistan</Option>
            <Option value="uae">UAE</Option>
            <Option value="iran">Iran</Option>
          </Select> */}
          {/* <span
            style={{ color: "#1a77f259", fontSize: "23px", marginTop: "-5px" }}
          >
            |
          </span> */}
          <div
            style={{
              width: "40%",
              paddingRight: "5px",
              marginRight: "15px",
            }}
          >
            <StyledInput
              value={searchInput}
              focus={false}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="Search..."
              prefix={
                <SearchOutlined style={{ color: "grey", fontSize: "12px" }} />
              }
            />
          </div>
          <span
            style={{ color: "#1a77f259", fontSize: "30px", marginTop: "-9px" }}
          >
            |
          </span>
          <Select
            style={{
              fontFamily: "Montserrat-Regular",
              fontSize: "12px",
              width: "20%",
            }}
            bordered={false}
            value={level}
            onChange={(e) => setLevel(e)}
          >
            <Option value="" selected>
              Level
            </Option>
            <Option value="Internship">Internship</Option>
            <Option value="Entry Level">Entry Level</Option>
            <Option value="Intermediate">Intermediate</Option>
            <Option value="Advanced">Advanced</Option>
            <Option value="Expert">Expert</Option>
          </Select>
          <span
            style={{ color: "#1a77f259", fontSize: "30px", marginTop: "-9px" }}
          >
            |
          </span>
          <Select
            style={{
              fontFamily: "Montserrat-Regular",
              fontSize: "12px",
              width: "20%",
            }}
            // placeholder="Job Type"
            value={jobType}
            bordered={false}
            className="StyledSelect"
            onChange={(e) => setJobType(e)}
          >
            <Option value="" selected>
              Job Type
            </Option>
            <Option value="Permanent">Permanent</Option>
            <Option value="Contractual">Contractual</Option>
          </Select>
        </BorderStyling>
        <SubmitButton
          onClick={() => handleSeedInput(countryName, level, jobType)}
        >
          Search
        </SubmitButton>
        <SubmitButton
          onClick={() => {
            reload();
            setLevel("");
            setJobType("");
            setSearchInput("");
            // setCountryName("Pakistan");
          }}
        >
          Reload
        </SubmitButton>
      </StyledForm>
    </>
  );
};
export default SearchBox;
