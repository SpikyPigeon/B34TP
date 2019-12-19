import {Component, OnInit} from "@angular/core";
import {Simulation, TreeTopService} from "../../service";
import {Router} from "@angular/router";

@Component({
	selector: "app-archive",
	templateUrl: "archive.component.html"
})
export class ArchiveComponent implements OnInit {
	currentSim:Simulation | null = null;
	simList:Array<Simulation> = new Array<Simulation>();

	constructor(private readonly tt: TreeTopService, private readonly router:Router) {
	}

	ngOnInit() {
		this.tt.findAllSimulations().subscribe(sims => this.simList = sims);
	}

	/* Retourne la simulation sélectionnée */
	getOneSim(id:number) {
		this.tt.findSimulationArchive(id).subscribe(Sim => this.currentSim = Sim);
	}

	getSimPenalty():number {
		if(this.currentSim){
			return this.tt.calculatePenalty(this.currentSim);
		}else{
			return 0;
		}
	}

	viewSimGraph(id:number){
		this.router.navigate(["view-archive/" + id]);
	}

}
