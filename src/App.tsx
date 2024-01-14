import { Grow, Paper, ClickAwayListener, Button, Popper, MenuItem, MenuList } from '@mui/material';
import { EventDetail } from './core/EventDetail';
import EventsList from './components/events/EventsList';
import { useEffect, useState, useRef, MutableRefObject, RefObject } from 'react';
import React from 'react';
import Calendar from './components/calendar/Calendar';
import Intro from './components/intro/Intro';
import Footer from './components/footer/Footer';

function App() {
  const useIsVisible = (ref: RefObject<HTMLElement | null>) => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting)
      }
      );

      observer.observe(ref.current as Element);
      return () => {
        observer.disconnect();
      };
    }, [ref]);

    return isIntersecting;
  }

  const [events, setEvents] = useState<EventDetail[]>([])

  useEffect(() => {
    fetch("http://127.0.0.1:5000/events")
      .then((res) => res.json())
      .then((data: EventDetail[]) => {
        console.log(data);
        setEvents(data)
      })
  }, [])

  const ref1 = useRef<HTMLElement>(null)
  const isVisible1 = useIsVisible(ref1);

  const ref2 = useRef<HTMLElement>(null)
  const isVisible2 = useIsVisible(ref2);

  const ref3 = useRef<HTMLElement>(null)
  const isVisible3 = useIsVisible(ref3);

  const ref4 = useRef<HTMLElement>(null)
  const isVisible4 = useIsVisible(ref3);

  return (
    <div className="App w-full">
      <div ref={ref1 as React.RefObject<HTMLDivElement>} className={`transition-opacity ease-in duration-700 ${isVisible1 ? "opacity-100" : "opacity-0"}`}>
        <Intro></Intro>
      </div>
      <div ref={ref2 as React.RefObject<HTMLDivElement>} className={`transition-opacity ease-in duration-700 ${isVisible2 ? "opacity-100" : "opacity-0"}`}>

        <EventsList
          {...{ events: events }}
        ></EventsList>
      </div>
      <div ref={ref3 as React.RefObject<HTMLDivElement>} className={`transition-opacity ease-in duration-700 ${isVisible3 ? "opacity-100" : "opacity-0"}`}>
        <Calendar
        ></Calendar>
      </div>
      <div ref={ref4 as React.RefObject<HTMLDivElement>} className={`transition-opacity ease-in duration-700 ${isVisible4 ? "opacity-100" : "opacity-0"}`}>
        <Footer></Footer>
      </div>
    </div >
  );
}

export default App;
