import styled from 'styled-components';
import { Button, Slider } from 'antd';
import type { SliderMarks } from 'antd/es/slider';

const ControlsContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding: 0 10px 0 20px;

  & .quality-wrapper {
    width: 70%;

    h4 {
      margin-top: 0;
      margin-bottom: 5px;
      padding-left: 5px;
      font-size: 16px;
    }
  }

  & .convert-btn {
    position: relative;
    top: 6px;
  }
`;

const ControlsContainerBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 10px;
  padding-top: 60px;
  padding-bottom: 20px;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
`;

interface ControlsProps {
  filesExist: boolean;
  clearAll: () => void;
  quality: number;
  setQuality: (qualityLevel: number) => void;
}

const marks: SliderMarks = {
  0: '0',
  50: '50',
  60: '60',
  70: '70',
  80: '80',
  90: '90',
  100: '100'
};

const Controls = ({ filesExist, clearAll, quality, setQuality }: ControlsProps) => {
  return (
    <>
      <ControlsContainerTop>
        <div className="quality-wrapper">
          <h4>Quality level:</h4>
          <StyledSlider min={1} max={100} onChange={setQuality} value={quality} marks={marks} />
        </div>
        <Button className="convert-btn" disabled={!filesExist}>
          Convert to WebP
        </Button>
      </ControlsContainerTop>

      {filesExist && (
        <ControlsContainerBottom>
          <Button type="dashed" danger onClick={clearAll}>
            Clear all
          </Button>
        </ControlsContainerBottom>
      )}
    </>
  );
};

export default Controls;
