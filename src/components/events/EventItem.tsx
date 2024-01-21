// EventItem.tsx

import { Card, CardContent, CardMedia, CardActions, Typography, Button, Box, Paper } from '@mui/material';
import React, { useState } from 'react';
import { EventDetail } from '../../core/EventDetail';
import ShareIcon from '@mui/icons-material/Share';
import { Edit } from '@mui/icons-material';


function EventItem({ event, learnMore }: { event: EventDetail, learnMore: Function }) {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const togglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    // return (
    //     <div className="max-w-md mx-auto my-4 p-6 bg-white rounded-md shadow-md cursor-pointer"
    //         onClick={togglePopup}>
    //         <h2 className="text-xl font-semibold mb-2">{title}</h2>
    //         <p className="text-gray-600 mb-2">{date}</p>

    //         {isPopupOpen && (
    //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    //                 <div className="bg-white p-6 rounded-md shadow-md">
    //                     <h2 className="text-xl font-semibold mb-2">{title}</h2>
    //                     <p className="text-gray-600 mb-2">{date}</p>
    //                     <p className="text-gray-800">{description}</p>
    //                     <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
    //                         onClick={togglePopup}>
    //                         Close
    //                     </button>
    //                 </div>
    //             </div>
    //         )}
    //     </div>
    // );
    return (

        <Card sx={{}}>
            <CardMedia
                sx={{ height: 140 }}
                component='img'
                src={`data:image/jpg;base64, ${event.poster}`}
                title="poster_image"
            ></CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {event.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><ShareIcon /></Button>
                <Button size="small" onClick={() => learnMore()}>More</Button>
            </CardActions>
        </Card>
    )
};

export default EventItem;
