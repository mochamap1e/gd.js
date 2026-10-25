import axios from "axios";

export async function boomlingsRequest(path: string, body: any) {
    const response = await axios.post(
        `https://www.boomlings.com/database/${path}`,
        body,
        {
            headers: {
                "User-Agent": "",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    return response.data;
}