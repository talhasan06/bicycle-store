# Bicycle Store B4A2V4

A RESTful API built with Node.js, Express, and TypeScript for managing a bicycle shop's inventory and orders. This API provides endpoints for managing bicycle products, handling orders, and calculating revenue.

## Features

- Product Management (CRUD operations)
- Order Processing
- Revenue Calculation
- Input Validation using Zod
- MongoDB Integration
- TypeScript Support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

#### Clone the repository:

```
git clone <repository-url>
cd bicycle-shop-api
```

#### Install dependencies:

```
npm install
```

#### Create a `.env` file in the root directory with the following variables:

```
PORT = 5000
DATABASE_URL = mongodb+srv://admin-um:q7VtWGnyEHzmPWDA@cluster0.o4eynrq.mongodb.net/bi-cycle-store?retryWrites=true&w=majority&appName=Cluster0
BCRYPT_SALT_ROUNDS = 12
```

### Run the application

```
npm run start-dev
```

### Production Mode

```
npm run start-prod
```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products?searchTerm=type` (`searchTerm` can be `name`, `brand`, type) - Search a product
- `GET /api/products/:productId` - Get a single product
- `POST /api/products` - Create a new product
- `PUT /api/products/:productId` - Update a product
- `DELETE /api/products/:productId` - Delete a product

### Orders

- `POST /api/orders` - Create a new order
- `GET /api/orders/revenue` - Calculate total revenue

## Data Models

### Product

```
{
    name: string;
    brand: string;
    price: number;
    type: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric";
    description: string;
    quantity: number;
    inStock: boolean;
    isDeleted: boolean;
}
```

### Order

```
{
    email: string;
    product: ObjectId;
    quantity: number;
    totalPrice: number;
}
```

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run start-dev` - Start development server with hot-reload
- `npm run start-prod` - Start production server
- `npm run prettier` - Format TypeScript files
- `npm run format` - Format all files

## Technologies Used

- Express.js
- TypeScript
- MongoDB with Mongoose
- Zod (Schema Validation)
- CORS
- ESLint
- Prettier

## Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes and error messages. All endpoints return standardized JSON responses with the following structure:

```
success: boolean;
message: string;
data?: any;
error?: any;
```

## Contributing

#### 1. Fork the repository

#### 2. Create your feature branch (`git checkout -b feature/amazing-feature`)

#### 3. Commit your changes (`git commit -m 'Add some amazing feature'`)

#### 4. Push to the branch (`git push origin feature/amazing-feature`)

#### 5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
