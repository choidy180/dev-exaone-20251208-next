"use client";

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { 
  Database, 
  Book, 
  Terminal, 
  Settings, 
  Search, 
  Plus, 
  Trash2, 
  Save,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import AdminSidebar from '@/components/adminSidebar';
import Navbar from '@/components/nav-bar';

// --- Types & Mock Data ---

interface DictionaryItem {
  id: number;
  name: string;
  synonyms: string; // Comma separated string for input
  isNew?: boolean;
}

const MOCK_DATA: DictionaryItem[] = [
  { id: 1, name: 'AZ03994', synonyms: '' },
  { id: 2, name: 'AX00998', synonyms: '' },
  { id: 3, name: '로딩기', synonyms: 'Loading, 삽입기, 로더' },
  { id: 4, name: '언로더', synonyms: 'Unloader, 배출기, 하적기' },
  { id: 5, name: 'AGV', synonyms: '무인운반차, 자동운송로봇' },
];

// --- Main Component ---

export default function AdminDictionaryPage() {
  const [activeMenu, setActiveMenu] = useState('dictionary');
  const [items, setItems] = useState<DictionaryItem[]>(MOCK_DATA);
  const [hasChanges, setHasChanges] = useState(false);

  // Handlers
  const handleInputChange = (id: number, field: keyof DictionaryItem, value: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
    setHasChanges(true);
  };

  const handleAddRow = () => {
    const newId = Math.max(...items.map(i => i.id), 0) + 1;
    setItems([...items, { id: newId, name: '', synonyms: '', isNew: true }]);
    setHasChanges(true);
  };

  const handleDeleteRow = (id: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setItems(prev => prev.filter(item => item.id !== id));
      setHasChanges(true);
    }
  };

  const handleSave = () => {
    // API Call Logic Here
    alert('저장되었습니다.');
    setHasChanges(false);
  };

  const handleCancel = () => {
    if (confirm('변경사항을 취소하고 초기화하시겠습니까?')) {
      setItems(MOCK_DATA);
      setHasChanges(false);
    }
  };

  return (
    <Container>
      
      {/* --- Sidebar (Consistent Layout) --- */}
      <AdminSidebar/>

      {/* --- Main Content --- */}
      <MainArea>
        <Navbar />
        <Header>
          <TitleArea>
            <Title>용어 사전 등록</Title>
            <Subtitle>챗봇이 인식할 전문 용어와 동의어를 정의하여 인식률을 높입니다.</Subtitle>
          </TitleArea>
        </Header>

        <WorkSpace>
          <Card>
            <CardHeader>
              <div className="left">
                <CardTitle>■ 사전 등록 : 명칭 및 동의어</CardTitle>
                <CardDesc>총 {items.length}개의 용어가 등록되어 있습니다.</CardDesc>
              </div>
              <div className="right">
                <SearchContainer>
                  <Search size={16} />
                  <input placeholder="검색어 입력" />
                </SearchContainer>
                <AddButton onClick={handleAddRow}>
                  <Plus size={16} /> 행 추가
                </AddButton>
              </div>
            </CardHeader>

            <TableContainer>
              <StyledTable>
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>No.</th>
                    <th style={{ width: '250px' }}>명칭 (Key Term)</th>
                    <th>동의어 (Synonyms) <span className="tip">* 콤마(,)로 구분</span></th>
                    <th style={{ width: '80px' }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id} className={item.isNew ? 'new-row' : ''}>
                      <td className="center text-gray">{index + 1}</td>
                      <td>
                        <Input 
                          value={item.name}
                          placeholder="용어 입력 (예: AZ03994)"
                          onChange={(e) => handleInputChange(item.id, 'name', e.target.value)}
                        />
                      </td>
                      <td>
                        <SynonymInputWrapper>
                          <Input 
                            value={item.synonyms}
                            placeholder="동의어 입력 (예: Loading, 삽입기)"
                            onChange={(e) => handleInputChange(item.id, 'synonyms', e.target.value)}
                          />
                          {item.synonyms && (
                            <TagsPreview>
                              {item.synonyms.split(',').map((tag, idx) => (
                                tag.trim() && <Tag key={idx}>{tag.trim()}</Tag>
                              ))}
                            </TagsPreview>
                          )}
                        </SynonymInputWrapper>
                      </td>
                      <td className="center">
                        <DeleteButton onClick={() => handleDeleteRow(item.id)}>
                          <Trash2 size={16} />
                        </DeleteButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </TableContainer>
          </Card>
        </WorkSpace>

        {/* Bottom Action Bar (Sticky) */}
        <ActionBar $visible={hasChanges}>
          <ActionMessage>
            <AlertCircle size={20} />
            <span>수정된 내용이 있습니다. 저장하시겠습니까?</span>
          </ActionMessage>
          <ButtonGroup>
            <CancelBtn onClick={handleCancel}>
              <RotateCcw size={16} /> 취소
            </CancelBtn>
            <ConfirmBtn onClick={handleSave}>
              <Save size={16} /> 확인 (저장)
            </ConfirmBtn>
          </ButtonGroup>
        </ActionBar>

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

// Sidebar Styles (Reused)
const Sidebar = styled.aside`
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  z-index: 10;
`;

const SidebarHeader = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 8px;
  border-bottom: 1px solid #f1f5f9;
`;

const LogoRedDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #e11d48;
  border-radius: 50%;
`;

const LogoText = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
`;

const Badge = styled.span`
  font-size: 0.65rem;
  background-color: #f1f5f9;
  color: #64748b;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
`;

const NavList = styled.nav`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NavItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.$active ? css`
    background-color: #fff1f2;
    color: #e11d48;
  ` : css`
    background-color: transparent;
    color: #64748b;
    &:hover {
      background-color: #f8fafc;
      color: #334155;
    }
  `}
`;

// Main Area Styles
const MainArea = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
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
  padding: 0 32px 100px 32px; /* Bottom padding for Action Bar */
  overflow-y: auto;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  min-height: 600px;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .left {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
`;

const CardDesc = styled.span`
  font-size: 0.85rem;
  color: #64748b;
`;

const SearchContainer = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
  }

  input {
    padding: 8px 12px 8px 32px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    outline: none;
    transition: all 0.2s;
    &:focus {
      border-color: #fda4af;
      box-shadow: 0 0 0 2px #fff1f2;
    }
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: #0f172a;
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #1e293b;
    transform: translateY(-1px);
  }
`;

const TableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 4px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  thead {
    background-color: #f8fafc;
    position: sticky;
    top: 0;
    z-index: 10;
    th {
      padding: 14px 16px;
      text-align: left;
      font-weight: 600;
      color: #64748b;
      border-bottom: 1px solid #e2e8f0;
      white-space: nowrap;
      
      .tip {
        font-weight: 400;
        font-size: 0.75rem;
        color: #94a3b8;
        margin-left: 8px;
      }
    }
    th.center { text-align: center; }
  }

  tbody {
    tr {
      border-bottom: 1px solid #f1f5f9;
      &.new-row {
        background-color: #fff1f2; /* Light red bg for new rows */
      }
      &:hover {
        background-color: #f8fafc;
      }
    }
    td {
      padding: 12px 16px;
      vertical-align: top;
    }
    td.center { 
      text-align: center; 
      vertical-align: middle;
    }
    td.text-gray { color: #94a3b8; }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s;
  outline: none;

  &:focus {
    border-color: #fda4af;
    box-shadow: 0 0 0 2px #fff1f2;
    background-color: #fff;
  }
  
  &::placeholder {
    color: #cbd5e1;
  }
`;

const SynonymInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TagsPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background-color: #f1f5f9;
  color: #475569;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    color: #ef4444;
    background-color: #fee2e2;
  }
`;

// Bottom Action Bar
const ActionBar = styled.div<{ $visible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 20px 32px;
  box-shadow: 0 -4px 6px -1px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(${props => props.$visible ? '0' : '100%'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 50;
`;

const ActionMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #e11d48;
  font-weight: 600;
  font-size: 0.95rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const BaseBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
`;

const CancelBtn = styled(BaseBtn)`
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  color: #64748b;

  &:hover {
    background-color: #f1f5f9;
    color: #334155;
  }
`;

const ConfirmBtn = styled(BaseBtn)`
  background-color: #e11d48;
  border: 1px solid #e11d48;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(225, 29, 72, 0.2);

  &:hover {
    background-color: #be123c;
    transform: translateY(-1px);
  }
`;