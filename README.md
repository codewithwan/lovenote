# LoveNote

LoveNote is a customizable web application that allows users to create personalized love notes with messages, animations, and images for their loved ones.

## Features

- Personalized greeting message
- Animated text and images
- Customizable content via form submission
- Responsive design
- Rate limiting to prevent abuse
- Logging with Winston

## Setup

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies using `npm install`.
4. Set up your database using Prisma.
5. Start the server using `npm start`.

## Docker Setup

1. Ensure you have Docker and Docker Compose installed on your machine.
2. Create a `.env` file in the project directory with the following content:
    ```properties
    DB_USER="postgres"
    DB_PASSWORD="password"
    DB_HOST="localhost"
    DB_PORT=5432
    DB_NAME="lovenote_db"
    DATABASE_URL="postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
    PORT=3000
    ```
3. Build and start the containers using Docker Compose:
    ```sh
    docker-compose up --build
    ```
4. Open your web browser and navigate to `http://localhost:3000`.

## Customization

You can customize the content of the love note by filling out the form on the main page. The form includes fields for recipient name, greeting message, main message, chat message, ideas, wish title, wish text, replay message, last smile, image path, and a custom URL slug.

## Usage

1. Open the application in your web browser.
2. Fill out the form with the desired content.
3. Submit the form to generate a personalized love note.
4. Share the generated URL with your loved one.

## Credits

This project is inspired by and credits [Faahim's Happy Birthday project](https://github.com/faahim/happy-birthday).

## License

This project is licensed under the MIT License.