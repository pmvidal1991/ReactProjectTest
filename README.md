# WineBeerCellar

## INTRODUCTION
------------

This is a small web application to manage a cellar where the user can consult the wine and beer list, view the details of a wine or beer and add a new wine or beer.
Stack: .net core, React, microsoft SQL Server

## REQUIREMENTS
------------

This application requires the following:

```bash
Visual Studio 2019
Microsoft SQL SERVER
```
## Usage

```bash
You must install the database (is inside the folder 'db' on the main repo folder).
Then open the solution with visual studio, that is inside the main repo folder ,
and Before running the application, In the folder "ClienteApp" , that is inside the folder "wineBeerCellar" , you will find the folder public, where you change the endpoint for your address inside the file "envconfig.js".
Then inside the folder "wineBeerCellar", you have the file "appSettings.json" where you can change the database path.
Now you can run the application with VS2019.
You can see the login credentials , inside the database, table "Users".

```

## Architecture

![Screenshot](screenshot.png)

```bash
I used the selected template on the image above, that integrates .Net Core web api with a React Client App.
```