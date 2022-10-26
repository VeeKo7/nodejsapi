import cors from "cors";
import express, { Application, Request, Response } from "express";
import ip from "ip";
import { HttpResponse } from "./domain/response";
import { Code } from "./enum/code.enum";
import { Status } from "./enum/status.enum";
import patientRoutes from "./route/patient.route";

export class App{
    private readonly app: Application;
    private readonly APPLICATION_RUNNING = 'application is running on:';
    private readonly ROUTE_NOT_FOUND = 'Route does not exist on the server';

    constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 3000) {
        this.app = express();
        this.middleWare();
        this.routes();
    }

    listen(): void {
        this.app.listen(this.port);
        console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`)
    }

    //any app can talk to this backend app
    private middleWare(): void {
        this.app.use(cors({origin: '*'}));
        //will be able to access info from coming request in json format
        this.app.use(express.json());
    }

    //going to pass all of the routes that we want app to use
    routes(): void {
        //callback function

        //CREATE, UPDATE, READ, DELETE operations with patients
        this.app.use('/patients', patientRoutes);
        this.app.get('/', (req: Request, res: Response) => res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Welcome to the Patients API v1.0')));
        this.app.all('*', (req: Request, res: Response) => res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
    }
}