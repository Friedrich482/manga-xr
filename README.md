 <p align="center"> 
  <img src="https://github.com/user-attachments/assets/4f6291e9-3fdc-48f5-9544-2f64da4f107d" alt="logo" width="208" height="208">  
</p>

<h1 align="center">Manga XR</h1>
<p align="center">The platform to read manga endlessly.</p> 

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-red">
  <img src="https://img.shields.io/badge/LICENSE-MIT-blue">
</p>

<p align="center">
  <img width="742" alt="homepage" src="https://github.com/user-attachments/assets/0bcd87c9-6fcc-4f2e-a49f-b0186d23640d">
</p>

<h2></h2>

<p align="center">
  <img width="742" alt="legendOfNorthernBlade" src="https://github.com/user-attachments/assets/56deb7e0-04dc-47d3-b32f-a4e1dbb947ea">
</p>

<h2></h2>

<p align="center">
  <img width="742" alt="kimetsu" src="https://github.com/user-attachments/assets/4093197c-57ab-4ed0-b6b0-31ceb290f5e3">
</p>

## Table of contents

- [Table of contents](#table-of-contents)
- [Running Locally](#running-locally)
  - [Installation](#installation)
  - [.env](#env)
  - [.env.local](#envlocal)
- [Progress list](#progress-list)
- [Contributing](#contributing)
- [License](#license)

## Running Locally

### Installation

Install Docker. [Docker Desktop](https://www.docker.com/products/docker-desktop/) is the easiest way to setup.

Clone the repository :  

```bash
git clone https://github.com/Friedrich482/manga-xr.git
```

Them install all necessary dependencies :

```bash
npm install
```

After that generate the Prisma Client for your OS :

```bash
npx prisma genrate
```

### .env

Create a .env file in the root of the directory with the variables DATABASE_URL and SESSION_SECRET.

```.env
DATABASE_URL=...
SESSION_SECRET=...
```

For the DATABASE_URL, use

```.env
DATABASE_URL="mongodb://root:password@localhost:27017/database?authSource=admin&directConnection=true&replicaSet=rs0"
```

Then :

```docker
docker compose up -d
```

Docker Compose will pull the [prismagraphql/mongo-single-replica:4.4.3-bionic](https://hub.docker.com/r/prismagraphql/mongo-single-replica) image and use it to create a volume as a replica set for Prisma. It is needed to run Prisma transactions in local. This replica set is used as the database.

[docker-compose.yml](/docker-compose.yml)

```yaml
services:
  database:
    # This image automatically creates a replica set required for transactions
    image: prismagraphql/mongo-single-replica:4.4.3-bionic
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password
      INIT_WAIT_SEC: 3
    ports:
      - 27017:27017
```

For the SESSION_SECRET, you need to generate a SSH Key and get the fingerprint.

```bash
ssh-keygen -t rsa -b 4096
```

At the end the .env file should look to something like :

```.env
DATABASE_URL="mongodb://root:password@localhost:27017/database?authSource=admin&directConnection=true&replicaSet=rs0"
SESSION_SECRET="SHA256:..."
```

### .env.local

Create an accout on [uploadthing](https://uploadthing.com/). Then get your keys. For the version `6.7.2`, you will need UPLOADTHING_SECRET and UPLOADTHING_APP_ID

```bash
UPLOADTHING_SECRET=...
UPLOADTHING_APP_ID=...
```

Then serve locally :

```bash
npm run dev
```

Prisma studio to explore and manipulate the data :

```bash
npx prisma studio
```

Test environment:

```bash
npm run test:ui
```

## Progress list

- [x] Change width : responsive width images or adjust the width
- [x] Gap between the page with a range of possible gaps
- [x] Progress Bar (pages read / total of pages)
- [x] One single page or multiple pages
- [x] Next/Prev pages button
- [x] pages drop down
- [x] Chapters dropdown
- [x] Next/Prev chapter Button
- [x] Reading direction (from left to right, from right to left, ...)
- [x] Bookmark the chapter (authentication needed !)
- [x] Add tests with vitest and / or cypress
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
- [x] clear out the search form
- [x] Break the massive zustand store into slices
- [x] use the theme to get system for the theme if it is the case
- [x] When user reaches the end of the last chapter, the next chapter button should lead to the mangaPage instead of being grayed out
- [x] remove all the barrels
- [x] can we use a generic function to represent all cleanup functions ?
- [x] finish the dockerfile and optimize its size
- [x] deploy on google cloud vm (temporary)
- [x] fix the cache issues
- [x] add an open graph image

## Contributing

If you want to contribute :

Fork the repo.

Then clone your fork to your local machine (replace <your_username> by your GitHub username) using : 

```bash
git clone https://github.com/<your-username>/manga-xr.git
```

Create a new branch 

```bash
git checkout -b <new-branch-name>
```

After making your changes, commit on your branch then submit a Pull Request.

## License 

[MIT](/LICENSE) License &copy; 2024
