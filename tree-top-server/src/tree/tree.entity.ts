import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {SimulationDetails} from "../simulation/simulation.entity";

@Entity()
export class Tree {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		type: "varchar",
		length: 100,
		unique: true,
		nullable: false
	})
	name!: string;

	@Column({nullable: false})
	maxDiameter!: number;

	@Column({nullable: false})
	maxProduction!: number;

	@Column({nullable: false})
	maxAge!: number;

	@Column({
		type: "float",
		nullable: false
	})
	mrpPerKg!: number;

	@Column({nullable: false})
	pesticideUsage!: number;

	@Column({nullable: false})
	fertilizerUsage!: number;

	@OneToMany(type => SimulationDetails, details => details.tree)
	details!: SimulationDetails[];
}
