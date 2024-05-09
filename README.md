# Manga Reading App

Welcome in my next JS application for reading manga thanks to `site` API.

## Project RoadMap
  
- `/` (home) page where I display all the last manga : most popular, last sorties and a search bar (in the navbar, so it is in the layout) to invite the user to enter a manga. When the user search, he is redirected to the next page where the results are displayed.
  
- I will also have a subscribe page. I've finally decide that if users comes, it won't be using a provider like Google. So I will simply ask for a username and a password. A little bit lame, but the goal is to use a mongoDB database with prisma. It is a practice.

- When the user is registered, why not insert a cookie in the navigator with his username (or a particular id that is unique). The goal, by doing that, is when the user comes back, his data are stored, and I can get them back without explicitly ask him to sign in.
  
- The username, so, will be unique. And I can display an image in the top right corner
  
- When a manga is clicked, the user is redirected to a page `/MANGA_NAME`. And there I will display the synopsys, the status and all that stuff (year, status, number of chapters, and all additional information provided by the API)

- I need the user to be registered because his historic of reading will be stored in the **MONGODB** database (as an object with all manga read, the chapter where the user stopped).
  
- I will need a page `/profile` (only available if the user is registered). There, he will have many sections like his history.
  
- For now, it will be everything. Let's implement these features first, and after I will update the list
  