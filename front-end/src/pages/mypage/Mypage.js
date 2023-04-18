import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { HomeHeader } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import "./MyPage.css";

function MyPage() {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("이름님"); // '홈' 값을 할당합니다.
  }, [setHeaderTitle]);

  return (
    <div className="myPage">
      <HomeHeader />
      <div>마이페이지</div>
      <Footer />
    </div>
  );
}

export default MyPage;
