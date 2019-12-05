import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class TreeTopService {
	url: string = 'http://localhost:1337/';


	constructor(private readonly http:HttpClient) {

	}

}

export interface Simulation {
	id:number;
	createdAt: Date;
	budget:number;
	terrainSize:number;
	details: SimulationDetails[];
}

export interface Tree{
	id: number;
	name: string;
	maxDiameter: number;
	maxProduction: number;
	maxAge: number;
	mrpPerKg: number;
	pesticideUsage: number;
	fertilizerUsage: number;
}

export interface SimulationDetails{
	id: number;
	quantity:number;
	isBio: boolean;
	tree: Tree;
	simulation: Simulation;
}
