"use client";

import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Mic, Send, Database, FileText, User, Bot, Sparkles } from 'lucide-react';

// --- Components Import ---
import Sidebar from '@/components/side-bar';
import Navbar from '@/components/nav-bar';
import LandingPage from '@/components/landing-page';

// --- Types ---
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };
      const email = getCookie('user_email');
      setIsLoggedIn(!!email);
    };
    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) return <div style={{ height: '100vh', background: '#fff' }} />;
  if (!isLoggedIn) return <LandingPage />;

  return <ExaoneChatInterface />;
}

function ExaoneChatInterface() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // UI용 고정 응답 리스트 (랜덤 활용)
  const prefixes = [
    "문의하신 내용에 대해 EXAONE이 확인한 결과입니다.\n\n",
    "요청하신 데이터를 분석해 보았습니다.\n\n",
    "네, 확인되었습니다. 결과는 다음과 같습니다.\n\n"
  ];

  const suffixes = [
    "\n\n추가로 궁금하신 사항이 있으시면 언제든 말씀해 주세요.",
    "\n\n답변이 도움이 되셨나요? 더 상세한 정보가 필요하시면 요청해 주세요.",
    "\n\n관련하여 다른 데이터 조회도 가능합니다."
  ];

  const handleSend = async (overrideText?: string) => {
    const actualValue = overrideText || inputText;
    if (!actualValue.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: actualValue }]);
    setInputText('');
    setIsLoading(true);

    // AI 응답 공간 생성 (처음에는 빈값)
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: actualValue }), // API에는 순수 입력값만 전송
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      // UI 전용 문구 선택 (랜덤)
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      
      let apiAccumulated = ""; // API에서 오는 순수 데이터 누적

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.trim() || !line.startsWith('data: ')) continue;

          const jsonStr = line.replace('data: ', '');
          try {
            const payload = JSON.parse(jsonStr);

            if (payload.type === 'token') {
              apiAccumulated += payload.data;
              // UI 상에서는 [접두어 + API 데이터] 조합으로 출력
              updateLastMessage(prefix + apiAccumulated);
            } else if (payload.type === 'final') {
              // 최종 단계에서 [접두어 + 최종 API 데이터 + 접미어] 결합
              const finalContent = prefix + payload.data.assistant_message + suffix;
              updateLastMessage(finalContent);
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
    } catch (error) {
      updateLastMessage("서비스 연결 상태를 확인해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateLastMessage = (content: string) => {
    setMessages((prev) => {
      const updated = [...prev];
      if (updated.length > 0) updated[updated.length - 1].content = content;
      return updated;
    });
  };

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Navbar />
        <ScrollArea ref={scrollRef}>
          <ContentWrapper>
            {messages.length === 0 ? (
              <>
                <WelcomeSection>
                  <h2>무엇을 도와드릴까요?</h2>
                  <p>데이터 조회부터 요약, 음성 인식까지 EXAONE이 지원합니다.</p>
                </WelcomeSection>
                <CardsGrid>
                  <FeatureCard onClick={() => handleSend("@현장 DB 정보 조회해줘")}>
                    <IconBox color="#e11d48" bg="#fff1f2"><Database size={24} /></IconBox>
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
                  {/* 카드 생략 */}
                </CardsGrid>
              </>
            ) : (
              <ChatLog>
                {messages.map((msg, idx) => (
                  <MessageRow key={idx} $isUser={msg.role === 'user'}>
                    <Avatar $isUser={msg.role === 'user'}>
                      {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
                    </Avatar>
                    <MessageBubble $isUser={msg.role === 'user'}>
                      <div className="sender">{msg.role === 'user' ? '나' : 'EXAONE'}</div>
                      <div className="content">{msg.content}</div>
                    </MessageBubble>
                  </MessageRow>
                ))}
              </ChatLog>
            )}
          </ContentWrapper>
        </ScrollArea>

        <InputFloatingArea>
          <InputContainer>
            <MicBtn><Mic size={24} /></MicBtn>
            <TextArea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="문의하실 내용을 입력하세요."
              rows={1}
            />
            <SendBtn 
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isLoading} 
              $hasText={!!inputText.trim()}
            >
              <Send size={20} />
            </SendBtn>
          </InputContainer>
          <Disclaimer>AI는 실수를 할 수 있습니다. 중요한 정보는 확인이 필요합니다.</Disclaimer>
        </InputFloatingArea>
      </MainContent>
    </Container>
  );
}

// --- Styled Components (속성 줄바꿈 적용) ---

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #ffffff;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 40px 32px 180px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-behavior: smooth;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
`;

const ChatLog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;

const MessageRow = styled.div<{ $isUser: boolean }>`
  display: flex;
  gap: 16px;
  flex-direction: ${props => (props.$isUser ? 'row-reverse' : 'row')};
  align-items: flex-start;
`;

const Avatar = styled.div<{ $isUser: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.$isUser ? '#f1f5f9' : '#fff1f2')};
  color: ${props => (props.$isUser ? '#64748b' : '#e11d48')};
  flex-shrink: 0;
  border: 1px solid ${props => (props.$isUser ? '#e2e8f0' : '#ffe4e6')};
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 80%;
  
  .sender {
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 4px;
    color: #94a3b8;
    text-align: ${props => (props.$isUser ? 'right' : 'left')};
  }

  .content {
    background-color: ${props => (props.$isUser ? '#334155' : '#ffffff')};
    color: ${props => (props.$isUser ? '#ffffff' : '#1e293b')};
    padding: 12px 16px;
    border-radius: ${props => (props.$isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px')};
    font-size: 0.95rem;
    line-height: 1.6;
    white-space: pre-wrap;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: ${props => (props.$isUser ? 'none' : '1px solid #f1f5f9')};
  }
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 48px;

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
  gap: 20px;
  margin-bottom: 48px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  background: #fff;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  }
`;

const IconBox = styled.div<{ color: string; bg: string }>`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: ${props => props.color};
  background-color: ${props => props.bg};
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const CardBody = styled.div`
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;

  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      gap: 4px;
      margin-bottom: 2px;
      
      span {
        color: #e11d48;
      }
    }
  }
`;

const CardFooter = styled.div`
  margin-top: 16px;
  font-size: 0.75rem;
  color: #cbd5e1;
  text-align: right;
`;

const InputFloatingArea = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px 32px 32px;
  background: linear-gradient(to top, white 70%, transparent);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 8px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  &:focus-within {
    border-color: #fda4af;
  }
`;

const MicBtn = styled.button`
  padding: 10px;
  color: #94a3b8;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #e11d48;
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  min-height: 44px;
  max-height: 150px;
  padding: 10px 0;
  border: none;
  outline: none;
  resize: none;
  font-size: 1rem;
  font-family: inherit;
`;

const SendBtn = styled.button<{ $hasText: boolean }>`
  padding: 10px;
  border-radius: 12px;
  border: none;
  background-color: ${props => (props.$hasText ? '#e11d48' : '#f1f5f9')};
  color: ${props => (props.$hasText ? '#fff' : '#cbd5e1')};
  cursor: ${props => (props.$hasText ? 'pointer' : 'not-allowed')};
  transition: all 0.2s;
`;

const Disclaimer = styled.p`
  margin-top: 12px;
  font-size: 11px;
  color: #cbd5e1;
`;