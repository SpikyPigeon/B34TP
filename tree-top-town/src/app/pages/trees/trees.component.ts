import {Component, OnInit} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbdModalContent} from "./tree.modal";
import {Tree, TreeTopService} from "../../service";

@Component({
	selector: "app-trees",
	templateUrl: "trees.component.html"
})
export class TreesComponent implements OnInit {
	trees:Array<Tree>;

	constructor(private modalService: NgbModal, private readonly service:TreeTopService) {
		this.trees = new Array<Tree>();
		this.service.getTree().subscribe(value => this.trees = value);
	}

	ngOnInit() {
	}

	open(editTree?:Tree) {
		const modalRef = this.modalService.open(NgbdModalContent);
		if(editTree){
			modalRef.componentInstance.data = Object.assign({}, editTree);
		}
		modalRef.componentInstance.onClose = () => {
			console.log("onClose?");
			this.service.getTree().subscribe(value => this.trees = value);
		};
	}

	delete(tree:Tree){
		if(confirm("Are you sure you want to chop this tree?")){
			this.service.deleteTree(tree.id).subscribe(() => this.service.getTree().subscribe(value => this.trees = value));
		}
	}
}
