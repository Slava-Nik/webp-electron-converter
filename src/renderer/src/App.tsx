import { useState } from 'react';
import styled from 'styled-components';
import uniqBy from 'lodash.uniqby';
import { Spin } from 'antd';
import Dropzone from '../src/components/Dropzone';
import FilesListToConvert from './components/FilesListToConvert';
import Controls from './components/Controls';
import { File } from './types/general';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
  line-height: 1.5;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #fafafa;
  opacity: 0.95;
`;

const ConverterTitle = styled.h1`
  text-align: center;
  margin: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Loader = styled(Spin)`
  justify-self: center;
  margin-top: 20px;
`;

function App(): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      console.log(acceptedFiles);
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...acceptedFiles];
        return uniqBy(updatedFiles, 'path');
      });

      // // Execute shell command to convert image to WebP
      // exec(`cwebp "${file.path}" -o "${file.path}.webp"`, (err) => {
      //   if (err) throw err;
      //
      //   // Set the converted image as the source of an <img> element
      // setImageSrc(`${file.path}.webp`);
      // });
    }
    setLoading(false);
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  const handleRemoveByPath = (path: string) => {
    setFiles((prevFiles) => {
      return prevFiles.filter((file) => file.path !== path);
    });
  };

  return (
    <AppContainer>
      <ConverterTitle>WebP Converter</ConverterTitle>
      <ContentWrapper>
        <Dropzone onDrop={handleDrop} setLoading={setLoading}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              onDragOver={() => setLoading(true)}
              onDragLeave={() => setLoading(false)}
            >
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
        <Controls clearAll={handleClearAll} />
        {isLoading ? (
          <Loader tip="Loading..." size="large" />
        ) : (
          <FilesListToConvert files={files} removeByPath={handleRemoveByPath} />
        )}
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
