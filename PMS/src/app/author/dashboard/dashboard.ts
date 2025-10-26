import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Import this

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // ✅ Add CommonModule here
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  constructor(private router: Router) { }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  // 🔹 Mock history data (can be fetched via API in real case)
  submissionHistory = [
    {
      username: 'Rout',
      title: 'AI-Powered Manuscript Analysis',
      articleType: 'Original Research',
      date: new Date('2025-10-20'),
      files: [
        { name: 'manuscript_john.pdf', url: '#' },
        { name: 'supplementary.zip', url: '#' }
      ]
    },
    {
      username: 'Rout_1',
      title: 'Deep Learning for Healthcare',
      articleType: 'Review Article',
      date: new Date('2025-10-23'),
      files: [
        { name: 'DL_healthcare.pdf', url: '#' }
      ]
    },
    {
      username: 'Rout_X',
      title: 'Drug Business',
      articleType: 'Review Article',
      date: new Date('2025-10-23'),
      files: [
        { name: 'DL_healthcare.pdf', url: '#' }
      ]
    },
    {
      username: 'Rout_2',
      title: 'Case Study: Cloud Migration Challenges',
      articleType: 'Case Study',
      date: new Date('2025-10-25'),
      files: [
        { name: 'cloud_case_study.pdf', url: '#' }
      ]
    }
  ];
}
