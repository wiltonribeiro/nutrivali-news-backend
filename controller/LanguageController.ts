import {Request, Response} from "express";
import Language from "../models/Language";
import LanguageRepository from "../repositories/LanguageRepository";

export default class LanguageController {

    repository : LanguageRepository;

    constructor(){
        this.repository = new LanguageRepository();
    }

    getLanguages = async (req : Request, res : Response) => {
        let languages = await this.repository.getLanguages();

        if(languages.length > 0)
            res.send(languages);
        else
            res.sendStatus(404);
    };

    postLanguage = async (req : Request, res : Response) => {

        try{
            let lang = new Language(req.body);
            await this.repository.saveLanguage(lang);
            res.sendStatus(200);
        } catch (e) {
            res.status(e.code).send(e.message);
        }

    };

    getLanguage = async (req : Request, res : Response) => {

        let lang = req.params.lang;
        let language = await this.repository.getLanguage(lang);

        if(language)
            res.send(language);
        else
            res.sendStatus(404);

    };

    removeLanguage = async (req : Request, res : Response) => {

        let lang = req.params.lang;
        let language = await this.repository.removeLanguage(lang);
        res.sendStatus(200);

    };

}
