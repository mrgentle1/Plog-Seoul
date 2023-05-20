import React, { useState } from "react";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { ReactComponent as ForwardArrow } from "../../assets/icons/forwardArrow.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

export const Calendar = () => {
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
      const currentDate = new Date(year, month, day);
      const isSpecial = day === 18; // Customize the condition for special dates
      const isSunday = currentDate.getDay() === 0; // 일요일인 경우

      calendar.push(
        <CalendarDay key={day} isSpecial={isSpecial} isSunday={isSunday}>
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
`;
