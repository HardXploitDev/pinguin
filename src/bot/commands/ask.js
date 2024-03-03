import { SlashCommandBuilder } from "discord.js";
import OpenAI from "openai";
import configJSON from "../../../config.json" assert { type: 'json' };

const openai = new OpenAI({
    apiKey: configJSON.openaiKey
});

export const data = new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask me whatever you want!')
    .addStringOption(option =>
        option
        .setName('question')
        .setDescription('Enter your question!')
        .setRequired(true)
    );
export async function execute(interaction, client) {

    await interaction.deferReply();

    const askPrompt = await interaction.options.getString('question');

    const response = openai.chat.completions.create({
        messages: [{ role: 'user', content: askPrompt }],
        model: 'gpt-3.5-turbo'
    });

    await interaction.editReply({ content: response })
}