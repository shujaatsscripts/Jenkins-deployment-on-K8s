import React from 'react';
import { Box, Cross } from './styles/singleFile.styles';
import pdfIcon from '../../../images/pdf-icon.png';
import docIcon from '../../../images/docIcon.png';

const SingleFile = ({ name, remove }) => {
  const iconToShow = (name) => {
    if (name.includes('pdf')) return pdfIcon;
    if (name.includes('doc')) return docIcon;
  };
  return (
    <Box>
      <img src={iconToShow(name)} alt="cv" width="70" />
      {name.slice(0, 8)}...
      <Cross onClick={() => remove(name)} />
    </Box>
  );
};

export default SingleFile;
