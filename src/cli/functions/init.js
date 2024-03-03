import prompts from "prompts";
import { successLog } from "./logger.js";
import configJSON from "../../../config.json" assert { type: 'json' };
import { writeFile } from 'fs/promises';
import path from "path";

export async function Init() {

    const confirmQuestion = await prompts({
        type: "confirm",
        name: "confirm",
        message: "Do you really want to initialize? The new data will be overwritten over the old data in settings.json.",
        validate: value => value === '' ? 'This is required.' : true
    });

    if (confirmQuestion.confirm == true) {
        const initQuestions = [
            {
                type: "password",
                name: "clientToken",
                message: "Your Discord bot token:",
                validate: value => value === '' ? 'This is required.' : true
            },
            {
                type: "password",
                name: "clientId",
                message: "Your Discord bot ID:",
                validate: value => value === '' ? 'This is required.' : true
            },
            {
                type: "password",
                name: "openaiKey",
                message: "Your OpenAI API key:",
                validate: value => value === '' ? 'This is required.' : true
            },
            {
                type: "password",
                name: "replicateKey",
                message: "Your Replicate API key:",
                validate: value => value === '' ? 'This is required.' : true
            }
        ];
    
        const response = await prompts(initQuestions);        

        configJSON.clientToken = response.clientToken;
        configJSON.clientId = response.clientId;
        configJSON.openaiKey = response.openaiKey;
        configJSON.replicateKey = response.replicateKey;

        await writeFile(path.resolve("config.json"), JSON.stringify(configJSON, null, 2));

        console.log(successLog('Completed the initialization, now you start running the bot using `npm start`.'));
        
        return response;
    } else {
        return;
    }
}