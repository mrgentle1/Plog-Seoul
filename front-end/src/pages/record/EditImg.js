import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useEffect, useCallback, useState, useRef } from "react";
import { ReactComponent as Filter } from "../../assets/icons/filterWhite.svg";
import { ReactComponent as ReverseFilter } from "../../assets/icons/filterWhiteReverse.svg";
import { ReactComponent as FilterAdd } from "../../assets/icons/filterAdd.svg";

import axios from "axios";

import { ReactComponent as Logo } from "../../assets/icons/smallLogo.svg";
import { ReactComponent as Timer } from "../../assets/icons/timerIcon.svg";
import html2canvas from "html2canvas";
import { ReactComponent as Close } from "../../assets/icons/arrow_white_btn.svg";
import { useNavigate, useHistory } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { TimeConvert } from "../../components/Record/TimeComponent";

export const EditImgModal = ({ setImgEditOpen, img, data }) => {
  const token = localStorage.getItem("key");
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/record/finish");
  };

  const [isReverse, setIsReverse] = useState(false);
  const [filterImg, setFilterImg] = useState();
  const isClick = useRef(false);

  // 경로
  const pathname = window.location.pathname;
  const real_pathname = pathname.substring(0, 7);

  // 모달 끄기
  const closeModal = () => {
    setImgEditOpen(false);
  };
  const checkModal = () => {
    setImgEditOpen(false);
  };

  const dataURLtoFile = (dataurl, fileName) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  /* POST - Record Img */

  const [imgData, setImgData] = useState([]);
  async function postImgData(img) {
    // async, await을 사용하는 경우
    let formData = new FormData();
    let file = dataURLtoFile(img, "image.png");
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/api/images/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("success Post");
      console.log(response.data.result);
      try {
        if (window.Android) {
          console.log("Android shareInstagram");
          window.Android.shareInstagram(response.data.result);
        }
      } catch (e) {
        console.error(e);
        console.log("Android shareInstagram error");
      }
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      console.log(img);
      alert("이미지 업로드 실패. 재시도해주세요.");
    }
  }

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

  // useEffect(() => {
  //   if (isClick.current) {
  //     postImgData();
  //   }
  // }, [filterImg]);

  const onCapture = () => {
    console.log("onCapture");
    html2canvas(document.getElementById("imgFrame"), {
      imageTimeout: 15000, //newline
      scale: 3, //newline
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      // setFilterImg(canvas.toDataURL("image/png"));
      postImgData(canvas.toDataURL("image/png"));
      // onSaveAs(canvas.toDataURL("image/png"), "image-download.png");
    });
  };

  const onSaveAs = (uri, filename) => {
    console.log("onSaveAs");
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    console.log("uri", uri);
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
          <ModalImg
            id="imgFrame"
            onClick={() => {
              setIsReverse((prev) => {
                return !prev;
              });
            }}
          >
            <SelectImg image={img}></SelectImg>
            <FilterAdd className="FilterImg" />

            {/* {isReverse ? (
              <ReverseFilter className="FilterImg" />
            ) : (
              <Filter className="FilterImg" />
            )} */}
            <BottomFilterContainer>
              <RunTimeContainer>
                <IconWrapper>
                  <Timer className="Icon" />
                </IconWrapper>
                <TimeWrapper>
                  <TimeConvert className="TimeText" time={data.time} />
                </TimeWrapper>
              </RunTimeContainer>
              <DistContainer>
                <p className="DistText">{data.dist}</p>
                <p className="DistUnitText">KM</p>
              </DistContainer>
            </BottomFilterContainer>

            {/* <p className="DateText">{data.when}</p> */}
          </ModalImg>
          <ModalButton>
            <Button
              onClick={() => {
                isClick.current = true;
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

  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  /* overflow-y: hidden; */

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
  width: 100%;
  align-items: color-interpolation-filters;

  ::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }

  /* img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  } */
  .FilterImg {
    object-fit: cover;
    width: 100%;
    height: 100%;
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

  /* p {
    display: flex;
    position: absolute;
    bottom: 2rem;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 900;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    color: ${COLOR.MAIN_WHITE};

    &.DistText {
      right: 1.6rem;
    }
    &.DateText {
      right: 1.6rem;
    }
  } */
`;
const BottomFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  bottom: 2rem;
  position: absolute;
  width: 100%;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  p {
    display: flex;

    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 900;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    color: ${COLOR.MAIN_WHITE};
  }
`;

const RunTimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 100%;
  height: 100%;

  gap: 0.3rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  /* padding-top: 0.1rem; */
  padding: 0;
`;

const TimeWrapper = styled.span`
  display: flex;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 25px;
  color: ${COLOR.MAIN_WHITE};
`;

const DistContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 0.4rem;

  p {
    display: flex;
    font-family: "SUIT Variable";
    font-style: normal;
    text-align: center;
    color: ${COLOR.MAIN_WHITE};

    &.DistText {
      font-weight: 900;
      font-size: 20px;
      line-height: 25px;
    }
    &.DistUnitText {
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
    }
  }
`;

const SelectImg = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  padding-bottom: 100%;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.image});
`;

const ModalButton = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
