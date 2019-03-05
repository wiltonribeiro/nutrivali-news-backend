import {Request, Response} from "express";
import Database from "../service/Database";
import NewsAPI from "../service/NewsAPI";

export default class LogSystemController {

    getLogSystem(req : Request, res : Response) {
        res.send(
            {
                "version":"0.1.0",
                "database": Database.getDBStatus(),
                "last_request": NewsAPI.getLastRequest()
            }
        );
    }

}
