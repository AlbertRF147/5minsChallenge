## 5mins React Challenge

### Context

This application was written when participating in the 5mins React Challenge. The goal of the exercise is to build a simple React SPA using themoviedb.org API

### The App

The app contains the minimal functionality required by the challenge. I.e. A list of movies in the main window, and a modal window that will open the movie details upon movie click. There is also a input box that lets the user search movies by title. On landing, or when the search is empty, a list with the most popular movies will be displayed.

The app design is responsive and has been developed to work on any device. To increase building speed, a 3rd party React component library was used ([Chakra UI](https://chakra-ui.com/)).

As a bonus, movie card skeletons were included to fill in the empty spaces while loading the results. More over, the API calls are handled by the library [React Query](https://react-query-v3.tanstack.com/) to take advantage of the query state and the caching features with ease.

### TODOS

Here are some pending tasks that would be immediately addressed if more time was given.

- Build a proper `Error` component to handle network errors.
- Add pagination.
- Improve the overall appearance, specifically in the details window.
- Add movie features. E.g. Movie ratings, reviews, etc.
- Write component tests.
- Improve the network calls performance with React Query. For example, handle the not found fallback images via React Query to allow for caching too.

### Run the App

1. Clone the repo with `https://github.com/AlbertRF147/5minsChallenge.git`
2. Run `npm install`
3. Run `npm run dev`
4. A new browser tab should open with the running app. If not, you can manually open it by navigating to: http://127.0.0.1:5173
