import styled from 'styled-components';
import { Button } from 'antd';

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  padding-top: 30px;
  padding-bottom: 20px;
`;

interface ControlsProps {
  clearAll: () => void;
}

const Controls = ({ clearAll }: ControlsProps) => {
  return (
    <ControlsContainer>
      <Button>Convert to WebP</Button>
      <Button type="dashed" danger onClick={clearAll}>
        Clear all
      </Button>
    </ControlsContainer>
  );
};

export default Controls;
