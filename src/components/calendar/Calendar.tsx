import React, { useState } from 'react';


type CalendarDay = {
    date: Date;
    isCurrentMonth: boolean;
};

type Event = {
    date: Date;
    title: string;
    description: string;
};

const generateCalendar = (year: number, month: number): CalendarDay[][] => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const firstDayOfWeek = firstDayOfMonth.getDay();

    let currentDay = 1;
    const calendar: CalendarDay[][] = [];

    for (let week = 0; week < 6; week++) {
        const weekDays: CalendarDay[] = [];

        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            if ((week === 0 && dayOfWeek < firstDayOfWeek) || currentDay > daysInMonth) {
                weekDays.push({ date: new Date(), isCurrentMonth: false });
            } else {
                const date = new Date(year, month, currentDay);
                weekDays.push({ date, isCurrentMonth: true });
                currentDay++;
            }
        }

        calendar.push(weekDays);
    }

    return calendar;
};

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [events, setEvents] = useState<Event[]>([]);

    const handlePrevMonth = () => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
        setSelectedDate(null);
    };

    const handleNextMonth = () => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
        setSelectedDate(null);
    };

    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
        // Fetch events for the selected date from your API/database
        // For this example, let's add some dummy events
        setEvents([
            { date, title: 'Event 1', description: 'Description for Event 1' },
            { date, title: 'Event 2', description: 'Description for Event 2' },
        ]);
    };

    const calendar = generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

    return (
        <div className="container mx-auto mt-8 p-4">
            <div className='grid sm:grid-cols-1 md:grid-cols-6 gap-2'>
                <div className='col-span-4'>
                    <div className="flex justify-between items-center mb-4">
                        <button className="bg-blue-500 text-white px-4 py-2" onClick={handlePrevMonth}>
                            Prev Month
                        </button>
                        <h2 className="text-lg font-semibold">
                            {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate)}
                        </h2>
                        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleNextMonth}>
                            Next Month
                        </button>
                    </div>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <th key={day} className="p-2 border">
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {calendar.map((week, index) => (
                                <tr key={index}>
                                    {week.map(({ date, isCurrentMonth }, dayIndex) => (
                                        <td
                                            key={dayIndex}
                                            className={`p-2 border ${isCurrentMonth ? 'cursor-pointer hover:bg-gray-200' : 'bg-gray-100 text-gray-500'
                                                }`}
                                            onClick={() => handleDayClick(date)}
                                        >
                                            {isCurrentMonth && (
                                                <span>{new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)}</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    {selectedDate && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">
                                Events for {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(selectedDate)}
                            </h3>
                            <ul>
                                {events.map((event, index) => (
                                    <li key={index} className="mb-2">
                                        <strong>{event.title}</strong> - {event.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
