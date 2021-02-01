# Subsmarine

Subsmarine surfaces your email newsletters for easy reading.

## Getting started

### 1. Install dependancies

```
yarn install
```

### 2. Configure your local environment

Copy the .env.local.example file in this directory to .env.local (which will be ignored by Git):

```
cp .env.local.example .env.local
```

And add secrets and keys

### 4. Start the application

To run your site locally, use:

```
yarn dev
```

To run it it production mode, use:

```
yarn build
yarn start
```

### 5. Configuring for production

You must set the NEXTAUTH_URL environment variable with the URL of your site, before deploying to production.

e.g. `NEXTAUTH_URL=https://example.com`
