const {GoogleGenAI}=require('@google/genai');
const apikey=process.env.GEMINI_API_KEY;
const ai=new GoogleGenAI({apikey});

async function generatesidequest(prompt) {
    const response=await ai.models.generateContent({
        model:'gemini-3.5-flash',
        contents:prompt
    });
    return response.text;
}

module.exports={generatesidequest};

