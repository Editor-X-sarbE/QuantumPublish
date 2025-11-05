import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PublicationService } from '@app/services/publication.service';

@Component({
  selector: 'app-editordashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editordashboard.html',
  styleUrls: ['./editordashboard.scss']
})
export class Editordashboard implements OnInit {

  submissions: any[] = [];
  stats = {
    total: 0,
    approved: 0,
    pending: 0,
    revision: 0,
    rejected: 0
  };

  constructor(
    private publicationService: PublicationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSubmissions();
  }

  /** 🔹 Load all submissions */
  loadSubmissions(): void {
    this.publicationService.getAllPublications().subscribe({
      next: (data) => {
        this.submissions = data.map((pub: any) => ({
          ...pub,
          submissionDate: pub.submissionDate || this.getRandomDate()
        }));
        this.updateStats();
      },
      error: (err) => console.error('Error fetching submissions:', err)
    });
  }

  /** 🔹 Generate a random date (for demo/test data) */
  getRandomDate(): Date {
    const now = new Date();
    const past = new Date();
    past.setDate(now.getDate() - Math.floor(Math.random() * 60));
    return past;
  }

  /** ✅ Approve a manuscript (and persist) */
  approveManuscript(submission: any): void {
    submission.status = 'Approved';
    this.publicationService.updatePublicationStatus(submission.id, 'Approved').subscribe({
      next: () => this.updateStats(),
      error: (err) => console.error('Error updating status:', err)
    });
  }

  /** ✅ Reject a manuscript (and persist) */
  rejectManuscript(submission: any): void {
    submission.status = 'Rejected';
    this.publicationService.updatePublicationStatus(submission.id, 'Rejected').subscribe({
      next: () => this.updateStats(),
      error: (err) => console.error('Error updating status:', err)
    });
  }

  /** 🔹 Update live statistics */
  updateStats(): void {
    this.stats.total = this.submissions.length;
    this.stats.approved = this.submissions.filter(d => d.status === 'Approved').length;
    this.stats.pending = this.submissions.filter(d => d.status === 'Pending' || d.status === 'Under Review').length;
    this.stats.revision = this.submissions.filter(d => d.status === 'Revision Required').length;
    this.stats.rejected = this.submissions.filter(d => d.status === 'Rejected').length;
  }

  /** 🔹 Refresh manually */
  refreshData(): void {
    this.loadSubmissions();
  }

  /** 🔹 Navigate to details */
  viewSubmissionDetails(submissionId: number): void {
    this.router.navigate(['/editor/allsubmissions'], { queryParams: { id: submissionId } });
  }
}
