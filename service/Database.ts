import mongoose = require('mongoose');
import {Connection} from "mongoose";

export default class Database {

    private static db : Connection;


    public static getDBStatus() : string{
        let code = Database.db.readyState;
        let status : string;
        switch (code) {
            case 0:{
                status = "disconnect";
                break;
            }
            case 1:{
                status = "connected";
                break;
            }
            case 2:{
                status = "connecting";
                break;
            }
            case 3:{
                status = "disconnecting";
                break;
            }
            default:{
                status = "unknown";
                break;
            }
        }
        return status;
    }

    connect() : Promise<boolean> {
        return new Promise((resolve, reject) => {
            mongoose.connect(process.env.DB, { useNewUrlParser: true });
            Database.db = mongoose.connection;
            Database.db.on("error", ()=> reject(false));
            Database.db.on("connected", () => resolve(true));

        })
    }

    disconnect() : Promise<boolean> {
        return new Promise((resolve, reject) => {
            mongoose.disconnect(err => {
                if (err) reject(false);
                else resolve(true);
            })
        });
    }
}
