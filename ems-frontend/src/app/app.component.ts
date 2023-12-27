import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'em-root',
  standalone: true,
  imports: [ CommonModule, NavbarComponent, RouterOutlet ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
