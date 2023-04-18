import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { HomeHeader } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import "./HomePage.css";

function HomePage() {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("안녕하세요, 이름님!"); // '홈' 값을 할당합니다.
  }, [setHeaderTitle]);

  return (
    <div className="homePage">
      <HomeHeader />
      <div>
        <div className="box1"></div>
        <div className="box2"></div>
        <div className="box3"></div>
        <div className="box4"></div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
