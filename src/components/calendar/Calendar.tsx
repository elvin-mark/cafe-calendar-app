import { Card, CardContent, Typography } from "@mui/material";
import { Langs } from "../../const/langs";
import { DaysOfTheWeek } from "../../const/texts";

function Calendar({ lang }: { lang: Langs }) {
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const now = Date()
    return (
        <div className="flex grid sm:grid-cols-1 md:grid-cols-2 gap-2">
            <div className="border-2 p-5 w-[100%]">
                <div className="flex grid grid-cols-7 gap-2">
                    {
                        DaysOfTheWeek.map((day, idx) => (
                            <div className="flex justify-center" key={idx}>{day[lang]}</div>
                        ))
                    }
                    {
                        days.map((elem, idx) => (
                            <div onClick={() => console.log(elem)} key={idx}>
                                <Card className="cursor-pointer">
                                    <CardContent>
                                        <Typography variant="h6">
                                            {elem}
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        xxxxxx
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <Card>
                    <CardContent>sadfasf</CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Calendar;