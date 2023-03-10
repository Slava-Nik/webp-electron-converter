import { useState } from 'react';
import styled from 'styled-components';
import Dropzone from '../src/components/Dropzone';
import FilesListToConvert from './components/FilesListToConvert';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
  line-height: 1.5;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  background-color: #fafafa;
  opacity: 0.95;
`;

const ConverterTitle = styled.h1`
  text-align: center;
  margin: 0;
  padding-top: 50px;
  padding-bottom: 20px;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

function App(): JSX.Element {
  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      console.log(acceptedFiles);
      setFiles(acceptedFiles);

      // // Execute shell command to convert image to WebP
      // exec(`cwebp "${file.path}" -o "${file.path}.webp"`, (err) => {
      //   if (err) throw err;
      //
      //   // Set the converted image as the source of an <img> element
      // setImageSrc(`${file.path}.webp`);
      // });
    }
  };
  return (
    <AppContainer>
      <ConverterTitle>WebP Converter</ConverterTitle>

      <ContentWrapper>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
        <FilesListToConvert files={files}></FilesListToConvert>
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
