import {createConnection} from "typeorm";

export const databaseProviders = [
	{
		provide: "DATABASE_CONNECTION",
		useFactory: async () => await createConnection({
			type: "mssql",
			url: "Data Source=.;Initial Catalog=TreeTopTown;Integrated Security=True",
			synchronize: true,
			entities: [
				__dirname + "/../**/*.entity{.ts,.js}",
			],
		})
	}
];
