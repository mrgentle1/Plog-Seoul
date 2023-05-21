import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useEffect, useCallback, useState } from "react";
import { ReactComponent as Filter } from "../../assets/icons/filterWhite.svg";
import { ReactComponent as ReverseFilter } from "../../assets/icons/filterWhiteReverse.svg";

import { ReactComponent as Logo } from "../../assets/icons/smallLogo.svg";
import html2canvas from "html2canvas";
import { ReactComponent as Close } from "../../assets/icons/arrow_white_btn.svg";
import { useNavigate, useHistory } from "react-router-dom";
import { Button } from "../../components/common/Button";

export const EditImgModal = ({ setImgOpen, data }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/record/finish");
  };

  const [isReverse, setIsReverse] = useState(false);

  // 경로
  const pathname = window.location.pathname;
  const real_pathname = pathname.substring(0, 7);

  // 모달 끄기
  const closeModal = () => {
    setImgOpen(false);
  };
  const checkModal = () => {
    setImgOpen(false);
  };

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const onCapture = () => {
    console.log("onCapture");
    html2canvas(document.getElementById("imgFrame"), {
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), "image-download.png");
    });
  };

  const onSaveAs = (uri, filename) => {
    console.log("onSaveAs");
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <ModalContainer>
        <ModalCloseWrapper>
          <Close
            className="modalClose"
            onClick={() => {
              closeModal();
            }}
          />
        </ModalCloseWrapper>
        <ModalContents>
          <SelectFilter></SelectFilter>
          <ModalImg
            id="imgFrame"
            onClick={() => {
              setIsReverse((prev) => {
                return !prev;
              });
            }}
          >
            {/* <img src={data} alt="img"></img> */}
            <SelectImg image={data}></SelectImg>
            {/* <SelectImg
              className="Select"
              style={`background-image: url(${data})`}
            ></SelectImg> */}
            {isReverse ? (
              <ReverseFilter className="FilterImg" />
            ) : (
              <Filter className="FilterImg" />
            )}

            {/* <Logo className="LogoImg" /> */}
            <p className="DistText">1.23KM</p>
            <p className="DateText">2023년 5월 18일</p>
          </ModalImg>
          <ModalButton>
            <Button
              onClick={() => {
                onCapture();
              }}
            >
              공유하기
            </Button>
          </ModalButton>
        </ModalContents>
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  padding: 4.6rem 2rem 0rem 2rem;
  z-index: 2000;

  position: absolute;

  height: 100vh;
  top: 0;

  /* top: 50%;
  left: 50%; */
  /* transform: translate(-50%, -50%); */

  overflow: hidden;
`;

const ModalCloseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 4.1rem;
  height: 4.1rem;
  .modalClose {
    display: flex;
    width: 4.1rem;
    height: 4.1rem;
    padding: 0;
  }
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 3.6rem;
`;

const SelectFilter = styled.div`
  display: flex;
`;

const ModalImg = styled.div`
  display: flex;
  position: relative;
  width: 35.3rem;
  height: 35.3rem;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }
  .FilterImg {
    width: 35.3rem;
    height: 35.3rem;
    display: flex;
    position: absolute;
  }

  .LogoImg {
    display: flex;
    position: absolute;
    top: 1.2rem;
    left: 1.6rem;
    width: 10.25rem;
    height: 2.1rem;
  }
  .Select {
    display: flex;
    position: absolute;
    width: 35.3rem;
    height: 35.3rem;
  }
  p {
    display: flex;
    position: absolute;
    bottom: 2rem;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 700;
    font-size: 1.7rem;
    line-height: 2.1rem;
    text-align: center;
    color: ${COLOR.MAIN_BLACK};

    &.DistText {
      left: 1.6rem;
    }
    &.DateText {
      right: 1.6rem;
    }
  }
`;

const SelectImg = styled.div`
  display: flex;
  position: absolute;
  width: 35.3rem;
  height: 35.3rem;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.image});
`;

const ModalButton = styled.div`
  display: flex;
  flex-direction: row;
`;
