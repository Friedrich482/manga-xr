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

# Navigation Method : ! Important 
A catalogue (called `manga` is needed !)
I will fetch all the needed the data in some components, like Popular and LastReleases. Because of Next JS aggressive caching, it is not a problem. And then, if the user clicks on a manga, he will be redirected on a page. How to pass the manga name in parameter ? Well, use a dynamic page and then, when the page is reached, get the manga name with some of hooks like useParams or useSearchParams, I don't remember. Once the manga name is grabbed from the URL, fetch informations about that manga and all the chapters (actually some informations about the chapter). And when the user clicks a chapter, use the number of the chapter to make a dynamic nested url. And once I'm on that page, get the manga name and the chapter with thse params hooks. So all the pages will be get. I would go  bit further by also displaying only an image per page. Same game, some buttons like prev and next will be used to navigate between the pages of the chapter. The numero of the page of the chapter will be put in the url one time again and get it with all others stuff when you're there, using appropriate params hooks. Here is an example of what I will do : 
`/manga/one-piece/1113/1`. But is a good idea ? Or I may use `/manga/one-piece/` and if a chapter is clicked, it will become `/one-piece/1113/1` for example. The second alternative seems to be more pro  
  
use zod to validate popular manga schema ?
