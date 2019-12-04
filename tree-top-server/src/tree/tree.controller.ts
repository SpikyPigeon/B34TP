import {Controller, Logger} from "@nestjs/common";

@Controller("tree")
export class TreeController {
	private readonly logger: Logger = new Logger(TreeController.name);

	constructor() {
	}
}
