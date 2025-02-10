import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  subMonths,
  addMonths,
  isToday,
} from "date-fns";
import eventsData from "../data/events.json";
import Header from "./Header";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [events, setEvents] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => setEvents(eventsData), []);
  useEffect(() => generateCalendarDays(), [currentDate]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const daysArray = [];
    let day = startDate;
    while (day <= monthEnd || daysArray.length < 42) {
      daysArray.push(day);
      day = addDays(day, 1);
    }
    setDays(daysArray);
  };

  const getEventColor = (index) =>
    ["bg-blue-300", "bg-green-300", "bg-red-300", "bg-yellow-300"][index % 4];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Pass dark mode toggle function to Header */}
      <Header onToggleDarkMode={() => setDarkMode(!darkMode)} />
      <div
        className="max-w-5xl w-full p-6 rounded-lg shadow-lg transition-colors duration-500 
        ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}"
      >
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrevMonth}
            className="px-4 py-2 rounded-lg transition-all duration-300 
            bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Prev
          </button>
          <h2 className="text-2xl font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 rounded-lg transition-all duration-300 
            bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Next
          </button>
        </div>
        <div className="grid grid-cols-7 text-center font-semibold text-gray-600 dark:text-gray-300 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const dayEvents = events.filter((event) => event.date === dateStr);
            return (
              <div
                key={index}
                className={`p-4 border rounded-lg text-center relative transition-all duration-300 
                ${
                  isToday(day)
                    ? "bg-blue-500 text-white font-bold"
                    : darkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-white hover:bg-blue-100"
                } 
                ${
                  index % 7 === 0
                    ? "text-red-500"
                    : index % 7 === 6
                    ? "text-green-500"
                    : ""
                }`}
              >
                <span className="block font-semibold">{format(day, "d")}</span>
                {dayEvents.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {dayEvents.map((event, idx) => (
                      <div
                        key={idx}
                        className={`text-xs ${getEventColor(
                          idx
                        )} text-gray-700 rounded px-2 py-1`}
                      >
                        {event.title} ({event.time})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
