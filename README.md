# Trybe Football Club Application

Project developed during the backend module of [Trybe's](https://www.betrybe.com/) Full Stack Web Development course.

## About the Project

TFC is and informational website about football matches and rankings.

In this project, I built a dockerized backend using data modeling through Sequelize. Its development must respect business rules provided in the project and its API must be able to be consumed by a front-end already provided in that project.

Some technologies such as NodeJs and Typescript were used to build the API and for the project architecture I used POO and SOLID principles.

## Technologies and Tools

- NodeJs
- Typescript
- Docker
- Sequelize
- MySQL
- Jest
- Chai
- Mocha
- Sinon

## Running the application locally

1. Clone the repository:

```bash
git clone https://github.com/tryber/sd-023-b-trybe-futebol-clube.git
```
2. Enter the folder.
3. Install the dependencies:

```bash
npm install
```
4. Run the containers:

```bash
npm run compose:up:dev
```
OBS: If your containers don't auto-upload, you'll have to manually upload them.

5. With everything working fine, your frontend will be available at localhost:3000 and your backend at localhost:3001.

## Endpoints

### Login

-   **URL**
    
    `/login`
    
-   **Method**
    
    `POST`
    
-   **Description**
    
    This endpoint is used to authenticate users and return a token created with jsonwebtoken.
    

### Validate Token

-   **URL**
    
    `/login/validate`
    
-   **Method**
    
    `GET`
    
-   **Description**
    
    This endpoint checks for a token in the headers and returns the user's role, whether administrator or not. The returned data will be in the format: `{"role": "admin"}`

----------
    

### Matches

-   **URL**
    
    `/matches`
    
-   **Method**
    
    `GET`
    
-   **Description**
    
    This endpoint returns an array of matches and can be filtered by in-progress or finished matches. The returned data will be in the format:
    <details>

    ```json
    [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Gremio"
        }
      },
      {
        "id": 2,
        "homeTeamId": 9,
        "homeTeamGoals": 1,
        "awayTeamId": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Internacional"
        },
        "awayTeam": {
          "teamName": "Santos"
        }
      },
    ] 
    ```
----------
### Create a Match

-   **URL**
    
    `/matches`
    
-   **Method**
    
    `POST`
    
-   **Description**
    
    This endpoint creates a new soccer match based on the information provided in the request body. The request body must be in the following format:
    <details>

    ```json
    {
      "homeTeamid": 1, 
      "awayTeamid": 2, 
      "homeTeamGoals": 3, 
      "awayTeamGoals": 1
    }
    ```
- **Response**

  The endpoint will return a JSON object with the following properties:
  <details>

    ```json
    {
      "id": 1,
      "homeTeamid": 1, 
      "awayTeamid": 2, 
      "homeTeamGoals": 3, 
      "awayTeamGoals": 1
    }
  ```
----------

### Update a Match

-   **URL**
    
    `/matches/:id`
    
-   **Method**
    
    `PATCH`
    
-   **Description**
    
    This endpoint updates the information of a soccer match that is currently in progress. The match can only be updated if its `inProgress` property is set to `true`.
    
-   **Response**
    
    If the match is successfully updated, the API will return a JSON object similar to the following:
    ```json
    {
      "message": "updated"
    }
    ```        

----------

### Finish a Match

-   **URL**
    
    `/matches/:id/finish`
    
-   **Method**
    
    `PATCH`
    
-   **Description**
    
    This endpoint finishes a soccer match that is currently in progress. The match can only be finished if its `inProgress` property is set to `true`.
    
-   **Response**
    
    If the match is successfully finished, the API will return a JSON object similar to the following:
    ```json
    {
      "message": "Finished"
    }
    ```    
----------
### Get Teams

-   **URL**
    
    `/teams`
    
-   **Method**
    
    `GET`
    
-   **Description**
    
    This endpoint returns an array of objects representing all the soccer teams in the database.
    
-   **Response**
    
    The API will return a JSON array of objects, where each object represents a team. A example will look like this:
    <details>

    ```json
    [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      {
        "id": 4,
        "teamName": "Corinthians"
      },
      {
        "id": 5,
        "teamName": "Cruzeiro"
      },
    ]
    ```
  ----------

### Get a Team

-   **URL**
    
    `/teams/:id`
    
-   **Method**
    
    `GET`
    
-   **Description**
    
    This endpoint returns information for a specific soccer team, identified by its `id`.
    
-   **Response**
    
    The API will return a JSON object representing the requested team, with properties such as `id` and `teamName`. An example response may look like this:
    ```json
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    }
    ```
----------

### Get Championship Standings

-   **URL**
    
    `/leaderboard`
    
-   **Method**
    
    `GET`
    
-   **Description**
    
    This endpoint returns the championship standings, including information about each team's performance in the tournament.
    
-   **Response**
    
    The API will return a JSON array of objects, where each object represents a team and its standings in the championship. The response will look like this:
    <details>

    ```json
    [
      {
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": "86.67"
      },
      {
        "name": "Corinthians",
        "totalPoints": 12,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 12,
        "goalsOwn": 3,
        "goalsBalance": 9,
        "efficiency": "80.00"
      },
    ]
    ```

    Note: The teams are sorted primary by points, with other properties being used as tie-breakers if necessary.

---


### Get Home or Away Championship Standings

-   **URL**
    
    `/leaderboard/home` or `/leaderboard/away`
    
-   **Method**
    
    `GET`
    
-   **Description**
    
    This endpoint returns the championship standings, filtered by whether the matches were played at home or away.
    
-   **Response**
    
    The API will return a JSON array of objects, where each object represents a team and its standings in the championship. The response will look the same way as the one from `/leaderboard`.

    Note: The teams are sorted primary by points, with other properties being used as tie-breakers if necessary. The only difference between `/leaderboard/home` and `/leaderboard/away` is the filter applied to the data, showing only matches played at home or away, respectively.

---
        
### Project developed by [Manoel Vieira Lima Junior](https://www.linkedin.com/in/manoel-vieira-lima-junior-589838127/)
