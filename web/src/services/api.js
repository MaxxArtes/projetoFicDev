import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://lonely-puce-crab.cyclic.app',
    headers: {
        "Content-Type": "application/json"
    }
});