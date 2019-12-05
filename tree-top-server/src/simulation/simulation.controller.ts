import {Body, Controller, Get, Logger, Param, Post} from "@nestjs/common";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CreateSimulationDefinition, CreateSimulationDetailDefinition, SimulationService} from "./simulation.service";
import {Simulation, SimulationDetails} from "./simulation.entity";

@Controller("sim")
@ApiTags("simulation")
export class SimulationController {
	private readonly logger: Logger = new Logger(SimulationController.name);

	constructor(private readonly sims: SimulationService) {
	}

	@Get()
	@ApiOkResponse({type: [Simulation]})
	async getAllSimulations(): Promise<Simulation[]> {
		this.logger.log("getAllSimulations");
		return await this.sims.getAllSimulations();
	}

	@Get(":id")
	@ApiOkResponse({type: Simulation})
	async getSimulation(@Param("id") id: number): Promise<Simulation> {
		this.logger.log(`getSimulation with ID = ${id}`);
		return await this.sims.getSimulationById(id);
	}

	@Get(":id/details")
	@ApiOkResponse({type: [SimulationDetails]})
	async getSimulationDetails(@Param("id") id: number): Promise<SimulationDetails[]> {
		this.logger.log(`getSimulationDetails with ID = ${id}`);
		return await this.sims.getDetailsForSimulation(id);
	}

	@Post()
	@ApiOkResponse({type: Simulation})
	async createSimulation(@Body() data: CreateSimulationDefinition): Promise<Simulation> {
		this.logger.log(`createSimulation with Budget = ${data.budget}$`);
		return await this.sims.createSimulation(data);
	}

	@Post(":id/details")
	@ApiOkResponse({type: Simulation})
	async addDetailsToSimulation(@Param("id") id: number, @Body() data: CreateSimulationDetailDefinition[]): Promise<Simulation> {
		this.logger.log(`addDetailsToSimulation for Simulation ID = ${id} with ${data.length} details`);
		return await this.sims.addDetailsToSimulation(id, ...data);
	}
}
