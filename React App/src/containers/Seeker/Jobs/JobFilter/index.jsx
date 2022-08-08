import React, { useState } from "react";
import { Checkbox } from "antd";

import {
  SearchCheckBoxes,
  HeadingStyle,
  AddFilter,
  CheckboxStyling,
} from "./JobFilter.styles.js";

const JobFilter = ({
  handleSeedInput,
  setDataSource,
  searchInput,
  setSearchInput,
}) => {
  const handleChange = (e) => {
    let isChecked = e.target.value;
    console.log(isChecked);
  };
  return (
    <SearchCheckBoxes>
      <HeadingStyle>Professional Level</HeadingStyle>
      <CheckboxStyling onChange={(e) => handleChange(e)} value="Senior_level">
        &nbsp; Senior Level
      </CheckboxStyling>
      <CheckboxStyling
        otherProps
        onChange={(e) => handleChange(e)}
        value="mid_level"
      >
        &nbsp; Mid Level
      </CheckboxStyling>
      <CheckboxStyling
        otherProps
        onChange={(e) => handleChange(e)}
        value="entry_level"
      >
        &nbsp; Entry Level
      </CheckboxStyling>
      <HeadingStyle
        style={{
          marginTop: "10px",
        }}
      >
        Employment Type
      </HeadingStyle>
      <CheckboxStyling
        // style={{ paddingLeft: "6%" }}
        onChange={(e) => handleChange(e)}
        value="full_time"
      >
        &nbsp; Full Time
      </CheckboxStyling>
      <CheckboxStyling
        otherProps
        onChange={(e) => handleChange(e)}
        value="part_time"
      >
        &nbsp; Part Time
      </CheckboxStyling>
      <CheckboxStyling
        otherProps
        onChange={(e) => handleChange(e)}
        value="remote"
      >
        &nbsp; Remote
      </CheckboxStyling>
      <CheckboxStyling
        otherProps
        onChange={(e) => handleChange(e)}
        value="contract"
      >
        &nbsp; Contract
      </CheckboxStyling>
      <CheckboxStyling
        otherProps
        onChange={(e) => handleChange(e)}
        value="internship"
      >
        &nbsp; Internship
      </CheckboxStyling>
    </SearchCheckBoxes>
  );
};

export default JobFilter;
