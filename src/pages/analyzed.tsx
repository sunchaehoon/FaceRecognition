import { faceInfoAtom, imgBaseAtom } from '@/Atoms/state';
import { Header } from '@/components';
import styled from '@emotion/styled';
import next from 'next';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

const analyzed = () => {
  const [imgBase, setImgBase] = useRecoilState(imgBaseAtom);
  const [faceInfo, setFaceInfo] = useRecoilState(faceInfoAtom);
  const Usepercentage = (n: number) => (n * 100).toFixed(1);

  return (
    <>
      <Header />
      <Wrapper>
        <ImgWrapper>
          <img src={imgBase} alt="선택한 이미지" />
        </ImgWrapper>
        <ContentWrapper>
          <Content>
            {`성별 : ${faceInfo.gender.value === "male" ? "남자" : "여자"} (${Usepercentage(faceInfo.gender.confidence)})%`}
          </Content>
          <Content>
            {`나이 : ${faceInfo.age.value} (${Usepercentage(faceInfo.age.confidence)})%`}
          </Content>
          <Content>
            {`표정 : ${faceInfo.emotion.value} (${Usepercentage(faceInfo.emotion.confidence)})%`}
          </Content>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 140px);
  background-color: #222831;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const ImgWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 8px 24px;
  margin-top: -50px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Content = styled.div`
  color: white;
  font-size: 1.7rem;
`;

export default analyzed;
