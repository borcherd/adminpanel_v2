import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexGrid, ApexChart, ApexXAxis, ApexYAxis, ApexMarkers, ApexStroke, ApexLegend, ApexResponsive, ApexTooltip, ApexFill, ApexDataLabels, ApexPlotOptions, ApexTitleSubtitle } from "ng-apexcharts";
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
   * gets the first and last date of the week containing this date
   * @param date in the week 
   * @returns first and last day of week
   */
   getWeekRange(date = null) {
    if (date == null){
      var currFirst = new Date(); // get current date
      var currLast = new Date();
    } else{
      var currFirst = new Date(date); // get current date
      var currLast = new Date(date);
    }
    const first = currFirst.getDate() - currFirst.getDay() + 1; // First day is the day of the month - the day of the week
    const firstday = this.formatDate(new Date(currFirst.setDate(first)).toUTCString());
    const lastday = this.formatDate(new Date(currLast.setDate(first+ 7)).toUTCString());
    return [firstday, lastday];
  }

  /**
   * gets the first and last date of the month containing the date
   * @param date this month
   * @returns the first and last date of the month
   */
  getMonthRange(date = null){
    if (date == null){
      var curr = new Date()
    } else {
      var curr = new Date(date)
    }
    var firstDay = this.formatDate(new Date(curr.getFullYear(), curr.getMonth(), 1).toUTCString());
    var lastDay = this.formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0).toUTCString());
    return [firstDay, lastDay]
  }

  /**
   * gets the date of the day after the date
   * @param date 
   * @returns the date with the date +1
   */
  getDayRange(date = null){
    if (date == null){
      var curr = new Date()
    } else {
      var curr = new Date(date)
    }
    var last = new Date();
    last.setDate(curr.getDate()+1);

    var firstDay = this.formatDate(curr.toUTCString())
    var lastDay = this.formatDate(last.toUTCString())
    return [firstDay, lastDay]
  }

  /**
   * gets the weeks full range, every date in the current week
   * @returns an array of dates
   */
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