"use client";

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { 
  Plus, 
  MessageSquare, 
  Mic, 
  Send, 
  Database, 
  FileText 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- Components ---

export default function ExaoneChatInterface() {
  const [inputText, setInputText] = useState('');
  const router = useRouter();

  return (
    <Container>
      
      {/* --- Left Sidebar --- */}
      <Sidebar>
        <LogoArea>
          <LogoText>
            <RedDot />
            EXAONE 챗봇
          </LogoText>
        </LogoArea>

        <div style={{ padding: '0 16px 24px' }}>
          <NewChatButton>
            <Plus size={20} />
            새로운 대화
          </NewChatButton>
        </div>

        <HistoryList>
          <HistoryGroup>
            <GroupLabel>오늘</GroupLabel>
            <HistoryItem $active>
              <MessageSquare size={16} />
              <span>NL-to-SQL 쿼리 요청</span>
            </HistoryItem>
          </HistoryGroup>

          <HistoryGroup>
            <GroupLabel>지난 7일</GroupLabel>
            <HistoryItem>
              <MessageSquare size={16} />
              <span>회의록 요약 데이터 추출</span>
            </HistoryItem>
            <HistoryItem>
              <MessageSquare size={16} />
              <span>생산 공정 음성 리포트</span>
            </HistoryItem>
            <HistoryItem>
              <MessageSquare size={16} />
              <span>DB 조회 쿼리 에러 수정</span>
            </HistoryItem>
          </HistoryGroup>
        </HistoryList>

        <UserProfileArea>
          <UserCard onClick={()=> router.push('/admin/database')}>
            <Avatar>U</Avatar>
            <UserName>User Settings</UserName>
          </UserCard>
        </UserProfileArea>
      </Sidebar>


      {/* --- Main Content --- */}
      <MainContent>
        
        <Header>
          <Nav>
            <TextBtn onClick={() => router.push('/login')}>로그인</TextBtn>
            <Divider />
            <BlackBtn onClick={()=> router.push('/sign')}>회원가입</BlackBtn>
          </Nav>
        </Header>

        <ScrollArea>
          <ContentWrapper>
            
            <WelcomeSection>
              <h2>무엇을 도와드릴까요?</h2>
              <p>데이터 조회부터 요약, 음성 인식까지 EXAONE이 지원합니다.</p>
            </WelcomeSection>

            <CardsGrid>
              {/* Card 1 */}
              <FeatureCard>
                <IconBox color="#e11d48" bg="#fff1f2">
                  <Database size={24} />
                </IconBox>
                <CardTitle>NL-to-SQL (조회)</CardTitle>
                <CardBody>
                  <ul>
                    <li><span>•</span> <strong>@현장</strong> DB 정보 조회</li>
                    <li><span>•</span> <strong>@회의실</strong> 데이터 추출</li>
                    <li><span>•</span> <strong>@일반</strong> 자유 질의</li>
                  </ul>
                </CardBody>
                <CardFooter>시작하기 →</CardFooter>
              </FeatureCard>

              {/* Card 2 */}
              <FeatureCard>
                <IconBox color="#ea580c" bg="#fff7ed">
                  <FileText size={24} />
                </IconBox>
                <CardTitle>NL-to-SQL (요약/리포트)</CardTitle>
                <CardBody>
                  <p>
                    DB로부터 데이터를 추출하여<br/>
                    <strong>요약 정보를 생성</strong>하고<br/>
                    리포팅 문서를 작성합니다.
                  </p>
                </CardBody>
                <CardFooter>시작하기 →</CardFooter>
              </FeatureCard>

              {/* Card 3 */}
              <FeatureCard>
                <IconBox color="#4f46e5" bg="#eef2ff">
                  <Mic size={24} />
                </IconBox>
                <CardTitle>Speech-to-Text</CardTitle>
                <CardBody>
                  <div className="steps">
                    <p>음성을 텍스트로 변환합니다.</p>
                    <div className="step-box">
                      <span>Step 1.</span> 마이크 입력<br/>
                      <span>Step 2.</span> 동의어 사전 보정<br/>
                      <span>Step 3.</span> 사용자 확인 후 전송
                    </div>
                  </div>
                </CardBody>
                <CardFooter>시작하기 →</CardFooter>
              </FeatureCard>
            </CardsGrid>

            <FAQSection>
              <span>자주하는 질문</span>
              <div className="chips">
                <Chip>지난달 생산량 리포트 뽑아줘</Chip>
                <Chip>회의실 B 예약 현황 알려줘</Chip>
                <Chip>음성 인식 모드 시작</Chip>
              </div>
            </FAQSection>

          </ContentWrapper>
        </ScrollArea>

        <InputFloatingArea>
          <InputContainer>
            <MicBtn>
              <Mic size={24} />
            </MicBtn>

            <TextArea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="문의하실 내용을 텍스트 또는 음성으로 입력하세요."
              rows={1}
            />

            <SendBtn disabled={!inputText.trim()} $hasText={!!inputText.trim()}>
              <Send size={20} />
            </SendBtn>
          </InputContainer>
          <Disclaimer>
            AI는 실수를 할 수 있습니다. 중요한 정보는 확인이 필요합니다.
          </Disclaimer>
        </InputFloatingArea>

      </MainContent>
    </Container>
  );
}

// --- Styled Components (Indentation: 2 spaces) ---

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #ffffff;
  color: #1e293b; /* slate-800 */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  overflow: hidden;

  *::selection {
    background-color: #ffe4e6; /* rose-100 */
  }
`;

// Sidebar Styles
const Sidebar = styled.aside`
  width: 288px;
  background-color: #f8fafc; /* slate-50 */
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const LogoArea = styled.div`
  padding: 24px;
  padding-bottom: 16px;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: -0.5px;
`;

const RedDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e11d48; /* rose-600 */
`;

const NewChatButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background-color: #ffffff;
  border: 1px solid #fecdd3; /* rose-200 */
  color: #e11d48; /* rose-600 */
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #fff1f2; /* rose-50 */
    border-color: #fda4af;
  }
  
  svg {
    transition: transform 0.3s;
  }
  &:hover svg {
    transform: rotate(90deg);
  }
`;

const HistoryList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 3px;
  }
`;

const HistoryGroup = styled.div`
  margin-bottom: 24px;
`;

const GroupLabel = styled.h3`
  font-size: 0.75rem;
  font-weight: 500;
  color: #94a3b8; /* slate-400 */
  margin-bottom: 12px;
  padding-left: 8px;
`;

const HistoryItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  font-weight: 500;
  
  /* Active vs Inactive Styling */
  ${props => props.$active ? css`  /* props.active -> props.$active 로 변경 */
    background-color: #fff1f2; /* rose-50 */
    color: #be123c; /* rose-700 */
    svg { color: #e11d48; }
  ` : css`
    color: #475569; /* slate-600 */
    svg { color: #94a3b8; }
    &:hover {
      background-color: #f1f5f9; /* slate-100 */
      color: #334155;
    }
  `}

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const UserProfileArea = styled.div`
  padding: 16px;
  border-top: 1px solid #e2e8f0;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ffe4e6;
  color: #e11d48;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
`;

const UserName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
`;

// Main Content Styles
const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #ffffff;
`;

const Header = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 32px;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
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

const Divider = styled.span`
  width: 1px;
  height: 12px;
  background-color: #cbd5e1;
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

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 32px 160px 32px; /* Bottom padding for floating input */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 16px;

  h2 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 8px;
  }
  p {
    color: #64748b;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  background-color: #fff;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const IconBox = styled.div<{ color: string; bg: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: ${props => props.color};
  background-color: ${props => props.bg};
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
`;

const CardBody = styled.div`
  flex: 1;
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;

  ul {
    list-style: none;
    padding: 0;
    margin-top: 8px;
    li {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
      span { color: #e11d48; font-weight: bold; }
      strong { color: #334155; }
    }
  }

  .steps {
    p { margin-bottom: 8px; }
    .step-box {
      background-color: #ffffff;
      border: 1px solid #f1f5f9;
      border-radius: 4px;
      padding: 8px;
      font-size: 0.75rem;
      color: #64748b;
      span {
        color: #4f46e5;
        font-weight: 600;
      }
    }
  }
`;

const CardFooter = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f8fafc;
  text-align: right;
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  
  ${FeatureCard}:hover & {
    color: #e11d48;
  }
`;

const FAQSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  span {
    font-size: 0.875rem;
    font-weight: 600;
    color: #94a3b8;
  }
  
  .chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }
`;

const Chip = styled.button`
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  color: #475569;
  border-radius: 9999px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #fecdd3;
    color: #e11d48;
    background-color: #fff1f2;
  }
`;

const InputFloatingArea = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px 32px 32px;
  background: linear-gradient(to top, white 60%, transparent);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 896px; /* max-w-4xl */
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 8px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;

  &:focus-within {
    border-color: #fda4af;
    box-shadow: 0 0 0 2px #fff1f2;
  }
`;

const MicBtn = styled.button`
  padding: 12px;
  color: #94a3b8;
  background: none;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #e11d48;
    background-color: #fff1f2;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 48px;
  max-height: 128px;
  padding: 12px 8px;
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  font-size: 1rem;
  color: #1e293b;
  font-family: inherit;

  &::placeholder {
    color: #94a3b8;
  }
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
  }
`;

const SendBtn = styled.button<{ $hasText: boolean }>`
  padding: 12px;
  border-radius: 12px;
  border: none;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  /* props.hasText -> props.$hasText 로 변경 */
  ${props => props.$hasText ? css`
    background-color: #e11d48;
    color: white;
    box-shadow: 0 4px 6px -1px rgba(225, 29, 72, 0.3);
    cursor: pointer;
    &:hover {
      background-color: #be123c;
      transform: scale(1.05);
    }
  ` : css`
    background-color: #f1f5f9;
    color: #cbd5e1;
    cursor: not-allowed;
  `}
`;

const Disclaimer = styled.p`
  margin-top: 12px;
  font-size: 11px;
  color: #94a3b8;
  text-align: center;
`;