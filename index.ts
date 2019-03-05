import LanguageRoute from "./routes/LanguageRoute";
import PopulateRoute from "./routes/PopulateRoute";
import Server from "./server/Server";
import LogRoute from "./routes/LogSystemRoute";
import Database from "./service/Database";

require('dotenv').config();
let db = new Database();

db.connect().catch(err=>{
    console.log(err);
});

new Server().initServer([
    new LogRoute(),
    new LanguageRoute(),
    new PopulateRoute()
]);

