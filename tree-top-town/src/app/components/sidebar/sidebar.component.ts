import {Component, OnInit} from "@angular/core";

declare interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
}

export const ROUTES: RouteInfo[] = [
	{
		path: "/simulation",
		title: "New Simulation",
		icon: "icon-molecule-40",
		class: ""
	},
	{
		path: "/trees",
		title: "Trees",
		icon: "icon-world",
		class: ""
	},
	{
		path: "/archive",
		title: "Simulation Archive",
		icon: "icon-book-bookmark",
		class: ""
	}
];

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
	menuItems: any[];

	constructor() {
		this.menuItems = [];
	}

	ngOnInit() {
		this.menuItems = ROUTES.filter(menuItem => menuItem);
	}

	isMobileMenu() {
		if (window.innerWidth > 991) {
			return false;
		}
		return true;
	}
}
