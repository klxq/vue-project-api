# vue-project-api

- Build Docker image first

  ```bash
  $ docker build -t api:0.1 .
  ```

- Run image

  ```bash
  $ docker run -d -p 127.0.0.1:3000:3000 api:0.1
  ```

- Access api

  ```js
  $ curl http://localhost:3000/films
  $ curl http://localhost:3000/films/:id
  ```
