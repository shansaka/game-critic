# Game Critic
This app is a one-stop destination for gamers. It allows users to browse and explore various games without needing to sign in. However, if they want to leave reviews or access additional features, they can register and log in. Logged-in users can write reviews for games, which require admin approval before being visible to others. The search function enables users to easily find games of interest. 
Admins have a separate login path and can manage games, reviews, and user data.The app also offers an optional feature where users can share their location, enhancing their experience by providing localized content. Overall, it's a user-friendly platform catering to gamers' needs with a focus on simplicity and convenience.

# Technologies Used
* Mobile - React Native
* Web App - React
* API - Node JS and Express
* Database - MongoDB

# How to run
All three project needs to install pacakges,
* npm install 

## API
Setting environment variables

| Name  | Description |
| --- | --- |
| DATABASE_URL | Mongo DB connection string |
| ACCESS_TOKEN_EXPIRATION | JWT token expiration time will set the token expiry |
| JWT_SECRET | JWT Secret key, which is used to sign the token |
| REFRESH_TOKEN_SECRET| JWT Refresh Token Secret key, which is used to sign the refresh token |
| MAPBOX_TOKEN | I have used MapBox to get the user's location from the coordinates. |
| GMAIL_SMTP_USERNAME| Gmail username is used to send emails using the Gmail SMTP server. |
| GMAIL_SMTP_PASSWORD  | Gmail app password is used to send emails using the Gmail SMTP server |
| AWS_S3_BUCKET_NAME | AWS S3 is used to store images, this field sets the bucket name |
| AWS_S3_ACCESS_KEY | AWS S3 access key |
| AWS_S3_SECRET_KEY | AWS S3 secret key |

Start the API
* node index.js  or  node .

## Web Application
Setting environment variables

| Name  | Description |
| --- | --- |
| REACT_APP_API_URL | This is the API with web application will call to get data and post data |
| REACT_APP_MAPBOX_TOKEN | I have used MapBox in the web application to show a Map in the admin pages to show where reviews came from. |

## Mobile Application
* Open the Android emulator 
* Start the application
* npm start
* Press a to start it in the Android emulator or scan the QR code to see it on the phone.



