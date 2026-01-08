'use client';

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { 
  CheckCircle2, 
  XCircle, 
  UserPlus, 
  Clock, 
  Mail, 
  Bot, 
  Plus,
  MoreVertical,
  CalendarClock
} from 'lucide-react';
import AdminSidebar from '@/components/adminSidebar';
import Navbar from '@/components/nav-bar';

// --- Types & Mock Data ---

// 1. 가입 대기 사용자 데이터
interface PendingUser {
  id: string;
  name: string;
  department: string;
  rank: string;
  requestDate: string;
}

const MOCK_PENDING_USERS: PendingUser[] = [
  { id: '2025001', name: '김신입', department: '영업팀', rank: '사원', requestDate: '2025-12-08 09:30' },
  { id: '2025004', name: '이데이터', department: '데이터분석팀', rank: '대리', requestDate: '2025-12-08 10:15' },
  { id: '2025012', name: '박생산', department: '생산관리팀', rank: '과장', requestDate: '2025-12-08 11:00' },
];

// 2. RPA 자동화 태스크 데이터
interface RpaTask {
  id: number;
  title: string;
  target: string; // 수신 대상
  schedule: string; // 전송 시점
  active: boolean;
}

const MOCK_RPA_TASKS: RpaTask[] = [
  { id: 1, title: '일일 생산 현황 리포트', target: '생산관리팀 전원', schedule: '매일 08:00', active: true },
  { id: 2, title: '주간 회의록 요약', target: '전사 임직원', schedule: '매주 월요일 09:00', active: true },
  { id: 3, title: '월간 매출 결산 보고', target: '경영지원팀장, CEO', schedule: '매월 1일 10:00', active: false },
];

// --- Main Component ---

export default function AdminAccountPage() {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>(MOCK_PENDING_USERS);
  const [rpaTasks, setRpaTasks] = useState<RpaTask[]>(MOCK_RPA_TASKS);

  // User Approval Handlers
  const handleApprove = (id: string) => {
    if (confirm('해당 사용자의 가입을 승인하시겠습니까?')) {
      setPendingUsers(prev => prev.filter(u => u.id !== id));
      alert('승인 처리되었습니다.');
    }
  };

  const handleReject = (id: string) => {
    if (confirm('가입 요청을 거절하시겠습니까?')) {
      setPendingUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  // RPA Handlers
  const toggleRpa = (id: number) => {
    setRpaTasks(prev => prev.map(task => 
      task.id === id ? { ...task, active: !task.active } : task
    ));
  };

  return (
    <Container>
      <AdminSidebar />

      <MainArea>
        <Navbar />
        <Header>
          <TitleArea>
            <Title>계정 및 RPA 관리</Title>
            <Subtitle>신규 가입 요청을 승인하고 자동화 리포트(RPA) 규칙을 관리합니다.</Subtitle>
          </TitleArea>
        </Header>

        <WorkSpace>
          <ContentWrapper>

            {/* Section 1: User Approval */}
            <SectionCard>
              <CardHeader>
                <div className="title-group">
                  <IconBox $color="rose">
                    <UserPlus size={20} />
                  </IconBox>
                  <div>
                    <CardTitle>신규 가입 요청</CardTitle>
                    <CardDesc>총 {pendingUsers.length}명의 승인 대기자가 있습니다.</CardDesc>
                  </div>
                </div>
              </CardHeader>
              
              <TableContainer>
                {pendingUsers.length > 0 ? (
                  <StyledTable>
                    <thead>
                      <tr>
                        <th>요청일시</th>
                        <th>사원정보</th>
                        <th>부서/직급</th>
                        <th className="right">관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingUsers.map(user => (
                        <tr key={user.id}>
                          <td className="date">{user.requestDate}</td>
                          <td>
                            <div className="user-info">
                              <span className="name">{user.name}</span>
                              <span className="id">({user.id})</span>
                            </div>
                          </td>
                          <td>
                            <Badge>{user.department}</Badge> {user.rank}
                          </td>
                          <td className="right">
                            <ActionButtons>
                              <ApproveBtn onClick={() => handleApprove(user.id)}>
                                승인
                              </ApproveBtn>
                              <RejectBtn onClick={() => handleReject(user.id)}>
                                거절
                              </RejectBtn>
                            </ActionButtons>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </StyledTable>
                ) : (
                  <EmptyState>
                    <CheckCircle2 size={48} className="icon" />
                    <p>모든 요청을 처리했습니다.</p>
                  </EmptyState>
                )}
              </TableContainer>
            </SectionCard>


            {/* Section 2: RPA Management */}
            <SectionCard>
              <CardHeader>
                <div className="title-group">
                  <IconBox $color="indigo">
                    <Bot size={20} />
                  </IconBox>
                  <div>
                    <CardTitle>RPA 자동 리포트 설정</CardTitle>
                    <CardDesc>지정된 대상과 시점에 맞춰 챗봇이 자동으로 메일을 발송합니다.</CardDesc>
                  </div>
                </div>
                <AddButton>
                  <Plus size={16} /> 새 규칙 추가
                </AddButton>
              </CardHeader>

              <RpaGrid>
                {rpaTasks.map(task => (
                  <RpaItem key={task.id} $active={task.active}>
                    <div className="top-row">
                      <div className="task-icon">
                        <Mail size={18} />
                      </div>
                      <Switch 
                        checked={task.active} 
                        onClick={() => toggleRpa(task.id)}
                      >
                        <span className="slider" />
                      </Switch>
                    </div>
                    
                    <h4 className="task-title">{task.title}</h4>
                    
                    <div className="meta-info">
                      <div className="meta-row">
                        <Clock size={14} />
                        <span>{task.schedule}</span>
                      </div>
                      <div className="meta-row">
                        <UserPlus size={14} />
                        <span>To: {task.target}</span>
                      </div>
                    </div>

                    <div className="status-indicator">
                      {task.active ? (
                        <span className="on">● Active</span>
                      ) : (
                        <span className="off">● Disabled</span>
                      )}
                    </div>
                  </RpaItem>
                ))}
              </RpaGrid>
            </SectionCard>

          </ContentWrapper>
        </WorkSpace>
      </MainArea>
    </Container>
  );
}

// --- Styled Components ---

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
`;

const MainArea = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: 80px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  background-color: #f1f5f9;
  flex-shrink: 0;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
`;

const WorkSpace = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 32px 60px 32px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 4px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 40px;
`;

const SectionCard = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title-group {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

const IconBox = styled.div<{ $color: 'rose' | 'indigo' }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${props => props.$color === 'rose' ? css`
    background-color: #fff1f2;
    color: #e11d48;
  ` : css`
    background-color: #eef2ff;
    color: #4f46e5;
  `}
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2px;
`;

const CardDesc = styled.p`
  font-size: 0.85rem;
  color: #64748b;
`;

// --- Table Styles ---

const TableContainer = styled.div`
  padding: 0 24px 24px 24px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;

  th {
    text-align: left;
    padding: 12px 8px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #94a3b8;
    border-bottom: 2px solid #f1f5f9;
    &.right { text-align: right; }
  }

  td {
    padding: 16px 8px;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
    font-size: 0.9rem;
    color: #334155;
    
    &.date {
      color: #94a3b8;
      font-size: 0.85rem;
      font-family: monospace;
    }
    
    &.right { text-align: right; }
  }

  .user-info {
    .name { font-weight: 600; color: #1e293b; margin-right: 4px; }
    .id { color: #94a3b8; font-size: 0.85rem; }
  }
`;

const Badge = styled.span`
  background-color: #f1f5f9;
  color: #475569;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 6px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ActionBtn = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
`;

const ApproveBtn = styled(ActionBtn)`
  background-color: #0f172a;
  color: white;
  &:hover { background-color: #1e293b; }
`;

const RejectBtn = styled(ActionBtn)`
  background-color: #ffffff;
  border-color: #e2e8f0;
  color: #64748b;
  &:hover { background-color: #f8fafc; color: #475569; }
`;

const EmptyState = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #94a3b8;
  
  .icon { color: #cbd5e1; }
  p { font-size: 0.9rem; }
`;

// --- RPA Grid Styles ---

const RpaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 24px;
  background-color: #f8fafc;
`;

const RpaItem = styled.div<{ $active: boolean }>`
  background-color: #ffffff;
  border: 1px solid ${props => props.$active ? '#e2e8f0' : '#f1f5f9'};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: all 0.2s;
  opacity: ${props => props.$active ? 1 : 0.7};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .task-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background-color: ${props => props.$active ? '#eef2ff' : '#f1f5f9'};
    color: ${props => props.$active ? '#4f46e5' : '#94a3b8'};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .task-title {
    font-size: 1rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 12px;
  }

  .meta-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
    flex: 1;

    .meta-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.8rem;
      color: #64748b;
    }
  }

  .status-indicator {
    font-size: 0.75rem;
    font-weight: 600;
    .on { color: #166534; }
    .off { color: #94a3b8; }
  }
`;

const Switch = styled.div<{ checked: boolean }>`
  position: relative;
  width: 40px;
  height: 22px;
  background-color: ${props => props.checked ? '#e11d48' : '#e2e8f0'};
  border-radius: 99px;
  cursor: pointer;
  transition: background-color 0.2s;

  .slider {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.2s;
    transform: ${props => props.checked ? 'translateX(18px)' : 'translateX(0)'};
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #0f172a;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
    color: #e11d48;
    border-color: #fda4af;
  }
`;