'use client';

import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { 
  Save,
  RotateCcw,
  AlertCircle,
  RefreshCw,
  Terminal,
  Info
} from 'lucide-react';
import AdminSidebar from '@/components/adminSidebar';
import Navbar from '@/components/nav-bar';

// --- Types & Mock Data ---

interface PromptData {
  database: string;
  dictionary: string;
  domain: string;
}

const INITIAL_PROMPTS: PromptData = {
  database: `You are an expert SQL assistant.
Please convert the user's natural language question into a valid SQL query based on the schema provided.
- Do not add any explanations, just return the SQL.
- Use standard SQL syntax compatible with MySQL.`,
  
  dictionary: `Use the following terminology dictionary to correct user input before processing.
- Loading -> 로딩기
- Unloader -> 언로더
- AGV -> 무인운반차`,
  
  domain: `This system is for a semiconductor manufacturing plant.
Please understand the context of "Yield", "Throughput", and "Cycle Time" correctly within this domain.`
};

// --- Main Component ---

export default function AdminPromptPage() {
  const [prompts, setPrompts] = useState<PromptData>(INITIAL_PROMPTS);
  const [hasChanges, setHasChanges] = useState(false);

  // 변경사항 감지 로직
  useEffect(() => {
    const isChanged = 
      prompts.database !== INITIAL_PROMPTS.database ||
      prompts.dictionary !== INITIAL_PROMPTS.dictionary ||
      prompts.domain !== INITIAL_PROMPTS.domain;
    setHasChanges(isChanged);
  }, [prompts]);

  const handleChange = (key: keyof PromptData, value: string) => {
    setPrompts(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    if (confirm('모든 프롬프트를 시스템 초기값으로 되돌리시겠습니까? 이 작업은 취소할 수 없습니다.')) {
      setPrompts(INITIAL_PROMPTS);
      setHasChanges(false);
    }
  };

  const handleCancel = () => {
    if (confirm('수정된 내용을 취소하고 마지막 저장 상태로 되돌리시겠습니까?')) {
      // 실제로는 서버에서 다시 불러와야 하지만 여기선 초기값으로 예시
      setPrompts(INITIAL_PROMPTS); 
    }
  };

  const handleSave = () => {
    // API Call Logic Here
    alert('프롬프트 설정이 저장되었습니다.');
    setHasChanges(false);
    // 실제 구현시에는 여기서 INITIAL_PROMPTS를 현재 값으로 업데이트해야 함
  };

  return (
    <Container>
      
      {/* 사이드바 */}
      <AdminSidebar />

      {/* 메인 영역 */}
      <MainArea>
        <Navbar />
        <Header>
          <TitleArea>
            <Title>Prompt 관리</Title>
            <Subtitle>각 모듈별로 적용될 시스템 프롬프트를 상세 설정합니다.</Subtitle>
          </TitleArea>
        </Header>

        <WorkSpace>
          <ContentWrapper>
            
            <InfoBox>
              <Info size={18} />
              <span>
                여기서 수정된 프롬프트는 챗봇의 <strong>응답 생성 로직에 즉시 반영</strong>됩니다. 
                신중하게 수정해주세요.
              </span>
            </InfoBox>

            {/* Section 1: Database */}
            <Section>
              <LabelArea>
                <SectionLabel>[Database]</SectionLabel>
                <SectionDesc>NL-to-SQL 변환 시 사용되는 프롬프트입니다.</SectionDesc>
              </LabelArea>
              <StyledTextArea 
                value={prompts.database}
                onChange={(e) => handleChange('database', e.target.value)}
                placeholder="Database 프롬프트 입력..."
              />
            </Section>

            {/* Section 2: Terminology (Dictionary) */}
            <Section>
              <LabelArea>
                <SectionLabel>[용어사전]</SectionLabel>
                <SectionDesc>사용자 발화의 전문 용어를 보정하는 규칙입니다.</SectionDesc>
              </LabelArea>
              <StyledTextArea 
                value={prompts.dictionary}
                onChange={(e) => handleChange('dictionary', e.target.value)}
                placeholder="용어사전 프롬프트 입력..."
              />
            </Section>

            {/* Section 3: Domain Knowledge */}
            <Section>
              <LabelArea>
                <SectionLabel>[도메인지식]</SectionLabel>
                <SectionDesc>산업 특화 지식이나 문맥 이해를 위한 지침입니다.</SectionDesc>
              </LabelArea>
              <StyledTextArea 
                value={prompts.domain}
                onChange={(e) => handleChange('domain', e.target.value)}
                placeholder="도메인 지식 프롬프트 입력..."
              />
            </Section>

            {/* Reset Action Area (Inline with content) */}
            <ResetArea>
              <span className="desc">설정이 꼬이셨나요?</span>
              <ResetButton onClick={handleReset}>
                <RefreshCw size={14} />
                초기 프롬프트로 돌아가기
              </ResetButton>
            </ResetArea>

          </ContentWrapper>
        </WorkSpace>

        {/* Bottom Action Bar (Floating) */}
        <ActionBar $visible={hasChanges}>
          <ActionMessage>
            <AlertCircle size={20} />
            <span>프롬프트가 수정되었습니다. 적용하시겠습니까?</span>
          </ActionMessage>
          <ButtonGroup>
            <CancelBtn onClick={handleCancel}>
              <RotateCcw size={16} /> 취소
            </CancelBtn>
            <ConfirmBtn onClick={handleSave}>
              <Save size={16} /> 저장하기
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
  background-color: #f1f5f9; /* slate-100 */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
`;

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
  overflow-y: auto;
  padding: 0 32px 100px 32px; /* Bottom padding for ActionBar */
  
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

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #fff1f2; /* rose-50 */
  border: 1px solid #fecdd3; /* rose-200 */
  border-radius: 8px;
  color: #be123c; /* rose-700 */
  font-size: 0.9rem;
  
  strong {
    font-weight: 700;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LabelArea = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
`;

const SectionLabel = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b; /* slate-800 */
`;

const SectionDesc = styled.span`
  font-size: 0.85rem;
  color: #64748b; /* slate-500 */
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 180px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace; /* Code font */
  font-size: 0.95rem;
  line-height: 1.6;
  color: #334155;
  resize: vertical;
  outline: none;
  transition: all 0.2s;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: #fb7185; /* rose-400 */
    box-shadow: 0 0 0 3px #fff1f2; /* rose-50 ring */
  }

  &::placeholder {
    color: #cbd5e1;
  }
`;

const ResetArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
  padding-top: 24px;
  border-top: 1px dashed #cbd5e1;

  .desc {
    font-size: 0.85rem;
    color: #94a3b8;
  }
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f8fafc;
    border-color: #94a3b8;
    color: #475569;
  }
`;

// --- Action Bar (Common Style) ---

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