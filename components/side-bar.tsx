"use client";

import React from 'react';
import styled, { css } from 'styled-components';
import { Plus, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  return (
    <SidebarContainer>
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
        <UserCard onClick={() => router.push('/admin/database')}>
          <Avatar>U</Avatar>
          <UserName>User Settings</UserName>
        </UserCard>
      </UserProfileArea>
    </SidebarContainer>
  );
}

// --- Sidebar Styled Components ---

const SidebarContainer = styled.aside`
  width: 288px;
  background-color: #f8fafc; /* slate-50 */
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100vh;
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
  
  ${props => props.$active ? css`
    background-color: #fff1f2;
    color: #be123c;
    svg { color: #e11d48; }
  ` : css`
    color: #475569;
    svg { color: #94a3b8; }
    &:hover {
      background-color: #f1f5f9;
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