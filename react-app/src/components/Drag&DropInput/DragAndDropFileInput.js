import React, { useEffect, useRef } from "react";
// import {useState} from "react"
import styled from "styled-components";
import uploadIcon from "../../images/uploadIcon.png";
import pdfIcon from "../../images/pdf-icon.png";
import docIcon from "../../images/docIcon.png";
import { getFileExtension } from "../../utils";

let dragCounter = 0;

const DragAndDropFileInput = (props) => {
  const dropRef = useRef();
  const fileDialogue = useRef();

  const { file } = props;

  // const [dragCounter, setDragCounter] = useState(0);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setDragCounter((prev) => prev + 1);
    dragCounter++;
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // dragCounter !== 0 && setDragCounter((prev) => prev - 1);
    dragCounter--;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files.length > 0) {
      props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      // setDragCounter(0);
      dragCounter = 0;
    }
  };

  useEffect(() => {
    let div = dropRef.current;
    // add event listeners as component is rendered
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);

    // remove event listeners when unmounted
    return () => {
      div.removeEventListener("dragenter", handleDragIn);
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  }, []);

  const iconToShow = (attachment) => {
    const extension = getFileExtension(attachment).toLowerCase();
    if (extension === "pdf") return pdfIcon;
    if (extension === "doc") return docIcon;
    if (extension === "docx") return docIcon;
  };

  return (
    <Box ref={dropRef} {...props}>
      {file && (
        <div
          style={{
            position: "absolute",
            left: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={iconToShow(file)}
            alt="cv"
            width="100"
            style={{ marginBottom: "10px" }}
          />
          <sub>{file.name}</sub>
        </div>
      )}
      <img
        src={uploadIcon}
        width="50"
        style={{ opacity: "0.4", marginBottom: "1rem" }}
      />
      <DragText>
        Drag and Drop here
        <br />
        or
      </DragText>

      <input
        type="file"
        multiple
        style={{ display: "none" }}
        ref={fileDialogue}
        onChange={(e) => props.handleDrop(e.target.files)}
      />

      <Caption browse onClick={() => fileDialogue.current.click()}>
        Browse Files
      </Caption>

      {props.children}
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: transparent;
  border: 2px dashed #eee;
  width: ${(props) => (props.width ? props.width : "100%")};
  min-height: ${(props) => (props.height ? props.height : "150px")};
  text-align: center;
  border-radius: 10px;
  margin-bottom: 5px;
  position: relative;
`;
const DragText = styled.div`
  font-size: 16px;
  font-family: "Montserrat-Regular";
  font-weight: 600;
  opacity: 0.4;
`;
const Caption = styled.div`
  font-size: 14px;
  font-family: "Montserrat-Regular";
  font-weight: 600;
  color: ${(props) => (props.browse ? "#1872FF" : "#92929d")};
  cursor: ${(props) => props.browse && "pointer"};
`;

export default DragAndDropFileInput;
