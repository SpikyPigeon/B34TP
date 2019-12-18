import {Component, OnInit} from "@angular/core";
import {Simulation, SimulationDetails, Tree, TreeTopService} from "../../service";

@Component({
	selector: "app-simulation",
	templateUrl: "simulation.component.html"
})
export class SimulationComponent implements OnInit {
	private trees: Array<Tree>;
	private simulation: Simulation;

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
