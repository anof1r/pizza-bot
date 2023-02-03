import express from 'express';
import { request } from 'express';

const app = express();
const PORT = 3000;

app.get('/get', (request, response) => {
    response.status(200).send('ok')
})

app.post('/slack/events', (request, response) => {
    const param = request.query.challenge;
    console.log(param)
    response.status(200).send(param)
})

app.post('/slack/interactive', (request, response) => {
    const body = request.body
    response.status(200).send(body)
})

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);