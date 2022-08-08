import React, { useState } from "react";
import { Table } from "antd";
import {
  BoxStyle,
  TableStyle,
  SpanStyle,
  ColHeadingStyle,
  TableHeadingStyle,
} from "./table.styles.js";
import profileImg from "../images/myprofile.svg";
import setting from "../images/dots.svg";
import Data from "./data.js";

const TableData = () => {
  const [MydataPro, setMyDataPro] = useState(Data);
  return (
    <div style={{ boxSizing: "border-box" }}>
      {MydataPro.map((curElem) => {
        return (
          <>
            <BoxStyle key={curElem.id}>
              <TableStyle style={{ border: "none", outline: "hidden" }}>
                <tbody>
                  <tr>
                    <td>
                      <img src={profileImg} alt="" />
                    </td>
                    <TableHeadingStyle>
                      Raza Raheem <br />
                      <SpanStyle>Graphic Designer</SpanStyle>
                    </TableHeadingStyle>
                    <td>
                      <ColHeadingStyle>Nets International</ColHeadingStyle>
                    </td>
                    <td>
                      <ColHeadingStyle>Pakistan</ColHeadingStyle>
                    </td>
                    <td>
                      <ColHeadingStyle style={{ alignContent: "right" }}>
                        <img src={setting} alt="" />
                      </ColHeadingStyle>
                    </td>
                  </tr>
                </tbody>
              </TableStyle>
            </BoxStyle>
          </>
        );
      })}
    </div>
  );
};

export default TableData;
