import News from "../models/News";

export default class NewsRepository {

    addNews(content : object){
        let news = new News(content);
        news.save((err) => {
            console.log(err);
        });
    }

    pushArticle(lang : string, articlesID : any[]) {
        let options = { upsert: true, new: true, setDefaultsOnInsert: true }
        News.updateOne({language: lang}, {$push: {articles: {$each: articlesID}}}, options, (err) =>{
            if(err) console.log(err);
        });
    }

    removeNewsAriticle(){
        //TODO
    }

    removeNews(){
        //TODO
    }

}
