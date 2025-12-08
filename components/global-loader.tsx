"use client";

import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { usePathname, useSearchParams } from 'next/navigation';

export default function GlobalLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // URL(경로 또는 쿼리)이 변경되면 로딩 시작
    setIsLoading(true);

    // 1초 후 로딩 종료
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]); // 경로, 파라미터 변경 감지

  if (!isLoading) return null;

  return (
    <Overlay>
      <LoaderContainer>
        <LogoBox>
          <PulseDot />
          <LogoText>EXAONE</LogoText>
        </LogoBox>
        
        <LoadingText>
          잠시만 기다려주세요
          <Ellipsis>
            <span>.</span><span>.</span><span>.</span>
          </Ellipsis>
        </LoadingText>

        <ProgressBarContainer>
          <ProgressBar />
        </ProgressBarContainer>
      </LoaderContainer>
    </Overlay>
  );
}

// --- Animations ---

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(225, 29, 72, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(225, 29, 72, 0); }
`;

const slide = keyframes`
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;

// --- Styled Components ---

const Overlay = styled.div`
  position: fixed;
  inset: 0; /* top, left, right, bottom: 0 */
  z-index: 9999;
  
  /* Glassmorphism Effect */
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-out;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const PulseDot = styled.div`
  width: 14px;
  height: 14px;
  background-color: #e11d48; /* Brand Color */
  border-radius: 50%;
  animation: ${pulse} 1.5s infinite;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const LoadingText = styled.div`
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Ellipsis = styled.div`
  display: flex;
  span {
    animation: ${bounce} 1s infinite;
    &:nth-child(2) { animation-delay: 0.1s; }
    &:nth-child(3) { animation-delay: 0.2s; }
  }
`;

const ProgressBarContainer = styled.div`
  width: 180px;
  height: 4px;
  background-color: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #e11d48, #fda4af);
  border-radius: 999px;
  animation: ${slide} 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`;