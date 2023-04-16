import { HomeHeader } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import "./HomePage.css";

function HomePage() {
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
