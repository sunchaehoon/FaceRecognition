import { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { faceInfoAtom, imgBaseAtom, celebrityAtom } from '@/Atoms/state';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import Loading from '../Loading';

const Main: NextPage = () => {
  const [imgBase, setImgBase] = useRecoilState(imgBaseAtom);
  const [faceInfo, setFaceInfo] = useRecoilState(faceInfoAtom);
  const [celebrity, setCelebrity] = useRecoilState(celebrityAtom);
  const fileInputRef = useRef<any>(null);
  const [image, setImage] = useState<File | null>();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeFile = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase(base64.toString());
      }
    };

    if (file && file.type.substr(0, 5) === 'image') {
      setImage(file);
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const onClickFile = (e: any) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const onSubmitFile = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (image == null) {
      setLoading(false);
      return toast.error('사진을 선택하세요', {
        hideProgressBar: true,
        autoClose: 1500,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response1 = await axios.post('/openapi/v1/vision/face', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Naver-Client-Id': process.env.NEXT_PUBLIC_Client_Id,
          'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_Client_Secret,
        },
      });
      const response2 = await axios.post(
        '/openapi/v1/vision/celebrity',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Naver-Client-Id': process.env.NEXT_PUBLIC_Client_Id,
            'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_Client_Secret,
          },
        }
      );
      if (response1.data.faces[0] && response2.data.faces[0]) {
        setFaceInfo(response1.data.faces[0]);
        setCelebrity(response2.data.faces[0]);
        setLoading(false);
        router.push('/Analyzed');
      } else {
        setLoading(false);
        alert('사진이 올바르지 않습니다');
        setImgBase('');
      }
    } catch (error) {
      console.log(error);
      return toast(e.message, {
        hideProgressBar: true,
        autoClose: 1500,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <Wrapper>
        <ImgPreviewWrapper>
          {imgBase ? (
            <ImgWrapper>
              <Image
                src={imgBase}
                layout="fill"
                objectFit="cover"
                alt="이미지 사진"
              />
            </ImgWrapper>
          ) : (
            <EmptyWrapper>
              <PlusClick onClick={onClickFile} />
              <form name="files" method="post" encType="multipart/form-data">
                <Input
                  type="file"
                  onChange={onChangeFile}
                  ref={fileInputRef}
                  //accept="image/*"
                />
              </form>
            </EmptyWrapper>
          )}
        </ImgPreviewWrapper>
        <AnaBtn onClick={onSubmitFile}>분석하기</AnaBtn>
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
  gap: 40px;
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
  width: 43%;
  height: 90%;
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
    background-color: #008a90;
    transition-duration: 0.15s;
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
  overflow: hidden;
  width: 43%;
  padding-bottom: 45%;
`;

export default Main;
