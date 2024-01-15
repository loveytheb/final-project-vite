import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "../../../shared/recoil/authAtom";
import { supabase } from "../../../api/supabase";
import alarmIcon from '../../../../public/images/alarm-icon-white.png'
import searchIcon from '../../../../public/images/search-icon-white.png'


const Nav = () => {
  const navigate = useNavigate();

  // 리코일
  const [login, setLogin] = useRecoilState(loginState);

  // 로그아웃
  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    alert("로그아웃 되었습니다");
    setLogin(null);
    navigate("/");
    if (error) console.log("error", error);
  };

  return (
    <>
      <StNav>
        <StLogoDiv>
          <StLogoSpan>AIdol</StLogoSpan>
        </StLogoDiv>

        <StBtnDiv>
          <StButton>
            <StImg
              src={searchIcon}
            ></StImg>
          </StButton>
          <StButton>
            <StImg
              src={alarmIcon}
            ></StImg>
          </StButton>
          {login ? (
            <>
              <button onClick={logOut}>
                <p>Logout</p>
              </button>
              <button
                onClick={() => {
                  navigate("/mypage");
                }}
              >
                <p>Mypage</p>
              </button>
            </>
          ) : (
            <StSignInBtn
              onClick={() => {
                navigate("/login");
              }}
            >
              <StBtnP>Sign In</StBtnP>
            </StSignInBtn>
          )}
        </StBtnDiv>
      </StNav>

      {/* <DropDownDiv>
        <DropDownImgDiv>
          <StImg src={process.env.PUBLIC_URL + '/images/search-icon-white.png'}></StImg>
        </DropDownImgDiv> 
        <DropDownInput 
        placeholder='아티스트 검색하기'
        />
      </DropDownDiv> */}
    </>
  );
};

// Dropdown
// const DropDownDiv = styled.div`
//   width: 100vw;
//   height: 300px;
//   background-color: #3a3a3a;
//   padding-top: 80px;

//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
// const DropDownImgDiv = styled.div`
//   width: 50px;
//   height: 50px;
// `;
// const DropDownInput = styled.input`
//   width: 40vw;
//   height: 50px;

//   background-color: transparent;
//   border: none;
//   border-bottom: 2px solid #292929;

//   color: #c5c5c5;
//   font-size: 18px;
//   font-weight: bold;

//   margin-left: 20px;
// `;

// TODO : 최소 사이즈 1000px 잡기
// Layout
const StNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;

  background-color: #000000;

  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// Logo
const StLogoDiv = styled.div`
  width: 75%;
`;
const StLogoSpan = styled.span`
  color: white;
  font-size: 25px;
  font-weight: bold;
  margin-left: 30px;
`;

// Button
const StBtnDiv = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StButton = styled.button`
  width: 30px;
  height: 30px;
  border: 0;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  margin-right: 40px;

  :hover {
    opacity: 0.5;
    transition: 0.5s;
  }
`;
const StSignInBtn = styled.button`
  background-color: white;
  border: none;
  width: 100px;
  height: 35px;
  border-radius: 5px;
`;
const StBtnP = styled.p`
  color: black;
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  background-color: transparent;
`;

const StImg = styled.img`
  width: inherit;
  height: inherit;
`;

export default Nav;
