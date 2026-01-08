"use client";

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  Database, 
  FileText, 
  Mic, 
  ArrowRight, 
  CheckCircle, 
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/login');
  };

  return (
    <PageContainer>
      {/* --- Header --- */}
      <Header>
        <HeaderContent>
          <LogoArea>
            <RedDot />
            <LogoText>EXAONE</LogoText>
          </LogoArea>
          <Nav>
            <LoginButton onClick={() => router.push('/login')}>로그인</LoginButton>
            <PrimaryButton onClick={() => router.push('/sign')}>무료로 시작하기</PrimaryButton>
          </Nav>
        </HeaderContent>
      </Header>

      {/* --- Hero Section --- */}
      <HeroSection>
        <HeroContent>
          <Badge>New</Badge>
          <HeroTitle>
            데이터와 대화하는<br />
            가장 <span>완벽한 방법</span>
          </HeroTitle>
          <HeroSubtitle>
            복잡한 SQL 쿼리 없이, 자연어로 현장 데이터를 조회하고 리포트를 받아보세요.<br />
            EXAONE AI가 당신의 업무 생산성을 혁신적으로 높여드립니다.
          </HeroSubtitle>
          
          <ButtonGroup>
            <HeroButton onClick={handleStart}>
              지금 시작하기 <ArrowRight size={20} />
            </HeroButton>
            <DemoButton onClick={() => window.open('https://youtube.com', '_blank')}>
              데모 영상 보기
            </DemoButton>
          </ButtonGroup>

          <StatsRow>
            <StatItem>
              <CheckCircle size={16} color="#e11d48" />
              <span>정확도 99.9% 쿼리 변환</span>
            </StatItem>
            <StatItem>
              <CheckCircle size={16} color="#e11d48" />
              <span>엔터프라이즈급 보안</span>
            </StatItem>
            <StatItem>
              <CheckCircle size={16} color="#e11d48" />
              <span>실시간 음성 인식</span>
            </StatItem>
          </StatsRow>
        </HeroContent>
      </HeroSection>

      {/* --- Feature Highlight --- */}
      <FeatureSection>
        <SectionTitle>
          업무의 모든 순간을<br />AI와 함께하세요
        </SectionTitle>
        
        <Grid>
          <Card>
            <IconWrapper $color="#e11d48" $bg="#fff1f2">
              <Database size={28} />
            </IconWrapper>
            <h3>NL-to-SQL 조회</h3>
            <p>"어제 생산량 알려줘"라고 묻기만 하세요.<br/>복잡한 DB 구조를 몰라도 정확한 데이터를 찾아냅니다.</p>
          </Card>

          <Card>
            <IconWrapper $color="#ea580c" $bg="#fff7ed">
              <FileText size={28} />
            </IconWrapper>
            <h3>자동 리포팅 & 요약</h3>
            <p>회의록 요약부터 일일 생산 리포트 작성까지.<br/>반복적인 문서 작업을 AI에게 맡기세요.</p>
          </Card>

          <Card>
            <IconWrapper $color="#4f46e5" $bg="#eef2ff">
              <Mic size={28} />
            </IconWrapper>
            <h3>Voice Interface</h3>
            <p>현장에서 손을 쓰기 어려울 때,<br/>음성으로 데이터를 조회하고 명령을 내릴 수 있습니다.</p>
          </Card>
        </Grid>
      </FeatureSection>

      {/* --- Trust Section --- */}
      <TrustSection>
        <TrustContent>
          <div className="left">
            <h2>보안 걱정 없는<br/>안전한 데이터 처리</h2>
            <p>EXAONE은 기업의 소중한 데이터를 외부 유출 없이<br/>안전하게 처리하며 엔터프라이즈 보안 규격을 준수합니다.</p>
            <LearnMoreBtn>보안 백서 보기 →</LearnMoreBtn>
          </div>
          <div className="right">
             <SecurityCard>
               <ShieldCheck size={48} color="#e11d48"/>
               <h4>Enterprise Security</h4>
               <div className="bar"><div className="fill"></div></div>
               <span>실시간 위협 감지 및 차단 중</span>
             </SecurityCard>
          </div>
        </TrustContent>
      </TrustSection>

      {/* --- Footer --- */}
      <Footer>
        <p>© 2026 EXAONE Corp. All rights reserved.</p>
        <FooterLinks>
          <span>이용약관</span>
          <span>개인정보처리방침</span>
          <span>고객센터</span>
        </FooterLinks>
      </Footer>

    </PageContainer>
  );
}

// --- Styled Components ---

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #1e293b;
`;

// Header
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #f1f5f9;
  z-index: 100;
  display: flex;
  justify-content: center;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.5px;
`;

const RedDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #e11d48;
`;

const Nav = styled.nav`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: #0f172a; }
`;

const PrimaryButton = styled.button`
  padding: 10px 20px;
  background-color: #0f172a;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background-color: #1e293b; transform: translateY(-1px); }
`;

// Hero
const HeroSection = styled.section`
  padding-top: 160px;
  padding-bottom: 80px;
  display: flex;
  justify-content: center;
  text-align: center;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 24px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background-color: #fff1f2;
  color: #e11d48;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 9999px;
  margin-bottom: 24px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  line-height: 1.2;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 24px;
  letter-spacing: -1px;

  span {
    color: #e11d48;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 0;
      width: 100%;
      height: 12px;
      background-color: #ffe4e6;
      z-index: -1;
      opacity: 0.6;
    }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 48px;
`;

const HeroButton = styled.button`
  padding: 16px 32px;
  background-color: #e11d48;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 10px 15px -3px rgba(225, 29, 72, 0.2);

  &:hover {
    background-color: #be123c;
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(225, 29, 72, 0.3);
  }
`;

const DemoButton = styled.button`
  padding: 16px 32px;
  background-color: white;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
  }
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
  font-weight: 500;
  font-size: 0.95rem;
`;

// Features
const FeatureSection = styled.section`
  padding: 100px 24px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 64px;
  color: #0f172a;
  line-height: 1.3;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1120px;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 32px;
  border-radius: 24px;
  border: 1px solid #f1f5f9;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.05);
    transform: translateY(-5px);
    border-color: #e2e8f0;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 12px;
    color: #1e293b;
  }

  p {
    color: #64748b;
    line-height: 1.6;
  }
`;

const IconWrapper = styled.div<{ $color: string; $bg: string }>`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: ${props => props.$color};
  background-color: ${props => props.$bg};
`;

// Trust
const TrustSection = styled.section`
  padding: 80px 24px;
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
`;

const TrustContent = styled.div`
  max-width: 1024px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 64px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }

  .left {
    flex: 1;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 16px;
      color: #0f172a;
    }
    p {
      color: #64748b;
      margin-bottom: 24px;
      line-height: 1.6;
    }
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: center;
  }
`;

const LearnMoreBtn = styled.button`
  background: none;
  border: none;
  color: #e11d48;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  &:hover { text-decoration: underline; }
`;

const SecurityCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;

  h4 {
    margin: 16px 0;
    font-weight: 700;
    color: #1e293b;
  }

  .bar {
    width: 100%;
    height: 6px;
    background: #f1f5f9;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 12px;
    .fill {
      width: 90%;
      height: 100%;
      background: #e11d48;
    }
  }

  span {
    font-size: 0.8rem;
    color: #64748b;
  }
`;

// Footer
const Footer = styled.footer`
  padding: 40px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;
  color: #94a3b8;
  font-size: 0.875rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
  span {
    cursor: pointer;
    &:hover { color: #64748b; }
  }
`;