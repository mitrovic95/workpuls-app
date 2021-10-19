import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '../../../../pages/dashboard/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() user: User | null;

  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();

  public flatlogicEmail =
    'https://www.linkedin.com/in/dejan-mitrovi%C4%87-573834156/';
}
