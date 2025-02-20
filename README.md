# NextCognito Boilerplate

This is a boilerplate project for integrating AWS Cognito with a Next.js application. It provides a starting point for building authentication and user management features using AWS Cognito.

## Features

- Next.js framework
- AWS Cognito integration
- Authentication (Sign Up, Sign In, Sign Out)
- User management
- Protected routes

## Getting Started

### Prerequisites

- Node.js (>= 12.x)
- AWS account with Cognito setup

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/lokomoloko98/nextcognito-boilerplate.git
    ```

2. Navigate to the project directory:

    ```bash
    cd nextcognito-boilerplate
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Configuration

1. Create a `.env.local` file in the root directory and add your AWS Cognito configuration:

    ```env
    NEXT_PUBLIC_COGNITO_REGION=your-cognito-region
    NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-user-pool-id
    NEXT_PUBLIC_COGNITO_APP_CLIENT_ID=your-app-client-id
    ```

### Running the Application

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Sign Up: Create a new account using the sign-up form.
- Sign In: Log in with your credentials.
- Sign Out: Log out from the application.
- Protected Routes: Access routes that require authentication.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [AWS Cognito](https://aws.amazon.com/cognito/)
