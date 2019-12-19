import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Simulation, SimulationDetails, Tree, TreeTopService} from "../../service";

@Component({
	selector: "app-simulation",
	templateUrl: "simulation.component.html"
})
export class SimulationComponent implements OnInit {
	private trees: Array<Tree>;
	private simulation: Simulation;

	constructor(private readonly tt: TreeTopService, private readonly router: Router) {
		this.trees = new Array<Tree>();
		this.simulation = {
			details: [],
			createdAt: new Date(),
			budget: 300000,
			duration: 5,
			id: 0,
			terrainSize: 1,
		};
	}

	ngOnInit() {
		this.tt.getTree().subscribe(value => this.trees = value);
	}

	mathLog(n: number): number {
		return Math.log(n);
	}

	calculateTreeYield(id:number): number {
		return this.tt.calculateTreeYield(this.simulation.details[id], this.simulation.duration);
	}

	calculateTotalYield(sim:Simulation): number {
		return this.tt.calculateTotalYield(sim);
	}

	calculateTerrainAreaLeft(): number {
		let area = this.simulation.terrainSize * 10000;

		for (let detail of this.simulation.details) {
			const treeArea = Math.pow(Math.PI * (detail.tree.maxDiameter / 2), 2);
			area -= treeArea * detail.quantity;
		}

		return area;
	}

	calculateTotalCost(): number {
		let cost: number = 0;

		for (let detail of this.simulation.details) {
			const price = 150 * detail.quantity;
			const penalty = 1000 / Math.log(detail.quantity);
			const products = (detail.isBio
				? (2.8 * detail.tree.pesticideUsage) + (2.8 * detail.tree.fertilizerUsage)
				: (2 * detail.tree.pesticideUsage) + (2 * detail.tree.fertilizerUsage))
				* detail.quantity;
			cost += price + penalty + products;
		}

		const penalty = 4 * (1 / Math.log(this.simulation.details.length));
		return cost * penalty + this.simulation.terrainSize * 20000;
	}

	calculateMoneyProgress(): number {
		let progress: number = this.calculateTotalCost();

		progress = ((progress * 100) / this.simulation.budget);

		return 100 - progress;
	}

	calculateTerrainProgress():number {
		let  progress: number = this.calculateTerrainAreaLeft();

		progress = ((progress * 100) / (this.simulation.terrainSize * 10000));

		return 100 - progress;
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

	submitSimulation() {
		this.tt.archiveSimulation(this.simulation).subscribe(sim => {
			this.simulation = {
				details: [],
				createdAt: new Date(),
				budget: 300000,
				duration: 5,
				id: 0,
				terrainSize: 1,
			};
			this.router.navigate(["view-archive/" + sim.id]);
		});
	}
}
