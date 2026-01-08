"use client";

import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { 
  Mail, 
  Lock, 
  ArrowRight,
  AlertTriangle,
  X 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showModal, setShowModal] = useState(false);
  const [lastChangedDate, setLastChangedDate] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(formData.email);
  const isFormValid = isEmailValid && formData.password.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateRandomDate = () => {
    const now = new Date();
    const minDays = 120;
    const maxDays = 365;
    const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
    const pastDate = new Date(now.setDate(now.getDate() - randomDays));
    return pastDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // 로그인 프로세스
  const processLogin = () => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));

    // [수정됨] 관리자 계정 체크 로직
    if (formData.email === 'admin@lg.com') {
      // 관리자용 쿠키 설정
      document.cookie = `user_email=${formData.email}; expires=${expires.toUTCString()}; path=/`;
      document.cookie = `user_name=${encodeURIComponent("관리자")}; expires=${expires.toUTCString()}; path=/`;
      document.cookie = `user_role=admin; expires=${expires.toUTCString()}; path=/`; 
      
      console.log("Admin Login Success -> Redirecting to Account Page");
      
      // [변경] 관리자 로그인 시 /admin/account 로 이동
      router.push('/admin/account'); 
    } else {
      // 일반 사용자 쿠키 설정
      document.cookie = `user_email=${formData.email}; expires=${expires.toUTCString()}; path=/`;
      document.cookie = `user_role=user; expires=${expires.toUTCString()}; path=/`;
      
      console.log("User Login Success");
      router.push('/'); // 메인 페이지로 이동
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    // 관리자는 비밀번호 변경 권유 모달 패스 (바로 로그인)
    if (formData.email === 'admin@lg.com') {
        processLogin();
        return;
    }

    // 일반 유저는 50% 확률로 모달 노출
    const shouldShowWarning = Math.random() < 0.5;
    if (shouldShowWarning) {
      setLastChangedDate(generateRandomDate());
      setShowModal(true);
    } else {
      processLogin();
    }
  };

  return (
    <Container>
      <Card>
        <Header>
          <LogoTitle>
            <RedDot />
            EXAONE 챗봇
          </LogoTitle>
          <PageTitle>로그인</PageTitle>
          <PageSubtitle>서비스 이용을 위해 이메일과 비밀번호를 입력해주세요.</PageSubtitle>
        </Header>

        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label>이메일</Label>
            <InputWrapper>
              <Icon><Mail size={18} /></Icon>
              <Input 
                type="email" name="email" placeholder="admin@lg.com"
                value={formData.email} onChange={handleChange}
                $hasError={formData.email.length > 0 && !isEmailValid}
              />
            </InputWrapper>
            {formData.email.length > 0 && !isEmailValid && (
              <ErrorMessage>올바른 이메일 형식이 아닙니다.</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>비밀번호</Label>
            <InputWrapper>
              <Icon><Lock size={18} /></Icon>
              <Input 
                type="password" name="password" placeholder="비밀번호 입력"
                value={formData.password} onChange={handleChange}
              />
            </InputWrapper>
          </FormGroup>

          <SubmitButton disabled={!isFormValid} $isValid={!!isFormValid}>
            로그인 <ArrowRight size={18} strokeWidth={2.5} />
          </SubmitButton>

          <SignupLink>
            계정이 없으신가요? <strong onClick={() => router.push('/sign')}>회원가입하기</strong>
          </SignupLink>
        </Form>
      </Card>
      
      <FooterInfo>© 2026 EXAONE Corp. All rights reserved.</FooterInfo>

      {/* 모달 UI */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <AlertIconWrapper>
                <AlertTriangle size={24} color="#ea580c" />
              </AlertIconWrapper>
              <h3>비밀번호 변경 안내</h3>
            </ModalHeader>
            <ModalBody>
              <p>
                소중한 개인정보 보호를 위해<br/>
                <strong>3개월마다 비밀번호 변경</strong>을 권장하고 있습니다.
              </p>
              <InfoBox>
                <span>마지막 변경일</span>
                <strong>{lastChangedDate}</strong>
              </InfoBox>
              <p className="desc">
                현재 비밀번호를 너무 오래 사용하셨습니다.<br/>
                새로운 비밀번호로 변경해주세요.
              </p>
            </ModalBody>
            <ModalFooter>
              <SecondaryButton onClick={processLogin}>다음에 변경</SecondaryButton>
              <PrimaryButton onClick={() => router.push('/change-password')}>지금 변경하기</PrimaryButton>
            </ModalFooter>
            <CloseButton onClick={processLogin}><X size={20}/></CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

// --- Styled Components (기존과 동일) ---
const Container = styled.div` display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; width: 100%; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; `;
const Card = styled.div` width: 100%; max-width: 440px; background-color: #ffffff; border-radius: 24px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); padding: 48px 40px; border: 1px solid #e2e8f0; `;
const Header = styled.div` text-align: center; margin-bottom: 40px; `;
const LogoTitle = styled.h1` font-size: 1.125rem; font-weight: 700; color: #0f172a; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 24px; `;
const RedDot = styled.span` width: 8px; height: 8px; border-radius: 50%; background-color: #e11d48; `;
const PageTitle = styled.h2` font-size: 1.875rem; font-weight: 800; color: #1e293b; margin-bottom: 12px; `;
const PageSubtitle = styled.p` font-size: 0.95rem; color: #64748b; line-height: 1.5; `;
const Form = styled.form` display: flex; flex-direction: column; gap: 20px; `;
const FormGroup = styled.div` display: flex; flex-direction: column; gap: 8px; `;
const Label = styled.label` font-size: 0.875rem; font-weight: 600; color: #475569; margin-left: 4px; `;
const InputWrapper = styled.div` position: relative; width: 100%; `;
const Icon = styled.div` position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; `;
const Input = styled.input<{ $hasError?: boolean }>` width: 100%; padding: 14px; padding-left: 42px; border-radius: 12px; border: 1px solid ${props => props.$hasError ? '#ef4444' : '#e2e8f0'}; background-color: #ffffff; font-size: 0.95rem; color: #1e293b; transition: all 0.2s; outline: none; &:focus { border-color: ${props => props.$hasError ? '#ef4444' : '#fda4af'}; box-shadow: 0 0 0 3px ${props => props.$hasError ? '#fee2e2' : '#fff1f2'}; } `;
const ErrorMessage = styled.span` font-size: 0.8rem; color: #ef4444; margin-left: 4px; font-weight: 500; `;
const SubmitButton = styled.button<{ $isValid: boolean }>` margin-top: 12px; width: 100%; padding: 16px; border-radius: 12px; border: none; font-size: 1rem; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: all 0.2s; ${props => props.$isValid ? css` background-color: #e11d48; color: white; &:hover { background-color: #be123c; transform: translateY(-1px); } ` : css` background-color: #f1f5f9; color: #cbd5e1; cursor: not-allowed; `} `;
const SignupLink = styled.p` text-align: center; font-size: 0.875rem; color: #64748b; margin-top: 8px; strong { color: #e11d48; cursor: pointer; font-weight: 600; } `;
const FooterInfo = styled.div` margin-top: 32px; font-size: 0.75rem; color: #94a3b8; `;
const modalFadeIn = keyframes` from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } `;
const ModalOverlay = styled.div` position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); `;
const ModalContent = styled.div` background: white; width: 90%; max-width: 400px; padding: 32px; border-radius: 20px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); position: relative; animation: ${modalFadeIn} 0.3s ease-out; text-align: center; `;
const ModalHeader = styled.div` display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; h3 { font-size: 1.25rem; font-weight: 700; color: #1e293b; margin-top: 16px; } `;
const AlertIconWrapper = styled.div` width: 48px; height: 48px; background-color: #fff7ed; border-radius: 50%; display: flex; align-items: center; justify-content: center; `;
const ModalBody = styled.div` color: #64748b; font-size: 0.95rem; line-height: 1.6; strong { color: #e11d48; } .desc { font-size: 0.875rem; margin-top: 24px; color: #94a3b8; } `;
const InfoBox = styled.div` background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; display: flex; justify-content: space-between; align-items: center; span { font-size: 0.875rem; color: #64748b; } strong { font-size: 0.95rem; color: #0f172a; } `;
const ModalFooter = styled.div` display: flex; gap: 12px; margin-top: 32px; `;
const PrimaryButton = styled.button` flex: 1; padding: 12px; background-color: #e11d48; color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; transition: 0.2s; &:hover { background-color: #be123c; } `;
const SecondaryButton = styled.button` flex: 1; padding: 12px; background-color: white; color: #64748b; border: 1px solid #e2e8f0; border-radius: 10px; font-weight: 600; cursor: pointer; transition: 0.2s; &:hover { background-color: #f1f5f9; color: #1e293b; } `;
const CloseButton = styled.button` position: absolute; top: 16px; right: 16px; background: none; border: none; color: #94a3b8; cursor: pointer; &:hover { color: #1e293b; } `;