import styled from 'styled-components';
import { Button, Badge, Popover } from 'antd';
import { ConversionResult, File } from '../types/general';
import { useMemo } from 'react';

const FilesListContainer = styled.div`
  opacity: 0.9;
`;

const FileList = styled.ul`
  margin: 0;
  padding-left: 10px;
  list-style: none;
`;

const FilesListRow = styled.li`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 7px 15px 7px 0;
  background-color: rgb(233, 238, 242);
  user-select: none;

  &:nth-of-type(2n) {
    background-color: transparent;
  }
`;

const FileRowCount = styled.span`
  padding-right: 10px;
`;
const FileRowPath = styled.span`
  display: block;
  width: 700px;
  overflow: hidden;
  padding-right: 10px;
  &:hover {
    cursor: pointer;
    color: #ad6b62;
  }
  &:active {
    opacity: 0.9;
  }
`;

const SizesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const FileRowSize = styled.span`
  padding: 3px 0;
  font-size: 15px;
  font-style: italic;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  margin-left: auto;
  color: blue;
`;

interface FilesListProps {
  files?: File[];
  conversionResults?: ConversionResult[];
  removeByPath: (path: string) => void;
}

const FilesList = ({ files, removeByPath, conversionResults }: FilesListProps) => {
  const handleOpenFile = (path: string) => {
    window.filesApi.openFileByPath(path);
  };

  const filesToDisplay = useMemo(() => {
    if (files && conversionResults) {
      const combinedArray = files.map((file) => {
        const conversionResult = conversionResults.find((result) => result.inputPath === file.path);
        return {
          size: file.size,
          path: file.path,
          newSize: conversionResult?.newSize || null,
          error: conversionResult?.error || null
        };
      });
      return combinedArray;
    }
    return [];
  }, [files, conversionResults]);

  console.log(filesToDisplay);

  const renderSizesBlock = (file) => {
    return (
      <SizesContainer>
        <FileRowSize> {`Size: ${(file.size / 1000).toFixed(2)} KB`}</FileRowSize>
        {file.newSize && (
          <FileRowSize> {`New size: ${(file.newSize / 1000).toFixed(2)} KB`}</FileRowSize>
        )}
        {file.error && (
          <Popover content={file.error} overlayStyle={{ width: '300px' }} title="Conversion error">
            <Badge style={{ cursor: 'pointer' }} status="error" text="Conversion error"></Badge>
          </Popover>
        )}
      </SizesContainer>
    );
  };

  return (
    <FilesListContainer>
      <FileList>
        {filesToDisplay.map((file, idx) => (
          <FilesListRow key={file.path}>
            <FileRowCount className="file-count">{`${idx + 1})`}</FileRowCount>
            <FileRowPath
              onClick={() => {
                handleOpenFile(file.path);
              }}
            >{`${file.path};`}</FileRowPath>

            {renderSizesBlock(file)}

            <StyledButton
              shape="circle"
              size="small"
              type="dashed"
              danger
              onClick={() => {
                removeByPath(file.path);
              }}
            >
              X
            </StyledButton>
          </FilesListRow>
        ))}
      </FileList>
    </FilesListContainer>
  );
};

export default FilesList;
