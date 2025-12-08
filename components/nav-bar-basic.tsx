import { PiListBold } from "react-icons/pi";
import styled from "styled-components";
import Gshinsung from '@/public/logo/logo_bk.svg';
import Image from "next/image";
import { LuPlus } from "react-icons/lu";
import { HiUserCircle } from "react-icons/hi";
import { useFocusServiceStore } from "@/store/focusService";
import { useSliderStore } from "@/store/sliderStore";

interface NavBarBasicProps {
  isSideBarOpen: boolean,
  updateSideBarUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBarBasic = ({isSideBarOpen, updateSideBarUpdate} : NavBarBasicProps) => {
  const { title } = useFocusServiceStore();
  const { main, sub, tertiary } = useSliderStore();
  // 사이드바 상태 반전
  const handleToggle = () => {
    updateSideBarUpdate((prev) => !prev);
  }
  return (
    <Container>
      <div className="container">
        <button className="sidebar-toggle-btn" id="sidebar-toggle-btn" aria-label="사이드바 열기" onClick={handleToggle}>
          {
            isSideBarOpen ?
            (
              <LuPlus className="rotate45"/>
            ) :
            (
              <PiListBold />
            )
          }
        </button>
        {
          title === "SCTT" &&
          (
            <p className="breadcrumbs">
              {main}
              {sub !== "" && " / "}
              {sub}
              <span>{tertiary}</span>
            </p>
          )
        }
        {/* <Image
          src={Gshinsung}
          width={170}
          height={22}
          alt="gsinsung"
        /> */}
      </div>
      <div className="container right">
        <div className="user-info">
          <HiUserCircle />
          <span>관리자</span>
        </div>
      </div>
    </Container>
  )
}

export default NavBarBasic;

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--background-white-color);
  border-bottom: 1px solid var(--line-border);
  padding: var(--spacing-lg) 30px;
  @media (max-width: 768px) {
    height: 50px;
    padding-left: 0;

    img {
      display: none;
    }
  }

  .container {
    display:flex;
    justify-content: start;
    align-items: center;
    gap: 10px;

    &.right {
      justify-content: end;
    }
  }

  .sidebar-toggle-btn {
    color: var(--text-neutral-white);
    font-size: 1.375em;
    transition: background 0.2s, left 0.3s, top 0.3s, color 0.3s;
    background: var(--background-white-color);
    width: 40px;
    height: 40px;
    border: 1px solid var(--line-border);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      width: 50px;
      height: 50px;
      border-radius: 0;
      border: none;
      border-right: 1px solid var(--line-border);
    }

    svg {
      color: #9A9DAA;
      width: 24px;
      height: 24px;
    }

    .rotate45{
      transform: rotate(45deg);
    }
  }

  .user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    svg {
      width: 28px;
      height: 28px;
    }
    span {
      font-size: var(--font-size-xl);
      font-weight: 500;
      color: var(--text-neutral-medium);
    }
  }
  .breadcrumbs {
    font-size: var(--font-size-xl);
    font-weight: 500;
    color: var(--color-text-neutral-medium);
  }
`