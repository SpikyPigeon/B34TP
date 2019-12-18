import {Component, OnInit} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbdModalContent} from "./tree.modal";

@Component({
	selector: "app-trees",
	templateUrl: "trees.component.html"
})
export class TreesComponent implements OnInit {


	constructor(private modalService: NgbModal) {}

	open() {
		const modalRef = this.modalService.open(NgbdModalContent);
		//modalRef.componentInstance.name = 'Bitch';
	}

	ngOnInit() {
	}
}
