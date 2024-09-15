# Kopi Amerta API

Welcome to **Kopi Amerta API**, the backend service for **Kopi Amerta**, your premium Indonesian coffee online store. This API handles all the server-side operations, including product management, user authentication, and order processing.

## Features

- **User Authentication**: Endpoints for user registration, login, and retrieving user details.
- **Product Management**: Endpoints for managing coffee products, including adding, updating, and retrieving product details.
- **Order Processing**: Manage orders, including creating, updating, and retrieving order information.
- **Search and Filtering**: Search and filter products based on various criteria.
- **Admin Panel**: Administrative dashboard for managing users, products, and orders.

## Installation

<details>
  <summary>Click to expand</summary>
1. Clone the repository and install the required dependencies:

```bash
git clone https://github.com/zckyachmd/kopi-amerta-api.git
cd kopi-amerta-api
bun install
```

2. Create a `.env` file in the root directory and add the following environment variables:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/kopi_amerta
JWT_SECRET=your_jwt_secret
SALT_ROUNDS=10 # Adjust this value to your desired security level
```

3. Run the migrations:

```bash
bunx prisma migrate dev
```

4. Start the server:

```bash
bun run dev
```

5. Open your browser and navigate to `http://localhost:3000/ui` to access the API documentation.
</details>

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more information.
