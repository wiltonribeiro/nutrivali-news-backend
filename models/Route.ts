import * as express from "express";

export default interface Route {
    applyRoute(app: express.Application): void;
}
