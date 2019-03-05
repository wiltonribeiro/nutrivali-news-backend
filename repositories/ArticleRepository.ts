import Article, {IArticle} from "../models/Article";
import News from "../models/News";

export default class ArticleRepository {

    async addArticle(content : IArticle[]) : Promise<IArticle[]> {
        return await Article.insertMany(content);
    }

    getLastArticle(lang : string) : Promise<IArticle>{
        return new Promise<IArticle>(((resolve, reject) =>{
            News.findOne({language: lang},{'articles':{$slice:-1}}).populate('articles').then(value =>{
                if(value) resolve(new Article(value.articles[0]));
                else reject();
            });
        }));
    }

    removeArticle(){
        //TODO
    }

}
