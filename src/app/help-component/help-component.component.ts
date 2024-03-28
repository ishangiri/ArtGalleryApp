import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet,  } from '@angular/router';

@Component({
  selector: 'app-help-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './help-component.component.html',
  styleUrl: './help-component.component.css'
})
export class HelpComponentComponent {

}
