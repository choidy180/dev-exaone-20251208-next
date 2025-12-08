// components/side/one-tier-box1.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GoChevronRight } from "react-icons/go";
import { PiChartBarFill, PiLinkSimpleBreak, PiListChecksFill } from "react-icons/pi";
import styled from "styled-components";
import { RiSettings5Fill } from "react-icons/ri";
import { BiSolidBarChartSquare, BiSolidFactory } from "react-icons/bi";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { useSliderStore } from "@/store/sliderStore";

export interface MenuItem {
  title: string;
  link: string;
  iconType?: string;
  sections?: MenuItem[];
}

interface SideBarBasicProps {
  title: string;        // 슬라이더 탭 제목
  iconType: string;     // 아이콘
  link: string;         // 링크
  active: string;       // 선택한 상태
  menuItem?: MenuItem[]; // 메뉴 아이템 목록 (없을 수 있음)
  isSideBarUpdate: React.Dispatch<React.SetStateAction<string>>;
}

const TRANSITION_MS = 300; // 트랜지션 시간 (ms)

const SideOneTierBox1 = ({
  title,
  iconType,
  active,
  link,
  menuItem,
  isSideBarUpdate,
}: SideBarBasicProps) => {
  const [focus, setFocus] = useState(false);
  const [heightPx, setHeightPx] = useState<number | "auto">(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // ✅ 하위(2티어) 메뉴 중 현재 "열린" 아이템의 title을 저장 (형제 간 공유)
  const [openKey, setOpenKey] = useState<string>("");

  const isOpen = useMemo(() => active === title, [active, title]);

  const { setMain } = useSliderStore();

  // 상단 one-tier 포커스 아이콘 회전 상태
  useEffect(() => {
    setFocus(isOpen);
    // 섹션이 닫힐 때 하위도 접기
    if (!isOpen) setOpenKey("");
  }, [isOpen]);

  // 열기/닫기 트랜지션 처리
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (isOpen) {
      // 열기: 0 → scrollHeight(px) → (트랜지션 끝) auto
      const full = el.scrollHeight;
      setHeightPx(0);
      requestAnimationFrame(() => setHeightPx(full));

      const t = setTimeout(() => {
        setHeightPx("auto");
      }, TRANSITION_MS);
      return () => clearTimeout(t);
    } else {
      // 닫기: (현재 auto라면 실제 높이로 고정) → 0
      const currentHeight =
        heightPx === "auto" ? el.getBoundingClientRect().height : heightPx;
      setHeightPx(currentHeight as number);
      requestAnimationFrame(() => setHeightPx(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const zustandHandler = (title: string) => {
    isSideBarUpdate(title);
    setMain(title);
    // 상위 섹션을 새로 열 때, 하위 열림 상태 초기화(기존 열림 취소)
    setOpenKey("");
  };

  return (
    <Container>
      <div
        className={`nav-item-one insight-menu one-tier ${isOpen ? "active" : ""}`}
        onClick={() =>
          !isOpen ? zustandHandler(title) : console.log("이벤트 준비중..")
        }
      >
        {iconType === "barChart" && <PiChartBarFill />}
        {iconType === "barChart2" && <BiSolidBarChartSquare />}
        {iconType === "checkFill" && <PiListChecksFill />}
        {iconType === "LinkSimpleBreak" && <PiLinkSimpleBreak />}
        {iconType === "setting" && <RiSettings5Fill />}
        {iconType === "monitor" && <MdOutlineScreenshotMonitor />}
        {iconType === "factory" && <BiSolidFactory />}

        <span>{title}</span>
        <GoChevronRight className={`chevron ${focus ? "focus" : ""}`} />
      </div>
    </Container>
  );
};

export default SideOneTierBox1;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  background-color: #20222a;

  .one-tier:hover {
    background: linear-gradient(90deg, #f33e47 0%, #f2593e 100%);
  }

  .nav-item-one {
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    padding: var(--font-size-2xl) var(--spacing-lg);
    cursor: pointer;
    transition: var(--transition-normal);
    position: relative;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    @media (max-width: 768px) {
      height: 60px;
    }

    svg {
      width: 20px;
      margin-right: var(--spacing-md);
      font-size: var(--font-size-base);
      color: white;

      &.chevron {
        margin: 0;
        transform: translateX(0px) scale(1);
        opacity: 0.7;
        transition: transform ${TRANSITION_MS}ms ease-in-out, opacity 150ms ease-in-out;

        &.focus {
          transform: rotate(90deg);
        }
      }
    }

    span {
      flex: 1;
      font-size: var(--font-size-xl);
      font-weight: 400;
      letter-spacing: -1px;
      color: var(--text-neutral-white);
      height: 32px;
      display: flex;
      align-items: center;
    }

    &.active {
      background: linear-gradient(90deg, #f33e47 0%, #f2593e 100%);
    }
  }

  .sub-menu {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;

    transition: height ${TRANSITION_MS}ms ease-in-out;
    will-change: height;
  }
`;
