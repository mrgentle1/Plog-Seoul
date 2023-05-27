import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Shop } from "../../assets/icons/shop.svg";
import { ReactComponent as Loading } from "../../assets/icons/imageLoading.svg";

export const CourseCard = ({ c }) => {
  const navigate = useNavigate();
  const handlePageChange = () => {
    navigate(`/course/${c.routeId}`);
  };

  const token = localStorage.getItem("key");
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageCache, setImageCache] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const img_url = `${process.env.REACT_APP_API_ROOT}/api/roads/images`;

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(img_url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cancelToken: source.token,
      })
      .then((response) => {
        setImages(response.data.result.courseImages);
      })
      .catch((error) => {
        console.error("error", error);
      });

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const cacheImages = async () => {
      const imagePromises = images.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = image.imgUrl;
          img.onload = resolve();
          img.onerror = reject();
        });
      });
      await Promise.all(imagePromises);
      setImageCache(images.map((image) => image.imgUrl));
      setIsLoading(false);
    };

    if (images.length > 0) {
      cacheImages();
    }
  }, [images]);

  useEffect(() => {
    if (imageCache.length > 0) {
      const index = c.routeId % imageCache.length;
      setCurrentImageIndex(index);
    }
  }, [c.routeId, imageCache]);

  const handleClickNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCache.length);
  };

  const currentImageUrl = imageCache[currentImageIndex];

  return (
    <>
      <StCourseCard onClick={handlePageChange}>
        <StCourseContent>
          <StCourseText>
            <CourseText>
              <h3>{c.name}</h3>
              <h6>{c.courseDetail}</h6>
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
          <StCourseImg>
            {isLoading ? (
              <Loading style={{ width: 120, height: 140, borderRadius: 14 }} />
            ) : (
              currentImageUrl && (
                <div
                  key={currentImageIndex}
                  style={{ width: 120, height: 140 }}
                >
                  <img
                    src={currentImageUrl}
                    alt=""
                    style={{ width: 120, height: 140, borderRadius: 14 }}
                  />
                </div>
              )
            )}
          </StCourseImg>
        </StCourseContent>
        <StCourseLine />
      </StCourseCard>
    </>
  );
};

const StCourseCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;

  width: 353px;
  height: 164px;

  background: #ffffff;

  margin-bottom: 24px;
`;
const StCourseContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 57px;

  width: 353px;
  height: 140px;
`;
const StCourseText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;

  width: 197px;
  height: 140px;

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
const StCourseImg = styled.div`
  float: right;
  padding: 0px;
  width: 120px;
  height: 140px;
  border-radius: 14px;
`;

const StCourseLine = styled.div`
  width: 353px;
  text-align: center;
  line-height: 0.1px;
  border: 0.35px solid #8edf82;
`;
