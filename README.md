# QPG-Reelo

The QPG (Question Paper Generator) API is a tool for creating question papers based on a fixed set of questions. This API allows you to generate question papers with different difficulty levels, makes sure that if possible different question paper will have different questions and provides endpoints for adding new questions dynamically.

## Features
  
- **Optimal Question Selection:** Questions are chosen optimally to meet the specified total marks quota for each difficulty category in question paper.

- **Random Question Selection:** Selects random questions which will still be optimal based on question set and given percentage of marks to fill so that different question papers will contain different questions.

- **Mix Different Difficulties:** Customize question papers by mixing questions of various difficulty levels.
  
- **Flexible Format:** Define the format of your question papers, including the total marks, percentage of difficulty.

## Installation

```bash
npm ci
```

## Usage

### Starting the Application

To start the application, run the following command:

```bash
npm run start
```

This will run the application using `node index.js`.

### Development Mode

For development purposes, you can use `nodemon` to automatically restart the server on file changes (Make sure you have nodemon installed globally). Run the following command:

```bash
npm run dev
```

### Running Tests

To run tests, execute the following command:

```bash
npm test
```

This will run tests using Mocha.
