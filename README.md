# AI Chatbot Server

## Description

Flexible chatbot server integrating with external AI chatbot models or client channels as interface, inspired by ChatGPT.

## Technology Stack

- NestJS with TypeScript
- Sequelize with Postgres

## Requirements

### Basic requirements

- Users are unique by username
- AI chatbots can be registered in the DB, and it is not implementing the chatbot itself, instead depending on external providers, such as API or websockets
- Users can create a new 1-1 chat with an AI chatbot in one language, and own the chat
- Users can join their own chats
- Users can send and receive messages in a chat
- Messge type should be 1: string, 2: title and array of selections (used by AI chatbots for questions) excluding any other format (images, stickers, audio by microphone, files, etc.)
- ChatbotModels should be implemented by open-source HuggingFace models and provided by fastapi

### DB schema

- Users: username, name, currentChat as Chats.id
- Chatbots: name, language, conversationId (unique for user-chatbot used for chatbot providers), APIName, APIEndpoint,
- Chats: name, createdBy of Users.id, chatbotId as Chatbots.id
- Messages: from, to, messageType, contents, chatId: Chats.id

### Not included in the MVP

- Authentication and authorization
- Channel integration for Slack, Teams, LINE, etc.

### Additional references for future implementation

- chat types used in AI chatbots: https://github.com/ChatGPT-Hackers/ChatGPT-API-server
- dialog models: https://huggingface.co/microsoft/DialoGPT-small?text=Hey+my+name+is+Mariama%21+How+are+you%3F

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

[MIT licensed](LICENSE).
