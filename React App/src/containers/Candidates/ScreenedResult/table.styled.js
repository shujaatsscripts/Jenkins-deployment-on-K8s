import styled from "styled-components";

export const SkillsBox = styled.div`
  width: 200px;
  font-family: ProductSans-Regular;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: transform 950ms;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.7);
  text-transform: capitalize;

  &:hover {
    text-overflow: clip;
    white-space: normal;
    word-break: break-all;
    transform: translateY(-10px);
  }
`;
