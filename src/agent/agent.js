import Groq from "groq-sdk";
import { addTask, getTasks, updateTask, deleteTask } from "../tools/todo.js";

// Initialize the Groq agent with an API key
const agent = new Groq({
  apiKey: process.env.GROQ_TOKEN,
});
let conversationHistory = [];

// Function to check if AI reply contains a function call
function checkForFunctionCall(reply) {
  const functionCallPattern = /(\w+)\((.*?)\)/;
  const match = reply.match(functionCallPattern);
  if (match) {
    const functionName = match[1];
    const args = match[2].split(",").map((arg) => {
      const [key, value] = arg.split("=");
      return value ? value.replace(/"/g, "").trim() : undefined;
    });
    return { functionName, args };
  }
  return null;
}

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
          content: `You are a helpful AI assistant that manages a to-do list. You have access to the functions \`add_to_todo\`, \`get_tasks\`, \`update_task\`, and \`delete_task\`. When the user asks to add, get, update, or delete a task, you MUST call the appropriate function. If the user asks anything else, respond politely and appropriately. Example: User: "Add buy milk" You: \`add_to_todo(task="buy milk")\` You: "OK."`,
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

    // Check for function calls in the AI reply
    const functionCall = checkForFunctionCall(assistantReply);
    if (functionCall) {
      const { functionName, args } = functionCall;
      switch (functionName) {
        case "add_to_todo":
          addTask(args[0]);
          assistantReply += "\nOK.";
          break;
        case "get_tasks":
          const tasksList = getTasks();
          assistantReply += `\nTasks: ${tasksList
            .map((task) => task.task)
            .join(", ")}`;
          break;
        case "update_task":
          updateTask(args[0], args[1]);
          assistantReply += "\nTask updated.";
          break;
        case "delete_task":
          deleteTask(args[0]);
          assistantReply += "\nTask deleted.";
          break;
        default:
          console.error("Unknown function call:", functionName);
          break;
      }
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
