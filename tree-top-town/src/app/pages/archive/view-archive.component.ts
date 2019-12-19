import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import Chart, {ChartOptions, ChartDataSets} from "chart.js";
import {Simulation, TreeTopService} from "../../service";

@Component({
	selector: "app-view-archive",
	templateUrl: "view-archive.component.html"
})
export class ViewArchiveComponent implements OnInit {
	@ViewChild("chartYield", {static: true})
	chartYield!: ElementRef<HTMLCanvasElement>;

	private simulation?: Simulation;
	private chartData: Chart | null = null;
	private context: CanvasRenderingContext2D | null = null;

	constructor(private readonly tt: TreeTopService, private readonly route: ActivatedRoute) {
		route.params.subscribe(({id}) => {
			tt.findSimulationArchive(id).subscribe(sim => this.onSimulationReady(sim));
		});
	}

	ngOnInit() {
		this.chartYield.nativeElement.height = 600;
		this.context = this.chartYield.nativeElement.getContext("2d");
	}

	onSimulationReady(sim: Simulation) {
		this.simulation = sim;

		if (!this.context) {
			console.error("Should not happen...");
			return;
		}

		const chartOptions: ChartOptions = {
			maintainAspectRatio: false,
			responsive: true,
			legend: {
				display: false
			},
			tooltips: {
				backgroundColor: '#f5f5f5',
				titleFontColor: '#333',
				bodyFontColor: '#666',
				bodySpacing: 4,
				xPadding: 12,
				mode: "x-axis",
				intersect: false,
				position: "nearest",
			},
			scales: {
				yAxes: [{
					gridLines: {
						drawBorder: false,
						color: 'rgba(29,140,248,0.0)',
						zeroLineColor: "transparent",
					},
					ticks: {
						padding: 10,
						fontColor: "#9a9a9a"
					}
				}],

				xAxes: [{
					gridLines: {
						drawBorder: false,
						color: 'rgba(233,32,16,0.1)',
						zeroLineColor: "transparent",
					},
					ticks: {
						padding: 10,
						fontColor: "#9a9a9a"
					}
				}]
			}
		};

		let gradientStroke = this.context.createLinearGradient(0, 230, 0, 50);
		gradientStroke.addColorStop(1, "rgba(233,32,16,0.2)");
		gradientStroke.addColorStop(0.4, "rgba(233,32,16,0.0)");
		gradientStroke.addColorStop(0, "rgba(233,32,16,0)");

		const data = this.simulation.details.map((detail, index): ChartDataSets => {
			const {tree} = detail;
			let years = new Array<number>();

			if (!this.simulation) {
				return {};
			}

			for (let i = 0; i < this.simulation.duration; i++) {
				if (i < tree.maxAge) {
					const topProdBegin = (tree.maxAge / 2) - (tree.maxAge * 0.1);
					const topProdEnd = (tree.maxAge / 2) + (tree.maxAge * 0.1);
					const maxProd = detail.isBio ? detail.tree.maxProduction * 0.65 : detail.tree.maxProduction;

					if (i >= topProdBegin && i <= topProdEnd) {
						years.push(tree.maxProduction * detail.quantity);
					} else {
						years.push(Math.sin(i / tree.maxAge * Math.PI) * maxProd * detail.quantity);
					}
				} else {
					years.push(0);
				}
			}

			return {
				label: detail.tree.name + " Tree",
				fill: true,
				borderColor: this.getLineColor(index),
				borderWidth: 2,
				pointBackgroundColor: this.getLineColor(index),
				pointBorderColor: 'rgba(255,255,255,0)',
				pointHoverBackgroundColor: this.getLineColor(index),
				pointBorderWidth: 20,
				pointHoverRadius: 4,
				pointHoverBorderWidth: 15,
				pointRadius: 3,
				data: years,
			};
		});

		this.chartData = new Chart(this.context, {
			type: "line",
			options: chartOptions,
			data: {
				labels: [...Array(this.simulation.duration)].map((value, index) => `Year ${index + 1}`),
				datasets: data
			}
		});
	}

	getLineColor(index: number): string {
		const colors = [
			"aqua",
			"aquamarine",
			"blue",
			"blueviolet",
			"brown",
			"cadetblue",
			"chocolate",
			"cyan",
			"darkgreen",
			"darkred",
			"deeppink",
			"gold",
			"hotpink",
			"lightgreen",
			"mediumblue",
		];

		return colors[index % colors.length];
	}
}
