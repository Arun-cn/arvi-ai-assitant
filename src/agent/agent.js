import Groq from "groq-sdk";

// Initialize the Groq agent with an API key
const agent = new Groq({
  apiKey: process.env.GROQ_TOKEN,
});
let conversationHistory = [];

// Function to handle user messages
export async function handleMessage(userMessage) {
  // Add user message to conversation history
  conversationHistory.push({ role: "user", content: userMessage });

  try {
    // Send conversation history to Groq and get a response
    const groqResponse = await agent.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant that manages a to-do list. You have access to the function \`add_to_todo(task: str)\`. When the user asks to add a task, you MUST call this function. If the user asks anything else, respond politely and appropriately. Example: User: "Add buy milk" You: \`add_to_todo(task="buy milk")\` You: "OK."`,
        },
        ...conversationHistory,
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    });

    let assistantReply = "";

    // Collect the response from Groq
    for await (const chunk of groqResponse) {
      assistantReply += chunk.choices[0]?.delta?.content || "";
    }

    // Check if the response includes a call to add_to_todo function
    // if (assistantReply.includes("add_to_todo(task=")) {
    //   const task = assistantReply.match(/add_to_todo\(task="(.*?)"\)/)[1];
    //   // Append confirmation to the assistant's reply
    //   assistantReply += "\nOK.";
    // }

    // Add assistant's reply to conversation history
    conversationHistory.push({ role: "assistant", content: assistantReply });
    return assistantReply;
  } catch (error) {
    // Handle errors
    console.error("Groq error:", error);
    return "I'm sorry, I'm having trouble understanding you right now.";
  }
}
