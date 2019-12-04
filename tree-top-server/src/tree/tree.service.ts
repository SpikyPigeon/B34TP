import {Inject, Injectable, Logger} from "@nestjs/common";
import {Repository} from "typeorm";
import {Tree} from "./tree.entity";

@Injectable()
export class TreeService {
	private readonly logger: Logger = new Logger(TreeService.name);

	constructor(
		@Inject("TREE_REPOSITORY")
		private readonly feats: Repository<Tree>
	) {
	}
}
