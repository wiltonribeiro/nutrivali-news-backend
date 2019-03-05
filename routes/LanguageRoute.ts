import LanguageController from "../controller/LanguageController";
import Route from "../models/Route";
import e = require("express");

export default class LanguageRoute implements Route {

    controller : LanguageController;

    constructor(){
        this.controller = new LanguageController();
    }

    applyRoute = (app: e.Application): void  => {

        app.get("/languages", this.controller.getLanguages);

        app.get("/language/:lang", this.controller.getLanguage);

        app.post("/language/:lang/remove", this.controller.removeLanguage);

        app.post("/language", this.controller.postLanguage);

    }

}
