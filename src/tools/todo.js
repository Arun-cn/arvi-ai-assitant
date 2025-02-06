import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tasksFilePath = path.resolve(__dirname, "tasks.json");

// Helper function to read tasks from the file
function readTasksFromFile() {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      // File does not exist, return an empty array
      return [];
    } else {
      throw error;
    }
  }
}

// Helper function to write tasks to the file
function writeTasksToFile(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
}

let tasks = readTasksFromFile();

// To-Do functions using local file storage
export function addTask(task) {
  const newTask = { id: tasks.length + 1, task };
  tasks.push(newTask);
  writeTasksToFile(tasks);
  return newTask;
}

export function getTasks() {
  return tasks;
}

export function updateTask(taskId, updatedTask) {
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
  if (taskIndex !== -1) {
    tasks[taskIndex].task = updatedTask;
    writeTasksToFile(tasks);
    return tasks[taskIndex];
  }
  return null;
}

export function deleteTask(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1);
    writeTasksToFile(tasks);
    return deletedTask[0];
  }
  return null;
}
