import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SIA';

  ngOnInit(): void {
    const colorGuardado = localStorage.getItem('primaryColor');
    if (colorGuardado) {
      this.setColor(colorGuardado);
    }
  }

  private setColor(color: string): void {
    document.documentElement.style.setProperty('--primary-color', color);
  }
}
