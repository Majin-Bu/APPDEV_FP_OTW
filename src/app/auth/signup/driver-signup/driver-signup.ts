import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-driver-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './driver-signup.html'
})
export class DriverSignup {

  // Signals for input fields
  name = signal('');
  email = signal('');
  password = signal('');
  license = signal('');
  plate = signal('');

  licenseImageFile: File | null = null;

  // Flag for showing validation errors
  submitted = false;

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private router: Router
  ) {}

  // Handle image selection
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.licenseImageFile = input.files[0];
    }
  }

  // Register driver function
  async register() {
    this.submitted = true;

    // Validation check
    if (
      !this.name() ||
      !this.email() ||
      !this.password() ||
      !this.license() ||
      !this.plate() ||
      !this.licenseImageFile
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      let uploadedImageUrl = '';

      // Upload image
      if (this.licenseImageFile) {
        const imagePath = `driver_licenses/${Date.now()}_${this.licenseImageFile.name}`;
        const storageRef = ref(this.storage, imagePath);
        await uploadBytes(storageRef, this.licenseImageFile);
        uploadedImageUrl = await getDownloadURL(storageRef);
      }

      const userData = {
        name: this.name(),
        email: this.email(),
        role: 'driver',
        license: this.license(),
        plate: this.plate(),
        licenseImageUrl: uploadedImageUrl,
        status: 'pending',
        isActive: false,
        createdAt: new Date()
      };

      await this.authService.registerUser(this.email(), this.password(), userData);

      alert('Driver account created! Waiting for admin approval.');
      this.router.navigate(['/login']);

    } catch (error: any) {
      console.error('Driver Signup Error:', error);
      alert('Error creating account: ' + error.message);
    }
  }
}
