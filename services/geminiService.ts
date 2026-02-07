import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from "../types.ts";
import { MAP_CONTEXT_DESCRIPTION } from "../constants.ts";

const getClient = () => {
    // Safety check for environment variable
    // In a static HTML deployment, process.env.API_KEY must be injected manually or via the window shim
    const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;
    if (!apiKey) {
        console.error("CRITICAL: process.env.API_KEY is missing. The AI features will not work.");
        throw new Error("API Key not found in environment variables.");
    }
    return new GoogleGenAI({ apiKey });
};

export const checkStudentResponse = async (
    studentInput: string,
    challengePrompt: string,
    challengeType: string
): Promise<AIResponse> => {
    try {
        const ai = getClient();
        
        const systemInstruction = `
        You are a Spanish teacher. The student is practicing giving directions and describing a city.
        
        MAP CONTEXT:
        ${MAP_CONTEXT_DESCRIPTION}

        STUDENT TASK: ${challengePrompt}
        TASK TYPE: ${challengeType}

        GRAMMAR RULES (VERY IMPORTANT):
        1. NO IMPERATIVE MOOD. Do not accept "gira", "cruza", "sigue".
        2. REQUIRE Present Indicative (Tú form) OR "Tienes que" + Infinitive.
           - Correct: "Giras a la derecha", "Cruzas la calle", "Sigues todo recto".
           - Correct: "Tienes que girar", "Tienes que cruzar", "Tienes que seguir".
           - Incorrect: "Gira a la derecha", "Ve todo recto".
        
        VOCABULARY RULES:
        1. DO NOT accept spatial terms like "encima de" or "debajo de".
        2. DO USE terms like: "al lado de", "a la derecha/izquierda", "en la esquina", "al final de la calle", "cerca", "lejos".

        EXAMPLE ANSWERS:
        - "No, no hay. Tienes que ir a..."
        - "Cruzas la calle y sigues todo recto, está a 3 minutos."
        - "Sí, hay una aquí mismo."
        - "Está cerca, a unos 10 minutos."

        EVALUATION LOGIC:
        - If 'existence': Check if they use "Hay" correctly.
        - If 'location': Check if the location description is physically accurate based on the Map Context.
        - If 'directions': Check if the path is logical AND if they used the correct grammar (Present or Tienes que).
        
        Provide feedback in SPANISH. Keep it simple and encouraging.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: studentInput,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        isCorrect: { type: Type.BOOLEAN },
                        feedback: { type: Type.STRING, description: "Feedback in Spanish. Explain grammar errors if they used Imperative." },
                        correction: { type: Type.STRING, description: "Corrected sentence in Spanish using Present Indicative or 'Tienes que'." }
                    },
                    required: ["isCorrect", "feedback"]
                }
            }
        });

        const text = response.text;
        if (!text) throw new Error("No response from AI");
        
        // CLEAN JSON: Sometimes Gemini wraps response in ```json ... ```
        let cleanText = text.trim();
        if (cleanText.startsWith("```")) {
            // Remove first line (```json) and last line (```)
            cleanText = cleanText.replace(/^```(json)?\s*/, "").replace(/\s*```$/, "");
        }

        return JSON.parse(cleanText) as AIResponse;

    } catch (error) {
        console.error("Gemini API Error:", error);
        return {
            isCorrect: false,
            feedback: "Error conectando con el profesor (Check API Key config).",
            correction: ""
        };
    }
};
