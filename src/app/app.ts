import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule   // ✅ make routing work fully in standalone mode
  ],
  template: `
    <router-outlet></router-outlet>
  `
})
export class App {}
