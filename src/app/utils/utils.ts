import { Subscription } from "rxjs";
import { Appointment } from "../models/appointment";
import { AppointmentService } from "../services/appointment.service";
import { PersonService } from "../services/person.service";

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
        "00" + "+01:00";
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
    
}