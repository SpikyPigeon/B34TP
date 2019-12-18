import {Component, OnInit} from "@angular/core";
import {Simulation, SimulationDetails, Tree, TreeTopService} from "../../service";

@Component({
	selector: "app-simulation",
	templateUrl: "simulation.component.html"
})
export class SimulationComponent implements OnInit {
	private trees: Array<Tree>;
	private simulation: Simulation;
	private budget: number = 300000;
	private terrains: number = 1;
	private duration: number = 5;

	constructor(private readonly tt: TreeTopService) {
		this.trees = new Array<Tree>();
		this.simulation = {
			details: [],
			createdAt: new Date(),
			budget: 0,
			id: 0,
			terrainSize: 0,
		};
	}

	ngOnInit() {
		this.tt.getTree().subscribe(value => this.trees = value);
	}

	mathLog(n: number): number {
		return Math.log(n);
	}

	calculateTotalCost(): number {
		let cost: number = this.terrains * 20000;

		for (let detail of this.simulation.details) {
			const price = 150 * detail.quantity;
			const penalty = 1000 / Math.log(detail.quantity);
			const products = (detail.isBio
				? (2.8 * detail.tree.pesticideUsage) + (2.8 * detail.tree.fertilizerUsage)
				: (2 * detail.tree.pesticideUsage) + (2 * detail.tree.fertilizerUsage))
				* detail.quantity;
			cost += price + penalty + products;
		}

		return cost;
	}

	onRemoveDetail(index: number) {
		this.simulation.details.splice(index, 1);
	}

	onAddTree(index: number) {
		let detail: SimulationDetails = {
			simulation: this.simulation,
			tree: this.trees[index],
			quantity: 1,
			isBio: false,
			id: 0,
		};

		this.simulation.details.push(detail);
	}
}
