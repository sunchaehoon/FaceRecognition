import { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { PreviewAtom } from '@/Atoms/state';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const Main: NextPage = () => {
  const [preview, setPreview] = useRecoilState(PreviewAtom);
  const fileInputRef = useRef<any>(null);
  const [image, setImage] = useState<File | null>();

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === 'image') {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const onClickFile = (e: any) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview('');
    }
  }, [image]);

  return (
    <>
      <Wrapper>
        <ImgPreviewWrapper>
          {preview ? (
            // <ImgWrapper>{/* <Image  /> */}</ImgWrapper>
            <ImgWrapper>
              <img
                src={preview}
                alt="이미지 사진"
                style={{ objectFit: "cover" }}
              />
            </ImgWrapper>
          ) : (
            <EmptyWrapper>
              <PlusClick onClick={onClickFile} />
              <Input
                type="file"
                onChange={onChangeFile}
                ref={fileInputRef}
                accept="image/*"
              />
            </EmptyWrapper>
          )}
        </ImgPreviewWrapper>
        <AnaBtn>분석하기</AnaBtn>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 140px);
  background-color: #222831;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ImgPreviewWrapper = styled.div`
  height: 70%;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const EmptyWrapper = styled.div`
  width: 40%;
  height: 85%;
  background-color: #393e46;
  box-shadow: rgba(222, 222, 222, 0.3) 0px 7px 29px 0;
  border: 1px solid white;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  /* @media (max-width: 768px) {
        width: 95%;
        height: 50%;
    } */
`;

const PlusClick = styled.div`
  background-image: url('/img/plus.png');
  background-size: 100%;
  height: 8rem;
  width: 8rem;
  background-repeat: no-repeat;
  cursor: pointer;
  :hover {
    height: 9.5rem;
    width: 9.5rem;
    transition-duration: 0.2s;
  }
`;

const AnaBtn = styled.button`
  width: 15%;
  height: 65px;
  cursor: pointer;
  font-size: 2rem;
  border: none;
  border-radius: 10px;
  box-shadow: rgba(205, 205, 205, 0.2) 0px 8px 24px;
  transition: all ease-in-out 0.3s;
  background-color: #00adb5;
  color: white;

  :hover {
    background-color: #009ba2;
    transition-duration: 0.1s;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  display: none;
`;

const ImgWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 8px 24px;
`;

export default Main;
