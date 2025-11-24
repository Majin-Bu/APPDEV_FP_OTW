<<<<<<< HEAD
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
=======
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, query, where, getDocs, doc, updateDoc } from '@angular/fire/firestore';
import { HttpClient, HttpClientModule } from '@angular/common/http';
>>>>>>> 30b74b6 (SIGNUP and LOGIN (all working), firbase)

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule],
  templateUrl: './admin.html'
})
export class Admin {

=======
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin.html'
})
export class Admin implements OnInit {

  // Signals to store drivers
  pendingDrivers = signal<any[]>([]);
  approvedDrivers = signal<any[]>([]);

  constructor(
    private firestore: Firestore,
    private http: HttpClient
  ) {}

  // -------------------------
  // LOAD DRIVERS ON START
  // -------------------------
  async ngOnInit() {
    await this.loadDrivers();
  }

  // -------------------------
  // FETCH PENDING + APPROVED
  // -------------------------
  async loadDrivers() {
    const usersRef = collection(this.firestore, 'users');

    // Pending drivers
    const pendingQuery = query(
      usersRef,
      where('role', '==', 'driver'),
      where('status', '==', 'pending')
    );
    const pendingSnap = await getDocs(pendingQuery);

    this.pendingDrivers.set(
      pendingSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    );

    // Approved drivers
    const approvedQuery = query(
      usersRef,
      where('role', '==', 'driver'),
      where('status', '==', 'approved')
    );
    const approvedSnap = await getDocs(approvedQuery);

    this.approvedDrivers.set(
      approvedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    );
  }

  // -------------------------
  // APPROVE DRIVER
  // -------------------------
  async approve(driver: any) {
    const ref = doc(this.firestore, 'users', driver.id);

    await updateDoc(ref, {
      status: 'approved',
      isActive: true
    });

    // Email API (replace with your deployed function URL)
    const url = 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/sendApprovalEmail';

    await this.http.post(url, {
      email: driver.email,
      name: driver.name
    }).toPromise();

    alert('Driver approved and email sent!');
    await this.loadDrivers();
  }

  // -------------------------
  // DECLINE DRIVER
  // -------------------------
  async decline(driver: any) {
    const ref = doc(this.firestore, 'users', driver.id);

    await updateDoc(ref, {
      status: 'declined',
      isActive: false
    });

    // Email API (replace URL)
    const url = 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/sendDeclineEmail';

    await this.http.post(url, {
      email: driver.email,
      name: driver.name
    }).toPromise();

    alert('Driver declined and email sent!');
    await this.loadDrivers();
  }
>>>>>>> 30b74b6 (SIGNUP and LOGIN (all working), firbase)
}
