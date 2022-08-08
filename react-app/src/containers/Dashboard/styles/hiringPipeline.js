import { Table } from 'antd';
import styled from 'styled-components';

export const JobsTable = styled(Table)`
  margin-top: 10px;
  margin-left: 70px;
  margin-right: 70px;
  .ant-table-container {
    .ant-table-content {
      table {
        border-spacing: ${(props) => props.spacing && '0 10px !important'};
        thead.ant-table-thead {
          tr {
            th.ant-table-cell {
              text-align: center;
              font-family: 'Montserrat-Regular';
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
              height: 80px !important;

              text-align: center;
              @media (max-width: 480px) {
                text-align: left;
              }
            }
          }
        }
      }
    }
  }
`;
