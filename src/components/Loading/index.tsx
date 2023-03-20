import styled from '@emotion/styled';
import next from 'next';
import { Transform } from 'stream';
import { keyframes } from '@emotion/react';

const Loading = () => {
  return (
    <>
      <Wrap>
        <Animation />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 99;
  background-color: black;
  opacity: 0.4;
`;

const Rotate = keyframes`
     from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Animation = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 50%;
  border-radius: 50%;
  border: 5px solid gray;
  border-right: 5px solid orange;
  animation: ${Rotate} 0.5s infinite linear;
  z-index: 100;
`;

export default Loading;
