import React, { useState, useEffect } from "react";
import "../../assets/css/my-css/calendarWeekly.css";

const WeeklyCalendar = ({ selectedSoccerField, capsuleTimes }) => {
  const today = new Date();
  const weekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
  const [currentDate, setCurrentDate] = useState(today);
  const [weeklySchedule, setWeeklySchedule] = useState({});
  const [error, setError] = useState(null);

  const getWeekStartAndEndDates = (date) => {
    const weekStartDate = new Date(date);
    weekStartDate.setDate(date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1));

    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);
    return { weekStartDate, weekEndDate };
  };

  useEffect(() => {
    if (capsuleTimes) {
      const { weekStartDate, weekEndDate } = getWeekStartAndEndDates(currentDate);

      const filteredCapsuleTimes = capsuleTimes.filter((time) => {
        const start = new Date(time.startDateTime);
        return start >= weekStartDate && start <= weekEndDate;
      });

      const formattedSchedule = filteredCapsuleTimes.reduce((acc, time) => {
        const start = new Date(time.startDateTime);
        const end = new Date(time.endDateTime);
        const dayIndex = start.getDay();
        const dayName = weekDays[dayIndex === 0 ? 6 : dayIndex - 1];

        if (!acc[dayName]) acc[dayName] = [];
        acc[dayName].push({
          start: start.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          end: end.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        });

        return acc;
      }, {});

      setWeeklySchedule(formattedSchedule);
    }
  }, [capsuleTimes, currentDate]);

  const handleNavigation = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + (direction === "prev" ? -7 : 7));
      return newDate;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchDate = new Date(e.target.searchDate.value);
    setCurrentDate(searchDate);
  };

  const { weekStartDate, weekEndDate } = getWeekStartAndEndDates(currentDate);

  return (
    <div className="weekly-calendar">
      <div className="week-navigation">
        <button className="week-nav-button" onClick={() => handleNavigation("prev")}>{"<"}</button>
        <div className="current-week">
          {weekStartDate.toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })} - 
          {weekEndDate.toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
        </div>
        <button className="week-nav-button" onClick={() => handleNavigation("next")}>{">"}</button>
      </div>

      <form onSubmit={handleSearch} className="search-container">
        <input
          type="date"
          name="searchDate"
          className="search-input"
          value={currentDate.toISOString().split("T")[0]}
          onChange={(e) => setCurrentDate(new Date(e.target.value))}
        />
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="week-days">
        {weekDays.map((day, index) => (
          <div key={index} className="day">
            <div className="day-name">{day}</div>
            <div className="available-hours">
              {weeklySchedule[day]?.length > 0 ? (
                weeklySchedule[day].map((slot, slotIndex) => (
                  <div key={slotIndex} className="hour">
                    {slot.start} - {slot.end}
                  </div>
                ))
              ) : (
                <div className="no-hours">Uygun saat yok</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
