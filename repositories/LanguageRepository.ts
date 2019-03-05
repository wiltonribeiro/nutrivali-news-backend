import ErrorCode from "../models/ErrorCode";
import Language, {ILanguage} from "../models/Language";

export default class LanguageRepository {

    getLanguages = async () : Promise<ILanguage[]> => {
         let languages : ILanguage[] = await Language.find({});
         return languages;
    };

    saveLanguage = async (language : ILanguage) : Promise<void> => {
        let langToSave = new Language(language);

        let validate = await language.validateSync();
        if(validate)
            throw new ErrorCode(400, validate.message);

        await langToSave.save().catch(err => {
            throw new ErrorCode(500, err.message);
        });
    };

    getLanguage = async (lang : string) : Promise<ILanguage> => {
        let language : ILanguage = await Language.findOne({lang : lang});
        return language;
    };

    removeLanguage = async (lang : string) : Promise<void> => {
        await Language.findOneAndDelete({lang : lang});
    }
}
