
# Nutrivali News BackEnd Service

### What is that ?
This system was build to populate the news repository for [Nutrivali App](https://github.com/wiltonribeiro/nutrivali-app). The server is running on Node.js and it's using News API to request the News and the database used to save is MongoDB. 

##How it works?
The server is responsible to save the languages and key words by language that will be used to request the news and save it on database. Each language has a unique code name(e.g pt, en, de) and an array of keywords. Keywords are words or phrases to search for in the API. The server is prepared to populate the database with 50 article by language. The news are saved sorted by publication date, and the server will only save a new Article if the one was published after the last one saved by that language, that mechanism avoid the system to duplicate articles and keep the database always sorted.

## Database Model



## API Methods



