


# Weather Dashboard 

# working video

check - https://drive.google.com/file/d/1saA-4GVAyMnkg0TsLfFgYQksT29sxIX2/view?usp=sharing

  Create and Weather Dashborad.

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Backend Setup](#backend-setup)
-   [Frontend Setup](#frontend-setup)
-   [Environment Variables](#environment-variables)
-   [Running the Application](#running-the-application)
-   [API Endpoints](#api-endpoints)

## Features

-   Register user, login user, show favorites,add favorites 

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

-   Node.js
-   npm (Node Package Manager) or yarn

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/amalfranci/weather_app_dashboard-task.git

    ```

2. Navigate to the backend directory:

    ```sh
    cd Backend
    ```

3. Install backend dependencies:

    ```sh
    npm install
    ```

4. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```plaintext
   DATABASE_URL=your_db_connection_string
    JWTKEY="your key"
    PORT = 4000
    
    ```

5. Start the backend server:

    ```sh
     npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```sh
    cd frontend
    ```

2. Install frontend dependencies:

    ```sh
    npm install
    ```


4. Start the frontend development server:

    ```sh
    npm run start
    ```

## Running the Application

To run the application locally, follow these steps:

1. Start the backend server:

    ```sh
    cd Backend
    npm start
    ```

2. Start the frontend development server:

    ```sh
    cd frontend
    npm run dev
    ```



## API Endpoints

### Weather Dashboard

-   `POST /api/auth/reister` - User register.
-   `POST /api/auth/login` - User login.
-   `POST /api/favorites` - User add favorites city.
-   `POST /api/favorites/remove` - User remove favorites city.
-   `GET /api/favorites` - Get favorites cities.
-   `GET `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric` - Get current city weather
-    `GET `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric` - Get 7 days weather 



