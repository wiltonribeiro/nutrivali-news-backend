import mongoose = require('mongoose');
import Article from "./Article";

export interface INews extends mongoose.Document {
    language : string,
    articles : string

}

export const NewsSchema = new mongoose.Schema({
    language : {type: mongoose.Schema.Types.String, required: true, unique: true},
    articles: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Article'
    }]
});


const News = mongoose.model<INews>('News', NewsSchema);
export default News;
