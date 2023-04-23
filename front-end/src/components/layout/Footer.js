import "./Footer.css";
import * as S from "./FooterStyle";

import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

export const Footer = () => {
  const location = useLocation();

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  return (
    <S.footer>
      <S.imgBtn>
        <S.footerHome>
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
        </S.footerHome>

        <S.footerCourse>
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
        </S.footerCourse>

        <S.footerRecord>
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
        </S.footerRecord>

        <S.footerPlog>
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
        </S.footerPlog>

        <S.footerMy>
          <NavLink to={"/my"} className="footerMyBtn">
            <Icon
              icon="mdi:account"
              className={
                isCurrentPage("/my") ? "footerMyIcon_active" : "footerMyIcon"
              }
            />
          </NavLink>
        </S.footerMy>
      </S.imgBtn>

      <S.textBtn>
        <S.footerHome>
          <NavLink to={"/home"} className="footerHomeBtn">
            <p className={isCurrentPage("/home") ? "activeText" : null}>홈</p>
          </NavLink>
        </S.footerHome>

        <S.footerCourse>
          <NavLink to={"/course"} className="footerCourseBtn">
            <p className={isCurrentPage("/course") ? "activeText" : null}>
              코스 보기
            </p>
          </NavLink>
        </S.footerCourse>

        <S.footerRecord>
          <NavLink to={"/record"} className="footerRecordBtn">
            <p className={isCurrentPage("/record") ? "activeText" : null}>
              기록하기
            </p>
          </NavLink>
        </S.footerRecord>

        <S.footerPlog>
          <NavLink to={"/plog"} className="footerPlogBtn">
            <p className={isCurrentPage("/plog") ? "activeText" : null}>
              플로그
            </p>
          </NavLink>
        </S.footerPlog>

        <S.footerMy>
          <NavLink to={"/my"} className="footerMyBtn">
            <p className={isCurrentPage("/my") ? "activeText" : null}>
              마이페이지
            </p>
          </NavLink>
        </S.footerMy>
      </S.textBtn>
    </S.footer>
  );
};
