import "./Header.css";
import { useRecoilValue } from "recoil";
import { headerTitleState } from "../../core/headerTitle";

export const HomeHeader = () => {
  const headerTitle = useRecoilValue(headerTitleState);

  return (
    <div className="homeHeader">
      <span className="header-title">{headerTitle}</span>
    </div>
  );
};
