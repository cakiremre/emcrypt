import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-redir',
  templateUrl: './redir.component.html',
  styleUrls: ['./redir.component.scss'],
})
export class RedirComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.navigateToHome();
  }
}
