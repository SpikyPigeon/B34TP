import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {AdminLayoutRoutes} from "./admin-layout.routing";
import {SimulationComponent} from "../../pages/simulation/simulation.component";
import {TreesComponent} from "../../pages/trees/trees.component";
import {ArchiveComponent} from "../../pages/archive/archive.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ViewArchiveComponent} from "../../pages/archive/view-archive.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(AdminLayoutRoutes),
		FormsModule,
		HttpClientModule,
		NgbModule,
	],
	declarations: [
		SimulationComponent,
		TreesComponent,
		ArchiveComponent,
		ViewArchiveComponent,
	]
})
export class AdminLayoutModule {
}
