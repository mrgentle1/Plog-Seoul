import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { HomeHeaderV3 } from "../../components/layout/HeaderV3";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { Button, DisabledButton } from "../../components/common/Button";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function ReviewWritePage() {
  const [content, setContent] = useState("");

  // 모달창 호출
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const [headerBackground, setHeaderBackground] = useState(COLOR.MAIN_WHITE);

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("청룡산 나들길 후기");
  }, [setHeaderTitle]);

  return (
    <StReviewWritePage>
      <HomeHeaderV3 headerBackground={headerBackground} />
      <ReviewWriteMain>
        <StarBox>
          <Star className="star" />
          <Star className="star" />
          <Star className="star" />
          <Star className="star" />
          <Star className="star" />
        </StarBox>
        <ReviewWriteBox
          placeholder="10글자 이상의 후기를 남겨주세요"
          onChange={onChangeContent}
        />
        <ReviewButton>
          {!content ? (
            <DisabledButton disabled="disabled">등록하기</DisabledButton>
          ) : (
            <Link to={"/home"}>
              <Button>등록하기</Button>
            </Link>
          )}
        </ReviewButton>
      </ReviewWriteMain>
    </StReviewWritePage>
  );
}
export default ReviewWritePage;

const StReviewWritePage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ReviewWriteMain = styled.div`
  margin-top: 120px;
  width: 353px;
`;
const StarBox = styled.div`
  margin-top: 12px;
  .star {
    width: 24px;
    height: 23px;
    color: ${COLOR.MAIN_ORANGE};
  }
`;
const ReviewWriteBox = styled.textarea`
  margin-top: 38.5px;
  padding: 12px;
  width: 353px;
  height: 150px;
  background: ${COLOR.INPUT_GRAY};
  border: 1px solid ${COLOR.INPUT_BORDER_GRAY};
  border-radius: 8px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  resize: none;

  ::placeholder {
    color: ${COLOR.INPUT_BORDER_GRAY};
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }
`;
const ReviewButton = styled.div`
  position: fixed;
  bottom: 0;
  margin-bottom: 40px;
  padding: 0;

  display: flex;
  flex-direction: row;
`;
