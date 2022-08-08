import styled from 'styled-components';
import { Col, DatePicker, TimePicker } from 'antd';

export const BoldText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 18px;
  font-weight: 600;
`;

export const NormalText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 400;
`;

export const StyledCol = styled(Col)`
  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  border: none;
  border-bottom: 1px solid ${(p) => p.theme.colors.primary};
  > .ant-picker-input {
    input {
      color: ${(p) => p.theme.colors.primary};
    }
  }
`;

export const StyledTimePicker = styled(TimePicker)`
  margin-bottom: 3rem;
  border: none;
  border-bottom: 1px solid ${(p) => p.theme.colors.primary};
  > .ant-picker-input {
    input {
      color: ${(p) => p.theme.colors.primary};
    }
  }
`;
