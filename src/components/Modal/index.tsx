import React from 'react';
import {StCancelBtn, StDiv, StInfo, StLoginBtn, StModalDiv, StTitle} from './style';
import {useNavigate} from 'react-router-dom';

const Modal = ({setIsModalOpen}: {setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const navigate = useNavigate();

  return (
    <StModalDiv>
      <StDiv>
        <StTitle>알림</StTitle>
        <StInfo>로그인 이후 커뮤니티에 입장하실 수 있습니다.</StInfo>
        <StInfo>로그인을 하시겠습니까?</StInfo>
        <StCancelBtn onClick={() => setIsModalOpen(false)}>취소</StCancelBtn>
        <StLoginBtn onClick={() => navigate('/login')}>로그인</StLoginBtn>
      </StDiv>
    </StModalDiv>
  );
};

export default Modal;