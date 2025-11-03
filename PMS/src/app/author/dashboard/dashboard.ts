import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { PublicationService } from '../services/publication.service';  // ✅ correct import
import { PublicationService } from '@app/services/publication.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {

  submissionHistory: any[] = [];

  constructor(
    private router: Router,
    private publicationService: PublicationService   // ✅ correctly injected here
  ) {}

  ngOnInit(): void {
    this.loadSubmissions();
  }

  /** 🔹 Load all submissions from backend */
  loadSubmissions(): void {
    this.publicationService.getAllPublications().subscribe({
      next: (data) => {                     // ✅ Correct syntax
        this.submissionHistory = data.map((pub: any) => ({
          id: pub.id,
          username: pub.username || 'Author',
          title: pub.title,
          articleType: pub.articleType,
          date: pub.submissionDate || new Date(),
        }));
      },
      error: (err) => {                     // ✅ Correct syntax
        console.error('Error loading submissions:', err);
      }
    });
  }

  /** 🔹 Download stored PDF file */
  downloadPDF(id: number): void {
    this.publicationService.downloadPDF(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `publication_${id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error downloading PDF:', err);
        alert('❌ Failed to download PDF.');
      }
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
