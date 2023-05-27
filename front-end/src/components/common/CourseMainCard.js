import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Shop } from "../../assets/icons/shop.svg";

export const CourseMainCard = ({ c }) => {
  const navigate = useNavigate();
  const handlePageChange = () => {
    navigate(`/course/${c.routeId}`);
  };

  const token = localStorage.getItem("key");
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const img_url = `${process.env.REACT_APP_API_ROOT}/api/roads/images?category=doseong`;

  useEffect(() => {
    axios
      .get(img_url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setImages(response.data.result.courseImages);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const index = c.routeId % images.length;
      setCurrentImageIndex(index);
    }
  }, [c.id, images]);

  const handleClickNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const currentImage = images[currentImageIndex];

  return (
    <>
      <StCourseCard onClick={handlePageChange}>
        <StCourseImg>
          {currentImage && (
            <div key={currentImage.id} style={{ width: 353, height: 257 }}>
              <img
                src={currentImage.imgUrl}
                alt=""
                style={{ width: 353, height: 257, borderRadius: 14 }}
              />
            </div>
          )}
        </StCourseImg>
        <StCourseText>
          <CourseText>
            <h3>{c.title}</h3>
            <h6>{c.name}</h6>
          </CourseText>
          <CourseTag>
            <Tag>
              <Shop className="shop" />
              <p>{c.category}</p>
            </Tag>
            <Tag>
              <Shop className="shop" />
              <p>{c.difficulty}</p>
            </Tag>
          </CourseTag>
        </StCourseText>
      </StCourseCard>
    </>
  );
};

const StCourseCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 353px;
  height: 372px;

  background: #ffffff;

  margin-bottom: 24px;
`;
const StCourseImg = styled.div`
  width: 353px;
  height: 257px;

  border-radius: 14px;
`;
const StCourseText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 0px;
  gap: 12px;

  width: 353px;
  height: 115px;

  h3 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 19px;
    color: ${COLOR.MAIN_BLACK};
  }
  h6 {
    margin-top: 12px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: ${COLOR.MAIN_GREEN};
  }
`;
const CourseText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
`;
const CourseTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 6px;

  height: 24px;
`;
const Tag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px 4px 6px;
  height: 24px;
  background: ${COLOR.INPUT_GRAY};
  border-radius: 8px;
  color: ${COLOR.DARK_GRAY};

  .shop {
    margin-right: 5.41px;
  }
  p {
    margin-top: 1.5px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    color: ${COLOR.DARK_GRAY};
  }
`;
