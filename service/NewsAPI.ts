const request = require("request-promise");

export default class NewsAPI {


    private static lastNewsRequest : string = null;

    public static getLastRequest() : string {
        return this.lastNewsRequest;
    }

    async requestNews(lang : string, keyWords : string) {

        NewsAPI.lastNewsRequest = new Date().toString();
        let url : string = "https://newsapi.org/v2/everything?q=";

        url += keyWords;

        url += `&language=${lang}&pageSize=50&sortBy=publishedAt`;

        let options = {
            method: "GET",
            uri: url,
            qs: {
                apiKey: process.env.API_KEY
            },
            headers: {
                "User-Agent": "Request-Promise"
            },
            json: true
        };

        let result = await request(options)
            .catch(err => {
                console.log(err);
            });


        return result["articles"];

    }

}
