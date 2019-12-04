import {Connection} from "typeorm";
import {Tree} from "./tree.entity";

export const treeProviders = [
	{
		provide: "TREE_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(Tree),
		inject: ["DATABASE_CONNECTION"]
	}
];
