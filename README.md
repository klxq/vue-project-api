# vue-project-api

- Build Docker image first

  ```bash
  $ docker build -t api .
  ```

- Run image

  ```bash
  $ docker run -d -p 3000:3000 -p 27017:27017 api
  ```

- Access api

  ```js
  $ curl http://localhost:3000/films
  $ curl http://localhost:3000/films/:id
  ```
