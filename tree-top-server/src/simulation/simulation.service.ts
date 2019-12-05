import {Inject, Injectable, Logger} from '@nestjs/common';
import {ApiProperty} from "@nestjs/swagger";
import {Repository} from "typeorm";
import {Simulation, SimulationDetails} from "./simulation.entity";
import {TreeService} from "../tree";

export class CreateSimulationDefinition {
	@ApiProperty()
	public readonly budget: number;

	@ApiProperty()
	public readonly terrainSize: number;

	constructor(budget: number, terrainSize: number) {
		this.budget = budget;
		this.terrainSize = terrainSize;
	}
}

export class CreateSimulationDetailDefinition {
	@ApiProperty()
	public readonly tree: number;

	@ApiProperty()
	public readonly quantity: number;

	@ApiProperty()
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
		private readonly trees: TreeService
	) {
	}

	async getAllSimulations(): Promise<Simulation[]> {
		this.logger.log("Get All Simulations");
		return await this.sims.find();
	}

	async getSimulationById(id: number): Promise<Simulation> {
		this.logger.log(`Get Simulation with ID = ${id}, with details`);
		let sim = await this.sims.createQueryBuilder("sim")
			.leftJoinAndSelect("sim.details", "detail")
			.leftJoinAndSelect("detail.tree", "tree")
			.getOne();

		if (!sim) {
			throw new Error(`Simulation with ID = ${id} not found`);
		}

		return sim;
	}

	async getDetailsForSimulation(simId: number): Promise<SimulationDetails[]> {
		this.logger.log(`Get SimulationDetails for Simulation ${simId}`);
		let sim = await this.sims.findOneOrFail(simId, {relations: ["details"]});
		return sim.details;
	}

	async createSimulation(data: CreateSimulationDefinition): Promise<Simulation> {
		this.logger.log(`Create Simulation with Budget = ${data.budget}$`);
		let sim = new Simulation();
		Object.assign(sim, data);
		return await this.sims.save(sim);
	}

	async addDetailsToSimulation(simId: number, ...data: CreateSimulationDetailDefinition[]): Promise<Simulation> {
		this.logger.log(`Add SimulationDetails to Simulation with ID = ${simId}`);
		let sim = await this.sims.findOneOrFail(simId, {relations: ["details"]});
		let details = await Promise.all(data.map(async value => {
			let detail = new SimulationDetails();
			detail.isBio = value.isBio;
			detail.quantity = value.quantity;
			detail.tree = await this.trees.getTreeById(value.tree);
			return await this.details.save(detail);
		}));
		sim.details.push(...details);
		return await this.sims.save(sim);
	}
}
