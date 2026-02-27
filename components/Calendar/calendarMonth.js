import React, { useState, useEffect } from "react";
import "../../assets/css/my-css/calendarMonth.css";
import api from "../../services/AdminPageService/CapsuleTimeService/capsuleTimeService.js";

const CalendarPanel = ({ selectedField }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayDetails, setDayDetails] = useState("");
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [fieldTimes, setFieldTimes] = useState([]);
  const [checkedDays, setCheckedDays] = useState({});

  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 0);
    return Array.from({ length: date.getDate() }, (_, index) => index + 1);
  };

  const daysInMonth = getDaysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear());

  useEffect(() => {
    const fetchFieldTimes = async () => {
      if (selectedField) {
        try {
          const data = await api.getAllCapsuleTimeForOneSoccerField(selectedField);
          setFieldTimes(data || []);
        } catch (error) {
          console.error("Zaman dilimleri alınırken hata oluştu:", error);
          setFieldTimes([]);
        }
      }
    };

    fetchFieldTimes();
  }, [selectedField]);

  const handleDayClick = (day) => {
    if (selectedDay === day) {
      setIsDetailsVisible(false);
      setSelectedDay(null);
    } else {
      setSelectedDay(day);
      setDayDetails(`Ayrıntılar: Gün ${day} için özel bilgiler buraya gelecek!`);
      setIsDetailsVisible(true);
    }
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const getDayDetails = (day) => {
    const dayTimes = fieldTimes.filter(time => {
      const date = new Date(time.startDateTime);
      return (
        date.getDate() === day &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
      );
    });

    dayTimes.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));

    if (dayTimes.length > 0) {
      return (
        <div>
          <ul>
            {dayTimes.map((time, index) => (
              <li key={index}>
                {formatTime(time.startDateTime)} - {formatTime(time.endDateTime)}
                {/* Checkbox to the right of the time */}
                <input 
                  type="checkbox" 
                  checked={!!checkedDays[time.startDateTime]} 
                  onChange={() => handleCheckboxChange(time.startDateTime)} 
                />
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return "Bu gün için zaman dilimi bulunmamaktadır.";
  };

  const handleCheckboxChange = (startTime) => {
    setCheckedDays((prev) => ({
      ...prev,
      [startTime]: !prev[startTime], // Toggle checked state based on start time
    }));
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".calendar-day") && !e.target.closest(".day-details")) {
        setIsDetailsVisible(false);
        setSelectedDay(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="calendar-panel">
      <div className="calendar-header">
        <button className="prev-month" onClick={handlePrevMonth}>«</button>
        <span className="month-name">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button className="next-month" onClick={handleNextMonth}>»</button>
      </div>
      <div className="calendar-days">
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`calendar-day ${selectedDay === day ? "selected" : ""}`}
            onClick={() => handleDayClick(day)}
          >
            <span>{day}</span>
            {selectedDay === day && isDetailsVisible && (
              <div className="day-details" onClick={handleDetailsClick}>
                {getDayDetails(day)}
                <div className="toggle-details" onClick={(e) => e.stopPropagation()}>
                  {isDetailsVisible ? "▼" : "▲"}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPanel;
