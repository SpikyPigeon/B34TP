import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database";
import {TreeController} from "./tree.controller";
import {treeProviders} from "./tree.provider";
import {TreeService} from "./tree.service";

@Module({
	imports: [DatabaseModule],
	exports: [TreeService],
	providers: [
		...treeProviders,
		TreeService
	],
	controllers: [TreeController]
})
export class TreeModule {
}
