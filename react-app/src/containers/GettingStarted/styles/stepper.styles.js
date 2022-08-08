import styled from 'styled-components';
import { Steps } from 'antd';

export const StyledStepper = styled(Steps)`
  width: auto;
  height: calc(100vh - 300px);
  margin-top: 25px;
  > div {
    .ant-steps-item-container {
      display: flex !important;
      flex-direction: row-reverse !important;

      .ant-steps-item-tail {
        left: 180px !important;
        @media (max-width: 1366px) {
          left: 180px !important;
        }
        @media (max-width: 1150px) {
          left: 170px !important;
        }
        @media (max-width: 1100px) {
          left: 155px !important;
        }
      }

      .ant-steps-item-title {
        color: #fff !important;
        font-size: 22px;
      }
    }
  }
  > .ant-steps-item-finish {
    .ant-steps-item-container {
      .ant-steps-item-tail {
        &:after {
          background-color: orange !important;
        }
      }
      .ant-steps-item-icon {
        background: orange !important;
        border: none;
        span {
          color: white;
        }
      }
    }
  }

  > .ant-steps-item-active {
    .ant-steps-item-container {
      .ant-steps-item-icon {
        background: orange !important;
        border: none;
      }
    }
  }
`;
