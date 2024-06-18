# Product Catalog Management API

## Overview

This project is an API for a product catalog management system in a marketplace application. The API allows users to manage products and categories, associate products with categories, and maintain their product catalog. The system is designed to handle multiple requests per second and ensure that the product catalog remains up-to-date and accessible.

### Technologies Used

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **PostgreSQL**: Database for storing product and category data
- **RabbitMQ**: Service for catalog change notifications
- **MinIO**: Storage for catalog JSON files
- **Docker**: Containerization platform

### Constraints

- A product can only be associated with one category at a time.
- Products and categories belong to only one owner.
- The catalog should handle multiple requests per second for editing items/categories and accessing the catalog search endpoint.

### Catalog Management

- The product catalog is considered a JSON compilation of all available categories and items owned by a user.
- Changes to the product catalog are published to the "catalog-emit" queue in RabbitMQ.
- A consumer listens to catalog changes for a specific owner and updates the catalog JSON in a MinIO bucket.

### Setup Instructions

#### Docker Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/MSpilari/SQSApi.git
    
    ```

2. Create a `.env` file in the root directory and add the following:
    ```plaintext
    POSTGRES_USER_TEST= ""
    POSTGRES_PASSWORD_TEST=""
    POSTGRES_DB_TEST=""
    POSTGRES_USER_PROD=""
    POSTGRES_PASSWORD_PROD=""
    POSTGRES_DB_PROD=""
    RABBITMQ_URL=""
   ```
   2.1 Create a `.env.development` file in the root directory and add the following:
    ```plaintext
    DATABASE_URL=""
    PORT=""
    POSTGRES_USER_TEST=""
    POSTGRES_PASSWORD_TEST=""
    POSTGRES_DB_TEST=""
    JWT_SECRET=""
    REFRESH_SECRET=""
    RABBITMQ_URL=""
    MINIO_ENDPOINT="" 
    MINIO_PORT=""
    MINIO_ACCESS_KEY=""
    MINIO_SECRET_KEY=""
   ``` 
   2.2 Create a `.env.prod` file in the root directory and add the following:
    ```plaintext
    DATABASE_URL=""
    PORT=""
    POSTGRES_USER_PROD=""
    POSTGRES_PASSWORD_PROD=""
    POSTGRES_DB_PROD=""
    JWT_SECRET=""
    REFRESH_SECRET=""
    RABBITMQ_URL=""
    MINIO_ENDPOINT="" 
    MINIO_PORT=""
    MINIO_ACCESS_KEY=""
    MINIO_SECRET_KEY=""
   ``` 

3. Run the application using Docker Compose:
    ```bash
    docker-compose up -d
    ```

#### RabbitMQ Integration

- **Producer**: Used for publishing catalog change notifications.
- **Consumer**: Listens to the "catalog-emit" queue. On receiving a message, it fetches the owner's catalog from the database, generates the catalog JSON, and uploads it to the specified MinIO bucket.

#### MinIO Integration

- **Bucket**: Used for storing the catalog JSON files.

### Consumer for Catalog Changes

- Listens to the "catalog-emit" queue in RabbitMQ.
- On receiving a message, fetches the owner's catalog from the database.
- Generates the catalog JSON and uploads it to the specified MinIO bucket.

## Conclusion

This API provides a robust system for managing a product catalog in a marketplace application, ensuring efficient handling of multiple requests and seamless integration with RabbitMQ and MinIO for catalog updates and storage. Running the application via Docker ensures a consistent and easily deployable environment.
