
# QuillQuest

### 🚀 About QuillQuest
_Seamlessly blending Python and React, discover, share, and curate articles effortlessly. Personalize your feed, explore categories, contribute articles, and tailor your experience. Connecting knowledge, fostering community._

**Key Features:**
- Personalized Article Feed: Tailor your content experience by selecting your preferred categories.
- Diverse Categories: Explore articles across various categories to match your interests.
- User Contributions: Share your insights with the community by posting new articles.
- Customizable Settings: Adjust your settings to create a seamless browsing experience.

## Installation - Backend

#### 1 Prerequisites:
- Make sure you have Python installed on your system. You can download and install Python from the official website: https://www.python.org/
- Install Postgres on your system. You can download and install Postgres from the official website: https://www.postgresql.org/
- Make sure you have Node.js and npm (Node Package Manager) installed on your system. You can download and install them from the official Node.js website: https://nodejs.org/
- Clone the repository, Run the following command to clone:
```bash
git clone https://github.com/shahsad-kp/QuillQuest.git
```


#### 2 Build and installation of backend:

- Change directory to ```backend```, Run ```cd backend```.
- Install dependencies.
```bash 
python -m pip install -r requirements.txt
```
- Setup backend [environment](#backend-variables) variables in ```quillquest/.env``` file.
- Apply migrations, Run ```python manage.py migrate```
- Start server, Run ```python manage.py runserver```
- The backend application will be accessible at http://localhost:8000 (or another available port if 8000 is already in use).

#### 3 Build and installation of frontend:
- Change directory to ```frontend```, Run ```cd frontend```.
- Setup backend [environment](#frontend-variables) variables in ```.env```
- Install dependencies.
```bash
npm install
```
- Start server, Run ```npm run dev```
- The frontend application will be accessible at http://localhost:5173 (or another available port if 5173 is already in use).
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### Frontend variables
`VITE_BACKEND_URL` - Backend server url

#### Backend variables
`DEBUG` - True for development server, else False.

`SECRET_KEY` - Unique secret key of django.

`DB_NAME` - postgres database name.

`DB_USER` - postgres database user.

`DB_PORT` - postgres database port (default 5432).

`DB_PASSWORD` - postgres database user password.

`DB_HOST` - database host (default localhost).

`CORS_ALLOWED_ORIGINS` - List of allowed origins (hostname of Frontend)

`ALLOWED_HOSTS` - List of allowed hosts (Required for production).


## Feedback

If you have any feedback, please reach me at shahsadkpklr@gmail.com or connect me at [LinkedIn](https://www.linkedin.com/in/shahsad-kp/)


## Support
Show your support by 🌟 the project!!
