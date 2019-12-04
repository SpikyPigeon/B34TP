import {Controller, Logger} from "@nestjs/common";
import {TreeService} from "./tree.service";

@Controller("tree")
export class TreeController {
	private readonly logger: Logger = new Logger(TreeController.name);

	constructor(private readonly trees: TreeService) {
	}
}
