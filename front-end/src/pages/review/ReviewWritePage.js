import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { HomeHeaderV3 } from "../../components/layout/HeaderV3";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { Button, DisabledButton } from "../../components/common/Button";
import { Modal, ModalBackground } from "../../components/common/Modal";

import axios from "axios";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function ReviewWritePage() {
  const [content, setContent] = useState("");
  const [star, setStar] = useState(0);

  const token = localStorage.getItem("key");
  const [course, setCourse] = useState([]);

  const pathname = window.location.pathname;
  const real_pathname = pathname.substring(7);
  const url = "http://3.37.14.183/api/roads" + real_pathname;
  const url1 = url + "s";
  const url2 = real_pathname.substring(
    0,
    real_pathname.length - "/reviews".length + 1
  );
  const course_url = "http://3.37.14.183/api/roads" + url2;

  const setHeaderTitle = useSetRecoilState(headerTitleState);
  const headerTitle = course.name + " 후기";
  console.log("헤더", headerTitle);

  const [headerBackground, setHeaderBackground] = useState(COLOR.MAIN_WHITE);

  useEffect(() => {
    setHeaderTitle(headerTitle);
  }, [headerTitle]);

  useEffect(() => {
    axios
      .get(course_url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("코스", response);
        setCourse(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleStarClick = (index) => {
    if (star === index) {
      setStar(0);
    } else {
      setStar(index);
    }
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // 모달창 호출
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    axios
      .post(
        url1,
        {
          content,
          star,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setModalOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
      {modalOpen && <ModalBackground />}
      <StReviewWritePage>
        <HomeHeaderV3
          headerBackground={headerBackground}
          headerTitle={headerTitle}
        />
        <ReviewWriteMain>
          <StarBox>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={index + 1 <= star ? "selected" : "unselected"}
                onClick={() => handleStarClick(index + 1)}
              />
            ))}
          </StarBox>
          <ReviewWriteBox
            placeholder="10글자 이상의 후기를 남겨주세요"
            onChange={onChangeContent}
          />
          <ReviewButton>
            {!content || star === 0 ? (
              <DisabledButton disabled="disabled">등록하기</DisabledButton>
            ) : (
              <Button onClick={showModal}>등록하기</Button>
            )}
          </ReviewButton>
        </ReviewWriteMain>
      </StReviewWritePage>
    </>
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
  .selected {
    width: 26px;
    height: 25px;
    color: ${COLOR.MAIN_ORANGE};
  }

  .unselected {
    width: 26px;
    height: 25px;
    color: ${COLOR.LIGHT_GRAY};
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
