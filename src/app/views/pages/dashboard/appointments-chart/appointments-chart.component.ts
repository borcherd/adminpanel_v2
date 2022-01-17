import { Component, OnDestroy, OnInit } from '@angular/core';
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
    this.subscription.add(this.appointmentService.getAppointmentsDayCountByDateRange(dates[0], dates[1]).subscribe((r: AppointmentCount[])=>{
      this.initChart(r)
    }))
  }

  /**
   * initialises chart with the correct data
   * @param appointmentCount retrieved from the database
   */
  initChart(appointmentCount){
    const dates = this.utils.getWeekFullRange();
    const counts = this.linkCountToDates(dates, appointmentCount)
     this.barChartOptions = {
      series: [
        {
          name: 'afspraken',
          data: counts
        }
      ],
      colors: ["#f77eb9"],
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
        categories: dates
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
