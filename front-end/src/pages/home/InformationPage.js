import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function InformationPage() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StInformationPage>
      <InfoHeader>
        <BackArrow className="noticeBackArrow" onClick={goBack} />
        <HeaderText>서울 두드림길</HeaderText>
      </InfoHeader>
      <InfoContent>
        <img className="image" src={require("../../assets/images/info1.jpg")} />
        <InfoText>
          서울의 아름다운 생태, 역사, 문화자원을 천천히 걸으면서 느끼고 배우고
          체험할 수 있는 도보중심의 길로서 도심에서
          <span> ‘자연의 느림과 여유’</span>를 만끽할 수 있는 걷기코스입니다.
          <br />
          <br />
          서울두드림길은{" "}
          <span>
            서울둘레길, 한양 도성길, 근교산자락길, 생태문화길, 한강/지천길
          </span>
          로 크게 구분됩니다.
        </InfoText>

        <img className="image" src={require("../../assets/images/info2.jpg")} />
        <InfoText>
          <h1>서울둘레길</h1>
          서울을 한 바퀴 휘감는 총 연장 156.5km의 서울둘레길은 <span>8개</span>
          코스로 서울의 역사, 문화, 자연생태 등을 스토리로 엮어 국내외
          탐방객들이 느끼고, 배우고, 체험할 수 있도록 조성한 도보길입니다.
          <br />
          <br />
          서울둘레길은 <span>‘숲길’, ‘하천길’, ‘마을길’</span>로 구성되어
          있습니다. <br /> 둘레길 곳곳에 휴게시설과 북카페, 쉼터를 만들어
          시민들이 자연스럽게 휴식을 취할 수 있게 했고, 전통 깊은 사찰과
          유적지을 연결해
          <span> 서울의 역사와 문화, 자연생태</span>를 곳곳에서 체험할 수 있도록
          조성하였습니다. <br />
          <br />
          대중교통으로도 접근하기 쉬우며 주로 경사가 심하지 않은 흙길로 되어
          있어 누구나 안전하고 편안하게 이용할 수 있습니다.
        </InfoText>

        <img className="image" src={require("../../assets/images/info3.jpg")} />
        <InfoText>
          <h1>한양 도성길</h1>
          한양도성은 1396년 현재{" "}
          <span>
            서울의 도심부를 감싸고 있는 백악·낙타·목멱·인왕의 능선을 따라
          </span>{" "}
          처음 축조된 이후 여러 차례 개축되었다. 평균 높이 약 7~8m, 전체 길이 약
          18.6km에 이르며,{" "}
          <span>현존하는 세계의 도성 중 가장 오랫동안 도성 기능을 수행</span>
          했다. <br />
          <br /> 한양도성에는 4대문과 4소문이 있다. <br />
          4대문은 숙정문·흥인지문·숭례문·돈의문이며, 4소문은
          창의문·혜화문·광희문·소의문이다. <br />
          <br />
          한양도성길은 창의문에서 혜화문에 이르는 백악 구간, 혜화문을 지나
          흥인지문까지 이어지는 낙산 구간, 흥인지문에서 장충체육관에 이르는
          흥인지문구간, 장충체육관에서 남산공원까지 이어지는 남산 구간,
          백범광장을 지나 돈의문 터까지 이르는 숭례문 구간, 마지막으로 돈의문
          터에서 창의문까지 이어지는 인왕산 구간으로 나뉘어진다.
        </InfoText>

        <img className="image" src={require("../../assets/images/info4.jpg")} />
        <InfoText>
          <h1>근교산자락길</h1>
          주택가 주변 풍경이 아름다운 곳에 경사가 완만한 등산로를 조성하여
          <span>노약자 및 가족단위의 등산편익</span>을 제공하고자 조성중인
          길입니다. <br />
          <br /> 서울 근교산 등산코스 중 <span>접근성이 뛰어난 곳</span>을
          선정하여 휠체어를 타는 장애인이나 유모차를 가지고 나온 엄마, 어린이,
          노약자 등도 불편 없이 이용할 수 있도록 조성중인{" "}
          <span>무장애숲길</span>입니다. <br />
          <br /> 2012년 안산, 관악산 근교산 자락길 조성사업을 시작으로, 매년
          자락길을 조성하고 있으며 2018년까지 매봉산, 배봉산 등 총 23개소
          53.4Km의 자락길을 조성 할 계획입니다.
        </InfoText>

        <img className="image" src={require("../../assets/images/info5.jpg")} />
        <InfoText>
          <h1>생태문화길</h1>
          주민 및 트래킹 전문가가 참여하여{" "}
          <span>서울시의 역사, 문화, 생태자원</span>이 잘 연계된 걷기 좋은
          코스를 선정한 것으로 서울 전역에 걸쳐 접근성이 용이하고 경관이 우수한
          코스들로 구성되어 있습니다. <br />
          <br />
          2010년 110개 코스를 선정하였고 2011년 23개 코스를 추가하여 총 연장
          851km, 133개 코스를 지정하였습니다.
          <br /> 2012년 전체 지정 노선에 대한 현장 조사를 통해 중복 되거나
          보행이 어려운 노선 등을 삭제하고 지정 노선을 정리하여 현재는 89개 노선
          397km가 등록되어 있습니다. <br />
          <br />
          1~2시간 소요의 <span>평지형 노선인 산책길</span>과 3~4시간 소요의
          <span> 산지형 노선인 나들길</span>로 크게 구분됩니다. <br />
          <br />
          현재는 노선만 지정되어 있으나 2013년 생태문화길 안내체계 시범정비를
          시작으로 향후 연차적으로 통일된 안내체계를 설치해나갈 계획입니다.
        </InfoText>
      </InfoContent>
    </StInformationPage>
  );
}
export default InformationPage;

const StInformationPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 88px;
  .graph {
    margin-top: 40px;
  }
`;
const InfoHeader = styled.div`
  position: fixed;
  top: 0;
  width: 393px;
  height: 118px;
  background: ${COLOR.MAIN_WHITE};
  z-index: 100;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .noticeBackArrow {
    margin-top: 40px;
    margin-left: 20px;
  }
`;
const HeaderText = styled.div`
  margin-top: 39px;
  margin-left: 22px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: ${COLOR.MAIN_BLACK};
`;
const InfoContent = styled.div`
  margin-top: 30px;
  margin-bottom: 33px;
  width: 353px;
  .image {
    width: 353px;
  }
`;
const InfoText = styled.div`
  margin-top: 16px;
  margin-bottom: 32px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: ${COLOR.DARK_GRAY};
  span {
    color: ${COLOR.MAIN_DARK_GREEN};
  }
  h1 {
    margin-bottom: 16px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 19px;
    color: ${COLOR.MAIN_BLACK};
  }
`;
