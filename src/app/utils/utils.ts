import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexGrid, ApexChart, ApexXAxis, ApexYAxis, ApexMarkers, ApexStroke, ApexLegend, ApexResponsive, ApexTooltip, ApexFill, ApexDataLabels, ApexPlotOptions, ApexTitleSubtitle } from "ng-apexcharts";
import { date } from "ngx-custom-validators/src/app/date/validator";
import { Appointment } from "../models/appointment";

export class Utils {
    
    /**
     * checks if the length of arg is 1
     * @param arg to check the length of
     * @returns correct length of arg (has to be 2 for dateobject)
     */
    checkDoubleDigits(arg){
        if (String(arg).length == 1){
        arg = "0" + arg
        }
        return arg
    }

    /**
     * turns the input from the date and timepicker into a formatted date
     * @param date to format
     * @param time to format
     * @returns formatted datetime
     */
    createDateTime(date, time){
        ;
        const DateTime = date.year + "-" +
        this.checkDoubleDigits(date.month) + "-" +
        this.checkDoubleDigits(date.day) + "T" +
        this.checkDoubleDigits(time.hour) + ":" + 
        this.checkDoubleDigits(time.minute) + ":" +
        "00" + "+02:00";
        const temp_date = new Date(Date.parse(DateTime));
        temp_date.setHours(temp_date.getHours() + 2);
        return temp_date.toISOString();
    }

    /**
   * translates the appointment to an event for the callender
   * @param appointment to translate
   * @returns an event for the callender
   */
  translateAppointment(appointment:Appointment){   
    return {
      id: appointment.appointmentId,
      start: appointment.startDate,
      end: appointment.endDate,
      title: appointment.info,
      backgroundColor: 'rgba(0,204,204,.25)',
      borderColor: '#00cccc'
    }
  }

  /**
   * Get week range of current date
   */
   getWeekRange() {
    const curr = new Date; // get current date s
    const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    const last = first + 5; // last day is the first day + 6

    const firstday = this.formatDate(new Date(curr.setDate(first)));
    const lastday = this.formatDate(new Date(curr.setDate(last)));
    return [firstday, lastday];
  }

  getWeekFullRange(){
    const curr = new Date; // get current date s
    const dates = [];
    //dates.push(curr.getDate() - curr.getDay() + 1)
    for (let index = 1; index < 7; index++) {
      const date = curr.getDate() - curr.getDay() +index
      const formattedDate = this.formatDate(new Date(curr.setDate(date)))
      dates.push(formattedDate)
    }
    return dates
  }

  /**
   * Format date in yyyy-MM-dd
   * @param date to be formatted
   */
  formatDate(date) {
    const d = new Date(date),
      year = d.getFullYear();
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

    
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  nonAxisSeries: ApexNonAxisChartSeries;
  colors: string[];
  grid: ApexGrid;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers,
  stroke: ApexStroke,
  legend: ApexLegend,
  responsive: ApexResponsive[],
  tooltip: ApexTooltip,
  fill: ApexFill
  dataLabels: ApexDataLabels,
  plotOptions: ApexPlotOptions,
  labels: string[],
  title: ApexTitleSubtitle
};