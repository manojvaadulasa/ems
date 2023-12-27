import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'em-navbar',
  standalone: true,
  imports: [ CommonModule, MatToolbarModule, RouterModule ],
  templateUrl: './navbar.component.html',
  styles: `.example-spacer {
    flex: 0.05 0.05 auto;
  }
  .font {
    font-size:70%;
    text-decoration: none;
    color: white;
  }`
})
export class NavbarComponent {

}
