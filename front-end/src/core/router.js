import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";

import KakaoCallback from "../pages/login/KakaoCallback";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import HomePage from "../pages/home/HomePage";
import CoursePage from "../pages/course/CoursePage";
import RecordPage from "../pages/record/RecordPage";
import PlogPage from "../pages/plog/PlogPage";
import MyPage from "../pages/mypage/Mypage";
import SearchPage from "../pages/search/Search";
import CoursePostPage from "../pages/course/CoursePostPage";
import CourseMainPage from "../pages/course/CourseMainPage";
import ReviewPage from "../pages/review/ReviewPage";
import ReviewWritePage from "../pages/review/ReviewWritePage";
import NoticePage from "../pages/mypage/NoticePage";
import LevelPage from "../pages/plog/LevelPage";
import AchievementPage from "../pages/plog/AchievementPage";
import SeasonCoursePage from "../pages/home/SeasonCoursePage";
import InformationPage from "../pages/home/InformationPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/auth/kakao-callback" element={<KakaoCallback />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/course/:id" element={<CoursePostPage />} />
        <Route path="/course/main" element={<CourseMainPage />} />
        <Route path="/course/:id/reviews" element={<ReviewPage />} />
        <Route path="/course/:id/review" element={<ReviewWritePage />} />
        <Route path="/my/notice" element={<NoticePage />} />
        <Route path="/plog/level" element={<LevelPage />} />
        <Route path="/plog/achievement" element={<AchievementPage />} />
        <Route path="/home/season" element={<SeasonCoursePage />} />
        <Route path="/info" element={<InformationPage />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/plog" element={<PlogPage />} />
          <Route path="/my" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
