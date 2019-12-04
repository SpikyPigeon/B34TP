import {Body, Controller, Delete, Get, Logger, Param, Post, Put, Query} from "@nestjs/common";
import {SimulationService} from "./simulation.service";

@Controller("tree")
export class SimulationController {
	private readonly logger: Logger = new Logger(SimulationController.name);

	constructor(private readonly sims: SimulationService) {
	}
}
