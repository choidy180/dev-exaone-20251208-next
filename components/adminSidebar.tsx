'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styled, { css } from 'styled-components';
import { 
  Database, 
  Book, 
  Terminal, 
  Settings 
} from 'lucide-react';

// 메뉴 설정 (경로와 아이콘 매핑)
const MENU_ITEMS = [
  { 
    key: 'database', 
    label: 'Database 등록', 
    icon: Database, 
    href: '/admin/database' 
  },
  { 
    key: 'dictionary', 
    label: '용어 사전 등록', 
    icon: Book, 
    href: '/admin/dictionary' 
  },
  { 
    key: 'prompt', 
    label: 'Prompt 관리', 
    icon: Terminal, 
    href: '/admin/prompt' 
  },
  { 
    key: 'account', 
    label: '계정 관리', 
    icon: Settings, 
    href: '/admin/account' 
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // 현재 경로가 메뉴의 href를 포함하는지 확인 (서브 페이지 포함 활성화)
  // 예: /admin/database/detail 에서도 /admin/database 메뉴 활성화
  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <SidebarContainer>
      <SidebarHeader onClick={()=> router.push('/')}>
        <LogoRedDot />
        <LogoText>EXAONE 챗봇</LogoText>
        <Badge>ADMIN</Badge>
      </SidebarHeader>

      <NavList>
        {MENU_ITEMS.map((item) => (
          <NavItem 
            key={item.key}
            href={item.href}
            $active={isActive(item.href)}
          >
            <item.icon size={18} />
            {item.label}
          </NavItem>
        ))}
      </NavList>
    </SidebarContainer>
  );
}

// --- Styled Components ---

const SidebarContainer = styled.aside`
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  z-index: 10;
  height: 100vh;
`;

const SidebarHeader = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 8px;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
`;

const LogoRedDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #e11d48; /* rose-600 */
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

// Next.js Link 컴포넌트를 스타일링합니다.
// Transient Prop ($active)을 사용하여 DOM 경고를 방지합니다.
const NavItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none; /* 링크 밑줄 제거 */
  transition: all 0.2s;

  ${props => props.$active ? css`
    background-color: #fff1f2; /* rose-50 */
    color: #e11d48; /* rose-600 */
    font-weight: 600;
  ` : css`
    background-color: transparent;
    color: #64748b; /* slate-500 */
    &:hover {
      background-color: #f8fafc;
      color: #334155;
    }
  `}
`;