import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/models/person';
import { Role } from 'src/app/models/role';
import { PersonService } from 'src/app/services/person.service';
import { ChartOptions } from 'src/app/utils/utils';

@Component({
  selector: 'app-person-analysis',
  templateUrl: './person-analysis.component.html',
})
export class PersonAnalysisComponent implements OnInit, OnDestroy{
  public pieChartOptions: Partial<ChartOptions>;
  private subscription: Subscription = new Subscription();
  private admins: Person[];
  private employees: Person[];
  private customers: Person[];


  constructor(private personService: PersonService) {
   }

  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * gets all data needed from the database
   */
  getData(){
    this.subscription.add(this.personService.getAllPersonsByRole(Role.ADMIN).subscribe((admins: Person[])=>{
      this.subscription.add(this.personService.getAllPersonsByRole(Role.EMPLOYEE).subscribe((employees: Person[])=>{
        this.subscription.add(this.personService.getAllPersonsByRole(Role.CUSTOMER).subscribe((customers: Person[])=>{
            this.initChart(admins, employees, customers)
            //chart eerder init, data achteraf meegeven en updaten
        }))
      }))
    }))
  }

  /**
   * initialises the chart
   * @param admins in the company
   * @param employees in the company
   * @param customers in the company
   */
  initChart(admins, employees, customers){
    this.pieChartOptions = {
      nonAxisSeries: [admins.length,employees.length,customers.length], 
      colors: ["#f77eb9", "#7ee5e5","#4d8af0"],
      chart: {
        height: 300,
        type: "pie"
      },
      stroke: {
        colors: ['rgba(0,0,0,0)']
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center'
      },
      dataLabels: {
        enabled: false
      },
      labels: ['admins', 'employees', 'customer']
    };
  }
}
