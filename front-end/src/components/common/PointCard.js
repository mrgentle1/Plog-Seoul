import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useNavigate } from "react-router-dom";

export const PointCard = ({ p }) => {
  const navigate = useNavigate();

  return (
    <>
      <StPointCard>
        <StPointContent>
          <StPointText>
            <PointText>
              <h3>
                {p.course} - {p.coursename}
              </h3>
              <h6>+3,000</h6>
            </PointText>
            <PointTag>
              <Tag>
                <p>플로깅</p>
              </Tag>
              <Tag>
                <p>{p.date}</p>
              </Tag>
            </PointTag>
          </StPointText>
        </StPointContent>
      </StPointCard>
    </>
  );
};

const StPointCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 353px;
  height: 43px;
  margin-bottom: 24px;
  background: #ffffff;
`;
const StPointContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const StPointText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const PointText = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: ${COLOR.DARK_GRAY};
  }
  h6 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 19px;
    color: ${COLOR.MAIN_DARK_GREEN};
  }
`;
const PointTag = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;
const Tag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  color: ${COLOR.DARK_GRAY};

  p {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;
