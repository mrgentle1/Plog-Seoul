import { useState, useEffect } from "react";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { ReactComponent as ForwardArrow } from "../../assets/icons/forwardArrow.svg";
import { todayMonth, year } from "../../core/date.js";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CalendarModal, ModalBackground } from "./modal/CalendarModal";

export const Calendar = () => {
  const token = localStorage.getItem("key");

  const [plogging, setPlogging] = useState([]);
  const navigate = useNavigate();

  // month가 한자리인지 두자리인지 판별
  let month = 0;
  if (todayMonth < 10) {
    month = `0${todayMonth}`;
  }

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_ROOT}/api/plogging?date=${year}-${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setPlogging(response.data.result.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const ploggingDate = [];
  plogging.map((data) => {
    ploggingDate.push(data.createdAt.substring(0, 10));
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => {
    setSelectedDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setSelectedDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1)
    );
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [specialDate, setSpecialDate] = useState("");

  const handleDayClick = (formattedDate) => {
    if (ploggingDate.includes(formattedDate)) {
      setModalOpen(true);
      setSpecialDate(formattedDate);
    }
  };

  const getMonthCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const calendar = [];

    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

    // Add day labels
    for (let i = 0; i < 7; i++) {
      calendar.push(<DayLabel key={`day_${i}`}>{daysOfWeek[i]}</DayLabel>);
    }

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthDate = new Date(year, month, 0 - (firstDayOfWeek - i - 1));
      calendar.push(
        <CalendarDay key={`empty_${i}`} isPreviousMonth>
          {prevMonthDate.getDate()}
        </CalendarDay>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(Date.UTC(year, month, day));
      const formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      const isSpecial = ploggingDate.includes(formattedDate);
      const isSunday = currentDate.getUTCDay() === 0; // 일요일
      const isToday = currentDate.toDateString() === new Date().toDateString(); // 오늘 날짜

      calendar.push(
        <CalendarDay
          key={day}
          isSpecial={isSpecial}
          isSunday={isSunday}
          isToday={isToday}
          onClick={() => handleDayClick(formattedDate)}
        >
          {day}
        </CalendarDay>
      );
    }

    // Add empty cells for the days after the last day of the month
    const lastDayOfWeek = new Date(year, month, daysInMonth).getDay();
    for (let i = 0; i < 6 - lastDayOfWeek; i++) {
      const nextMonthDate = new Date(year, month + 1, i + 1);
      calendar.push(
        <CalendarDay key={`empty_${daysInMonth + i + 1}`} isNextMonth>
          {nextMonthDate.getDate()}
        </CalendarDay>
      );
    }

    return calendar; // Return the calendar elements
  };

  return (
    <>
      {modalOpen && (
        <CalendarModal
          setModalOpen={setModalOpen}
          plogging={plogging}
          specialDate={specialDate}
        />
      )}
      {modalOpen && <ModalBackground />}
      <CalendarContainer>
        <CalendarHeader>
          <BackArrow className="arrow1" onClick={handlePrevMonth} />
          <YearMonthText>
            {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
          </YearMonthText>
          <ForwardArrow className="arrow2" onClick={handleNextMonth} />
        </CalendarHeader>
        <DayLabels>{getMonthCalendar()}</DayLabels>
      </CalendarContainer>
    </>
  );
};

const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 16px;
  width: 353px;
`;

const CalendarHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .arrow1 {
    width: 17px;
    height: 17px;
  }
  .arrow2 {
    width: 20px;
    height: 20px;
  }
`;

const YearMonthText = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
`;

const DayLabels = styled.div`
  margin-top: 12px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  align-items: center;
  margin-bottom: 8px;
`;

const DayLabel = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 14px;
  color: ${({ isSunday }) => (isSunday ? COLOR.MAIN_ORANGE : COLOR.MAIN_BLACK)};
`;

// CalendarDay 컴포넌트
const CalendarDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5px;
  width: 40px;
  height: 40px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  background-color: ${({ isSpecial }) =>
    isSpecial ? COLOR.MAIN_GREEN_HOVER : COLOR.MAIN_WHITE};
  border-radius: 8px;
  color: ${({ isPreviousMonth, isNextMonth, isSunday }) =>
    isPreviousMonth || isNextMonth
      ? COLOR.LIGHT_GRAY
      : isSunday
      ? COLOR.MAIN_ORANGE
      : "inherit"};
  cursor: ${({ isSpecial }) => (isSpecial ? "pointer" : "default")};
  border: 2px solid
    ${({ isToday }) => (isToday ? COLOR.MAIN_GREEN : "transparent")};
`;
