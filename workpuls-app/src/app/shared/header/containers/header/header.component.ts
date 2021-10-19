import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailService } from '../../../../pages/dashboard/services/email.service';
import { AuthService } from '../../../../pages/dashboard/services/auth.service';

import { Email, User } from '../../../../pages/dashboard/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isMenuOpened: boolean;

  @Output() isShowSidebar = new EventEmitter<boolean>();

  public user$: Observable<User>;

  public emails$: Observable<Email[]>;

  constructor(
    private userService: AuthService,
    private emailService: EmailService
  ) {
    this.user$ = this.userService.getUser();
    this.emails$ = this.emailService.loadEmails();
  }
}
