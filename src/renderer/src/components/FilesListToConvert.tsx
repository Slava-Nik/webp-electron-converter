import styled from 'styled-components';
import { Button } from 'antd';
import { File } from '../types/general';

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
const FileRowSize = styled.span`
  font-size: 15px;
  font-style: italic;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  margin-left: auto;
  color: blue;
`;

interface FilesListToConvertProps {
  files?: File[];
  removeByPath: (path: string) => void;
}

const FilesListToConvert = ({ files, removeByPath }: FilesListToConvertProps) => {
  const handleOpenFile = (path: string) => {
    window.filesApi.openFileByPath(path);
  };
  return (
    <FilesListContainer>
      {files && (
        <FileList>
          {files.map((file, idx) => (
            <FilesListRow key={file.path}>
              <FileRowCount className="file-count">{`${idx + 1})`}</FileRowCount>
              <FileRowPath
                onClick={() => {
                  handleOpenFile(file.path);
                }}
              >{`${file.path};`}</FileRowPath>
              <FileRowSize> {`${(file.size / 1000).toFixed(2)} KB`}</FileRowSize>
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
      )}
    </FilesListContainer>
  );
};

export default FilesListToConvert;
