import { NextFunction, Request, Response } from "express";

export function loggerGlobal(req: Request, _res: Response, next: NextFunction) {
    const date = new Date();
    console.log(`at [${date.toLocaleString()}] executing ${req.method} on path ${req.path}`);
    next();
}