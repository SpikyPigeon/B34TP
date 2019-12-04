import {createConnection} from "typeorm";

export const databaseProviders = [
	{
		provide: "DATABASE_CONNECTION",
		useFactory: async () => await createConnection({
			type: "mssql",
			database: "TreeTopTown",
			host: "localhost",
			options: {
				useUTC: true
			},
			domain: "Multihexa.ad",
			synchronize: true,
			entities: [
				__dirname + "/../**/*.entity{.ts,.js}",
			],
		})
	}
];
