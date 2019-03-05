import mongoose = require('mongoose');

export interface IArticle extends mongoose.Document {
    author : string,
    source : string,
    title : string,
    description: string,
    url : string,
    urlToImage : string,
    publishedAt : string,
    content : string
}

export const ArticleSchema = new mongoose.Schema({
    title : {type: mongoose.Schema.Types.String, required : true},
    author : {type: mongoose.Schema.Types.String},
    source : {type: mongoose.Schema.Types.String, required : true},
    description : {type: mongoose.Schema.Types.String, required : true},
    url : {type: mongoose.Schema.Types.String, required : true},
    urlToImage : {type: mongoose.Schema.Types.String, required : true},
    publishedAt : {type: mongoose.Schema.Types.String, required : true},
    content : {type: mongoose.Schema.Types.String, required : true}
});

const Article = mongoose.model<IArticle>('Article', ArticleSchema);
export default Article;
