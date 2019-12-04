import {Body, Controller, Delete, Get, Logger, Param, Post, Put, Query} from "@nestjs/common";
import {CreateTreeDefinition, TreeService} from "./tree.service";
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

	@Post()
	async createTree(@Body() data: CreateTreeDefinition): Promise<Tree> {
		this.logger.log(`createTree with name = '${data.name}'`);
		return await this.trees.createTree(data);
	}

	@Put(":id")
	async updateTree(@Param("id") id: number, @Body() data: CreateTreeDefinition): Promise<Tree> {
		this.logger.log(`updateTree with id = ${id}`);
		let tree = await this.trees.getTreeById(id);
		Object.assign(tree, data);
		return await this.trees.saveTree(tree);
	}

	@Delete(":id")
	async deleteTree(@Param("id") id: number) {
		this.logger.log(`deleteTree with id = ${id}`);
		await this.trees.deleteTreeById(id);
	}
}
