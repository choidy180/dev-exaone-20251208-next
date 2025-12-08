"use client";

import React, { useState, useEffect, Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import { usePathname, useSearchParams } from 'next/navigation';

function GlobalLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 현재 URL 경로 조합 (경로 + 쿼리)
  const currentKey = `${pathname}?${searchParams.toString()}`;

  // 1. 렌더링 단계에서 상태 추적 (useState 초기값)
  const [prevKey, setPrevKey] = useState(currentKey);
  const [isLoading, setIsLoading] = useState(false);

  // 2. [핵심] Effect가 아닌 '렌더링 도중'에 즉시 상태 변경
  // URL이 바뀌면 브라우저가 화면을 그리기(Paint) 전에 isLoading을 true로 강제합니다.
  if (currentKey !== prevKey) {
    setPrevKey(currentKey);
    setIsLoading(true);
  }

  // 3. 로딩이 true가 되면 타이머 시작 (1초 후 해제)
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // 1초 유지

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

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

export default function GlobalLoader() {
  return (
    <Suspense fallback={null}>
      <GlobalLoaderContent />
    </Suspense>
  );
}

// --- Styles & Animations ---

// fadeIn 애니메이션 제거 (즉시 차단을 위해)
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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  
  /* 배경 불투명도 약간 높임 */
  background: rgba(255, 255, 255, 0.9); 
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* 중요: 등장 애니메이션 제거하여 즉시 차단 */
  /* animation: fadeIn ... 삭제됨 */
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
  background-color: #e11d48;
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