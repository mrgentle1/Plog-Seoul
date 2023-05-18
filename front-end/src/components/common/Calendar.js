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

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendar.push(<CalendarDay key={`empty_${i}`} />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isSpecial = day === 18; // Customize the condition for special dates

      calendar.push(
        <CalendarDay key={day} isSpecial={isSpecial}>
          {day}
        </CalendarDay>
      );
    }

    return calendar;
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
      <PlogCalendar>{getMonthCalendar()}</PlogCalendar>
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

const PlogCalendar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CalendarDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: ${({ isSpecial }) =>
    isSpecial ? COLOR.SPECIAL_BACKGROUND : COLOR.MAIN_WHITE};
  /* Add any additional styling for each day of the calendar */
`;
