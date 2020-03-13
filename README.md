# Motherbrain Full Stack Challenge

Hello! :wave:

My solution requires the following:
* [Docker](https://docker.com)
* The `.env` file I sent back to you (needs Google API Key)

Next, run `docker-compose up` in this project and go to
[localhost:3000](http://localhost:3000) when everything is built and ready.
There you'll find the dashboard.

## Testing
In each folder, you can run `yarn test` to run the tests.

## User Stories
I used the following user stories to guide my development:
* As a Venture Lead, I would like to better understand how VC investments are shifting geographically relative to time so that I can better understand market dynamics, competitors, and potential co-investors.
* As a Venture Lead, I would like to see which of these investments are considered "VC" vs "Growth", so that I understand how relevant each investment is to the EQT funds.

## Assumptions

### Funding Rounds
* Seed through Series D relevant to VC fund
* Series E and beyond relevant to Growth Fund
* ICOs and Post IPO Debt are not factored in since they, from my understanding, are not relevant to EQT's funds

### Data Quality
* In order to be displayed the following data must be present:
  * Investor Names
  * Investment Type
  * Company Location (City and Country)
  * Investor Location (City and Country of Investor in Orgs Results)

## Challenges
* Splitting Investor Names: `"investor_names": "{\"Entrepreneurs Fund\",\"Heidelberg Innovation\"}"`
* Searching for exact text on Elasticsearch can yield interesting results due to the normalizer and how 
* Georeferencing cities to latitude/longitude requires an external API
* Instead of making requests for every company, results should be cached

## Technical Decisions
* I used Typescript because I'm most comfortable and efficient using it, but this could easily be ported to JS or Flow