# Attack the Virus - Backend

Welcome to the **Attack the Virus - Backend** project. This project is built using **Java 22** and **Spring Boot**. The build system used is **Maven**.

Follow the steps below to set up and run the project in your local development environment.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites
Make sure you have the following tools installed before setting up the project:

- **Java 22**: Download and install [Java 22](https://jdk.java.net/22/).
- **Maven**: Install [Maven](https://maven.apache.org/install.html).
- **IntelliJ IDEA**: Download and install [IntelliJ IDEA](https://www.jetbrains.com/idea/download/), which will be used to run and manage the project.

## Installation

1. **Clone the repository**:
    ```bash
    git clone git@github.com:cs-440-at-uic/442-Group-4-Fall-2024.git
    ```

2. **Open the project in IntelliJ IDEA**:
    - Launch IntelliJ IDEA.
    - Go to **File > Open...**.
    - Navigate to the directory where you cloned the repository.
    - Open the folder `ATV-backend`, located inside the `coding-projects` directory.

3. **Ensure Maven is configured**:
    - After opening the project in IntelliJ, Maven should automatically detect and load dependencies. If not, navigate to the `Maven` tab on the right side and click on the refresh icon.

4. **Check Java SDK**:
    - Go to **File > Project Structure > Project Settings > Project**.
    - Ensure the Project SDK is set to **Java 22**.

## Running the Application

1. **Build the project**:
    - In the terminal or IntelliJ Maven tool window, run the following Maven command:
      ```bash
      mvn clean install
      ```

2. **Run the application**:
    - Once the project is built, you can start the Spring Boot application.
    - Run the `main` method from the class annotated with `@SpringBootApplication`.
    - Alternatively, you can run the application using the Maven command:
      ```bash
      mvn spring-boot:run
      ```

## Project Structure
Here's an overview of the project's structure:
```bash
Coding Project
├──ATV-backend/
│    ├── src/
│    │   ├── main/
│    │   │   ├── java/       # Java source files
│    │   │   └── resources/  # Application resources (e.g., application.properties)
│    │   └── test/           # Unit and integration tests
│    ├── pom.xml             # Maven configuration file
│    └── README.md           # Project documentation (You are here)
└──ATV-frontend/             # To be created
```

## Contributing
Feel free to contribute by submitting issues or pull requests. Ensure that your code adheres to the coding standards and is well-documented.

## License
```
I dont know about licensing yet. //TODO
```


# Now, you're ready to Attack the Virus!