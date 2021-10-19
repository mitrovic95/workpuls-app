import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-info',
  templateUrl: './dashboard-info.component.html',
  styleUrls: ['./dashboard-info.component.scss'],
})
export class DashboardInfoComponent implements OnInit {
  @Input() numberOfEmployees: number = 0;

  @Input() totalAmountPaidForRegularHours: number = 0;

  @Input() totalOvertimeAmountPaidForOvertimeHours: number = 0;

  @Input() totalClockedInTime: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
