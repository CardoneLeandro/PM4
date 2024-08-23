import { registerAs } from "@nestjs/config";
import {config as dotenvConfig} from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { writeLog } from "../src/utils/log";

dotenvConfig({path: './.env'});

const config = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    //dropSchema: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    cli: {
        migrationsDir: "src/migrations",
    },
};

const connectionPoint = new DataSource(config as DataSourceOptions);
connectionPoint.initialize()
.then(() => {
    let now = new Date().toLocaleString('es-AR',{timeZone: 'America/Argentina/Buenos_Aires',});
    writeLog(`Database successfully connected at ${now}`);
    console.log(`Database successfully connected at ${now}`);})
.catch((err) => {
    let now = new Date().toLocaleString('es-AR',{timeZone: 'America/Argentina/Buenos_Aires',});
    writeLog(`At ${now} this error ===> ${err} <=== trying to connect to database`)
    console.log('error during database connection process',err)
});

export default registerAs("typeorm", () => config);

export { connectionPoint }