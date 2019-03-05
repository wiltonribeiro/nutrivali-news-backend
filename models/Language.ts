import  mongoose = require("mongoose");

export interface ILanguage extends mongoose.Document {
    lang : string,
    keyWords : string[]
}

export const LanguageSchema = new mongoose.Schema({
   lang : {type: mongoose.Schema.Types.String, required: true, unique: true},
   keyWords : [{type: mongoose.Schema.Types.String}]
});

const Language = mongoose.model<ILanguage>("Language", LanguageSchema);
export default Language;
