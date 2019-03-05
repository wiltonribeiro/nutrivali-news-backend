import {Request, Response} from "express";
import NewsCore from "../core/NewsCore";
import LanguageRepository from "../repositories/LanguageRepository";

export default class PopulateController {

    populateAll = async (req : Request, res : Response) => {


        let source = req.header("X-Appengine-Cron");

        if(source) {

            let languagesRepository = new LanguageRepository();
            let languages = await languagesRepository.getLanguages();

            let count = 0;

            await languages.forEach(async value => {
                await new NewsCore(value.lang, value.keyWords).resolveNewsService();
                count ++;

                if(count == languages.length) res.sendStatus(200);
            });
        } else {
            res.sendStatus(401);
        }

    }
}
