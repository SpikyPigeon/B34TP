import {CreateDateColumn, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, Column} from "typeorm";
import {Tree} from "../tree";

@Entity()
export class Simulation {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToMany(type => SimulationDetails, details => details.simulation)
	details!: SimulationDetails[];

	@CreateDateColumn()
	createdAt!: Date;

	@Column({nullable: false})
	budget!: number;

	@Column({nullable: false})
	terrainSize!: number;
}

@Entity()
export class SimulationDetails {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(type => Simulation, sim => sim.details)
	simulation!: Simulation;

	@ManyToOne(type => Tree, tree => tree.details)
	tree!: Tree;

	@Column({nullable: false})
	quantity!: number;

	@Column({nullable: false})
	isBio!: boolean;
}
