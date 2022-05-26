import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Employee} from '../employee';
import {catchError, map, reduce} from 'rxjs/operators';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;
  employees: Employee[] = [];
  @Output() deleteReport: EventEmitter<Employee> = new EventEmitter()
  @Output() updateReport: EventEmitter<Employee> = new EventEmitter()
  // directReports?: Array<number>;
  // number_reports: Number;
  errorMessage: string;
  // @Input() total: Array <number>;
  constructor(private employeeService: EmployeeService) {

  }
  ngOnInit(): void {

    // for ( let i = 0 ; i < 4; i ++ ) {
    //   this.employeeService.get(0).subscribe((employee) =>{
    //      (this.employee = employee)
    //      this.number_reports = this.directReports?.length
    //   }
    //      )
    // }

    this.employeeService.getAll() .subscribe((employee) => {
      // console.log("from this:", employee.number_reports )
    })

    this.employeeService.getAll()

      // .pipe(
      //   reduce((reps, e: Employee) => reps.concat(e), []),
      //   map((reps)  => {

      //     (this.directReports)= reps
      //     console.log((reps[1].directReports).length)
      //     // this.total = ((this.directReports).length)
      //     console.log("check this:", reps)
      //     for ( let i = 0 ; i < reps.length; i ++ ) {
      //       if (reps[i].directReports){
      //         console.log(" i am here")
      //       this.number_reports = (reps[i].directReports).length
      //       } else {
      //       this.number_reports = 0
      //       }
      //     }
      //   }),
      //   catchError(this.handleError.bind(this))
      // )
      .subscribe((employee) =>{
        console.log("employee is:", employee.directReports?.length)
        if (employee.directReports !== undefined){
        employee.number_reports = employee.directReports?.length
        } else {
          employee.number_reports = 0
        }
        console.log("direct is:", employee.number_reports)

        
        
        });
  }
  onDelete(employee: any) {
    this.deleteReport.emit(employee)
  }

  onUpdate(employee: any) {
    this.updateReport.emit(employee)
  }
  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
