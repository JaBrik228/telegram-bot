import axios from 'axios';

import Pusher from "pusher-js";

const pusher = new Pusher("c823b982b6ac7f3b492e", {
    cluster: 'eu',
});

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://www.agents-bot.mrflip.ru',
        })
    };
    
    getObjects = async (userId) => {
        const request = await this.api.post(`/api/user/${userId}/get_properties/`);
        return request.data;
    };

    getMessages = async (userId, objectId) => {
        const request = await this.api.get(`/chats/get_chat_history/${objectId}/${userId}`);
        return request.data;
    }

    sendMessage = async (data) => {
        const request = await this.api.post(`/chats/send_message/`, data);
        return request.data;
    }

    apiPusher = pusher;
};

export default ApiService;