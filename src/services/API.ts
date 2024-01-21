import { EventDetail } from "../core/EventDetail";

async function fetchEvents(): Promise<EventDetail[]> {
    try {
        const response = await fetch(`http://192.168.1.129:5000/events`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data as EventDetail[];
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export { fetchEvents }