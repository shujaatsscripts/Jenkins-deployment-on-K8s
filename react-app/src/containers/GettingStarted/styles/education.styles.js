import styled from 'styled-components';
import { PaperClipOutlined } from '@ant-design/icons';
import { Col } from 'antd';

export const StyledPaperClipIcon = styled(PaperClipOutlined)`
  font-size: 24px;
  color: ${(p) => p.theme.colors.primary};
`;

export const AttachmentText = styled.span`
  color: ${(p) => p.theme.colors.primary};
  margin-left: 5px;
`;

export const StyledTextCol = styled(Col)`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  cursor: pointer;
`;
