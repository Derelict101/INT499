# StreamList

StreamList is a React based web application created for EZTechMovie’s IT Department. The app allows users to create a personal streaming list of movies or programs they want to watch later. This first version focuses on building the project structure, navigation system, homepage form, basic styling, and console output.

## Project Purpose

The purpose of StreamList is to give users a simple way to enter and manage streaming content they want to watch. The app works like a basic to do list or grocery list, but it is designed specifically for movies and programs.

This week’s version creates the foundation for the final project. The app currently accepts user input on the StreamList homepage and displays the submitted information in the browser console.

## Current Features

1. React application created with Vite.

2. React Router navigation.

3. StreamList homepage.

4. Movies page placeholder.

5. Cart page placeholder.

6. About page placeholder.

7. User input form for streaming content.

8. Console output when the form is submitted.

9. Custom CSS styling.

10. Google Material Symbols icons.

## Navigation Pages

The app contains four main navigation options.

### StreamList Page

The StreamList page is the homepage. It contains a form where users can enter a movie or program title, streaming platform, priority level, and notes. When the form is submitted, the app creates a JavaScript object and displays it in the browser console.

### Movies Page

The Movies page is currently a placeholder. This page will be developed in Week 4.

### Cart Page

The Cart page is currently a placeholder. This page will be developed in Week 4.

### About Page

The About page is currently a placeholder. This page will be developed in Week 5.

## Technologies Used

1. React

2. Vite

3. React Router

4. JavaScript

5. HTML

6. CSS

7. Google Material Symbols

## File Structure

```text
streamlist
├── index.html
├── package.json
├── README.md
└── src
    ├── App.jsx
    ├── main.jsx
    ├── components
    │   ├── Layout.jsx
    │   ├── Navbar.jsx
    │   └── StreamForm.jsx
    ├── pages
    │   ├── About.jsx
    │   ├── Cart.jsx
    │   ├── Movies.jsx
    │   ├── NotFound.jsx
    │   └── StreamList.jsx
    └── styles
        └── styles.css
```

## How to Install and Run the App

Open the project folder in Visual Studio Code.

Open the terminal and run:

```bash
npm install
```

After the dependencies install, start the development server:

```bash
npm run dev
```

The terminal should display a local development link, usually:

```text
http://localhost:5173/
```

Open that address in a browser to view the app.

## How to Test the App

To test the StreamList form:

1. Open the app in the browser.

2. Open the browser developer tools.

3. Click the Console tab.

4. Enter a movie or program title.

5. Enter a streaming platform.

6. Select a priority level.

7. Add optional notes.

8. Click the Add to StreamList button.

After submitting the form, the app will display the submitted StreamList object in the browser console.

Example console output:

```javascript
StreamList item submitted: {
  id: "generated id",
  title: "The Mandalorian",
  platform: "Disney Plus",
  priority: "High",
  notes: "Watch this weekend",
  createdAt: "date and time"
}
```

## Current Development Status

This version of StreamList is the first stage of the project. The main goal for this week was to create the React application, build the navigation system, add the required pages, style the interface, and make sure the homepage form sends user input to the console.

The Movies, Cart, and About pages are intentionally left as placeholders because they will be completed in later weeks.

## Future Development

Future versions of StreamList will expand the app with more complete functionality. Planned improvements include adding movie data, building the cart page, creating the About page, storing user items, improving list management, and adding more advanced React functionality.

## Author

Ben Holley

## Course Project

INT499

## Company Scenario

EZTechMovie IT Department
