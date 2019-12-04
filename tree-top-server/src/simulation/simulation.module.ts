import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database";
import {SimulationController} from "./simulation.controller";
import {simulationProviders} from "./simulation.provider";
import {SimulationService} from "./simulation.service";

@Module({
	imports: [
		DatabaseModule
	],
	providers: [
		...simulationProviders,
		SimulationService
	],
	controllers: [SimulationController]
})
export class SimulationModule {
}
