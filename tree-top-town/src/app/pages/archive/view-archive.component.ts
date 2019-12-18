import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Simulation, TreeTopService} from "../../service";

@Component({
	selector: "app-view-archive",
	templateUrl: "view-archive.component.html"
})
export class ViewArchiveComponent implements OnInit {
	private simulation?: Simulation;

	constructor(private readonly tt: TreeTopService, private readonly route: ActivatedRoute) {
		route.params.subscribe(({id}) => {
			tt.findSimulationArchive(id).subscribe(sim => this.simulation = sim);
		})
	}

	ngOnInit() {
	}
}
