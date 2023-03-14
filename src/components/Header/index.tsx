import { NextPage } from "next";
import styled from "@emotion/styled";
import Router, { useRouter } from "next/router";

const Header:NextPage = () => {
    const router = useRouter();

    const TitleClick = () => {
        router.push('/');
    }

    return (
        <>
            <Wrapper>
                <HeaderTitle>
                    Face Analyzer
                </HeaderTitle>
            </Wrapper>
        </>
    );
};


const Wrapper = styled.div`
    width: 100%;
    height: 140px;
    background-color: #222831;

    display: flex;
    justify-content: center;
    align-items: center;
`

const HeaderTitle = styled.p`
    font-size: 45px;
    color: white;
    font-weight: bold;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 27px;
    }
`

export default Header;