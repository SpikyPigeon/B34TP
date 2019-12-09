import {Component, OnInit} from "@angular/core";
import Chart from 'chart.js';
import {TreeTopService} from "../../service";

@Component({
	selector: "app-dashboard",
	templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
	constructor(private readonly tt: TreeTopService) {
	}

	ngOnInit() {
	}
}
