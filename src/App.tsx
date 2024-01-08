import { Grow, Paper, ClickAwayListener, Button, Popper, MenuItem, MenuList } from '@mui/material';
import { EventDetail } from './core/EventDetail';
import EventsList from './components/events/EventsList';
import { useEffect, useState } from 'react';
import React from 'react';
import { Langs } from './const/langs';
import Calendar from './components/calendar/Calendar';


function App() {
  const [events, setEvents] = useState<EventDetail[]>([])
  const [lang, setLang] = useState("en")

  useEffect(() => {
    fetch("http://127.0.0.1:5000/events")
      .then((res) => res.json())
      .then((data: EventDetail[]) => {
        console.log(data);
        setEvents(data)
      })
  }, [])

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setLang((event.target as HTMLButtonElement).id);
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className="App w-full">
      <div className='flex justify-end'>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Language
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose} id="en">English</MenuItem>
                    <MenuItem onClick={handleClose} id="jp">日本語</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <EventsList
        {...{ events: events, lang: lang as Langs }}
      ></EventsList>
      <Calendar
        {...{ lang: lang as Langs }}
      ></Calendar>
    </div >
  );
}

export default App;
