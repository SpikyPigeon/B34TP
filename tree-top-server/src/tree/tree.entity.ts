import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {SimulationDetails} from "../simulation";

@Entity()
export class Tree {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id!: number;

	@Column({
		type: "varchar",
		length: 100,
		unique: true,
		nullable: false
	})
	@ApiProperty()
	name!: string;

	@Column({nullable: false})
	@ApiProperty()
	maxDiameter!: number;

	@Column({nullable: false})
	@ApiProperty()
	maxProduction!: number;

	@Column({nullable: false})
	@ApiProperty()
	maxAge!: number;

	@Column({
		type: "float",
		nullable: false
	})
	@ApiProperty()
	mrpPerKg!: number;

	@Column({nullable: false})
	@ApiProperty()
	pesticideUsage!: number;

	@Column({nullable: false})
	@ApiProperty()
	fertilizerUsage!: number;

	@OneToMany(type => SimulationDetails, details => details.tree)
	@ApiProperty()
	details!: SimulationDetails[];
}
