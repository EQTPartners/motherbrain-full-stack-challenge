# Motherbrain Full Stack Challenge

Hello! :wave:

My solution requires the following:
* [Docker](https://docker.com)
* The `.env` file I sent back to you (needs a Google API Key)

Next, run:
```
docker-compose up
```
in this project and go to
[localhost:3000](http://localhost:3000) when everything is built and ready.
There you'll find the dashboard.

## Testing
In each folder, you can run `yarn test` to run the tests.

## User Stories
I used the following user story to guide my development:
* As a Venture Lead, I would like to better understand geographically how VC investments are being made so that I can better understand market dynamics, competitors, and potential co-investors.

Stretch:
* As a Venture Lead, I would like to see which of these investments are considered "VC" vs "Growth", so that I understand how relevant each investment is to the EQT funds.

## Assumptions

### Funding Rounds
* Angel rounds are too early and because they're usually private individuals, the corresponding "org" doesn't exist in the orgs data so location is impossible to accurately infer 
* Seed through Series D relevant to VC fund
* Series E and beyond relevant to Growth Fund
* ICOs, Post IPO Debt, and Secondary Market, etc. are not factored in since they, from my understanding, are not relevant to EQT's funds

### Data Quality
* In order to be displayed the following data must be present:
  * Investor Names
  * Investment Type
  * Company Location (City and Country)
  * Investor Location (City and Country of Investor in Orgs Results)

## Challenges
* Splitting Investor Names: `"investor_names": "{\"Entrepreneurs Fund\",\"Heidelberg Innovation\"}"`
* Joining between investor names and orgs (i.e. Sequoia Capital invested in Athelas, I'd like to learn where Sequoia Capital is based from data in the org table) is weak because searching must be performed on the name of the investor.
  * Having an investor org uuid would be helpful for performance and accuracy
* Geocoding cities and countries can be ambiguous (i.e. Google would return the same results for both Burlington, MA, USA vs. Burlington, VT, USA, because the state isn't part of the dataset)
* Instead of making requests for every company, results should be cached

## Technical Decisions
* I used Typescript because I'm most comfortable and efficient using it, but this could easily be ported to JS or Flow
* I added Redis to cache the results since the performance of querying Elasticsearch and/or Google Maps API resulted in a lot of round trips for data that won't be updated that frequently

## To-Do
* logging
* cleanup