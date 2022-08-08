import { Select } from 'antd';
import { StyledLabel, StyledSelect, Wrapper } from './styles/main.styles';
const { Option } = Select;

const CustomSelect = ({ type, label, options, ...rest }) => {
  const getInput = () => {
    switch (type) {
      case 'withLabel':
        return (
          <Wrapper>
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledSelect {...rest} showSearch>
              {options.map((el, index) => (
                <Option
                  key={index}
                  value={el}
                  style={{
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {el}
                </Option>
              ))}
            </StyledSelect>
          </Wrapper>
        );
      case 'withLabelBoolean':
        return (
          <Wrapper>
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledSelect {...rest}>
              {['Yes', 'No'].map((el, index) => (
                <Option
                  key={index}
                  value={el === 'Yes' ? true : false}
                  style={{
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {el}
                </Option>
              ))}
            </StyledSelect>
          </Wrapper>
        );
      case 'employmentType':
        return (
          <Wrapper>
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledSelect {...rest} showSearch>
              {options.map((el, index) => (
                <Option
                  key={index}
                  value={el.value}
                  style={{
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {el.text}
                </Option>
              ))}
            </StyledSelect>
          </Wrapper>
        );
      case 'time':
        return (
          <Wrapper>
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledSelect {...rest} showSearch time>
              {options.map((el, index) => (
                <Option
                  key={index}
                  value={el.value}
                  style={{
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {el.text}
                </Option>
              ))}
            </StyledSelect>
          </Wrapper>
        );

      default:
        return <select {...rest}></select>;
    }
  };
  return <>{getInput()}</>;
};

export default CustomSelect;
