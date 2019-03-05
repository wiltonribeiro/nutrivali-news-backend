import * as mongoose from "mongoose";
import Article, {IArticle} from "../models/Article";
import ArticleRepository from "../repositories/ArticleRepository";
import NewsRepository from "../repositories/NewsRepository";
import NewsAPI from "../service/NewsAPI";

export default class NewsCore {

    lang: string;
    keyWords : string;

    constructor(lang: string, keyWords : string[]) {
        this.lang = lang;
        this.keyWords = keyWords.toString().split(",").join("+");
    }

    public async resolveNewsService() {

        //data from api
        let data = await new NewsAPI().requestNews(this.lang, this.keyWords);

        //prepare data on my format
        let preparedData = this.prepareData(data);

        //filtered data by last date (avoid duplicate news on database)
        let filteredData = await this.filterArticles(preparedData);

        //validate articles in database format(check required fields)
        this.validateArticles(filteredData).then(async(validated) => {
            if(validated != null && validated.length > 0) {
                //save validated articles
                let savedArticles = await this.saveArticle(validated);
                //save articles reference in database
                if(savedArticles) this.pushArticlesToNews(savedArticles);
            }
        });
    }

    private async filterArticles(articles: IArticle[]): Promise<IArticle[]> {

        let lastArticle: IArticle = await new ArticleRepository().getLastArticle(this.lang).catch(() => {
            return null;
        });

        if (lastArticle==null){
            return articles;
        }
        else {
            let articlesAvailable: IArticle[] = [];
            let lastArticleDate: Date = new Date(lastArticle.publishedAt);

            articles.forEach(article => {
                let articleDate = new Date(article.publishedAt);

                if (articleDate > lastArticleDate) {
                    articlesAvailable.push(article);
                }
            });

            return articlesAvailable;
        }
    }

    private prepareData(response : object[]) : IArticle[] {

        let data : IArticle[] = [];
        response.forEach(value => {
            value["source"] = value["source"].name;
            data.push(new Article(value));
        });

        return data;
    }

    private async validateArticles(articles : IArticle[]) : Promise<IArticle[]>{

        return new Promise<IArticle[]>((resolve)=>{

            let validatedArticles : IArticle[] = [];
            let num = 0;

            articles.forEach(async (article : IArticle) =>{
                await article.validate(async err => {
                    num++;
                    if(err==null) validatedArticles.push(article);
                    if(num == articles.length) resolve(validatedArticles);
                });
            });
        });
    }

    private async saveArticle(articles : IArticle[]) : Promise<IArticle[]> {
        return await new ArticleRepository().addArticle(articles);
    }

    private pushArticlesToNews(articles : IArticle[]) {

        let _ids : mongoose.Types.ObjectId[] = [];
        articles = articles.reverse();

        articles.forEach(article => {
            _ids.push(new mongoose.Types.ObjectId(article._id));
        });

        new NewsRepository().pushArticle(this.lang, _ids);
    }
}
