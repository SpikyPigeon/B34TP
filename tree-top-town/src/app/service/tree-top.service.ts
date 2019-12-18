import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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
