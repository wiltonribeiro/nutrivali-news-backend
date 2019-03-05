import bodyParser = require("body-parser");
import * as express from "express";
import Route from "../models/Route";

const PORT = Number(process.env.PORT) || 8080;
const app = express();

export default class Server {

    private initRoutes(routes : Route[]) : void{
        routes.forEach(route => {
            route.applyRoute(app);
        })
    }

    public initServer(routes : Route[]) {

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true,
        }));

        this.initRoutes(routes);

        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });

    }

}
