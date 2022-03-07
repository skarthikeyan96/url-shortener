
# Clippr

Light weight url shortener built with Next.js , Azure Cosmos DB and tailwind

## Run Locally

Clone the project

```bash
  git clone git@github.com:skarthikeyan96/url-shortener.git
```

Go to the project directory

```bash
  cd url-shortener
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn run dev
```


## Tech Stack

Next.js , Tailwind and Azure Cosmos DB


## Appendix

What is the need to store in the DB ?

I am storing short_url , original_url and id for each of the url. 
If the user tries to shorten the url which is already existing in the db , 
instead of shortening the url it will just return the shortened url.



## What's Next

- Authentication

- List the previously shortened urls


