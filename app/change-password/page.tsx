"use client";

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Lock, Check, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 유효성 검사
  const isFilled = formData.currentPassword && formData.newPassword && formData.confirmPassword;
  const isMatch = formData.newPassword === formData.confirmPassword;
  const isValid = isFilled && isMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    // TODO: 서버로 비밀번호 변경 요청 API 호출
    console.log('Password Changed:', formData);

    // 변경 완료 처리 (쿠키 갱신 및 홈으로 이동)
    // 실제로는 API 성공 응답 후 처리해야 합니다.
    alert("비밀번호가 성공적으로 변경되었습니다.");
    
    // 예시: 로그인 유지를 위해 쿠키 설정 (실제론 서버 토큰 갱신 필요)
    const expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = `user_email=updated_user@example.com; expires=${expires.toUTCString()}; path=/`;

    router.push('/');
  };

  return (
    <Container>
      <Card>
        <Header>
          <BackButton onClick={() => router.back()}>
            <ArrowLeft size={20} />
          </BackButton>
          <IconCircle>
            <ShieldCheck size={32} color="#e11d48" />
          </IconCircle>
          <PageTitle>비밀번호 변경</PageTitle>
          <PageSubtitle>
            안전한 계정 사용을 위해<br/>새로운 비밀번호를 설정해주세요.
          </PageSubtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          {/* 현재 비밀번호 */}
          <FormGroup>
            <Label>현재 비밀번호</Label>
            <InputWrapper>
              <Icon><Lock size={18} /></Icon>
              <Input 
                type="password" name="currentPassword" 
                placeholder="현재 사용 중인 비밀번호"
                value={formData.currentPassword} onChange={handleChange}
              />
            </InputWrapper>
          </FormGroup>

          <Divider />

          {/* 새 비밀번호 */}
          <FormGroup>
            <Label>새 비밀번호</Label>
            <InputWrapper>
              <Icon><Lock size={18} /></Icon>
              <Input 
                type="password" name="newPassword" 
                placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                value={formData.newPassword} onChange={handleChange}
              />
            </InputWrapper>
          </FormGroup>

          {/* 새 비밀번호 확인 */}
          <FormGroup>
            <Label>새 비밀번호 확인</Label>
            <InputWrapper>
              <Icon><Lock size={18} /></Icon>
              <Input 
                type="password" name="confirmPassword" 
                placeholder="새 비밀번호 다시 입력"
                value={formData.confirmPassword} onChange={handleChange}
                $hasError={formData.confirmPassword.length > 0 && !isMatch}
              />
            </InputWrapper>
            {formData.confirmPassword.length > 0 && !isMatch && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
            {formData.confirmPassword.length > 0 && isMatch && (
              <SuccessMessage><Check size={12}/> 비밀번호가 일치합니다.</SuccessMessage>
            )}
          </FormGroup>

          <SubmitButton disabled={!isValid} $isValid={!!isValid}>
            변경완료
          </SubmitButton>
        </Form>
      </Card>
    </Container>
  );
}

// --- Styled Components ---

const Container = styled.div`
  display: flex; align-items: center; justify-content: center;
  min-height: 100vh; width: 100%; background-color: #f8fafc;
  padding: 24px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;
const Card = styled.div`
  width: 100%; max-width: 440px; background-color: #ffffff; border-radius: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); padding: 48px 40px; border: 1px solid #e2e8f0; position: relative;
`;
const Header = styled.div` text-align: center; margin-bottom: 32px; display: flex; flex-direction: column; align-items: center; `;
const BackButton = styled.button`
  position: absolute; top: 24px; left: 24px; background: none; border: none; color: #94a3b8; cursor: pointer; padding: 8px; border-radius: 50%;
  &:hover { background-color: #f1f5f9; color: #475569; }
`;
const IconCircle = styled.div` width: 64px; height: 64px; background-color: #fff1f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; `;
const PageTitle = styled.h2` font-size: 1.5rem; font-weight: 800; color: #1e293b; margin-bottom: 8px; `;
const PageSubtitle = styled.p` font-size: 0.95rem; color: #64748b; line-height: 1.5; `;
const Form = styled.form` display: flex; flex-direction: column; gap: 20px; `;
const FormGroup = styled.div` display: flex; flex-direction: column; gap: 8px; `;
const Label = styled.label` font-size: 0.875rem; font-weight: 600; color: #475569; margin-left: 4px; `;
const InputWrapper = styled.div` position: relative; width: 100%; `;
const Icon = styled.div` position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; `;
const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%; padding: 14px; padding-left: 42px; border-radius: 12px;
  border: 1px solid ${props => props.$hasError ? '#ef4444' : '#e2e8f0'}; background-color: #ffffff;
  font-size: 0.95rem; color: #1e293b; transition: all 0.2s; outline: none;
  &:focus { border-color: ${props => props.$hasError ? '#ef4444' : '#fda4af'}; box-shadow: 0 0 0 3px ${props => props.$hasError ? '#fee2e2' : '#fff1f2'}; }
`;
const ErrorMessage = styled.span` font-size: 0.8rem; color: #ef4444; margin-left: 4px; font-weight: 500; `;
const SuccessMessage = styled.span` font-size: 0.8rem; color: #10b981; margin-left: 4px; font-weight: 500; display: flex; align-items: center; gap: 4px; `;
const Divider = styled.hr` border: none; border-top: 1px dashed #e2e8f0; margin: 8px 0; `;
const SubmitButton = styled.button<{ $isValid: boolean }>`
  margin-top: 12px; width: 100%; padding: 16px; border-radius: 12px; border: none; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
  ${props => props.$isValid ? css` background-color: #e11d48; color: white; &:hover { background-color: #be123c; transform: translateY(-1px); } ` : css` background-color: #f1f5f9; color: #cbd5e1; cursor: not-allowed; `}
`;