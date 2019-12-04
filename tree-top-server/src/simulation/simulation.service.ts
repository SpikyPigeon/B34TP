import {Inject, Injectable, Logger} from '@nestjs/common';
import {Repository} from "typeorm";
import {Simulation, SimulationDetails} from "./simulation.entity";

export class CreateSimulationDefinition {
	public readonly budget: number;
	public readonly terrainSize: number;

	constructor(budget: number, terrainSize: number) {
		this.budget = budget;
		this.terrainSize = terrainSize;
	}
}

export class CreateSimulationDetailDefinition {
	public readonly tree: number;
	public readonly quantity: number;
	public readonly isBio: boolean;

	constructor(tree: number, quantity: number, isBio: boolean) {
		this.tree = tree;
		this.quantity = quantity;
		this.isBio = isBio;
	}
}

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

	async getAllSimulations(): Promise<Simulation[]> {
		this.logger.log("Get All Simulations");
		return await this.sims.find();
	}

	async getSimulationById(id: number): Promise<Simulation> {
		this.logger.log(`Get Simulation with ID = ${id}`);
		return await this.sims.findOneOrFail(id);
	}

	async getDetailsForSimulation(simId: number): Promise<SimulationDetails[]> {
		this.logger.log(`Get SimulationDetails for Simulation ${simId}`);
		let sim = await this.sims.findOneOrFail(simId, {relations: ["details"]});
		return sim.details;
	}
}
