import "./Footer.css";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footerHome">
        <NavLink to={"/home"} className="footerHomeBtn">
          <Icon icon="material-symbols:home" className="footerHomeIcon" />
        </NavLink>
        <Link
          to={"/home"}
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <p>홈</p>
        </Link>
      </div>

      <div className="footerCourse">
        <NavLink to={"/course"} className="footerCourseBtn">
          <Icon icon="mdi:image-filter-hdr" className="footerCourseIcon" />
        </NavLink>
        <Link
          to={"/course"}
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <p>코스 보기</p>
        </Link>
      </div>

      <div className="footerRecord">
        <NavLink to={"/record"} className="footerRecordBtn">
          <Icon
            icon="material-symbols:directions-run"
            className="footerRecordIcon"
          />
        </NavLink>
        <Link
          to={"/record"}
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <p>기록하기</p>
        </Link>
      </div>

      <div className="footerPlog">
        <NavLink to={"/plog"} className="footerPlogBtn">
          <Icon
            icon="material-symbols:calendar-view-month-sharp"
            className="footerPlogIcon"
          />
        </NavLink>
        <Link
          to={"/plog"}
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <p>플로그</p>
        </Link>
      </div>

      <div className="footerMy">
        <NavLink to={"/my"} className="footerMyBtn">
          <Icon icon="mdi:account" className="footerMyIcon" />
        </NavLink>
        <Link
          to={"/my"}
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <p>마이페이지</p>
        </Link>
      </div>
    </div>
  );
};
