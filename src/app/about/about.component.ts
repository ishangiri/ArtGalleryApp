import { Component } from '@angular/core';
import {  RouterLinkActive, RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'about',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive,RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
