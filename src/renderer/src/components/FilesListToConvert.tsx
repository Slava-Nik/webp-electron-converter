import styled from 'styled-components';

const FilesListContainer = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  opacity: 0.9;
`;

const FilesListRow = styled.div`
  font-size: 16px;
  padding: 5px 0;
  span {
    font-size: 15px;
    font-style: italic;
    font-weight: bold;
  }
`;

interface File {
  name: string;
  path: string;
  size: number;
  type: string;
}

interface FilesListToConvertProps {
  files?: File[];
}

const FilesListToConvert = ({ files }: FilesListToConvertProps) => {
  return (
    <FilesListContainer>
      {files &&
        files.map((file, idx) => (
          <FilesListRow key={idx}>
            {`${idx + 1}. ${file.path};`}
            <span> {`${Math.floor(file.size / 1000)} KB`}</span>
          </FilesListRow>
        ))}
    </FilesListContainer>
  );
};

export default FilesListToConvert;
