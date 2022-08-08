import styled from 'styled-components';
import { Tag } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export const StyledTag = styled(Tag)`
  padding: 2px 10px;
  margin: 0.5rem;
  display: flex;
  align-items: center;
`;
export const WithLabelInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px 15px;
  font-size: 14px;
  background: transparent;
  font-family: 'Montserrat-Regular';
  border: 0;
  box-shadow: 0 0 0 1.5px #eee;
  border-radius: 5px;
  background-color: ${(props) => props.disabled && '#f4f4f4'};
  cursor: ${(props) => props.disabled && 'not-allowed'};
  &::placeholder {
    opacity: 0.4;
  }
  @media (max-width: 768px) {
    height: 55px;
  }
  @media (max-width: 575px) {
    height: 50px;
  }
  &:focus {
    outline: none;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  margin-bottom: 10px;
`;

export const StyledPhoneInput = styled(PhoneInput)``;
export const phoneInputStyles = {
  width: '100%',
  height: '40px',
  fontSize: '14px',
  border: 0,
  boxShadow: '0 0 0 1.5px #eee',
  borderRadius: '5px',
  fontFamily: 'Montserrat-Regular',
};
export const WithLabelWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;
