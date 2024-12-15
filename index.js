import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();
 
const gemini_api_key = process.env.API_KEY;

const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 100,
};
 
const geminiModel = googleAI.getGenerativeModel({
  model: 'gemini-pro',
  geminiConfig,
});
 
const generate = async (input) => {
  try {
    const prompt = `You're an AI agent that helps gets users input. Majorly, your role is to process their input and return it in JSON.Let me walk you through your work here. Users are going to prompt you about creating token(s). Your job is to get the metadata of the token(s) like name of the token and other useful information and return it as a JSON object only. Output should be in this format: {
    'token_name': '',
    'token_symbol': '',
    token_supply: '',
    and other relevant infomation
    } Note that it's only the data i want. Now, the prompt goes as follow ${input}`
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    return response
    
  } catch (error) {
    console.log(error)
    return error
  }
};
 
const userPrompt = "I want to create a token with name of Name Cannot Be Blank. The symbol is NM and the total is 10. Image link is https://www.g"

const res = await generate(userPrompt);
const data = res.text();

console.log((data))


