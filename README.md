### TMDB Movies Library - Frontend 🎬
🚀 TMDB Movies Library is a web application that allows users to search for movies and TV shows, view their detailed information, and add them to favorites.

🔗 Demo: [TMDB Movies Library](https://tmdb-movies-library.vercel.app/)

🔗 Backend API(developed by me): [Movies Library Backend](https://github.com/DmytriiTsybuliak/movies-library-backend)

🔗 Additional Backend API: [TMDB](https://developer.themoviedb.org/reference/intro/getting-started)

### 🔧 Tech stack
- Frontend: React, TypeScript, Redux Toolkit, React Router
- UI: CSS Modules, Grid & Flexbox
- State Management: Redux Persist for storing authorization
- HTTP requests: Axios with interceptors
- Authentication: JWT + HTTP-only cookies, Google OAuth 2.0
- Data requests: TMDB API & Custom Backend
- Build: Vite
- Deployment: Vercel

### 📌 Functionality
- Movie and TV show search — Uses TMDB API, supports autocomplete.
- Category pages — Displays popular, new and top movies/TV shows.
- View details — Poster, description, rating, trailer, cast and reviews.
- Favorites — Ability to add and remove movies to favorites.
- Authentication and authorization.
- Registration and login via email + password.
- Google OAuth 2.0.
- Password recovery via email.
- Updating tokens via HTTP-only cookies.
- Updating user data — Editing profile and avatar.
- Adaptability — Support for mobile and tablets.

### 📚 API integrations
- TMDB API — for searching and displaying movie/TV show data
- Movies Library Backend — for managing users and favorites

### 🔐 Security and authorization
- JWT tokens are stored in cookies (httpOnly, secure).
- Auto-update of the token via auth/refresh.
- Redux Persist saves the token between sessions.

### 🌎 Deployment
The project is deployed on Vercel, the backend runs on Render (free server, possible delay of 50+ seconds after downtime).
