import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {concatMap} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class TreeTopService {
	url: string = 'http://localhost:1337/';

	constructor(private readonly http: HttpClient) {
	}

	getTree(idOrName?: number | string): Observable<[Tree]> {
		if (idOrName) {
			if (typeof idOrName === "number") {
				return this.http.get<[Tree]>(`${this.url}tree?id=${idOrName}`);
			} else {
				return this.http.get<[Tree]>(`${this.url}tree?name=${idOrName}`);
			}
		} else {
			return this.http.get<[Tree]>(`${this.url}tree`);
		}
	}

	getImageForTree(tree: Tree): string {
		return `./assets/img/tree/${tree.name.toLowerCase()}.jpg`;
	}

	updateTree(data:Tree): Observable<Tree> {
		const {id,...rest} = data;
		return this.http.put<Tree>(this.url + "tree/" + id, {...rest});
	}

	createTree(data:Tree): Observable<Tree> {
		const {id,...rest} = data;
		return this.http.post<Tree>(this.url + "tree", {...rest});
	}

	deleteTree(id:number): Observable<{}> {
		return this.http.delete(this.url + "tree/" + id);
	}

	findSimulationArchive(id: number): Observable<Simulation> {
		return this.http.get<Simulation>(this.url + "sim/" + id);
	}

	findAllSimulations(): Observable<Array<Simulation>> {
		return this.http.get<Array<Simulation>>(this.url+'sim');
	}

	/*findFirstSimImage(): Observable<Simulation> {
		this.http

		return that;
	}*/

	archiveSimulation(newSim: Simulation): Observable<Simulation> {
		const {id, details, ...simData} = newSim;
		const simDetails = details.map(detail => ({
			quantity: detail.quantity,
			isBio: detail.isBio,
			tree: detail.tree.id
		}));

		return this.http.post<Simulation>(this.url + "sim", simData)
			.pipe(concatMap(sim => this.http.post<Simulation>(this.url + "sim/" + sim.id + "/details", simDetails)));
	}

	calculateTotalYield(sim:Simulation): number {
		let total: number = 0;

		for (let detail of sim.details) {
			total += this.calculateTreeYield(detail, sim.duration);
		}

		return total;
	}

	calculateTreeYield(detail: SimulationDetails, duration:number): number {
		const {tree} = detail;
		let total: number = 0;

		for (let i = 0; i < duration; i++) {
			if (i < tree.maxAge) {
				const topProdBegin = (tree.maxAge / 2) - (tree.maxAge * 0.1);
				const topProdEnd = (tree.maxAge / 2) + (tree.maxAge * 0.1);
				const maxProd = detail.isBio ? detail.tree.maxProduction * 0.65 : detail.tree.maxProduction;

				if (i >= topProdBegin && i <= topProdEnd) {
					total += tree.maxProduction * detail.quantity;
				} else {
					total += Math.sin(i / tree.maxAge * Math.PI) * maxProd * detail.quantity;
				}
			}
		}

		return total;
	}

	calculatePenalty(sim:Simulation): number{
		let penalty: number = 0;

		for (let detail of sim.details){
			penalty += 1000 / Math.log(detail.quantity);
		}

		return penalty;
	}
}

export interface Simulation {
	id: number;
	createdAt: Date;
	budget: number;
	terrainSize: number;
	duration: number;
	details: SimulationDetails[];
}

export interface Tree {
	id: number;
	name: string;
	maxDiameter: number;
	maxProduction: number;
	maxAge: number;
	mrpPerKg: number;
	pesticideUsage: number;
	fertilizerUsage: number;
}

export interface SimulationDetails {
	id: number;
	quantity: number;
	isBio: boolean;
	tree: Tree;
	simulation: Simulation;
}
