import EventItem from './EventItem';
import { useMediaQuery } from 'react-responsive'
import { EventDetail } from '../../core/EventDetail'
import { Box, Card, CardContent, CardHeader, Paper, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { EventsTitle } from '../../const/texts';

function EventsList({ events }: { events: EventDetail[] }) {
    const smallScreen = useMediaQuery({
        query: '(max-width: 640px)'
    })
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
                            navigation={!smallScreen}
                            effect='coverflow'
                            pagination={{
                                dynamicBullets: true,
                            }}
                            modules={[Pagination, Navigation, EffectCoverflow]}
                            spaceBetween={50}
                            slidesPerView={smallScreen ? 1 : 3}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper: any) => console.log(swiper)}
                        >
                            {events.map((event, index) => (
                                <SwiperSlide>
                                    <Paper sx={{ minWidth: 345, marginBottom: 5 }} elevation={5} key={index}>
                                        <EventItem
                                            event={event}
                                        />
                                    </Paper>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div >
                </CardContent>
            </Card>
        </div>
    );
}

export default EventsList;
