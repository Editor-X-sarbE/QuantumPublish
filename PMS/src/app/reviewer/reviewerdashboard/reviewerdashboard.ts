import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Interface for Review Paper
interface ReviewPaper {
  id: string;
  paperId: string;
  title: string;
  abstract: string;
  author: string;
  tags: string[];
  pages: number;
  status: 'pending' | 'in-progress' | 'completed';
  deadline: Date;
  submittedDate?: Date;
  progress?: number;
  rating?: number;
  recommendation?: string;
}

// Interface for Stats
interface ReviewStats {
  pending: number;
  completed: number;
  dueSoon: number;
  total: number;
}

@Component({
  selector: 'app-reviewerdashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviewerdashboard.html',
  styleUrl: './reviewerdashboard.scss'
})
export class Reviewerdashboard implements OnInit {
  // Data properties
  allReviews: ReviewPaper[] = [];
  filteredReviews: ReviewPaper[] = [];
  stats: ReviewStats = {
    pending: 0,
    completed: 0,
    dueSoon: 0,
    total: 0
  };

  // Filter and sort properties
  selectedStatus: string = 'all';
  selectedSort: string = 'deadline';
  searchQuery: string = '';
  viewMode: 'list' | 'grid' = 'list';

  // UI state
  showEmptyState: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  // Load reviews data (Replace with actual API call)
  loadReviews(): void {
    this.isLoading = true;

    // Simulated data - Replace with actual API call
    setTimeout(() => {
      this.allReviews = [
        {
          id: '1',
          paperId: 'PMS-2024-001',
          title: 'Quantum Computing Applications in Machine Learning: A Comprehensive Study',
          abstract: 'This paper explores the integration of quantum computing principles with modern machine learning algorithms...',
          author: 'Dr. Sarah Johnson',
          tags: ['Quantum Computing', 'AI'],
          pages: 25,
          status: 'pending',
          deadline: new Date('2025-11-05')
        },
        {
          id: '2',
          paperId: 'PMS-2024-002',
          title: 'Sustainable Energy Systems: Novel Approaches to Solar Panel Efficiency',
          abstract: 'An investigation into advanced materials and designs that significantly improve solar panel performance...',
          author: 'Prof. Michael Chen',
          tags: ['Renewable Energy'],
          pages: 18,
          status: 'in-progress',
          deadline: new Date('2025-11-12'),
          progress: 65
        },
        {
          id: '3',
          paperId: 'PMS-2024-003',
          title: 'Blockchain Technology in Healthcare: Security and Privacy Considerations',
          abstract: 'This research examines the implementation of blockchain solutions for secure medical data management...',
          author: 'Dr. Emily Rodriguez',
          tags: ['Blockchain', 'Healthcare'],
          pages: 22,
          status: 'pending',
          deadline: new Date('2025-11-18')
        },
        {
          id: '4',
          paperId: 'PMS-2024-004',
          title: 'Neural Networks for Natural Language Processing: Recent Advances',
          abstract: 'A comprehensive review of transformer architectures and their applications in NLP tasks...',
          author: 'Dr. James Wilson',
          tags: ['AI', 'NLP'],
          pages: 30,
          status: 'completed',
          deadline: new Date('2025-10-25'),
          submittedDate: new Date('2025-10-28'),
          rating: 8.5,
          recommendation: 'Accept with Minor Revisions'
        }
      ];

      this.filteredReviews = [...this.allReviews];
      this.calculateStats();
      this.updateEmptyState();
      this.isLoading = false;
    }, 500);
  }

  // Calculate statistics
  calculateStats(): void {
    this.stats.total = this.allReviews.length;
    this.stats.pending = this.allReviews.filter(r => r.status === 'pending').length;
    this.stats.completed = this.allReviews.filter(r => r.status === 'completed').length;
    
    // Due soon: within 7 days
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    this.stats.dueSoon = this.allReviews.filter(r => 
      r.status !== 'completed' && 
      r.deadline <= sevenDaysFromNow
    ).length;
  }

  // Filter reviews by status
  filterByStatus(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  // Sort reviews
  sortReviews(sortBy: string): void {
    this.selectedSort = sortBy;
    this.applySort();
  }

  // Search reviews
  onSearch(): void {
    this.applyFilters();
  }

  // Apply all filters
  applyFilters(): void {
    let filtered = [...this.allReviews];

    // Filter by status
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(r => r.status === this.selectedStatus);
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(query) ||
        r.author.toLowerCase().includes(query) ||
        r.paperId.toLowerCase().includes(query) ||
        r.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    this.filteredReviews = filtered;
    this.applySort();
    this.updateEmptyState();
  }

  // Apply sorting
  applySort(): void {
    switch (this.selectedSort) {
      case 'deadline':
        this.filteredReviews.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
        break;
      case 'title':
        this.filteredReviews.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'status':
        this.filteredReviews.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'author':
        this.filteredReviews.sort((a, b) => a.author.localeCompare(b.author));
        break;
    }
  }

  // Toggle view mode
  toggleViewMode(mode: 'list' | 'grid'): void {
    this.viewMode = mode;
  }

  // Update empty state visibility
  updateEmptyState(): void {
    this.showEmptyState = this.filteredReviews.length === 0;
  }

  // Check if deadline is urgent (within 3 days)
  isDeadlineUrgent(deadline: Date): boolean {
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    return deadline <= threeDaysFromNow;
  }

  // Get deadline class
  getDeadlineClass(review: ReviewPaper): string {
    if (review.status === 'completed') {
      return 'completed';
    }
    return this.isDeadlineUrgent(review.deadline) ? 'urgent' : 'normal';
  }

  // Format date
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  }

  // Get status badge class
  getStatusBadgeClass(status: string): string {
    return `status-badge ${status}`;
  }

  // View review details
  viewDetails(review: ReviewPaper): void {
    console.log('Viewing details for:', review.paperId);
    // Navigate to review detail page
    // this.router.navigate(['/reviewer/review-detail', review.id]);
  }

  // Start or continue review
  startReview(review: ReviewPaper): void {
    console.log('Starting review for:', review.paperId);
    // Navigate to review form page
    // this.router.navigate(['/reviewer/submit-review', review.id]);
  }

  // View completed review
  viewCompletedReview(review: ReviewPaper): void {
    console.log('Viewing completed review for:', review.paperId);
    // Navigate to completed review page
    // this.router.navigate(['/reviewer/view-review', review.id]);
  }

  // Download review
  downloadReview(review: ReviewPaper): void {
    console.log('Downloading review for:', review.paperId);
    // Implement download functionality
    // this.reviewService.downloadReview(review.id);
  }

  // Refresh data
  refreshData(): void {
    this.loadReviews();
  }

  // Show filter modal
  showFilterModal(): void {
    console.log('Show filter modal');
    // Implement filter modal
  }

  // Show sort modal
  showSortModal(): void {
    console.log('Show sort modal');
    // Implement sort modal with options:
    // - Deadline (Earliest First)
    // - Deadline (Latest First)
    // - Title (A-Z)
    // - Author (A-Z)
    // - Status
  }

  // Get tags as string
  getTagsString(tags: string[]): string {
    return tags.join(', ');
  }

  // Track by function for ngFor optimization
  trackByReviewId(index: number, review: ReviewPaper): string {
    return review.id;
  }
}