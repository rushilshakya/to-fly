# Fullstack JS boilerplate

Simple boilerplate

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

## design framework

The sass files from [CUBE CSS workshop](https://github.com/TEJ-Fellowship/cube-css-workshop) are now configured into `client/assets/styles`

The `main.scss` is referenced from `client/index.html` as a regular stylesheet link. Parcel knows to automatically parse the scss to css.

## starting frontend and backend concurrently during dev

Running `npm run dev` will run frontend and backend at the same time so that you have develop all code together

## running in production

- running `npm run build` will build the frontend to `dist` folder
- then running `npm start` will start the backend server with the `dist` folder as `static`
- this will serve the `index.html` file if any requested files are not found.
