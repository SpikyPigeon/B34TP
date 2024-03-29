import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";

const routes: Routes = [
	{
		path: "",
		redirectTo: "simulation",
		pathMatch: "full"
	},
	{
		path: "",
		component: AdminLayoutComponent,
		children: [
			{
				path: "",
				loadChildren:
					"./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
			}
		]
	}, {
		path: '',
		component: AuthLayoutComponent,
		children: [
			{
				path: '',
				loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
			}
		]
	},
	{
		path: "**",
		redirectTo: "simulation"
	}
];

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
