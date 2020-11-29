import { Component, AfterViewInit, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "src/environments/environment";

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke,
  ApexTitleSubtitle,
  ApexDataLabels
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  dataLabels : ApexDataLabels;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChildren("chart") chart: ChartComponent;
  link = environment.picturePath;
  url = 'https://abeille.app/bubble/public/api/';
  public chartOptions: Partial<ChartOptions>;
  data: any;
  constructor(private route: ActivatedRoute, private router: Router) {






  }
  ngOnInit(){

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
      }
    });


    this.chartOptions = {
      series: [this.data.percentScore],
      chart: {
        type: "radialBar",
        offsetY: -20
      },      
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 6, // margin is in pixels
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: "40px",
              color : '#000000',
              fontWeight : 'bold'
            },
            value: {
              show : false,
              offsetY: -2,
            }
          }
        }
      },
      fill: {
        colors : ["#8bbde5"],
        type: "gradient",
        gradient: {
          gradientToColors : ['#b7b4db'],
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91]
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: [this.data.total_score],
    };

  }
  ngAfterViewInit() {
    
    


  }



}
