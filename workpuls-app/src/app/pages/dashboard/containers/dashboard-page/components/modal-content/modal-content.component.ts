import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Employee } from '../../../../models/employee';

type EventData = [MatDatepickerInputEvent<Date>, number];
@Component({
  selector: 'modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements OnInit {
  @Input() employee: Employee;

  @Input() title: string;

  @Output() dateEvent = new EventEmitter<EventData>();

  form: FormGroup;

  isToday = true;

  datePickerValue = '';

  readonly employeeStatuses: string[] = ['active', 'inactive'];

  displayedColumns: string[] = [
    'shift',
    'clockInTime',
    'clockOutTime',
    'totalTime',
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.employee.shifts.forEach((shift) => {
      shift.totalTime =
        Math.abs(
          new Date(shift.clockOutTime).getTime() -
            new Date(shift.clockInTime).getTime()
        ) / 36e5;
    });
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      date: new FormControl(),
    });
  }

  valueChanged(event: MatDatepickerInputEvent<Date>, employeeId: number) {
    this.dateEvent.emit([event, employeeId]);
    if (
      event?.value.toLocaleString().split(',')[0] !==
      new Date().toLocaleString().split(',')[0]
    ) {
      this.isToday = false;
      this.datePickerValue = event?.value.toLocaleString().split(',')[0];
    } else {
      this.isToday = true;
    }
  }
}
