<p align="center">
  <img src="https://github.com/user-attachments/assets/4f6291e9-3fdc-48f5-9544-2f64da4f107d" alt="logo" width="208" height="208">
</p>

<h1 align="center">Manga XR</h1>
<p align="center">The platform to read manga endlessly.</p>

<!-- add the licence and other stuffs like that here -->

<p align="center">
  <img width="742" alt="homepage" src="https://github.com/user-attachments/assets/0bcd87c9-6fcc-4f2e-a49f-b0186d23640d">
</p>
<p align="center">
  <img width="742" alt="mangapagepng" src="https://github.com/user-attachments/assets/56deb7e0-04dc-47d3-b32f-a4e1dbb947ea">
</p>

<p align="center">
  <img width="742" alt="kimetsu" src="https://github.com/user-attachments/assets/4093197c-57ab-4ed0-b6b0-31ceb290f5e3">
</p>

<h3>Features to add to the options menu and the manga page in general</h3>

- [x] Change width : reponsive width images or adjust the width
- [x] Gap between the page with a range of possible gaps
- [x] Progress Bar (pages read / total of pages)
- [x] One single page or multiple pages
- [x] Next/Prev pages button
- [x] pages drop down
- [x] Chapters dropdown
- [x] Next/Prev chapter Button
- [x] Reading direction (from left to right, from right to left, ...)
- [x] Bookmark the chapter (authentication needed !)
- [ ] Add tests with vitest and / or cypress
- [x] clean up some data scrapped to avoid "\t\t" or "\n\n\n"...
- [x] Don't forget to add placeholder for lazy loaded images
- [x] Add a type for the cursor class
- [x] Add the manga image in the db to display it in the history
- [x] Create a single or two /lib functions to getUser / getUserId, one with redirect and the oter without it
- [x] create a custom 404 page
- [x] add buttons to reload fetching (for example popular, last released manga) when it fails
- [x] create a separate file for swr tags and revalidateTag tags
- [x] replace "altTitle" by "mangaSlug", which is a more suitable variable name
- [x] BIG task: add history for the mangas with seasons, and also bookmarks support
- [x] also history and bookmark support when the chapters names is not "chapter" but for example "episode"
- [x] add a loading state for the bookmarking
- [x] Reduce the delay of revalidation of scrapping functions
- [x] clear out the search form
- [x] Break the massive zustand store into slices
- [x] use the theme to get system for the theme if it is the case
- [x] When user reaches the end of the last chapter, the next chapter button should lead to the mangaPage instead of being grayed out
- [x] remove all the barrels
- [x] can we use a generic function to represent all cleanup functions ?
- [x] finish the dockerfile and optimise its size
- [x] deploy on google cloud vm (temporary)
- [x] fix the cache issues
- [ ] add an opengraph image
- [ ] On the list pages, use a database instead of scrapping to get the data because it is always the same data for each letter
Don't use next build without docker

