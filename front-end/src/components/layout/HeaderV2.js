import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useRecoilValue } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { NavLink } from "react-router-dom";

export const HomeHeaderV2 = ({ headerBackground }) => {
  const headerTitle = useRecoilValue(headerTitleState);

  return (
    <StHomeHeader backgroundColor={headerBackground}>
      <StHeaderTitle
        color={
          headerBackground === COLOR.MAIN_WHITE
            ? COLOR.MAIN_BLACK
            : COLOR.MAIN_WHITE
        }
      >
        {headerTitle}
      </StHeaderTitle>
      <StHeaderSearch
        color={
          headerBackground === COLOR.MAIN_WHITE
            ? COLOR.MAIN_BLACK
            : COLOR.MAIN_WHITE
        }
      >
        <NavLink to="/search">
          <Search className="headerSearch" />
        </NavLink>
      </StHeaderSearch>
    </StHomeHeader>
  );
};

const StHomeHeader = styled.div`
  position: fixed;
  top: 0;
  width: 400px;
  height: 127px;
  padding: 66px 0 36px 20px;

  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 15px;
  border: 0;

  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-evenly;
  align-items: center;

  z-index: 100;

  background-color: ${(props) => props.backgroundColor};
`;
const StHeaderTitle = styled.span`
  width: 100%;
  height: 50px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  margin-top: 30px;
  color: ${(props) => props.color};
`;

const StHeaderSearch = styled.div`
  margin-right: 20px;
  margin-top: 3px;
  width: 25px;
  height: 25px;

  .headerSearch {
    width: 25px;
    height: 25px;
    color: ${(props) => props.color};
  }
`;
