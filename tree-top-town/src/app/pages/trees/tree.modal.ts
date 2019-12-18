import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Tree, TreeTopService} from "../../service";

@Component({
	selector: "app-icons-modal",
	template:  `
    <div class="modal-header">
      <h4 class="modal-title" *ngIf="data.id === 0">New Tree</h4>
      <h4 class="modal-title" *ngIf="data.id !== 0">Edit Tree</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form>
	      Tree Name: <input type="text" name="treeName" [(ngModel)]="data.name" class="form-control" style="color:black">
	      Diameter when mature: <input type="number" name="diameter"  [(ngModel)]="data.maxDiameter"class="form-control" min="1" max="40" value="5" style="color: black">
	      Maximum Production: <input type="number" name="maxProduction" [(ngModel)]="data.maxProduction" class="form-control" min="10" max="2000" value="200" style="color:black">
	      Maximum Age: <input type="number" name="maxAge" [(ngModel)]="data.maxAge" class="form-control" min="3" max="5000" value="100" style="color:black">
	      MRP/Kg: <input type="number" name="mrpPerKg" [(ngModel)]="data.mrpPerKg" class="form-control" min="0.2" max="20" value="1" step="0.1" style="color:black">
	      Pesticide Usage: <input type="number" name="pestUse" [(ngModel)]="data.pesticideUsage" class="form-control" min="0" max="30" value="10" style="color:black">
	      Fertilizer Usage: <input type="number" name="fertUse" [(ngModel)]="data.fertilizerUsage" class="form-control" min="0" max="30" value="10" style="color:black">
      </form>
    </div>
    <div class="modal-footer">
	    <button type="button" class="btn btn-outline-success" (click)="saveTree()">Save Tree</button>
	    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})

export class NgbdModalContent {
	@Input() data:Tree;
	@Input() onClose: (() => void) | null = null;

	constructor(public activeModal: NgbActiveModal, private readonly service:TreeTopService) {
		this.data = {
			id : 0,
			name : 'TreeHouse',
			maxDiameter : 5,
			maxProduction : 200,
			maxAge : 100,
			mrpPerKg : 1,
			pesticideUsage : 10,
			fertilizerUsage : 10
		};



	}

	saveTree(){
		if(this.data.id === 0){
			this.service.createTree(this.data).subscribe(() => {
				if (this.onClose) {
					this.onClose();
				}
			});
		}
		else{
			this.service.updateTree(this.data).subscribe(() => {
				if (this.onClose) {
					this.onClose();
				}
			});
		}
		this.activeModal.close('Close click');
	}

}

