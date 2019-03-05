import PopulateController from "../controller/PopulateController";
import Route from "../models/Route";
import e = require("express");

export default class PopulateRoute implements Route {


    controller : PopulateController;

    constructor(){
        this.controller = new PopulateController();
    }

    applyRoute = (app: e.Application): void => {

        app.get("/populate/news/all", this.controller.populateAll);

    }
}
