import {Component, OnInit} from "@angular/core";
import {Simulation, TreeTopService} from "../../service";

@Component({
	selector: "app-archive",
	templateUrl: "archive.component.html"
})
export class ArchiveComponent implements OnInit {
	currentSim:Simulation | null = null;
	simList:Array<Simulation> = new Array<Simulation>();

	constructor(private readonly tt: TreeTopService) {
	}

	ngOnInit() {
		this.tt.findAllSimulations().subscribe(sims => this.simList = sims);
	}

	/* Retourne la simulation sélectionnée */
	getOneSim(id:number) {
		this.tt.findSimulationArchive(id).subscribe(Sim => this.currentSim = Sim);
	}
}
