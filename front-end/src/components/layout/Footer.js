import "./Footer.css";

import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { ReactComponent as Course } from "../../assets/icons/course.svg";
import { ReactComponent as Record } from "../../assets/icons/record.svg";
import { ReactComponent as Plog } from "../../assets/icons/plog.svg";
import { ReactComponent as My } from "../../assets/icons/my.svg";

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
            <Home
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
            <Course
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
            <Record
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
            <Plog
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
            <My
              className={
                isCurrentPage("/my") ? "footerMyIcon_active" : "footerMyIcon"
              }
            />
          </NavLink>
        </div>
      </div>

      <div className="textBtn">
        <div className="footerHome">
          <NavLink to={"/home"} className="footerHomeBtn">
            <p className={isCurrentPage("/home") ? "activeText" : null}>홈</p>
          </NavLink>
        </div>

        <div className="footerCourse">
          <NavLink to={"/course"} className="footerCourseBtn">
            <p className={isCurrentPage("/course") ? "activeText" : null}>
              코스 보기
            </p>
          </NavLink>
        </div>

        <div className="footerRecord">
          <NavLink to={"/record"} className="footerRecordBtn">
            <p className={isCurrentPage("/record") ? "activeText" : null}>
              기록하기
            </p>
          </NavLink>
        </div>

        <div className="footerPlog">
          <NavLink to={"/plog"} className="footerPlogBtn">
            <p className={isCurrentPage("/plog") ? "activeText" : null}>
              플로그
            </p>
          </NavLink>
        </div>

        <div className="footerMy">
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
