import {Inject, Injectable, Logger} from '@nestjs/common';
import {Repository} from "typeorm";
import {Simulation, SimulationDetails} from "./simulation.entity";

@Injectable()
export class SimulationService {
	private readonly logger: Logger = new Logger(SimulationService.name);

	constructor(
		@Inject("SIMULATION_REPOSITORY")
		private readonly sims: Repository<Simulation>,
		@Inject("SIMULATION_DETAILS_REPOSITORY")
		private readonly details: Repository<SimulationDetails>,
	) {
	}
}
