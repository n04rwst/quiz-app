import { shuffleArray } from "./shuffleArray.js";

export async function loadQuestions(url) {
    try {
        const response = await fetch(url);
        const questions = await response.json();

        shuffleArray(questions);
        return questions.slice(0, 5);
    } catch (error) {
        console.error(error);
        return [];
    }
}