# Arvo AI Assistant

## Overview
Arvo AI Assistant is an intelligent automation tool designed to enhance productivity by controlling all agents and triggers. This app assists with day-to-day tasks such as managing to-do lists, scheduling plans, and setting reminders. It integrates a Telegram bot with Groq AI to provide a seamless user experience for task management and automation.
## Features
- **To-Do List Management**: Add and manage tasks in your to-do list.
- **Scheduling**: Plan and schedule your daily activities.
- **Reminders**: Set reminders for important tasks and events.
- **AI Integration**: Leverages Groq AI for intelligent responses and task handling.
- **Productivity Tool**: Helps improve productivity by automating routine tasks and providing timely reminders.

## Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Telegram Bot Token
- Groq API Key

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Arun-cn/arvo-ai-assistant.git
   cd arvo-ai-assistant
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a 

.env

 file in the root directory and add your environment variables:
   ```plaintext
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   GROQ_API_KEY=your-groq-api-key
   ```

4. Start the server:
   ```sh
   npm start
   ```

## Usage
- The bot listens for messages on Telegram and processes them using Groq AI.
- It can handle specific commands like adding tasks to a to-do list, scheduling plans, and setting reminders.

### Example Commands
- **Add to To-Do List**: `add_to_todo task="Buy groceries"`
- **Schedule a Plan**: `schedule_plan task="Meeting with team" time="3 PM"`
- **Set a Reminder**: `set_reminder task="Doctor's appointment" time="10 AM"`

## Contributing
We welcome contributions to improve Arvo AI Assistant. Feel free to open issues or submit pull requests for enhancements and bug fixes.


## Contact
For any inquiries or support, please contact [Arun-cn](https://github.com/Arun-cn).

---

Thank you for using Arvo AI Assistant! We hope it helps you manage your tasks more efficiently and boosts your productivity.
```
