import { Component, ViewChild, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Shift } from '../../models/shift';
import { DashboardService } from '../../services';
import { Employee } from '../../models';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  constructor(private service: DashboardService, private dialog: MatDialog) {}

  employees: Employee[] = [];

  employeesShifts: Shift[] = [];

  numberOfEmployees = 0;

  totalAmountPaidForRegularHours = 0;

  totalOvertimeAmountPaidForOvertimeHours = 0;

  totalClockedInTime = 0;

  loader = false;

  displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'totalClockedInTime',
    'totalAmountPaidForRegularHours',
    'totalOvertimeAmountPaidForOvertimeHours',
  ];

  dataSource = new MatTableDataSource<Employee>();

  selection = new SelectionModel<Employee>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.initTableData();
    setTimeout(() => {
      this.loader = false;
    }, 1500);
  }

  initTableData() {
    this.service.getEmployeeShifts().subscribe((shifts) => {
      this.employeesShifts = shifts;
    });
    this.service.getEmployees().subscribe((data) => {
      this.dashboardInfo(data);
      this.employees = data;
      this.calculateTotalClockedTimePerEmployee();
      this.dataSource = new MatTableDataSource<Employee>(data);
      this.dataSource.paginator = this.paginator;
    });
    this.loader = true;
  }

  calculateTotalClockedTimePerEmployee() {
    this.employees.forEach((employee) => {
      employee.shifts = this.employeesShifts.filter(
        (employeeShits) => employeeShits.employeeId === employee.id
      );
      employee.totalClokedIn =
        employee.hourlyRate + employee.overtimeHourlyRate;
    });
  }

  dashboardInfo(data: Array<Employee>): void {
    this.numberOfEmployees = data.length;
    this.totalAmountPaidForRegularHours = data.reduce(
      (accumulator, current) => accumulator + current.hourlyRate,
      0
    );
    this.totalOvertimeAmountPaidForOvertimeHours = data.reduce(
      (accumulator, current) => accumulator + current.overtimeHourlyRate,
      0
    );
    this.totalClockedInTime =
      this.totalAmountPaidForRegularHours +
      this.totalOvertimeAmountPaidForOvertimeHours;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  async openEmployeesPreview(): Promise<number[] | undefined> {
    if (!this.selection.selected) {
      return [];
    }
    const selectedEmployees: Array<number> = [];
    this.selection.selected.forEach((employee) => {
      selectedEmployees.push(employee.id);
    });

    this.dialog.open(ModalComponent, {
      width: '700px',
      data: {
        title: 'Employee',
        employees: this.employees.filter((employee) =>
          selectedEmployees.includes(employee.id)
        ),
      },
    });

    return selectedEmployees;
  }
}
