import {Controller, Get, Logger, Param, Query} from "@nestjs/common";
import {TreeService} from "./tree.service";
import {Tree} from "./tree.entity";

@Controller("tree")
export class TreeController {
	private readonly logger: Logger = new Logger(TreeController.name);

	constructor(private readonly trees: TreeService) {
	}

	@Get()
	async getTree(@Query("name") name?: string, @Query("id") id?: number): Promise<Tree[]> {
		if (name) {
			this.logger.log(`getTree with name = '${name}'`);
			return [await this.trees.getTreeByName(name)];
		}

		if (id) {
			this.logger.log(`getTree with id = ${id}`);
			return [await this.trees.getTreeById(id)];
		}

		this.logger.log("getTree with no parameters");
		return await this.trees.getAllTrees();
	}

	@Get(":id")
	async getTreeById(@Param("id") id: number): Promise<Tree> {
		this.logger.log(`getTreeById with id = ${id}`);
		return await this.trees.getTreeById(id);
	}
}
