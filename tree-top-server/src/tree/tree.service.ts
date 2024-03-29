import {Inject, Injectable, Logger} from "@nestjs/common";
import {ApiProperty} from "@nestjs/swagger";
import {Repository} from "typeorm";
import {Tree} from "./tree.entity";

export class CreateTreeDefinition {
	@ApiProperty()
	public readonly name: string;

	@ApiProperty()
	public readonly maxDiameter: number;

	@ApiProperty()
	public readonly maxProduction: number;

	@ApiProperty()
	public readonly maxAge: number;

	@ApiProperty()
	public readonly mrpPerKg: number;

	@ApiProperty()
	public readonly pesticideUsage: number;

	@ApiProperty()
	public readonly fertilizerUsage: number;

	constructor(
		name: string,
		maxDiameter: number,
		maxProduction: number,
		maxAge: number,
		mrpPerKg: number,
		pesticideUsage: number,
		fertilizerUsage: number
	) {
		this.name = name;
		this.maxDiameter = maxDiameter;
		this.maxProduction = maxProduction;
		this.maxAge = maxAge;
		this.mrpPerKg = mrpPerKg;
		this.pesticideUsage = pesticideUsage;
		this.fertilizerUsage = fertilizerUsage;
	}
}

@Injectable()
export class TreeService {
	private readonly logger: Logger = new Logger(TreeService.name);

	constructor(
		@Inject("TREE_REPOSITORY")
		private readonly feats: Repository<Tree>
	) {
	}

	async getAllTrees(): Promise<Tree[]> {
		this.logger.log("Get All Trees");
		return await this.feats.find({order: {name: "ASC"}});
	}

	async getTreeById(id: number): Promise<Tree> {
		this.logger.log(`Get Tree with ID = ${id}`);
		return await this.feats.findOneOrFail(id);
	}

	async getTreeByName(name: string): Promise<Tree> {
		this.logger.log(`Get Tree with Name = '${name}'`);
		return await this.feats.findOneOrFail({where: {name}});
	}

	async createTree(data: CreateTreeDefinition): Promise<Tree> {
		this.logger.log(`Create new Tree with Name = '${data.name}'`);
		let tree = new Tree();
		Object.assign(tree, data);
		return await this.feats.save(tree);
	}

	async saveTree(tree: Tree): Promise<Tree> {
		this.logger.log(`Save Tree with ID = ${tree.id}`);
		return await this.feats.save(tree);
	}

	async deleteTreeById(id: number) {
		this.logger.log(`Delete Tree with ID = ${id}`);
		await this.feats.delete({id});
	}
}
