import { Component, Inject } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../../../services/dashboard.service';
import { Employee } from '../../../../models/employee';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(
    private service: DashboardService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: ''; employees: Employee[] }
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  dateChanged(event: [MatDatepickerInputEvent<Date>, number]): void {
    const employee = this.data.employees.find(
      (employeeData) => employeeData.id === event[1]
    );
    if (employee) {
      const filteredShifts = employee?.shifts.filter((shift) => {
        return (
          new Date(event[0]?.value).getTime() >=
            new Date(shift.clockInTime).getTime() &&
          new Date(event[0]?.value).getTime() <=
            new Date(shift.clockOutTime).getTime()
        );
      });

      if (filteredShifts.length) {
        employee.shifts = filteredShifts;
      } else {
        this.service.getEmployeeShifts().subscribe((shifts) => {
          employee.shifts = shifts.filter(
            (employeeShits) => employeeShits.employeeId === employee.id
          );
          shifts.forEach((shift) => {
            shift.totalTime =
              Math.abs(
                new Date(shift.clockOutTime).getTime() -
                  new Date(shift.clockInTime).getTime()
              ) / 36e5;
          });
        });
      }
    }
  }
}
