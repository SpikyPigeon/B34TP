import {createConnection} from "typeorm";

export const databaseProviders = [
	{
		provide: "DATABASE_CONNECTION",
		useFactory: async () => await createConnection({
			type: "mssql",
			database: "TreeTopTown",
			host: "localhost",
			port: 1433,
			username: "piggy",
			password: "P@ssw0rd",
			options: {
				useUTC: true
			},
			synchronize: true,
			entities: [
				__dirname + "/../**/*.entity{.ts,.js}",
			],
		})
	}
];
