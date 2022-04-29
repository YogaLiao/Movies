# Movie Lovers
## About
Movie Lovers ia a APP designed for people who love movies but cannot decide what to watch. It's built using Node.js, Mongoose, Express and EJS with all 5 RESTful routes and full CRUD. You can access the APP [here](https://dashboard.heroku.com/apps/gentle-tor-59853).

## User Stories
### Home Page
By clicking the buttom below, the user is able to go to our movie page and reach the movies we recommend. These are all movies from our top 250 movies list.
<img width="1384" alt="image" src="https://user-images.githubusercontent.com/97146317/166075420-f2080c19-3cd5-40fc-9963-e81c7e620d0c.png">

### Main Page
In this page, the user can see 12 movies we selected randomly from our top list. There are also other features for the user.
![image](https://user-images.githubusercontent.com/97146317/166075577-d4db2b6d-cb98-4a7a-84c0-3902e08585d0.png)

#### Home
By clicking the "Home" buttom, the user can go back to our home page.

#### New Recommendations
If the user is not satisfied with these 12 movies, they can click the "New Recommendations" button in the navigation bar. The page will refresh and bring back another 12 movies as new recommendations.

#### Sort
To better help the user to make a decision, the user can sort these 12 moview by name, rank or rating by clik the "Sort By" buttom in the navigation bar.

#### Add a new movie
The list we have is the top 250 movies list. But if the user would like to add more movies into our database it is more than welcome. What they need to do is to click the "Add a New Movie" button in the navigation bar and they will go to a new page as shown below to fill in the form. After submitting, the new movie is added to our database.
![image](https://user-images.githubusercontent.com/97146317/166076018-46080ac3-8a9c-4fcf-8680-2c4ca41c8fe6.png)

#### Search
This function is designed for people who knows what to watch and would like to find out more information for certain movies. By entering the keywords here it's able for the user to search movies including the keywords. All the results will be shown in below page and it's able to click and get more movie information (see below for Movie Detail part). However, there are some movies that are not in our database so we don't have their information, the user can add this movie they want.

### Movie Detail Page
This function can be used both in our main page and in the search result page. By clicking the movie name, the user is able to access more information of this movie including their cast, their description and reviews. User can also edit this information if there is anything wrong. If the user does not like this movie, they can delete the movie by clicking "delete" button.

### Review
Reviews are really important for movies. They user is able to add a review by clicking the "Add Review" button in the Movie Detail Page. After adding their reviews, it's also available for the user to edit or delete their reviews.

## Technologies used in this app
- Node.js
- Mongoose
- Express
- EJS
- CSS
- MVC
- Third Party API (IMDB API)

## List of Mongoose Models
### Models
#### Top Movies Model
- Title (String)
- Description (String)
- Language (String)
- Rank (Number)
- year (Number)
- image (String)
- crew (String)
- Rating (Number)

#### User Reviews Model
- User Name (String)
- Comments (String)

## Further Improvement
- Add user login/signup function
- Add filter function
