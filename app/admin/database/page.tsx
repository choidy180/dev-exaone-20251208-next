"use client";

import React, { useState, Suspense } from 'react'; // Suspense 추가
import styled, { css } from 'styled-components';
import { 
  Database, 
  Search, 
  ArrowRight, 
  Save,
  ChevronRight
} from 'lucide-react';
import AdminSidebar from '@/components/adminSidebar';

// --- Types & Mock Data ---

interface TableData {
  id: string;
  name: string;
  rows: number;
  description: string;
  status: 'registered' | 'unregistered';
}

interface ColumnData {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'registered' | 'unregistered';
}

const MOCK_TABLES: TableData[] = [
  { id: 't1', name: 'TB_USER_LOG', rows: 12500, description: '사용자 접속 로그', status: 'registered' },
  { id: 't2', name: 'TB_PRODUCTS', rows: 450, description: '상품 기본 정보', status: 'unregistered' },
  { id: 't3', name: 'TB_ORDERS', rows: 2300, description: '주문 내역 마스터', status: 'registered' },
  { id: 't4', name: 'TB_PAYMENT', rows: 2300, description: '결제 이력', status: 'unregistered' },
];

const MOCK_COLUMNS: ColumnData[] = [
  { id: 'c1', name: 'user_id', type: 'VARCHAR(20)', description: '사용자 아이디', status: 'registered' },
  { id: 'c2', name: 'login_dt', type: 'DATETIME', description: '접속 일시', status: 'registered' },
  { id: 'c3', name: 'ip_addr', type: 'VARCHAR(15)', description: '', status: 'unregistered' },
  { id: 'c4', name: 'device_type', type: 'VARCHAR(10)', description: '접속 기기', status: 'unregistered' },
];

// --- Content Component (기존 로직 분리) ---

function AdminDatabaseContent() {
  // const [activeMenu, setActiveMenu] = useState('database'); // 사용하지 않는 state 주석 처리
  
  // State for Left Panel (Tables)
  const [checkedTables, setCheckedTables] = useState<Set<string>>(new Set());
  const [selectedTableForView, setSelectedTableForView] = useState<TableData | null>(null);
  
  // State for Right Panel (Columns)
  const [checkedColumns, setCheckedColumns] = useState<Set<string>>(new Set());

  // Handlers
  const toggleTableCheck = (id: string) => {
    const newSet = new Set(checkedTables);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setCheckedTables(newSet);
  };

  const handleSelectTableConfig = () => {
    // 실제로는 체크된 테이블 중 하나를 선택하거나, 
    // UI상 "선택하기" 버튼을 누른 행의 데이터를 가져오는 로직
    // 여기서는 첫 번째 체크된 테이블을 예시로 엽니다.
    const firstChecked = Array.from(checkedTables)[0];
    const tableData = MOCK_TABLES.find(t => t.id === firstChecked);
    if (tableData) {
      setSelectedTableForView(tableData);
    } else {
      alert('설정할 테이블을 체크박스로 선택해주세요.');
    }
  };

  const toggleColumnCheck = (id: string) => {
    const newSet = new Set(checkedColumns);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setCheckedColumns(newSet);
  };

  const handleFinalAdd = () => {
    alert(`
      [Prompt 생성 완료]
      테이블: ${selectedTableForView?.name} (${selectedTableForView?.description})
      선택된 컬럼 수: ${checkedColumns.size}개
      
      시스템에 반영되었습니다.
    `);
  };

  return (
    <Container>
      
      {/* --- Sidebar --- */}
      <AdminSidebar/>

      {/* --- Main Content --- */}
      <MainArea>
        <Header>
          <TitleArea>
            <Title>데이터 추가하기</Title>
            <Subtitle>DB 스키마를 조회하고 챗봇이 학습할 테이블과 컬럼을 선택하여 프롬프트를 생성합니다.</Subtitle>
          </TitleArea>
        </Header>

        <WorkSpace>
          
          {/* Panel 1: Table List */}
          <Panel>
            <PanelHeader>
              <PanelTitle>1. 테이블 선택 및 설정</PanelTitle>
              <PanelDesc>사용 가능한 테이블 리스트입니다. (설명 수정 가능)</PanelDesc>
            </PanelHeader>

            <SearchContainer>
              <SearchIcon><Search size={16} /></SearchIcon>
              <SearchInput placeholder="테이블명 검색..." />
            </SearchContainer>

            <TableContainer>
              <StyledTable>
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}><input type="checkbox" /></th>
                    <th>테이블명</th>
                    <th style={{ width: '80px' }}>데이터수</th>
                    <th>테이블 설명 (Prompt용)</th>
                    <th style={{ width: '80px' }}>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TABLES.map(table => (
                    <tr key={table.id} className={checkedTables.has(table.id) ? 'selected' : ''}>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={checkedTables.has(table.id)}
                          onChange={() => toggleTableCheck(table.id)}
                        />
                      </td>
                      <td className="font-medium">{table.name}</td>
                      <td className="text-right">{table.rows.toLocaleString()}</td>
                      <td>
                        <InlineInput defaultValue={table.description} placeholder="설명 입력" />
                      </td>
                      <td>
                        <StatusBadge $status={table.status}>
                          {table.status === 'registered' ? '등록' : '미등록'}
                        </StatusBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </TableContainer>

            <PanelFooter>
              <PrimaryButton onClick={handleSelectTableConfig}>
                선택하기 <ChevronRight size={16} />
              </PrimaryButton>
            </PanelFooter>
          </Panel>

          {/* Arrow Separator */}
          <ArrowSection>
            <div className="arrow-circle">
              <ArrowRight size={24} />
            </div>
          </ArrowSection>

          {/* Panel 2: Column List */}
          <Panel $disabled={!selectedTableForView}>
            {selectedTableForView ? (
              <>
                <PanelHeader>
                  <PanelTitle>2. 컬럼 상세 설정</PanelTitle>
                  <PanelDesc>
                    <span className="highlight">{selectedTableForView.name}</span> 테이블의 컬럼을 선택하세요.
                  </PanelDesc>
                </PanelHeader>

                <SearchContainer>
                  <SearchIcon><Search size={16} /></SearchIcon>
                  <SearchInput placeholder="컬럼명 검색..." />
                </SearchContainer>

                <TableContainer>
                  <StyledTable>
                    <thead>
                      <tr>
                        <th style={{ width: '40px' }}><input type="checkbox" /></th>
                        <th>컬럼명</th>
                        <th style={{ width: '100px' }}>타입</th>
                        <th>컬럼 설명 (Prompt용)</th>
                        <th style={{ width: '80px' }}>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_COLUMNS.map(col => (
                        <tr key={col.id} className={checkedColumns.has(col.id) ? 'selected' : ''}>
                          <td>
                            <input 
                              type="checkbox" 
                              checked={checkedColumns.has(col.id)}
                              onChange={() => toggleColumnCheck(col.id)}
                            />
                          </td>
                          <td className="font-medium">{col.name}</td>
                          <td className="text-gray">{col.type}</td>
                          <td>
                            <InlineInput defaultValue={col.description} placeholder="설명 입력" />
                          </td>
                          <td>
                            <StatusBadge $status={col.status}>
                              {col.status === 'registered' ? '등록' : '미등록'}
                            </StatusBadge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </StyledTable>
                </TableContainer>

                <PanelFooter>
                  <SaveButton onClick={handleFinalAdd}>
                    <Save size={16} />
                    추가하기 (Prompt 생성)
                  </SaveButton>
                </PanelFooter>
              </>
            ) : (
              <EmptyState>
                <Database size={48} opacity={0.2} />
                <p>왼쪽에서 테이블을 선택 후<br/>[선택하기] 버튼을 눌러주세요.</p>
              </EmptyState>
            )}
          </Panel>

        </WorkSpace>
      </MainArea>
    </Container>
  );
}

// --- Main Page Component (Suspense Wrapper 적용) ---
// 이 부분이 에러 해결의 핵심입니다.

export default function AdminDatabasePage() {
  return (
    <Suspense fallback={
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh' }}>
        Loading...
      </div>
    }>
      <AdminDatabaseContent />
    </Suspense>
  );
}

// --- Styled Components ---

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f1f5f9; /* slate-100 background for admin feel */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
`;

// Sidebar 스타일은 AdminSidebar 내부로 이동했을 수 있으나, 
// 기존 코드에 포함되어 있었으므로 유지합니다. (혹시 AdminSidebar에서 스타일을 사용하지 않는 경우를 대비)
// 만약 AdminSidebar 컴포넌트 내부에서 스타일을 다 가지고 있다면 아래 Sidebar 관련 스타일은 지워도 됩니다.

/* const Sidebar = styled.aside`
  ...
`; 
(AdminSidebar를 import해서 쓰므로 여기 있던 Sidebar 관련 스타일은 
AdminSidebar 컴포넌트 내부로 이동되었어야 정상입니다. 
하지만 기존 코드에 있었으므로 혹시 몰라 아래 MainArea부터 작성합니다.)
*/

// Main Area
const MainArea = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.header`
  height: 80px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 24px;
    background-color: #0f172a;
  }
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin-left: 12px;
`;

const WorkSpace = styled.div`
  flex: 1;
  padding: 0 32px 32px 32px;
  display: flex;
  gap: 24px;
  overflow: hidden;
`;

// Panels
const Panel = styled.div<{ $disabled?: boolean }>`
  flex: 1;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s;

  ${props => props.$disabled && css`
    background-color: #f8fafc;
    border-style: dashed;
    opacity: 0.8;
  `}
`;

const PanelHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
`;

const PanelTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
`;

const PanelDesc = styled.p`
  font-size: 0.85rem;
  color: #64748b;

  .highlight {
    color: #e11d48;
    font-weight: 600;
    background-color: #fff1f2;
    padding: 2px 4px;
    border-radius: 4px;
  }
`;

const SearchContainer = styled.div`
  padding: 16px 24px;
  position: relative;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 36px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 36px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #fda4af;
    box-shadow: 0 0 0 2px #fff1f2;
  }
`;

const TableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 24px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 3px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  thead {
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: 1;
    
    th {
      text-align: left;
      padding: 12px 8px;
      font-weight: 600;
      color: #64748b;
      border-bottom: 2px solid #f1f5f9;
      white-space: nowrap;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #f1f5f9;
      transition: background-color 0.1s;

      &:hover {
        background-color: #f8fafc;
      }
      
      &.selected {
        background-color: #fff1f2;
      }
    }

    td {
      padding: 12px 8px;
      color: #334155;
      vertical-align: middle;

      &.font-medium {
        font-weight: 600;
        color: #1e293b;
      }
      &.text-right {
        text-align: right;
        font-family: monospace;
      }
      &.text-gray {
        color: #64748b;
        font-size: 0.85rem;
      }
    }
  }

  input[type="checkbox"] {
    cursor: pointer;
    width: 16px;
    height: 16px;
    accent-color: #e11d48;
  }
`;

const InlineInput = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 0.85rem;
  background-color: transparent;
  transition: all 0.2s;

  &:hover {
    background-color: #ffffff;
    border-color: #e2e8f0;
  }
  &:focus {
    background-color: #ffffff;
    border-color: #fda4af;
    outline: none;
  }
  &::placeholder {
    color: #cbd5e1;
  }
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  min-width: 50px;

  ${props => props.$status === 'registered' ? css`
    background-color: #dcfce7; /* green-100 */
    color: #166534; /* green-800 */
  ` : css`
    background-color: #f1f5f9; /* slate-100 */
    color: #64748b; /* slate-500 */
  `}
`;

const PanelFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #0f172a;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #1e293b;
    transform: translateY(-1px);
  }
`;

const SaveButton = styled(PrimaryButton)`
  background-color: #e11d48;
  
  &:hover {
    background-color: #be123c;
    box-shadow: 0 4px 12px rgba(225, 29, 72, 0.2);
  }
`;

const ArrowSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;

  .arrow-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a3b8;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #94a3b8;
  
  p {
    text-align: center;
    line-height: 1.5;
    font-size: 0.9rem;
  }
`;