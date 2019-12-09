import {Component, OnInit} from "@angular/core";
import {Tree, TreeTopService} from "../../service";

@Component({
	selector: "app-dashboard",
	templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
	private trees: Array<Tree>;

	constructor(private readonly tt: TreeTopService) {
		this.trees = new Array<Tree>();
	}

	ngOnInit() {
		this.tt.getTree().subscribe(value => this.trees = value);
	}
}
