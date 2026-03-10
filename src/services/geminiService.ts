import { GoogleGenAI, Type } from "@google/genai";
import { DesignResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateDesign(
  prompt: string,
  image?: { data: string; mimeType: string }
): Promise<DesignResponse> {
  const model = "gemini-3.1-pro-preview";

  const systemInstruction = `You are MakerAI, an intelligent DIY product design assistant.
Your job is to help users design simple real-world objects they can build themselves using basic materials such as wood, cardboard, plastic, or 3D printing.

Your tasks:
1. Analyze the object from the photo or description.
2. Understand the purpose of the object.
3. Generate a practical DIY design that solves the user's need.
4. Ensure the design is simple, stable, and beginner-friendly.
5. Estimate reasonable dimensions if measurements are missing.
6. Suggest materials that are easily available.
7. Provide clear step-by-step build instructions.

Rules for design:
* Keep the design simple.
* Assume beginner DIY builders.
* Prioritize stability.
* Avoid complex machinery.
* Recommend safe materials.
* The ASCII diagram should show a simple layout of the object structure so users can visualize the design.`;

  const parts: any[] = [{ text: prompt }];
  if (image) {
    parts.push({
      inlineData: {
        data: image.data,
        mimeType: image.mimeType,
      },
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts }],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          project_name: { type: Type.STRING },
          object_detected: { type: Type.STRING },
          design_concept: { type: Type.STRING },
          recommended_dimensions: {
            type: Type.OBJECT,
            properties: {
              height: { type: Type.STRING },
              width: { type: Type.STRING },
              depth: { type: Type.STRING },
            },
            required: ["height", "width", "depth"],
          },
          materials: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          tools_needed: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          build_steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          stability_notes: { type: Type.STRING },
          ascii_diagram: { type: Type.STRING },
        },
        required: [
          "project_name",
          "object_detected",
          "design_concept",
          "recommended_dimensions",
          "materials",
          "tools_needed",
          "build_steps",
          "stability_notes",
          "ascii_diagram",
        ],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }

  const design = JSON.parse(text) as DesignResponse;

  // Generate image
  try {
    const imageResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          text: `A high-quality, realistic photo of a DIY ${design.project_name}. ${design.design_concept}. The object is made of ${design.materials.join(", ")}. It is shown in a clean, well-lit workshop or home environment. Professional product photography style.`,
        },
      ],
    });

    for (const part of imageResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        design.image_url = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
  } catch (error) {
    console.error("Failed to generate image:", error);
  }

  return design;
}
