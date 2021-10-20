import { Component, Input } from '@angular/core';

@Component({
  selector: 'dashboard-info',
  templateUrl: './dashboard-info.component.html',
  styleUrls: ['./dashboard-info.component.scss'],
})
export class DashboardInfoComponent {
  @Input() numberOfEmployees = 0;

  @Input() totalAmountPaidForRegularHours = 0;

  @Input() totalOvertimeAmountPaidForOvertimeHours = 0;

  @Input() totalClockedInTime = 0;
}
