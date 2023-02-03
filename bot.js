import { WebClient } from '@slack/web-api';
import { createEventAdapter } from '@slack/events-api';
import { createReadStream } from 'fs'
import { createMessageAdapter } from '@slack/interactive-messages';
const slackSigningSecret = '9a792d49406c77e31fd7e2d9d8572d52'
const slackToken = 'xoxb-4733018436324-4744818679651-hFi5inPpBCSJOprHalfBnkna'

const slackEvent = createEventAdapter(slackSigningSecret)
const slackClient = new WebClient(slackToken)
const port = 3000
const fileName = './gif/pizza-time-spiderman.gif'
const slackInteractions = createMessageAdapter(slackSigningSecret)

slackEvent.on('app_mention', async (event) => {
    console.log(`Got message from user => ${event.user}: ${event.text}`);
    try {
        // await slackClient.files.upload({
        //     channels: event.channel,
        //     file: createReadStream(fileName)
        // })
        await slackClient.chat.postMessage({
            channel: event.channel,
            text: "adasd",
            blocks: JSON.stringify([
                {
                    type: "actions",
                    elements: [
                        {
                            type: "button",
                            text: {
                                "type": "plain_text",
                                "emoji": true,
                                "text": "Approve"
                            },
                            style: "primary",
                            value: "click_me_123"
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                emoji: true,
                                text: "Reject"
                            },
                            style: "danger",
                            value: "click_me_123"
                        }
                    ]
                }
            ])
        })
    } catch (error) {
        console.error(error)
    }
})

slackInteractions.action({ type: 'static_select' }, (payload, respond) => {
    console.log('payload', payload);
    // let triggerId = payload.trigger_id;
    // let view = payload.addTaskModal({ triggerId });
    //   (async () => {
    //     try {
    //         let result = await slackClient.callAPIMethod("views.open", view);
    //       respond("");
    //     } catch (error) {
    //       if (error.code === ErrorCode.PlatformError) {
    //         respond(error.data);
    //       } else {
    //         respond('Well, that was unexpected.');
    //       }
    //     }
    //   })();
});

slackEvent.on('error', console.error)

slackEvent.start(port).then(() => {
    console.log(`Events started on port ${port}`)
})
slackInteractions.start(3001).then(() => {
    console.log(`Interactions started on port ${port}`)
})