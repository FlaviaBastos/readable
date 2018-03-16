# Readable Project

This is a content and comment web application that allows users to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.
This project was developed as the final assessment for Udacity's React & Redux course which is part of [Udacity's React Nanodegree Program](https://www.udacity.com/course/react-nanodegree--nd019). The project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Installation Steps

To run this app on your local machine follow these steps:

* [clone](https://help.github.com/articles/cloning-a-repository/) the project
* navigate to the project's folder in your computer
* install all project dependencies with `npm install`
* start the development server with `npm start`

## Project Structure
```bash
├── README.md - This file.
├── package.json
├── public
│   ├── favicon.ico
│   ├── manifest.json
│   └── index.html
└── src
    ├── actions
        ├── index.js
        ├── types.js
    ├── components
        ├── AddContent.js
        ├── App.js
        ├── CategoryHeader.js
        ├── Comments.js
        ├── ItemDetail.js
        ├── ItemsList.js
        ├── NotFound.js
        ├── SortBar.js
    ├── reducers
        ├── CategoriesReducer.js
        ├── CommentsReducer.js
        ├── index.js
        ├── PostsReducer.js
    ├── utils
        ├── api.js
        ├── helpers.js
    ├── App.css
    ├── App.js    
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── registerServiceWorker.js
```

## Backend Server

Udacity has provided a [backend API server](https://github.com/udacity/reactnd-project-readable-starter).

#### Using the API Server

* Install and start the API server:
    - [clone](https://help.github.com/articles/cloning-a-repository/) the project
    - navigate to the project's folder in your computer
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, use Create React App to scaffold out the front-end
    - `create-react-app frontend`
    - `cd frontend`
    - `npm start`

#### Important

The backend API server supports a small, fixed number of categories that users can put posts into.

## Contributing

This repository is the final assessment project for Udacity's React & Redux course and will not accept pull requests.
