import {Component, OnInit} from "@angular/core";
import {TreeTopService} from "../../service";

@Component({
	selector: "app-archive",
	templateUrl: "archive.component.html"
})
export class ArchiveComponent implements OnInit {
	constructor(private readonly tt: TreeTopService) {
	}

	ngOnInit() {
	}
}
