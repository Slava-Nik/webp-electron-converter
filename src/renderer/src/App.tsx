import { useState } from 'react';
import styled from 'styled-components';
import uniqBy from 'lodash.uniqby';
import { Spin } from 'antd';
import Dropzone from '../src/components/Dropzone';
import FilesList from './components/FilesList';
import Controls from './components/Controls';
import { ConversionResult, File } from './types/general';

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
  background-color: ${(props) =>
    props.theme.isDark ? 'rgba(18,18,18,0.96)' : 'rgba(250, 250, 250, 0.95)'};
`;

const ConverterTitle = styled.h1`
  text-align: center;
  margin: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  color: ${(props) => (props.theme.isDark ? '#ede1e1' : '#333')};
  background-color: ${(props) => (props.theme.isDark ? 'rgba(0,0,0,0.85)' : 'transparent')};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Loader = styled(Spin)`
  justify-self: center;
  margin-top: 80px;
`;

function App(): JSX.Element {
  const [quality, setQuality] = useState<number>(80);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [conversionResults, setConversionResults] = useState<ConversionResult[]>([]);

  const handleDrop = async (acceptedFiles) => {
    const shouldOmitNodeModules = true;
    if (acceptedFiles.length > 0) {
      setFiles((prevFiles) => {
        let updatedFiles = [...prevFiles, ...acceptedFiles];
        if (shouldOmitNodeModules) {
          updatedFiles = updatedFiles.filter((file) => {
            return !file.path.includes('/node_modules/');
          });
        }
        return uniqBy(updatedFiles, 'path');
      });
    }
    setLoading(false);
  };

  const handleConvert = async () => {
    const imagesList = files.map((file) => file.path);
    setLoading(true);
    const results = await window.api.filesApi.convertImagesListToWebp(imagesList, quality);
    setLoading(false);
    setConversionResults(results);
  };

  const handleClearAll = () => {
    setFiles([]);
    setConversionResults([]);
  };

  const handleRemoveByPath = (path: string) => {
    setFiles((prevFiles) => {
      return prevFiles.filter((file) => file.path !== path);
    });
  };

  const handleQualityUpdate = (qualityLevel: number) => {
    setQuality(qualityLevel);
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
        <Controls
          filesExist={!!files.length}
          clearAll={handleClearAll}
          quality={quality}
          setQuality={handleQualityUpdate}
          handleConvert={handleConvert}
        />
        {isLoading ? (
          <Loader tip="Loading..." size="large" />
        ) : (
          <FilesList
            files={files}
            conversionResults={conversionResults}
            removeByPath={handleRemoveByPath}
          />
        )}
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
