import {Component, OnInit} from "@angular/core";

declare interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
}

export const ROUTES: RouteInfo[] = [
	{
		path: "/dashboard",
		title: "New Simulation",
		icon: "icon-molecule-40",
		class: ""
	},
	{
		path: "/icons",
		title: "Trees",
		icon: "icon-world",
		class: ""
	},
	{
		path: "/maps",
		title: "Simulation Archive",
		icon: "icon-book-bookmark",
		class: ""
	}/*,
	{
		path: "/notifications",
		title: "View Sim",
		icon: "icon-bell-55",
		class: ""
	},

	{
		path: "/user",
		title: "User Profile",
		icon: "icon-single-02",
		class: ""
	},
	{
		path: "/tables",
		title: "Some List",
		icon: "icon-puzzle-10",
		class: ""
	},
	{
		path: "/typography",
		title: "Typography",
		icon: "icon-align-center",
		class: ""
	}*/
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
