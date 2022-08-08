import { Menu, Table, Typography } from "antd";
import styled from "styled-components";

const { Paragraph } = Typography;

export const StyledTable = styled(Table)`
  margin-top: 10px;
  margin-left: ${(p) => p.marginLeft || "70px"};
  margin-right: ${(p) => p.marginRight || "70px"};
  .ant-table-container {
    .ant-table-content {
      table {
        border-spacing: ${(props) => props.spacing && "0 10px !important"};
        thead.ant-table-thead {
          tr {
            th.ant-table-cell {
              padding: 0 0 5px 0;
              // color: white;
              background-color: white !important;
              text-align: ${(p) => p.align || "center"};
              font-family: "Montserrat-Regular";
              font-weight: 600;
              @media (max-width: 480px) {
                text-align: left;
              }
            }
          }
        }
        tbody.ant-table-tbody {
          tr.ant-table-row {
            td.ant-table-cell {
              margin: 0 !important;
              padding: 0 !important;
              padding-left: 10px !important;
              height: ${(p) => p.cellHeight || "50px"} !important;
              font-weight: 600;
              text-align: ${(p) => p.align || "center"};
              @media (max-width: 480px) {
                text-align: left;
              }
            }
          }
          tr.dark {
            background-color: #dae9fd;
          }
          tr.light {
            background-color: #edf4fe;
          }
        }
      }
    }
  }
`;

export const CellText = styled.span`
  color: #000;
  opacity: 0.9;
  font-family: "Montserrat-Regular";
`;

export const ResponsiveViewHeading = styled.span`
  color: #000;
  opacity: 0.9;
  font-family: "Montserrat-Regular";
  font-weight: 600;
`;

export const StyledJD = styled.pre`
  opacity: 0.9;
  text-align: left;
  color: #000;
  font-size: 14px;
  font-family: "Montserrat-Regular";
`;

export const OptionsText = styled(Menu.Item)`
  display: flex;
  flex-direction: column;
  font-family: "Montserrat-Regular";
  font-size: 13px;
  font-weight: 500;
  margin: 2.5px 0;
`;

export const DropDownIcon = styled.img`
  width: 25px;
  margin-right: 10px;
`;

export const StyledParagraph = styled(Paragraph)`
  margin: 0 !important;
  padding: 0;
  font-family: "Montserrat-Regular";
  opacity: 0.9;
  font-size: 14px;
`;
