import Image from "next/image";
import styled from "styled-components";
// import ScctLogo from "@/public/logo/logo-scct.svg";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import SideOneTierBox1 from "./one-tier-box1";
import type { SliderExampleRoot, SliderItem } from "@/types/slider";
import Gshinsung from "@/public/logo/gshinsung.svg";

interface NavBarBasicProps {
  dataList: SliderExampleRoot; // ✅ 배열
  isSideBarOpen: boolean;
  updateSideBarUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const BasicSlider = ({ dataList, isSideBarOpen, updateSideBarUpdate }: NavBarBasicProps) => {
  const [activeState, setActiveState] = useState<string>("");

  useEffect(() => {
    // ✅ 배열이라면 이렇게 접근
    // 전체 확인시
    // dataList.forEach(i => console.log(i.title));
  }, [dataList]);

  return (
    <>
      <DarkBox
        className={`dark-box ${isSideBarOpen ? "" : "hide"}`}
        onClick={() => updateSideBarUpdate(false)}
      />

      <Container className={`${isSideBarOpen ? "" : "hide"}`}>
        <div className="sidebar-header">
          {
            dataList.title === '신성델타테크' &&
            (
              <Image src={Gshinsung} width={200} height={25} alt="gsinsung" />
            )
          }
          <LuPlus className="cancel-btn rotate45" onClick={() => updateSideBarUpdate(false)} />
        </div>

        {/* ✅ prop으로 받은 dataList를 순회 */}
        {dataList.data.map((item) => (
          <SideOneTierBox1
            key={item.title}
            title={item.title}
            link={item.link}
            iconType={item.icon}
            active={activeState}
            menuItem={item.sections}
            isSideBarUpdate={() => setActiveState(item.title)}
          />
        ))}
      </Container>
    </>
  );
};

export default BasicSlider;

/* --- styles 그대로 --- */
const DarkBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  background: var(--color-dark-blue);
  opacity: 0.6;
  display: none;
  @media (max-width: 1280px) {
    display: block !important;
  }
  &.hide {
    display: none !important;
  }
`;

const Container = styled.div`
  /* 폭만 고정, 높이는 자동으로 콘텐츠에 맞게 늘어나게 */
  flex: 0 0 280px;              /* ← width 고정 (flex-basis) */
  width: 280px;                 /* (선호 시 유지) */
  height: auto;                 /* ← 고정 높이 제거 */
  min-height: 100vh;
  /* min-height: 100vh;  제거 */
  /* height: 100%;        제거 */

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: stretch;          /* ← 부모 flex에서 높이 늘어나게 */

  background: #20222a;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  transition: margin-left 0.4s ease;
  z-index: 10;

  /* 데스크톱에서 스크롤 따라 고정하고 싶다면 */
  position: sticky;
  top: 0;                       /* 헤더 높이 있으면 그만큼 조정 */
  max-height: 100dvh;           /* 뷰포트 밖으로 넘치면 내부 스크롤 */
  overflow: auto;

  &.hide {
    margin-left: -280px;
  }

  /* 모바일에서는 오버레이로 전환 */
  @media (max-width: 1280px) {
    position: absolute;         /* 오버레이 */
    top: 0;
    left: 0;
    height: 100dvh;             /* 오버레이는 화면 가득 */
    max-height: 100dvh;
    overflow: auto;
  }

  @media (max-width: 480px) {
    max-width: 92vw !important;
    &.hide { margin-left: -100vw; }
  }

  @media (max-width: 1280px) {
    position: absolute;
  }
  @media (max-width: 480px) {
    max-width: 92vw !important;
  }
  &.hide {
    margin-left: -280px;
    @media (max-width: 480px) {
      margin-left: -100vw;
    }
  }

  .rotate45 {
    transform: rotate(45deg);
  }
  .cancel-btn {
    position: absolute;
    display: none;
    right: 4px;
    top: 4px;
    color: #9a9daa;
    width: 28px;
    height: 28px;
    cursor: pointer;
    @media (max-width: 1280px) {
      display: block;
    }
  }
  .sidebar-header {
    width: 100%;
    padding: 60px var(--spacing-lg) var(--spacing-xl);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .logo-subtitle {
    margin-top: 6px;
  }
  .nav-item {
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
        transition: all ease-in-out 0.15s;
        &.focus {
          rotate: 0deg;
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
`;
