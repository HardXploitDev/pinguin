import prompts from "prompts";

export async function Init() {
    const initQuestions = [
        {
            type: "password",
            name: "token",
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
            name: "openai",
            message: "Your OpenAI API key:",
            validate: value => value === '' ? 'This is required.' : true
        },
        {
            type: "password",
            name: "replicate",
            message: "Your Replicate API key:",
            validate: value => value === '' ? 'This is required.' : true
        }
    ];

    const response = await prompts(initQuestions);

    return response;
}