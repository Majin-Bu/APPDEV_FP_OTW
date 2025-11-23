import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './driver-signup.html'
})
export class DriverSignup {

  name = signal('');
  email = signal('');
  password = signal('');
  license = signal('');
  plate = signal('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async register() {
    const userData = {
      name: this.name(),
      email: this.email(),
      role: 'driver',
      license: this.license(),
      plate: this.plate(),
      isActive: false,
      createdAt: new Date()
    };

    await this.authService.registerUser(this.email(), this.password(), userData);

    this.router.navigate(['/login']);
  }
}
