# SQS Api

## Technologies

- NodeJs
- Express
- Prisma
- Typescript
- PostgreSQL
- RabbitMQ
- MinIO
- Docker

## Challenge

Your task is to develop an API using Node.js for a product catalog management system in a marketplace application. You should analyze and convert the following user stories into routes for the application.

### User Stories

- As a user, I want to register a product with its owner, so that I can access its data in the future (title, description, price, category, owner ID).

- As a user, I want to register a category with its owner, so that I can access its data in the future (title, description, owner ID).

- As a user, I want to associate a product with a category.

- As a user, I want to update the data of a product or category.

- As a user, I want to delete a product or category from my catalog.

- A product can only be associated with one category at a time.

- Assume that products and categories belong only to one owner.

- Keep in mind that this is an online product catalog, which means there will be multiple requests for editing items/categories per second, as well as accessing the catalog search endpoint.

- Consider the product catalog as a JSON compilation of all available categories and items owned by a user. This way, the catalog search endpoint does not need to fetch information from the database.

- Whenever there is a change in the product catalog, publish this change to RabbitMQ.

- Implement a consumer that listens to catalog changes for a specific owner using RabbitMQ.

- When the consumer receives a message, search the database for that owner's catalog, generate the catalog JSON, and publish it to a MinIO bucket.

## Components

- **Client**: Represents the users interacting with the application through the API. They can send HTTP requests to create, update, or delete products and categories.

- **API (Node.js)**: The API is built in Node.js and is responsible for receiving HTTP requests from clients, validating and processing these requests, and interacting with the database.

- **Database**: Stores the data of the product catalog and categories. The API interacts directly with the database to perform CRUD (Create, Read, Update, Delete) operations.

- **RabbitMQ**: Acts as a message broker for asynchronous communication between different components of the system. The API publishes events related to registration, update, and deletion operations of products and categories. A queue consumer can then process these events as needed.

- **Queue Consumer**: Responsible for consuming messages from RabbitMQ and performing additional tasks based on these messages. For example, it can update caches, index data in a search engine, or perform other asynchronous operations related to changes in the product catalog.

## Workflow

1. A client sends an HTTP request to the API to perform an operation, such as creating a new product.

2. The API receives the request, validates the data, and performs the corresponding operation in the database, such as inserting a new product record.

3. After completing the operation in the database successfully, the API publishes an event related to the operation on RabbitMQ, indicating that a new product has been registered.

4. The queue consumer is constantly listening to the RabbitMQ queue. When a new message is published on the queue, it consumes it and performs additional tasks based on the content of the message.

5. For example, when the queue consumer receives a message indicating that a new product has been registered, it can update the product cache to reflect the latest change.
