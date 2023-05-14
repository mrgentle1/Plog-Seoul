import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { HomeHeader } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { ReactComponent as Flag } from "../../assets/icons/flag.svg";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import { ReactComponent as Footprint } from "../../assets/icons/footprint.svg";
import { ReactComponent as Tree } from "../../assets/icons/tree.svg";

import axios from "axios";
import styled from "styled-components";
import { COLOR } from "../../styles/color";

function HomePage() {
  const token = localStorage.getItem("key");
  const [username, setUserName] = useState("");

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    axios
      .get("http://3.37.14.183/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setUserName(response.data.result.nickname);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const headertext = "안녕하세요, " + username + "님!";
  useEffect(() => {
    setHeaderTitle(headertext); // '홈' 값을 할당합니다.
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StHomePage>
      <div>
        <Box1>
          <LeftBox1>
            <Flag className="flag" />
            <Text1>봄 추천 나들이길</Text1>
            <Arrow className="arrow" />
          </LeftBox1>
          <RightBox1>
            <Footprint className="footprint" />
            <Text2>서울두드림길이란?</Text2>
            <Arrow className="arrow" />
          </RightBox1>
        </Box1>
        <Box2></Box2>
        <Box3>
          <Tree className="tree" />
        </Box3>
        <Box4>
          <Text4>오늘도 주워볼까요?</Text4>
        </Box4>
      </div>
      <Footer />
    </StHomePage>
  );
}

export default HomePage;

const StHomePage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Box1 = styled.div`
  width: 100%;
  height: 121px;
  margin-bottom: 13px;
`;
const LeftBox1 = styled.div`
  float: left;
  width: 170px;
  height: 121px;
  border-radius: 14px;
  background-color: ${COLOR.MAIN_WHITE};
  padding: 12px 16px;

  .flag {
    width: 20px;
    height: 20px;
    color: ${COLOR.DARK_GRAY};
    margin-bottom: 12px;
  }
  .arrow {
    margin-top: 15px;
    width: 25px;
    height: 25px;
    color: ${COLOR.MAIN_GREEN};
    margin-bottom: 10px;
  }
`;
const Text1 = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.DARK_GRAY};
`;

const RightBox1 = styled.div`
  float: right;
  width: 170px;
  height: 121px;
  border-radius: 14px;
  background: ${COLOR.MAIN_WHITE};
  border-radius: 14px;
  padding: 12px 16px;

  .footprint {
    width: 20px;
    height: 20px;
    color: ${COLOR.DARK_GRAY};
    margin-bottom: 12px;
  }
  .arrow {
    margin-top: 15px;
    width: 25px;
    height: 25px;
    color: ${COLOR.MAIN_GREEN};
    margin-bottom: 10px;
  }
`;
const Text2 = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.DARK_GRAY};
`;

const Box2 = styled.div`
  margin-bottom: 13px;
  width: 353px;
  height: 101px;
  background: ${COLOR.MAIN_WHITE};
  border-radius: 14px;
  padding: 12px 16px;
`;
const Box3 = styled.div`
  margin-bottom: 13px;
  width: 353px;
  height: 121px;
  // border: 2px solid ${COLOR.MAIN_GREEN_HOVER};
  border-radius: 14px;
  padding: 12px 16px;
  background-color: ${COLOR.MAIN_WHITE};

  .tree {
    width: 20px;
    height: 20px;
    color: ${COLOR.DARK_GRAY};
    margin-bottom: 15px;
  }
`;
const Box4 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 13px;
  width: 353px;
  height: 101px;
  background: ${COLOR.MAIN_GREEN};
  border: 2px solid ${COLOR.MAIN_GREEN_HOVER};
  border-radius: 14px;
`;
const Text4 = styled.div`
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 15px;
  margin-left: 20px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${COLOR.MAIN_BLACK};
`;
