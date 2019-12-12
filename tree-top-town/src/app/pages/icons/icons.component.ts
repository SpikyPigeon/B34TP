import {Component, OnInit} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbdModalContent} from "./icon.modal";

@Component({
	selector: "app-icons",
	templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {


	constructor(private modalService: NgbModal) {}

	open() {
		const modalRef = this.modalService.open(NgbdModalContent);
		modalRef.componentInstance.name = 'World';
	}

	ngOnInit() {
	}
}
