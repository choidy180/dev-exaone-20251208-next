"use client";

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { 
  User, 
  Briefcase, 
  Building, 
  Lock, 
  ArrowLeft,
  CheckCircle2,
  BadgeCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    password: '',
    passwordConfirm: '',
    department: '',
    rank: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = 
    formData.employeeId && 
    formData.name && 
    formData.password && 
    formData.department && 
    formData.rank;

  return (
    <Container>
      <Card>
        
        {/* Header Section */}
        <Header>
          <BackButton onClick={()=> router.push('/')}>
            <ArrowLeft size={20} />
            <span>돌아가기</span>
          </BackButton>
          <LogoTitle>
            <RedDot />
            엑사원 챗봇
          </LogoTitle>
          <PageTitle>회원가입</PageTitle>
          <PageSubtitle>
            사내 업무 지원을 위한 계정을 생성합니다.
          </PageSubtitle>
        </Header>

        {/* Form Section */}
        <Form>
          
          {/* Row 1: 사원ID & 이름 */}
          <Row>
            <FormGroup>
              <Label>사원 ID (사번)</Label>
              <InputWrapper>
                <Icon><BadgeCheck size={18} /></Icon>
                <Input 
                  type="text" 
                  name="employeeId"
                  placeholder="ex) 20240123"
                  value={formData.employeeId}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label>이름</Label>
              <InputWrapper>
                <Icon><User size={18} /></Icon>
                <Input 
                  type="text" 
                  name="name"
                  placeholder="실명 입력"
                  value={formData.name}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
          </Row>

          {/* Row 2: 비밀번호 */}
          <FormGroup>
            <Label>비밀번호</Label>
            <InputWrapper>
              <Icon><Lock size={18} /></Icon>
              <Input 
                type="password" 
                name="password"
                placeholder="비밀번호 입력"
                value={formData.password}
                onChange={handleChange}
              />
            </InputWrapper>
          </FormGroup>

          {/* Row 3: 부서 & 직급 */}
          <Row>
            <FormGroup>
              <Label>부서</Label>
              <SelectWrapper>
                <Icon><Building size={18} /></Icon>
                <Select 
                  name="department" 
                  value={formData.department} 
                  onChange={handleChange}
                >
                  <option value="" disabled>선택하세요</option>
                  <option value="IT개발팀">IT개발팀</option>
                  <option value="데이터분석팀">데이터분석팀</option>
                  <option value="경영지원팀">경영지원팀</option>
                  <option value="영업팀">영업팀</option>
                  <option value="생산관리팀">생산관리팀</option>
                </Select>
                <ArrowIcon>▼</ArrowIcon>
              </SelectWrapper>
            </FormGroup>

            <FormGroup>
              <Label>직급</Label>
              <SelectWrapper>
                <Icon><Briefcase size={18} /></Icon>
                <Select 
                  name="rank" 
                  value={formData.rank} 
                  onChange={handleChange}
                >
                  <option value="" disabled>선택하세요</option>
                  <option value="사원">사원</option>
                  <option value="주임">주임</option>
                  <option value="대리">대리</option>
                  <option value="과장">과장</option>
                  <option value="차장">차장</option>
                  <option value="부장">부장</option>
                </Select>
                <ArrowIcon>▼</ArrowIcon>
              </SelectWrapper>
            </FormGroup>
          </Row>

          <SubmitButton disabled={!isFormValid} $isValid={!!isFormValid}>
            가입 완료
          </SubmitButton>

          <LoginLink>
            이미 계정이 있으신가요? <strong>로그인하기</strong>
          </LoginLink>

        </Form>
      </Card>
      
      <FooterInfo>
        © 2025 EXAONE Corp. All rights reserved.
      </FooterInfo>
    </Container>
  );
}

// --- Styled Components ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: #f8fafc; /* slate-50 */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 24px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 520px;
  background-color: #ffffff;
  border-radius: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 40px;
  border: 1px solid #e2e8f0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  font-size: 0.875rem;
  color: #94a3b8;
  cursor: pointer;
  
  &:hover {
    color: #475569;
  }
`;

const LogoTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const RedDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #e11d48;
`;

const PageTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 8px;
`;

const PageSubtitle = styled.p`
  font-size: 0.95rem;
  color: #64748b;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  
  > div {
    flex: 1;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  margin-left: 4px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Icon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
`;

const ArrowIcon = styled.div`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.7rem;
  color: #94a3b8;
  pointer-events: none;
`;

const commonInputStyles = css`
  width: 100%;
  padding: 14px;
  padding-left: 42px; /* icon space */
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  font-size: 0.95rem;
  color: #1e293b;
  transition: all 0.2s;
  outline: none;
  appearance: none; /* for select */

  &::placeholder {
    color: #cbd5e1;
  }

  &:focus {
    border-color: #fda4af; /* rose-300 */
    box-shadow: 0 0 0 3px #fff1f2; /* rose-50 ring */
  }
  
  &:hover {
    border-color: #cbd5e1;
  }
`;

const Input = styled.input`
  ${commonInputStyles}
`;

const Select = styled.select`
  ${commonInputStyles}
  cursor: pointer;
  
  &:invalid {
    color: #cbd5e1;
  }
`;

const SubmitButton = styled.button<{ $isValid: boolean }>`
  margin-top: 12px;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$isValid ? css`
    background-color: #e11d48;
    color: white;
    box-shadow: 0 4px 12px rgba(225, 29, 72, 0.25);
    
    &:hover {
      background-color: #be123c;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(225, 29, 72, 0.3);
    }
    &:active {
      transform: translateY(0);
    }
  ` : css`
    background-color: #f1f5f9;
    color: #cbd5e1;
    cursor: not-allowed;
  `}
`;

const LoginLink = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 8px;
  
  strong {
    color: #e11d48;
    cursor: pointer;
    margin-left: 4px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FooterInfo = styled.div`
  margin-top: 32px;
  font-size: 0.75rem;
  color: #94a3b8;
`;