import LogSystemController from "../controller/LogSystemController";
import Route from "../models/Route";
import e = require("express");

export default class LogSystemRoute implements Route {

    controller : LogSystemController;

    constructor(){
        this.controller = new LogSystemController();
    }


    applyRoute = (app: e.Application): void => {

        app.get('/', this.controller.getLogSystem);

    }
}
