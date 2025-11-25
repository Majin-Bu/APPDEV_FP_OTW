import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commuter-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commuter.html',
  styleUrls: ['./commuter.css']
})
export class Commuter {
  // Route info
  route = 'Route 5: Downtown to Uptown';
  delay = '10 min';
  delayTime = '08:30 AM';
  mapUrl = 'https://via.placeholder.com/400x200?text=Route+Map';

  // Next bus info
  nextBusTime = '08:45 AM';
  nextBusDestination = 'Central Station';

  // Alerts
  alerts = [
    { text: 'Bus delayed at stop 3', time: '08:15' },
    { text: 'Train overcrowded', time: '07:50' }
  ];

  // Community posts
  communityPosts = [
    { user: 'Alice', text: 'Looking for carpool partners.', time: '08:00' },
    { user: 'Bob', text: 'Any updates on traffic?', time: '08:05' }
  ];
}
