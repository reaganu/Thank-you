
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratorInputs, GeneratedNote } from "../types";
import { KNOWLEDGE_BASE } from "../constants";

const SYSTEM_INSTRUCTION = `
You are Reagan's executive communication assistant. Your goal is to write thank-you notes that follow the Reagan 2.0 Voice DNA exactly.

KNOWLEDGE BASE:
${KNOWLEDGE_BASE.voice}

PLAYBOOK:
${KNOWLEDGE_BASE.playbook}

RULES:
1. NEVER use exclamation points unless specifically asked.
2. NEVER use emojis.
3. Be specific and include "Forward Motion" (next steps).
4. No fluff or "just wanted to" language.
5. Use plain, professional English.
`;

export const generateThankYouNote = async (inputs: GeneratorInputs): Promise<GeneratedNote> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
Generate a ${inputs.channel} thank-you note based on these inputs:
- Recipient Name: ${inputs.recipientName}
- Recipient Role/Context: ${inputs.recipientRole}
- Occasion: ${inputs.occasion}
- Specific Detail: ${inputs.detail}
- Impact: ${inputs.impact || "General gratitude"}
- Next Step: ${inputs.nextStep}
- Tone: ${inputs.tone}
- Length: ${inputs.length}

Format the output as a JSON object with:
- body: the main text
- subject: (only if Email)
- alternates: an array of 2 objects { label: string, content: string } (e.g., "Tighter", "Elevated")
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            body: { type: Type.STRING },
            subject: { type: Type.STRING },
            alternates: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  content: { type: Type.STRING }
                },
                required: ["label", "content"]
              }
            }
          },
          required: ["body"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...data
    };
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
};
