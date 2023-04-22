import "./Footer.css";

import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

export const Footer = () => {
  const location = useLocation();

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="footer">
      <div className="imgBtn">
        <div className="footerHome">
          <NavLink to={"/home"} className="footerHomeBtn">
            <Icon
              icon="material-symbols:home"
              className={
                isCurrentPage("/home")
                  ? "footerHomeIcon_active"
                  : "footerHomeIcon"
              }
            />
          </NavLink>
        </div>

        <div className="footerCourse">
          <NavLink to={"/course"} className="footerCourseBtn">
            <Icon
              icon="mdi:image-filter-hdr"
              className={
                isCurrentPage("/course")
                  ? "footerCourseIcon_active"
                  : "footerCourseIcon"
              }
            />
          </NavLink>
        </div>

        <div className="footerRecord">
          <NavLink to={"/record"} className="footerRecordBtn">
            <Icon
              icon="material-symbols:directions-run"
              className={
                isCurrentPage("/record")
                  ? "footerRecordIcon_active"
                  : "footerRecordIcon"
              }
            />
          </NavLink>
        </div>

        <div className="footerPlog">
          <NavLink to={"/plog"} className="footerPlogBtn">
            <Icon
              icon="material-symbols:calendar-view-month-sharp"
              className={
                isCurrentPage("/plog")
                  ? "footerPlogIcon_active"
                  : "footerPlogIcon"
              }
            />
          </NavLink>
        </div>

        <div className="footerMy">
          <NavLink to={"/my"} className="footerMyBtn">
            <Icon
              icon="mdi:account"
              className={
                isCurrentPage("/my") ? "footerMyIcon_active" : "footerMyIcon"
              }
            />
          </NavLink>
        </div>
      </div>

      <div className="textBtn">
        <div className="footerhome">
          <NavLink to={"/home"} className="footerHomeBtn">
            <p className={isCurrentPage("/home") ? "activeText" : null}>홈</p>
          </NavLink>
        </div>

        <div className="footercourse">
          <NavLink to={"/course"} className="footerCourseBtn">
            <p className={isCurrentPage("/course") ? "activeText" : null}>
              코스 보기
            </p>
          </NavLink>
        </div>

        <div className="footerrecord">
          <NavLink to={"/record"} className="footerRecordBtn">
            <p className={isCurrentPage("/record") ? "activeText" : null}>
              기록하기
            </p>
          </NavLink>
        </div>

        <div className="footerplog">
          <NavLink to={"/plog"} className="footerPlogBtn">
            <p className={isCurrentPage("/plog") ? "activeText" : null}>
              플로그
            </p>
          </NavLink>
        </div>

        <div className="footermy">
          <NavLink to={"/my"} className="footerMyBtn">
            <p className={isCurrentPage("/my") ? "activeText" : null}>
              마이페이지
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
