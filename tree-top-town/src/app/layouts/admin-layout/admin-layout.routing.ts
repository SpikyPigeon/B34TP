import {Routes} from "@angular/router";

import {SimulationComponent} from "../../pages/simulation/simulation.component";
import {TreesComponent} from "../../pages/trees/trees.component";
import {ArchiveComponent} from "../../pages/archive/archive.component";
import {ViewArchiveComponent} from "../../pages/archive/view-archive.component";

export const AdminLayoutRoutes: Routes = [
	{path: "simulation", component: SimulationComponent},
	{path: "trees", component: TreesComponent},
	{path: "archive", component: ArchiveComponent},
	{path: "view-archive/:id", component: ViewArchiveComponent},
];
