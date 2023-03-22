const { resolve } = require("path");

require("dotenv").config({
  path: resolve(__dirname, "../..", ".env"),
});

const http = require("http");
const { URL } = require("url");
const { Client } = require("@elastic/elasticsearch");

if (!process.env.ES_URL) {
  console.error(
    "Make sure to update the .env file at the root of the repo with the correct ES_URL before starting the server."
  );
  process.exit(1);
}

const client = new Client({
  node: process.env.ES_URL,
});

http
  .createServer(handle)
  .listen(8080, () => console.log("Server started at http://localhost:8080"));

async function handle(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const url = new URL(`http://incoming${req.url}`);
    switch (`${req.method} ${url.pathname}`) {
      case "GET /orgs":
        res.writeHead(200).end(
          JSON.stringify({
            message: "OK",
            results: await searchOrgs(url.searchParams),
          })
        );
        break;

      case "GET /fundings":
        res.writeHead(200).end(
          JSON.stringify({
            message: "OK",
            results: await searchFundings(url.searchParams),
          })
        );
        break;

      default:
        res.writeHead(404).end(
          JSON.stringify({
            message: "Not Found",
          })
        );
        break;
    }
  } catch (e) {
    console.error(e.stack);
    res.writeHead(500).end(
      JSON.stringify({
        message: "Something went wrong",
      })
    );
  }
}

async function searchOrgs(queryParams) {
  const limit = queryParams.get("limit");
  const offset = queryParams.get("offset");

  const response = await client.search({
    index: "org",
    body: {
      size: limit != null ? limit : 10,
      from: offset != null ? offset : 0,
    },
  });

  return {
    hits: response.body.hits.hits.map((h) => h._source),
    total: response.body.hits.total.value,
  };
}

async function searchFundings(queryParams) {
  const limit = queryParams.get("limit");
  const offset = queryParams.get("offset");

  const response = await client.search({
    index: "funding",
    body: {
      size: limit != null ? limit : 10,
      from: offset != null ? offset : 0,
    },
  });

  return {
    hits: response.body.hits.hits.map((h) => h._source),
    total: response.body.hits.total.value,
  };
}
