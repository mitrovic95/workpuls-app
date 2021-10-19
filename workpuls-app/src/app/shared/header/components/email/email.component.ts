import { Component, Input } from '@angular/core';

import { Email } from '../../../../pages/dashboard/models';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent {
  @Input() emails: Email[] | null;

  public colors: string[] = ['yellow', 'green', 'blue', 'ping'];
}
