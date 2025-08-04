# NC Tunes Server

This is what I am...

## How to get started

1. Ensure you've installed all the dependencies using:

```sh
npm install
```

<!-- Go to package.js to see what dependencies then run npm install -->

2. To work on this locally, you'll need an `nc_tunes` database on your machine. You can set this up using

```sh
npm run setup-dbs
```

<!-- explain what it does -->

3. You'll need the credential for the database inside a `.env` file at the root level of this project.
<!-- This is because they'll need the .env file but it's been ignored, so it won't be pushed up to github. -->

<!-- So Typically if this was a real project, they would then say please ask your senior for those credentials. Because that's not something you want to post on the `README` because they're private credentials. But because what you're creating is a portfolio piece, and you want someone to access it, I recommend that you do explain what is in the .env file. So I would say that  -->

```
PGDATABASE=nc_tunes
```

<!-- go setup the .env -->

<!-- So that's the 3rd step. Step 4, they need to put data in the database. -->

4. To seed the database, run the following command"

```sh
npm run seed
```

5. To run the server in development mode, run:

```sh
npm run dev
```

6. To run your server tests, run:

```sh
npm test
```
