# ram-weather-optimizer-pro-max-plus-alt-7
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python: 3.9+](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![React: 18+](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

## Executive Overview
The ram-weather-optimizer-pro-max-plus-alt-7 project aims to optimize Windows 11's built-in Weather app RAM usage with real-time metrics and interactive dashboards. This project utilizes FastAPI, Python, React (Vite), and TailwindCSS to provide a comprehensive solution.

## Feature Breakdown
* Real-time RAM usage monitoring
* Interactive dashboards for data visualization
* FastAPI backend for handling API requests
* React frontend for user interaction
* TailwindCSS for styling and layout

## API Contract Summary
The API consists of the following endpoints:
* `GET /metrics`: Retrieves real-time RAM usage metrics
* `POST /data`: Submits new data for processing
* `GET /data`: Retrieves processed data
* `POST /reset`: Resets the in-memory data store

## Step-by-Step Commands
To run the project, follow these steps:
1. Install backend packages: `pip install -r requirements.txt`
2. Start the backend: `uvicorn backend.app:app --reload --port 8000`
3. Setup and start the frontend: `cd frontend && npm install && npm run dev`

## CORS Explanation
CORS (Cross-Origin Resource Sharing) allows the React frontend to communicate with the FastAPI backend, which is running on a different port. This is necessary because web browsers enforce same-origin policy, which prevents JavaScript from making requests to a different origin (domain, protocol, or port) than the one the web page was loaded from. By configuring CORS, we can allow the frontend to make requests to the backend, enabling seamless communication between the two.

## End-to-End System Architecture Flow Diagram
```mermaid
graph LR
    A[User] -->|Interacts with| B[React Frontend]
    B -->|Sends API Request| C[FastAPI Backend]
    C -->|Processes Request| D[In-Memory Data Store]
    D -->|Returns Data| C
    C -->|Returns Response| B
    B -->|Renders Data| A
    C -->|Updates Metrics| E[Real-Time Metrics]
    E -->|Sends Updates| B
    B -->|Renders Updates| A
    A -->|Submits New Data| B
    B -->|Sends New Data| C
    C -->|Processes New Data| D
    D -->|Updates Data| C
    C -->|Returns Updated Data| B
    B -->|Renders Updated Data| A
```
This diagram illustrates the step-by-step flow of the system, from user interaction to data processing and rendering. The React frontend communicates with the FastAPI backend, which processes requests and updates the in-memory data store. The backend also updates real-time metrics, which are rendered by the frontend. The user can submit new data, which is processed by the backend and updated in the data store.