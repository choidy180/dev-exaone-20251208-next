"use client";

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { 
  User, 
  Lock, 
  BadgeCheck,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 로그인 로직 구현
    console.log('Login attempt:', formData);
    router.push('/'); // 로그인 성공 시 메인으로 이동 가정
  };

  const isFormValid = 
    formData.employeeId && 
    formData.name && 
    formData.password;

  return (
    <Container>
      <Card>
        
        {/* Header Section */}
        <Header>
          <LogoTitle>
            <RedDot />
            EXAONE 챗봇
          </LogoTitle>
          <PageTitle>로그인</PageTitle>
          <PageSubtitle>
            서비스 이용을 위해 사원 정보를 입력해주세요.
          </PageSubtitle>
        </Header>

        {/* Form Section */}
        <Form onSubmit={handleLogin}>
          
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
                placeholder="성명 입력"
                value={formData.name}
                onChange={handleChange}
              />
            </InputWrapper>
          </FormGroup>

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

          <SubmitButton disabled={!isFormValid} $isValid={!!isFormValid}>
            로그인
            <ArrowRight size={18} strokeWidth={2.5} />
          </SubmitButton>

          <SignupLink>
            계정이 없으신가요? 
            <strong onClick={() => router.push('/sign')}>회원가입하기</strong>
          </SignupLink>

        </Form>
      </Card>
      
      <FooterInfo>
        © 2025 EXAONE Corp. All rights reserved.
      </FooterInfo>
    </Container>
  );
}

// --- Styled Components (Reference Style Applied) ---

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
  max-width: 440px; /* 로그인 창은 조금 더 좁게 설정 */
  background-color: #ffffff;
  border-radius: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 48px 40px;
  border: 1px solid #e2e8f0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const LogoTitle = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const RedDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #e11d48;
`;

const PageTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 12px;
`;

const PageSubtitle = styled.p`
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const Icon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
`;

const Input = styled.input`
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

const SubmitButton = styled.button<{ $isValid: boolean }>`
  margin-top: 12px;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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

const SignupLink = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 8px;
  
  strong {
    color: #e11d48;
    cursor: pointer;
    margin-left: 6px;
    font-weight: 600;
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