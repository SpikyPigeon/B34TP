import {Controller, Get, Logger, Param} from "@nestjs/common";
import {SimulationService} from "./simulation.service";
import {Simulation, SimulationDetails} from "./simulation.entity";

@Controller("sim")
export class SimulationController {
	private readonly logger: Logger = new Logger(SimulationController.name);

	constructor(private readonly sims: SimulationService) {
	}

	@Get()
	async getAllSimulations(): Promise<Simulation[]> {
		this.logger.log("getAllSimulations");
		return await this.sims.getAllSimulations();
	}

	@Get(":id")
	async getSimulation(@Param("id") id: number): Promise<Simulation> {
		this.logger.log(`getSimulation with ID = ${id}`);
		return await this.sims.getSimulationById(id);
	}

	@Get(":id/details")
	async getSimulationDetails(@Param("id") id: number): Promise<SimulationDetails[]> {
		this.logger.log(`getSimulationDetails with ID = ${id}`);
		return await this.sims.getDetailsForSimulation(id);
	}
}
