import styled from "styled-components";
import { COLOR } from "../../styles/color";

export const footer = styled.div`
  position: fixed;
  bottom: 0;

  background: ${COLOR.FOOTER_GRAY};
  width: 393px;
  height: 100px;
  padding: 0;
  margin: 0;
`;

export const imgBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
export const textBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const footerHome = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 11px;
  margin-top: 10.5px;
  padding: 0;
  width: 50px;
  p {
    display: flex;
    width: 50px;
    justify-content: center;
    text-align: center;
    margin-top: 4px;
  }
`;

export const footerCourse = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 11px;
  margin-top: 10.5px;
  padding: 0;
  width: 50px;
  p {
    display: flex;
    width: 50px;
    justify-content: center;
    text-align: center;
    margin-top: 4.5px;
  }
`;

export const footerRecord = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 11px;
  margin-top: 10.5px;
  padding: 0;
  width: 50px;

  p {
    display: flex;
    width: 50px;
    justify-content: center;
    text-align: center;
    margin-top: 4.5px;
  }
`;

export const footerPlog = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 11px;
  margin-top: 10.5px;
  padding: 0;
  width: 50px;

  p {
    display: flex;
    width: 50px;
    justify-content: center;
    text-align: center;
    margin-top: 4.455px;
  }
`;

export const footerMy = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 11px;
  margin-top: 10.5px;
  padding: 0;
  width: 50px;

  p {
    display: flex;
    width: 50px;
    justify-content: center;
    text-align: center;
    margin-top: 4.5px;
  }
`;
