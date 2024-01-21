import EventItem from './EventItem';
import { useMediaQuery } from 'react-responsive'
import { EventDetail } from '../../core/EventDetail'
import { Box, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TextField, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { EventsTitle } from '../../const/texts';
import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import { Edit } from '@mui/icons-material';

function EventsList({ events }: { events: EventDetail[] }) {
    const smallScreen = useMediaQuery({
        query: '(max-width: 640px)'
    })
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const handleClickOpen = (index: number) => {
        setActiveIndex(index)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className='h-screen'>
            <Card sx={{ margin: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {EventsTitle}
                    </Typography>
                </CardContent>
                <CardContent>
                    <div className='p-2'>
                        <Swiper
                            rewind={true}
                            navigation={!smallScreen}
                            pagination={{
                                dynamicBullets: true,
                            }}
                            modules={[Pagination, Navigation]}
                            spaceBetween={50}
                            slidesPerView={smallScreen ? 1 : 3}
                        >
                            {events.map((event, index) => (
                                <SwiperSlide>
                                    <Paper sx={{ minWidth: 345, marginBottom: 5 }} elevation={5} key={index}>
                                        <EventItem
                                            event={event}
                                            learnMore={() => { handleClickOpen(index) }}
                                        />
                                    </Paper>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div >
                </CardContent>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{events[activeIndex]?.title}</DialogTitle>
                <DialogContent>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className='row-span-2'>
                            <img src={`data:image/jpg;base64, ${events[activeIndex]?.poster}`}></img>
                        </div>
                        <div>
                            <DialogContentText>
                                {events[activeIndex]?.description}
                            </DialogContentText>
                        </div>
                        <div>
                            <div className='grid grid-cols-1'>
                                <div>
                                    {"Date: " + events[activeIndex]?.date}
                                </div>
                                <div>
                                    {"Fee: " + events[activeIndex]?.fee}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button ><ShareIcon></ShareIcon> </Button>
                    <Button><Edit /></Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EventsList;
