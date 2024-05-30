# Github OAuth task

### Prerequisites

Register a new OAuth application: `https://github.com/settings/applications/new`.
Every registered OAuth app is assigned a unique Client ID and Client Secret.
Set them as enviroment variables in the [docker-compose](docker-compose.yml)

### Running the application

To run the application, follow these steps:

1. **Build the Docker images:**
docker-compose build

2. **Start the services:**
docker-compose up

3. **Access the application:**
The client should now be running at `http://localhost:5173`.

### Shutting down

docker-compose down
