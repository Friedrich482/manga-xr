 <p align="center">  
  <img src="https://github.com/user-attachments/assets/4f6291e9-3fdc-48f5-9544-2f64da4f107d" alt="logo" width="208" height="208">  
</p>

<h1 align="center">Manga XR</h1>
<p align="center">The platform to read manga endlessly.<br/>
<a href="https://mangaxr.app/">mangaxr.app</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.2-red">  
  <img src="https://img.shields.io/badge/LICENSE-MIT-blue">
</p>

<p align="center">
  <img width="742" alt="homepage" src="https://github.com/user-attachments/assets/15c5de49-3d3f-4113-9688-35674c9dedb1">
</p>

<h2></h2>

<p align="center">
  <img width="742" alt="kaijuNum8" src="https://github.com/user-attachments/assets/fbfefb80-6673-403d-93a9-25087a0aa43a">
</p>

<h2></h2>

<p align="center">
  <img width="742" alt="kimetsu" src="https://github.com/user-attachments/assets/4093197c-57ab-4ed0-b6b0-31ceb290f5e3">
</p>
 
## Table of contents

- [Table of contents](#table-of-contents)
- [Running Locally](#running-locally)
  - [Installation](#installation)
  - [.env files](#env-files)
    - [.env.development](#envdevelopment)
    - [.env.staging](#envstaging)
- [Progress list](#progress-list)
- [Contributing](#contributing)
- [License](#license)

## Running Locally

### Installation

- Install [Docker](https://docs.docker.com/get-started/get-docker/) if you haven't already.

- Clone the repository:

```bash
git clone https://github.com/Friedrich482/manga-xr.git
```

- Install all necessary dependencies:

```bash
npm install
```

- Generate the Prisma Client for your OS:

```bash
npx prisma generate
```

### .env files

#### .env.development

Create a `.env.development` file in the root of the directory with the variables `DATABASE_URL`,`SESSION_SECRET`, `BROWSERLESS_URL` and `UPLOADTHING_TOKEN`.

```.env
DATABASE_URL=...
SESSION_SECRET=...
BROWSERLESS_URL=...
UPLOADTHING_TOKEN=...
```

For the `DATABASE_URL`, use

```bash
DATABASE_URL="mongodb://root:password@localhost:27017/mangaxr-dev?replicaSet=rs0&authSource=admin"
```

(Local replica set for Prisma transactions, this is a docker volume, so the data will be stored locally)

[compose.yaml](/docker/development/compose.yaml)

For the `SESSION_SECRET`, you need to generate a SSH Key and get the fingerprint.

```bash
ssh-keygen -t rsa -b 4096
```

Then create an accout on [Uploadthing](https://uploadthing.com/). Then get your keys. For the version `7.7.2`, you will need `UPLOADTHING_TOKEN`

```bash
UPLOADTHING_TOKEN=...
```

At the end the `.env.development` file should look to something like:

```bash
DATABASE_URL="mongodb://root:password@localhost:27017/database?authSource=admin&directConnection=true&replicaSet=rs0"
SESSION_SECRET="SHA256:..."
BROWSERLESS_URL="ws://localhost:3001"
UPLOADTHING_TOKEN=...
```

Then serve locally:

```bash
npm run dev
```

You also need the compose services for development. There are the browserless-dev service and a Mongo DB replica set, which is a docker volume required for prisma to run the transactions locally. To do so:

```bash
make dev-up # to start the services
make dev-down # to stop them
```

For more information about the commands available, check the [Makefile](/Makefile)

Prisma Studio to explore and manipulate the data:

```bash
npm run dev:studio
```

Testing GUI with Vitest:

```bash
npm run test:ui
```

#### .env.staging

The services in the [staging compose.yaml](/docker/staging/compose.yaml) allow you to create a staging version on the application with three docker compose services: the app itself, a browserless instance and a MongoDB replica set for Prisma transactions.

Create a `.env.staging` file in the root of the directory with the variables `DATABASE_URL`,`SESSION_SECRET`, `BROWSERLESS_URL` and `UPLOADTHING_TOKEN`.

```.env
DATABASE_URL=...
SESSION_SECRET=...
BROWSERLESS_URL=...
UPLOADTHING_TOKEN=...
```

For the `DATABASE_URL`, use

```bash
DATABASE_URL="mongodb://root:password@mongodb-primary:27017/mangaxr_db_staging?replicaSet=rs0&authSource=admin"
```

For the `SESSION_SECRET` and `UPLOADTHING_TOKEN`, you can follow the same steps as in the [.env.development](#envdevelopment)
And for `BROWSERLESS_URL`, use:

```bash
ws://caddy:3000
```

(the name of the compose service in the docker network)

You also need a `WIREGUARD_PRIVATE_KEY` and `PROTONVPN_SERVER`. Both of them can be obtained by creating a free proton vpn account and generating a wireguard configuration.

At the end, the `.env.staging` should look to something like:

```bash
DATABASE_URL="mongodb://root:password@mongodb-primary:27017/mangaxr_db_staging?replicaSet=rs0&authSource=admin"
SESSION_SECRET="SHA256:..."
BROWSERLESS_URL="ws://caddy:3000"
UPLOADTHING_TOKEN=...
WIREGUARD_PRIVATE_KEY=...
PROTONVPN_SERVER=...
IPCHECK_INTERVAL="0"
PROTONVPN_KILLSWITCH="false"

```

Then to open the staging version of the application:

```bash
make staging-up # to start the services
make staging-down # to stop them
```

For more information about the commands available, check the [Makefile](/Makefile)

Prisma Studio to explore and manipulate the data in staging environment:

```bash
npm run staging:studio
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
- [x] fix all tests and add all new tests (for the function sleep and the function clean)
- [x] update the node version in the dockerfile from node 18 to node 20 (minimum)
- [x] update all dependencies, and fix all lint errors
- [ ] get uploadthing working in production

## Contributing

If you want to contribute:

Fork the repo.

Then clone your fork to your local machine (replace <your_username> by your GitHub username) using:

```bash
git clone https://github.com/<your-username>/manga-xr.git
```

Create a new branch

```bash
git checkout -b <new-branch-name>
```

After making your changes, commit on your branch then submit a Pull Request.

## License

[MIT](/LICENSE) License &copy; 2025
