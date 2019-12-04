import {Connection} from "typeorm";
import {Simulation, SimulationDetails} from "./simulation.entity";

export const simulationProviders = [
	{
		provide: "SIMULATION_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(Simulation),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "SIMULATION_DETAILS_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(SimulationDetails),
		inject: ["DATABASE_CONNECTION"]
	}
];
