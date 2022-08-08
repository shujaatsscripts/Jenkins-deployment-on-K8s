import styled from "styled-components";
import { Table } from "antd";

export const BoxStyle = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
  border-radius: 15px;
  display: flex;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  font-family: "Montserrat-Regular";
  margin-bottom: 10px;
`;

export const profileImge = styled.img`
  width: 100px;
  height: 100px;
  @media (min-width: 500px) {
    height: 50px;
    width: 50px;
  }
  @media (min-width: 600px) {
    height: 75px;
    width: 75px;
  }
  @media (min-width: 768px) {
    height: 85px;
    width: 85px;
  }
  @media (min-width: 768px) {
    height: 92px;
    width: 92px;
  }
`;
export const HeadingStyle = styled.span`
  color: grey;
  font-family: "Montserrat-Regular";
  /* width: 40%; */
  font-size: 12px;
  align-text: left;
  @media (min-width: 500px) {
    font-size: 7px;
  }
  @media (min-width: 600px) {
    font-size: 8px;
  }
  @media (min-width: 768px) {
    font-size: 10px;
  }
`;
export const SpanStyle = styled.h5`
  font-family: "Montserrat-Regular";
  /* width: 40%; */
  font-size: 16px;
  font-weight: bold;
  @media (min-width: 500px) {
    font-size: 8px;
  }
  @media (min-width: 600px) {
    font-size: 10px;
  }
  @media (min-width: 768px) {
    font-size: 12px;
  }
`;
export const TableStyle = styled(Table)`
  //   font-family: "Montserrat-Regular";
  /* //   padding: 5px; */
  //   background-color: none;
  //   border-radius: 15px;

  /* margin-top: -23px; */
  .ant-pagination-item-link {
    border-radius: 20px;
    background-color: #1a77f2;
    color: white;
  }

  .ant-pagination-item {
    border-radius: 20px;
    border-color: #1a77f2;
    background-color: white;
    color: #1a77f2;
  }

  .ant-pagination-item-active {
    border-radius: 20px;
    background-color: #1a77f2;
    color: white;
  }
  /* margin-left: ${(p) => p.marginLeft || "70px"};
  margin-right: ${(p) => p.marginRight || "70px"}; */
  .ant-table-container {
    .ant-table-content {
      table {
        border-spacing: ${(props) => props.spacing && "0 10px"};
        /* border: 1px solid black; */
        background-color: #fcfcfc;
        thead.ant-table-thead {
          tr {
            th.ant-table-cell {
              background-color: #fcfcfc;
              /* box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 3px;
              rgba(0, 0, 0, 0.1) 0px -1px 0px; */
              margin: 0 !important;
              padding: 0 !important;
              padding-top: 0px !important;
              padding-bottom: 0px !important;
              /* padding-left: 15px !important; */
              text-align: left;

              text-align: ${(p) => p.align || "center"};
              font-family: "Montserrat-Regular";
              color: grey;
              border: none;
              @media (max-width: 480px) {
                text-align: left;
              }
            }
            /* th:first-child {
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
            }
            th:last-child {
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
            } */
          }
        }

        tbody.ant-table-tbody {
          tr.ant-table-row {
            /* border: 1px solid black; */
            /* margin-bottom: 20px; */
            td.ant-table-cell {
              /* border: 1px solid black; */
              background-color: white;
              /* box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 0px,
                rgba(0, 0, 0, 0.1) 0px -1px 0px; */
              margin: 0 !important;
              padding: 0 !important;
              padding-top: 5px !important;
              // padding-bottom: 10px !important;
              padding-left: 16px !important;
              font-size: 12px;
              /* padding-right: 20px !important; */
              font-family: "Montserrat-Regular";
              height: ${(p) => p.cellHeight || "50px"} !important;
              text-align: ${(p) => p.align || "center"};
              @media (max-width: 480px) {
                text-align: left;
              }
            }

            td:first-child {
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
              /* box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 0px,
                rgba(0, 0, 0, 0.1) 0px -1px 0px, rgba(0, 0, 0, 0.1) -1px 0px 0px; */
            }
            td:last-child {
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
              color: grey;
              /* box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 0px,
                rgba(0, 0, 0, 0.1) 0px -1px 0px, rgba(0, 0, 0, 0.1) 1px 0px 0px; */
            }
          }

          tr.dark {
            background-color: white;
          }
          tr.light {
            background-color: white;
          }
        }
      }
    }
  }
`;
