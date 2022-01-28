import { Component, OnDestroy, OnInit } from '@angular/core';
import { date } from 'ngx-custom-validators/src/app/date/validator';
import { Subscription } from 'rxjs';
import { AppointmentCount } from 'src/app/models/appointmentCount';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ChartOptions, Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-appointments-chart',
  templateUrl: './appointments-chart.component.html',
})
export class AppointmentsChartComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private utils: Utils = new Utils();
  public barChartOptions: Partial<ChartOptions>;

  constructor(private appointmentService: AppointmentService) {
   }


  ngOnInit(): void {
    this.initChart();
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  /**
   * gets the data needed from the database
   */
  getData(){
    const dates = this.utils.getWeekRange()
    this.subscription.add(this.appointmentService.getAppointmentsDayCountByDateRange(dates[0], dates[1]).subscribe((rAppointmentCount: AppointmentCount[])=>{
      const dates = this.utils.getWeekFullRange();
      const counts = this.linkCountToDates(dates, rAppointmentCount)
      console.log(dates)
      console.log(counts)
      this.barChartOptions.series = [
        {
          name: 'afspraken',
          data: counts
        }
      ];
      this.barChartOptions.xaxis = {
        type: 'datetime',
        categories: dates
      }
      //chart eerder init, data achteraf meegeven en updaten
    }))
  }

  /**
   * initialises chart with the correct data
   * loads in with basic data, then refreshes when async data is downloaded
   * @param appointmentCount retrieved from the database
   */
  initChart(){
    
     this.barChartOptions = {
      series: [
        {
          name: 'afspraken',
          data: [30,40,45,50,49,60,70,91,125]
        }
      ],
      colors: ["#727cf5"],
      grid: {
        borderColor: "rgba(77, 138, 240, .1)",
        padding: {
          bottom: 0
        }
      },
      chart: {
        type: 'bar',
        height: '320',
        parentHeightOffset: 0
      },
      xaxis: {
        type: 'datetime',
        categories: ['01/01/1991','01/01/1992','01/01/1993','01/01/1994','01/01/1995','01/01/1996','01/01/1997', '01/01/1998','01/01/1999']
      }
      
    };

  } 

  /**
   * creates an array in order of the dates with the amount of appointments that day
   * @param dates of the week
   * @param count of the appointments
   * @returns array with the appointments per day
   */
  linkCountToDates(dates, count:AppointmentCount[]){
    let index = 0;
    const counts = [];
    let notZero = false;
    dates.forEach(d => {
      count.forEach(c => {
        const dc = c.year + "-" + this.utils.checkDoubleDigits(c.month) + "-" + this.utils.checkDoubleDigits(c.day)
        if (d ==   dc){
          counts[index] = c.amount_appointments
          notZero = true
        }
      });
      if (!notZero){
        counts[index] = 0
      }
      notZero = false
      index = index + 1;
    });
    return counts;
  }
}
