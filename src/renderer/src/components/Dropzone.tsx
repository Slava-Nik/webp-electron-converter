import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const getColor = (props) => {
  const isDark = props.theme.isDark;
  if (props.isDragAccept) {
    return isDark ? '#237804' : '#009260';
  }
  if (props.isDragReject) {
    return isDark ? '#ad6800' : '#ff9614';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return isDark ? '#8e8888' : '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-width: 2px;
  border-radius: 2px;
  font-size: 20px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: ${(props) => (props.theme.isDark ? '#484141' : '#ffffff')};
  color: ${(props) => (props.theme.isDark ? '#d9d3d3' : '#828282')};
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
`;

interface DropzoneProps {
  onDrop: (acceptedFiles: any) => void;
  setLoading: (loadingState: boolean) => void;
  children?: ({
    getRootProps,
    getInputProps
  }: {
    getRootProps: any;
    getInputProps: any;
  }) => React.ReactNode;
}

const Dropzone = ({ onDrop, setLoading }: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] },
    onDrop
  });

  const getDropzoneTipContent = () => {
    if (isDragAccept) {
      return 'All images will be accepted';
    }

    if (isDragReject) {
      return 'Some files will be rejected. Allowed format: .png, .jpeg';
    }
    return 'Drag & Drop your images here, or click to select files';
  };

  return (
    <div
      className="container"
      onDrop={() => {
        setLoading(true);
      }}
    >
      <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p style={{ color: 'red!important' }}>{getDropzoneTipContent()}</p>
      </Container>
    </div>
  );
};

export default Dropzone;
