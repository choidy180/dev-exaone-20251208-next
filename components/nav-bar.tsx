"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  // const router = useRouter(); // router.push 대신 window.location 사용
  const [userInfo, setUserInfo] = useState<{ email: string; nickname: string } | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const email = getCookie('user_email');
    if (email) {
      const nickname = email.split('@')[0];
      setUserInfo({ email, nickname });
    }
  }, []);

  const handleLogout = () => {
    // 1. 쿠키 삭제
    document.cookie = 'user_email=; Max-Age=0; path=/;';
    setUserInfo(null);
    
    // [수정됨] 페이지를 완전히 새로고침하여 메인으로 이동
    // 이렇게 해야 메인 페이지(page.tsx)가 다시 로드되면서 쿠키 없음을 감지하고 랜딩 페이지를 띄웁니다.
    window.location.href = '/'; 
  };

  return (
    <Header>
      <Nav>
        {userInfo ? (
          /* --- 로그인 상태 --- */
          <UserGroup>
            <ProfileArea>
              <Avatar src="/iu_profile.png" alt="User Profile" />
              <UserName>
                <strong>{userInfo.nickname}</strong>님
              </UserName>
            </ProfileArea>
            <Divider />
            <LogoutBtn onClick={handleLogout}>
              로그아웃
            </LogoutBtn>
          </UserGroup>
        ) : (
          /* --- 로그아웃 상태 (랜딩 페이지에서 보여질 버튼들) --- */
          <>
            {/* window.location.href를 쓰면 깜빡임이 발생하므로 이동은 router나 Link 권장 
                하지만 여기선 편의상 href로 통일해도 무방합니다. */}
            <TextBtn onClick={() => window.location.href = '/login'}>로그인</TextBtn>
            <Divider />
            <BlackBtn onClick={() => window.location.href = '/sign'}>회원가입</BlackBtn>
          </>
        )}
      </Nav>
    </Header>
  );
}

// --- Navbar Styled Components ---

const Header = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 32px;
  width: 100%;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

// --- 로그인 전용 스타일 ---

const UserGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ProfileArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fecdd3; /* rose-200 (테두리 포인트) */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: #f1f5f9; /* 이미지가 없을 때를 대비한 배경색 */
`;

const UserName = styled.span`
  font-size: 0.95rem;
  color: #1e293b;
  
  strong {
    font-weight: 700;
    color: #e11d48; /* 포인트 컬러 */
  }
`;

const LogoutBtn = styled.button`
  background: none;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: #94a3b8;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #475569;
    text-decoration: underline;
  }
`;

// --- 공통 스타일 ---

const Divider = styled.span`
  width: 1px;
  height: 12px;
  background-color: #cbd5e1;
`;

const TextBtn = styled.button`
  background: none;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  
  &:hover {
    color: #e11d48;
  }
`;

const BlackBtn = styled.button`
  padding: 8px 16px;
  background-color: #0f172a; /* slate-900 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1e293b;
  }
`;