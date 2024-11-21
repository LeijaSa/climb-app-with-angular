# climb-app-with-angular

## Overview

This project is a practice application built with **Angular** to explore key concepts like **signals**, **APIs**, **Angular Material**, and **dialogs**. The app simulates a climbing problem management system where users can view, add, update, and delete boulder problems. The app currently uses **JSON Web Server** for a mock backend but is designed to evolve with features like user authentication and backend integration in the future. The project will also integrate **Redux** for state management and include **unit tests**.

## Features

### 1. **Boulder Problem Management**

- **Add**: Users can add new bouldering problems with details like state, grade, description, and location.
- **Edit**: Users can update the state of an existing bouldering problem (e.g., change the state from "project" to "completed").
- **Delete**: Users can delete a bouldering problem from the list.
- **View**: Displays a list of bouldering problems from the mock backend.

## Installation

### Prerequisites

- **Node.js**: Make sure you have **Node.js** installed. If not, download and install it from [nodejs.org](https://nodejs.org/).
- **Angular CLI**: The project is built using Angular, so you will need to install the **Angular CLI** if you haven't already:
  ```bash
  npm install -g @angular/cli
  ```

## Running the Application

To run the application locally, follow these steps:

1. **Clone the Repository**:
   To get started, clone the repository by running the following command in your terminal:
   ```bash
   git clone https://github.com/your-username/angular-climbing-app.git
   ```

2.**To install all the required dependencies, run the following command:**
```bash
npm install

3. **Start the JSON Server**:
   In a terminal window, navigate to the project directory and run the following command to start the mock backend server:

   ```bash
   npx json-server --port=5000 --watch db.json

   ```

4. **Start the Angular application**:
   ```bash
   ng serve
   ```
