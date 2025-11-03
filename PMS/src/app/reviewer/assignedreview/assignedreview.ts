import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Review {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  category: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  statusLabel: string;
  priority: 'high' | 'medium' | 'low';
  assignedDate: string;
  dueDate: string;
  isOverdue: boolean;
  progress?: number;
  documentUrl?: string;
}

@Component({
  selector: 'app-assignedreview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignedreview.html',
  styleUrl: './assignedreview.scss'
})
export class Assignedreview implements OnInit {
  // Stats
  pendingReviews = 0;
  inProgressReviews = 0;
  completedReviews = 0;
  overdueReviews = 0;

  // Reviews data
  reviews: Review[] = [];
  filteredReviews: Review[] = [];

  // Filter states
  showFilters = false;
  selectedStatus = '';
  selectedPriority = '';
  selectedDueDate = '';
  searchQuery = '';

  // Modal
  showModal = false;
  modalTitle = '';
  modalContent = '';

  ngOnInit() {
    this.loadReviews();
    this.calculateStats();
  }

  loadReviews() {
    // Sample data - Replace with actual API call
    this.reviews = [
      {
        id: '1',
        title: 'Quantum Computing Applications in Machine Learning',
        authors: 'Dr. Sarah Johnson, Prof. Michael Chen, Dr. Emily Brown',
        abstract: 'This paper explores the integration of quantum computing principles with modern machine learning algorithms, demonstrating significant performance improvements in complex optimization problems. Our research shows promising results in reducing computational complexity for large-scale neural networks.',
        category: 'Quantum Computing',
        status: 'pending',
        statusLabel: 'Pending',
        priority: 'high',
        assignedDate: '2025-10-28',
        dueDate: '2025-11-10',
        isOverdue: false,
        documentUrl: '/papers/quantum-ml-2025.pdf'
      },
      {
        id: '2',
        title: 'Neural Architecture Search Using Evolutionary Algorithms',
        authors: 'Prof. David Lee, Dr. Amanda White, James Wilson',
        abstract: 'We present a novel approach to neural architecture search leveraging evolutionary algorithms. Our method achieves state-of-the-art results on benchmark datasets while significantly reducing search time compared to existing methods.',
        category: 'Artificial Intelligence',
        status: 'in-progress',
        statusLabel: 'In Progress',
        priority: 'medium',
        assignedDate: '2025-10-20',
        dueDate: '2025-11-05',
        isOverdue: false,
        progress: 65,
        documentUrl: '/papers/nas-evolution-2025.pdf'
      },
      {
        id: '3',
        title: 'Blockchain-Based Identity Management Systems',
        authors: 'Dr. Robert Garcia, Prof. Lisa Martinez, Dr. Kevin Anderson',
        abstract: 'This research proposes a decentralized identity management framework utilizing blockchain technology to enhance security and privacy. We demonstrate the feasibility of self-sovereign identity solutions in enterprise environments.',
        category: 'Blockchain',
        status: 'completed',
        statusLabel: 'Completed',
        priority: 'low',
        assignedDate: '2025-10-15',
        dueDate: '2025-10-30',
        isOverdue: false,
        documentUrl: '/papers/blockchain-identity-2025.pdf'
      },
      {
        id: '4',
        title: 'Edge Computing for IoT Applications: A Comprehensive Survey',
        authors: 'Dr. Maria Rodriguez, Prof. Thomas Kim, Dr. Jennifer Taylor',
        abstract: 'We provide a comprehensive survey of edge computing architectures for Internet of Things applications, analyzing performance trade-offs and identifying research gaps in current implementations.',
        category: 'Edge Computing',
        status: 'overdue',
        statusLabel: 'Overdue',
        priority: 'high',
        assignedDate: '2025-10-10',
        dueDate: '2025-10-25',
        isOverdue: true,
        documentUrl: '/papers/edge-iot-survey-2025.pdf'
      },
      {
        id: '5',
        title: 'Federated Learning in Healthcare: Privacy-Preserving Medical Data Analysis',
        authors: 'Prof. Daniel Harris, Dr. Michelle Clark, Dr. Christopher Moore',
        abstract: 'This study investigates federated learning approaches for medical data analysis while maintaining patient privacy. We present a framework that enables collaborative model training across multiple healthcare institutions without centralizing sensitive patient data.',
        category: 'Healthcare AI',
        status: 'pending',
        statusLabel: 'Pending',
        priority: 'medium',
        assignedDate: '2025-10-25',
        dueDate: '2025-11-08',
        isOverdue: false,
        documentUrl: '/papers/federated-healthcare-2025.pdf'
      },
      {
        id: '6',
        title: 'Explainable AI: Techniques and Applications in Financial Services',
        authors: 'Dr. Patricia Lewis, Prof. Andrew Turner, Dr. Nancy Young',
        abstract: 'We explore explainable AI techniques applied to financial decision-making systems. Our research demonstrates how interpretable models can maintain high accuracy while providing transparent reasoning for credit scoring and risk assessment.',
        category: 'Financial Technology',
        status: 'in-progress',
        statusLabel: 'In Progress',
        priority: 'high',
        assignedDate: '2025-10-18',
        dueDate: '2025-11-02',
        isOverdue: true,
        progress: 40,
        documentUrl: '/papers/explainable-ai-finance-2025.pdf'
      }
    ];

    this.filteredReviews = [...this.reviews];
  }

  calculateStats() {
    this.pendingReviews = this.reviews.filter(r => r.status === 'pending').length;
    this.inProgressReviews = this.reviews.filter(r => r.status === 'in-progress').length;
    this.completedReviews = this.reviews.filter(r => r.status === 'completed').length;
    this.overdueReviews = this.reviews.filter(r => r.status === 'overdue').length;
  }

  filterReviews() {
    this.showFilters = !this.showFilters;
  }

  applyFilters() {
    this.filteredReviews = this.reviews.filter(review => {
      const matchesStatus = !this.selectedStatus || review.status === this.selectedStatus;
      const matchesPriority = !this.selectedPriority || review.priority === this.selectedPriority;
      const matchesDueDate = !this.selectedDueDate || review.dueDate === this.selectedDueDate;
      const matchesSearch = !this.searchQuery || 
        review.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        review.authors.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        review.category.toLowerCase().includes(this.searchQuery.toLowerCase());

      return matchesStatus && matchesPriority && matchesDueDate && matchesSearch;
    });
  }

  clearFilters() {
    this.selectedStatus = '';
    this.selectedPriority = '';
    this.selectedDueDate = '';
    this.searchQuery = '';
    this.filteredReviews = [...this.reviews];
    this.showFilters = false;
  }

  searchReviews() {
    this.applyFilters();
  }

  refreshReviews() {
    // Simulate refresh with loading animation
    this.showModal = true;
    this.modalTitle = 'Refreshing Reviews';
    this.modalContent = 'Loading latest review assignments...';

    setTimeout(() => {
      this.loadReviews();
      this.calculateStats();
      this.applyFilters();
      this.closeModal();
    }, 1500);
  }

  downloadPaper(review: Review) {
    this.showModal = true;
    this.modalTitle = 'Download Paper';
    this.modalContent = `Downloading "${review.title}"... This would typically trigger a file download in a real application.`;

    // In a real application, you would:
    // window.open(review.documentUrl, '_blank');
    // or use a download service

    setTimeout(() => {
      this.closeModal();
    }, 2000);
  }

  viewDetails(review: Review) {
    this.showModal = true;
    this.modalTitle = review.title;
    this.modalContent = `
      Authors: ${review.authors}
      
      Category: ${review.category}
      Status: ${review.statusLabel}
      Priority: ${review.priority.toUpperCase()}
      
      Assigned: ${this.formatDate(review.assignedDate)}
      Due: ${this.formatDate(review.dueDate)}
      
      Abstract:
      ${review.abstract}
    `;
  }

  startReview(review: Review) {
    // Update review status
    review.status = 'in-progress';
    review.statusLabel = 'In Progress';
    review.progress = 0;
    
    this.calculateStats();
    this.applyFilters();

    this.showModal = true;
    this.modalTitle = 'Review Started';
    this.modalContent = `You have started reviewing "${review.title}". You will be redirected to the review interface.`;

    // In a real application, navigate to review interface
    setTimeout(() => {
      this.closeModal();
      // this.router.navigate(['/reviewer/review', review.id]);
    }, 2000);
  }

  continueReview(review: Review) {
    this.showModal = true;
    this.modalTitle = 'Continue Review';
    this.modalContent = `Continuing review of "${review.title}". Progress: ${review.progress}%`;

    // In a real application, navigate to review interface
    setTimeout(() => {
      this.closeModal();
      // this.router.navigate(['/reviewer/review', review.id]);
    }, 2000);
  }

  viewReview(review: Review) {
    this.showModal = true;
    this.modalTitle = 'View Completed Review';
    this.modalContent = `Opening your completed review for "${review.title}". You can view and edit your submission.`;

    // In a real application, navigate to view review page
    setTimeout(() => {
      this.closeModal();
      // this.router.navigate(['/reviewer/review/view', review.id]);
    }, 2000);
  }

  closeModal() {
    this.showModal = false;
    this.modalTitle = '';
    this.modalContent = '';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  }
}