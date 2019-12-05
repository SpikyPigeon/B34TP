import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Tree} from "../tree";

@Entity()
export class Simulation {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id!: number;

	@OneToMany(type => SimulationDetails, details => details.simulation)
	@ApiProperty()
	details!: SimulationDetails[];

	@CreateDateColumn()
	@ApiProperty()
	createdAt!: Date;

	@Column({nullable: false})
	@ApiProperty()
	budget!: number;

	@Column({nullable: false})
	@ApiProperty()
	terrainSize!: number;
}

@Entity()
export class SimulationDetails {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id!: number;

	@ManyToOne(type => Simulation, sim => sim.details)
	@ApiProperty()
	simulation!: Simulation;

	@ManyToOne(type => Tree, tree => tree.details)
	@ApiProperty()
	tree!: Tree;

	@Column({nullable: false})
	@ApiProperty()
	quantity!: number;

	@Column({nullable: false})
	@ApiProperty()
	isBio!: boolean;
}
