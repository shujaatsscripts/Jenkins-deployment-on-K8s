import React, { useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";

import profileImg from "../images/myprofile.svg";
import Data from "./data.js";
import setting from "../images/dots.svg";
import {
  BoxStyle,
  TableStyle,
  SpanStyle,
  ColHeadingStyle,
  TableHeadingStyle,
} from "./table.styles.js";
import "./table.css";

const BasicTable = () => {
  const [MydataPro, setMyDataPro] = useState(Data);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Data, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    page,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  return (
    <>
      {MydataPro.map((curElem) => {
        return (
          <>
            <BoxStyle key={curElem.id}>
              <TableStyle
                {...getTableProps()}
                style={{ border: "none", outline: "hidden" }}
              >
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
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
                    );
                  })}
                </tbody>
              </TableStyle>
            </BoxStyle>
          </>
        );
      })}
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </>
  );
};

export default BasicTable;
