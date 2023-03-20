import { celebrityAtom, faceInfoAtom, imgBaseAtom } from '@/Atoms/state';
import { Header } from '@/components';
import styled from '@emotion/styled';
import next from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

const Analyzed = () => {
  const [imgBase, setImgBase] = useRecoilState(imgBaseAtom);
  const [faceInfo, setFaceInfo] = useRecoilState(faceInfoAtom);
  const [celebrity, setCelebrity] = useRecoilState(celebrityAtom);
  const Usepercentage = (n: number) => (n * 100).toFixed(1);
  const router = useRouter();

  return (
    <>
      <Header />
      <Wrapper>
        <LeftCOntentWrapper>
          <ImgWrapper>
            <Image
              src={imgBase}
              layout="fill"
              objectFit="cover"
              alt="이미지 사진"
            />
          </ImgWrapper>
          <ReChooseBtn
            onClick={() => {
              router.push('/');
              setImgBase('');
            }}
          >
            처음으로
          </ReChooseBtn>
        </LeftCOntentWrapper>

        <ContentWrapper>
          <Content>
            {`성별 : ${
              faceInfo.gender.value === 'male' ? '남자' : '여자'
            } (${Usepercentage(faceInfo.gender.confidence)})%`}
          </Content>
          <Content>
            {`나이 : ${faceInfo.age.value} (${Usepercentage(
              faceInfo.age.confidence
            )})%`}
          </Content>
          <Content>
            {`표정 : ${
              faceInfo.emotion.value === 'angry'
                ? '화난 표정'
                : faceInfo.emotion.value === 'disgust'
                ? '싫은 표정'
                : faceInfo.emotion.value === 'fear'
                ? '두려운 표정'
                : faceInfo.emotion.value === 'laugh'
                ? '웃는 표정'
                : faceInfo.emotion.value === 'neutral'
                ? '무표정'
                : faceInfo.emotion.value === 'sad'
                ? '슬픈 표정'
                : faceInfo.emotion.value === 'surprise'
                ? '놀란 표정'
                : faceInfo.emotion.value === 'smile'
                ? '웃는 표정'
                : faceInfo.emotion.value === 'talking'
                ? '대화중인 표정'
                : '___'
            } (${Usepercentage(faceInfo.emotion.confidence)})%`}
          </Content>
          <Content>
            {`닮은 연예인 : ${celebrity.celebrity.value} (${Usepercentage(
              celebrity.celebrity.confidence
            )})%`}
          </Content>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

const LeftCOntentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  width: 25%;
`;

const ReChooseBtn = styled.button`
  width: 40%;
  height: 50px;
  cursor: pointer;
  font-size: 1.3rem;
  border: none;
  border-radius: 10px;
  box-shadow: rgba(205, 205, 205, 0.2) 0px 8px 24px;
  transition: all ease-in-out 0.3s;
  background-color: #00adb5;
  color: white;

  :hover {
    background-color: #008a90;
    transition-duration: 0.15s;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 140px);
  background-color: #222831;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
`;

const ImgWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 8px 24px;
  overflow: hidden;
  width: 100%;
  padding-bottom: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: -35px;
`;

const Content = styled.div`
  color: white;
  font-size: 1.7rem;
`;

export default Analyzed;
