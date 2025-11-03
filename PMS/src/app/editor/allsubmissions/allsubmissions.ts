import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Submission {
  id: string;
  manuscriptId: string;
  title: string;
  author: string;
  email: string;
  category: string;
  status: 'submitted' | 'under-review' | 'revision' | 'accepted' | 'rejected' | 'published';
  submittedDate: string;
  reviewers: string[];
  showDropdown?: boolean;
}

@Component({
  selector: 'app-allsubmissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './allsubmissions.html',
  styleUrl: './allsubmissions.scss'
})
export class Allsubmissions implements OnInit {
  // Stats
  totalSubmissions = 0;
  pendingSubmissions = 0;
  underReviewSubmissions = 0;
  acceptedSubmissions = 0;
  revisionSubmissions = 0;
  rejectedSubmissions = 0;

  // Submissions data
  submissions: Submission[] = [];
  filteredSubmissions: Submission[] = [];
  selectedSubmissions: Submission[] = [];

  // Filters
  showFilters = false;
  selectedStatus = '';
  selectedCategory = '';
  selectedDateRange = 'all';
  selectedSort = 'newest';
  searchQuery = '';

  // Categories
  categories: string[] = [
    'Quantum Computing',
    'Artificial Intelligence',
    'Machine Learning',
    'Blockchain',
    'Cybersecurity',
    'Data Science',
    'Cloud Computing',
    'IoT',
    'Biotechnology',
    'Nanotechnology'
  ];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  // Modal
  showModal = false;
  showModalActions = false;
  modalTitle = '';
  modalContent = '';
  currentAction: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadSubmissions();
    this.calculateStats();
    this.applyFilters();
  }

  loadSubmissions() {
    // Sample data - Replace with actual API call
    this.submissions = [
      {
        id: '1',
        manuscriptId: 'MS-2025-001',
        title: 'Quantum Entanglement in Machine Learning: A Revolutionary Approach',
        author: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@university.edu',
        category: 'Quantum Computing',
        status: 'under-review',
        submittedDate: 'Nov 01, 2025',
        reviewers: ['Dr. Michael Chen', 'Prof. Emily Brown']
      },
      {
        id: '2',
        manuscriptId: 'MS-2025-002',
        title: 'Federated Learning for Privacy-Preserving Healthcare Analytics',
        author: 'Prof. David Lee',
        email: 'david.lee@medtech.org',
        category: 'Artificial Intelligence',
        status: 'revision',
        submittedDate: 'Oct 28, 2025',
        reviewers: ['Dr. Amanda White', 'Prof. James Wilson']
      },
      {
        id: '3',
        manuscriptId: 'MS-2025-003',
        title: 'Blockchain-Based Supply Chain Transparency Framework',
        author: 'Dr. Robert Garcia',
        email: 'r.garcia@blockchain-research.com',
        category: 'Blockchain',
        status: 'accepted',
        submittedDate: 'Oct 25, 2025',
        reviewers: ['Prof. Lisa Martinez', 'Dr. Kevin Anderson']
      },
      {
        id: '4',
        manuscriptId: 'MS-2025-004',
        title: 'Zero-Trust Security Architecture for Cloud Environments',
        author: 'Prof. Michelle Clark',
        email: 'michelle.clark@cybersec.edu',
        category: 'Cybersecurity',
        status: 'submitted',
        submittedDate: 'Nov 02, 2025',
        reviewers: []
      },
      {
        id: '5',
        manuscriptId: 'MS-2025-005',
        title: 'Deep Reinforcement Learning for Autonomous Navigation',
        author: 'Dr. Daniel Kim',
        email: 'daniel.kim@ai-lab.org',
        category: 'Machine Learning',
        status: 'under-review',
        submittedDate: 'Oct 30, 2025',
        reviewers: ['Prof. Jennifer Taylor', 'Dr. Thomas Wilson']
      },
      {
        id: '6',
        manuscriptId: 'MS-2025-006',
        title: 'Edge Computing Optimization for IoT Applications',
        author: 'Prof. Christopher Harris',
        email: 'c.harris@iot-research.edu',
        category: 'IoT',
        status: 'rejected',
        submittedDate: 'Oct 20, 2025',
        reviewers: ['Dr. Patricia Moore', 'Prof. Andrew Turner']
      },
      {
        id: '7',
        manuscriptId: 'MS-2025-007',
        title: 'CRISPR-Cas9 Gene Editing: Advances in Precision Medicine',
        author: 'Dr. Nancy Young',
        email: 'nancy.young@biotech.org',
        category: 'Biotechnology',
        status: 'published',
        submittedDate: 'Oct 15, 2025',
        reviewers: ['Prof. Maria Rodriguez', 'Dr. James Thompson']
      },
      {
        id: '8',
        manuscriptId: 'MS-2025-008',
        title: 'Natural Language Processing for Sentiment Analysis',
        author: 'Prof. Richard Brown',
        email: 'r.brown@nlp-lab.edu',
        category: 'Artificial Intelligence',
        status: 'under-review',
        submittedDate: 'Oct 27, 2025',
        reviewers: ['Dr. Susan Davis']
      },
      {
        id: '9',
        manuscriptId: 'MS-2025-009',
        title: 'Sustainable Data Centers: Green Computing Innovations',
        author: 'Dr. Lisa Anderson',
        email: 'l.anderson@green-tech.org',
        category: 'Cloud Computing',
        status: 'revision',
        submittedDate: 'Oct 22, 2025',
        reviewers: ['Prof. Michael Roberts', 'Dr. Emily Johnson']
      },
      {
        id: '10',
        manuscriptId: 'MS-2025-010',
        title: 'Neuromorphic Computing: Brain-Inspired AI Hardware',
        author: 'Prof. Kevin Martinez',
        email: 'k.martinez@ai-hardware.edu',
        category: 'Artificial Intelligence',
        status: 'submitted',
        submittedDate: 'Nov 02, 2025',
        reviewers: []
      },
      {
        id: '11',
        manuscriptId: 'MS-2025-011',
        title: 'Explainable AI in Financial Decision Making Systems',
        author: 'Dr. Amanda White',
        email: 'a.white@fintech.org',
        category: 'Machine Learning',
        status: 'accepted',
        submittedDate: 'Oct 18, 2025',
        reviewers: ['Prof. Daniel Kim', 'Dr. Jennifer Taylor']
      },
      {
        id: '12',
        manuscriptId: 'MS-2025-012',
        title: 'Quantum Cryptography for Secure Communications',
        author: 'Prof. Thomas Wilson',
        email: 't.wilson@quantum-sec.edu',
        category: 'Quantum Computing',
        status: 'under-review',
        submittedDate: 'Oct 29, 2025',
        reviewers: ['Dr. Sarah Johnson', 'Prof. David Lee']
      }
    ];

    this.totalSubmissions = this.submissions.length;
  }

  calculateStats() {
    this.pendingSubmissions = this.submissions.filter(s => s.status === 'submitted').length;
    this.underReviewSubmissions = this.submissions.filter(s => s.status === 'under-review').length;
    this.acceptedSubmissions = this.submissions.filter(s => s.status === 'accepted' || s.status === 'published').length;
    this.revisionSubmissions = this.submissions.filter(s => s.status === 'revision').length;
    this.rejectedSubmissions = this.submissions.filter(s => s.status === 'rejected').length;
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  applyFilters() {
    let filtered = [...this.submissions];

    // Status filter
    if (this.selectedStatus) {
      filtered = filtered.filter(s => s.status === this.selectedStatus);
    }

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(s => s.category === this.selectedCategory);
    }

    // Date range filter
    if (this.selectedDateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(s => {
        const subDate = new Date(s.submittedDate);
        const diffDays = Math.floor((now.getTime() - subDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (this.selectedDateRange) {
          case 'today': return diffDays === 0;
          case 'week': return diffDays <= 7;
          case 'month': return diffDays <= 30;
          case 'year': return diffDays <= 365;
          default: return true;
        }
      });
    }

    // Search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(query) ||
        s.author.toLowerCase().includes(query) ||
        s.manuscriptId.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (this.selectedSort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime());
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
    }

    // Pagination
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredSubmissions = filtered.slice(start, end);
  }

  clearFilters() {
    this.selectedStatus = '';
    this.selectedCategory = '';
    this.selectedDateRange = 'all';
    this.selectedSort = 'newest';
    this.searchQuery = '';
    this.showFilters = false;
    this.currentPage = 1;
    this.applyFilters();
  }

  // Selection methods
  isSelected(submission: Submission): boolean {
    return this.selectedSubmissions.some(s => s.id === submission.id);
  }

  toggleSelection(submission: Submission) {
    const index = this.selectedSubmissions.findIndex(s => s.id === submission.id);
    if (index > -1) {
      this.selectedSubmissions.splice(index, 1);
    } else {
      this.selectedSubmissions.push(submission);
    }
  }

  toggleSelectAll() {
    if (this.selectedSubmissions.length === this.filteredSubmissions.length) {
      this.selectedSubmissions = [];
    } else {
      this.selectedSubmissions = [...this.filteredSubmissions];
    }
  }

  // Bulk actions
  bulkAssignReviewers() {
    this.showModal = true;
    this.showModalActions = true;
    this.modalTitle = 'Assign Reviewers';
    this.modalContent = `Assign reviewers to ${this.selectedSubmissions.length} selected submissions?`;
    this.currentAction = 'assign';
  }

  bulkChangeStatus() {
    this.showModal = true;
    this.showModalActions = true;
    this.modalTitle = 'Change Status';
    this.modalContent = `Change status for ${this.selectedSubmissions.length} selected submissions?`;
    this.currentAction = 'status';
  }

  bulkDelete() {
    this.showModal = true;
    this.showModalActions = true;
    this.modalTitle = 'Delete Submissions';
    this.modalContent = `Are you sure you want to delete ${this.selectedSubmissions.length} submissions? This action cannot be undone.`;
    this.currentAction = 'delete';
  }

  // Individual actions
  viewSubmission(submission: Submission) {
    this.showModal = true;
    this.modalTitle = submission.title;
    this.modalContent = `Manuscript ID: ${submission.manuscriptId}\nAuthor: ${submission.author}\nEmail: ${submission.email}\nCategory: ${submission.category}\nStatus: ${this.getStatusLabel(submission.status)}\nSubmitted: ${submission.submittedDate}\nReviewers: ${submission.reviewers.length > 0 ? submission.reviewers.join(', ') : 'Not assigned'}`;
  }

  editSubmission(submission: Submission) {
    console.log('Editing submission:', submission.manuscriptId);
    // Navigate to edit page
    // this.router.navigate(['/editor/edit-submission', submission.id]);
  }

  downloadSubmission(submission: Submission) {
    console.log('Downloading submission:', submission.manuscriptId);
    alert(`Downloading: ${submission.title}`);
  }

  toggleDropdown(submission: Submission) {
    // Close all other dropdowns
    this.submissions.forEach(s => {
      if (s.id !== submission.id) {
        s.showDropdown = false;
      }
    });
    submission.showDropdown = !submission.showDropdown;
  }

  assignReviewers(submission: Submission) {
    submission.showDropdown = false;
    this.showModal = true;
    this.modalTitle = 'Assign Reviewers';
    this.modalContent = `Assign reviewers to "${submission.title}"`;
    console.log('Assigning reviewers to:', submission.manuscriptId);
  }

  changeStatus(submission: Submission) {
    submission.showDropdown = false;
    this.showModal = true;
    this.modalTitle = 'Change Status';
    this.modalContent = `Change status for "${submission.title}"`;
    console.log('Changing status for:', submission.manuscriptId);
  }

  sendMessage(submission: Submission) {
    submission.showDropdown = false;
    this.showModal = true;
    this.modalTitle = 'Send Message';
    this.modalContent = `Send message to ${submission.author}`;
    console.log('Sending message to:', submission.author);
  }

  viewHistory(submission: Submission) {
    submission.showDropdown = false;
    this.showModal = true;
    this.modalTitle = 'Submission History';
    this.modalContent = `History for ${submission.manuscriptId}:\n\nSubmitted: ${submission.submittedDate}\nStatus: ${this.getStatusLabel(submission.status)}`;
    console.log('Viewing history for:', submission.manuscriptId);
  }

  deleteSubmission(submission: Submission) {
    submission.showDropdown = false;
    this.showModal = true;
    this.showModalActions = true;
    this.modalTitle = 'Delete Submission';
    this.modalContent = `Are you sure you want to delete "${submission.title}"? This action cannot be undone.`;
    this.currentAction = 'delete-single';
  }

  // Utility methods
  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'submitted': 'Submitted',
      'under-review': 'Under Review',
      'revision': 'Needs Revision',
      'accepted': 'Accepted',
      'rejected': 'Rejected',
      'published': 'Published'
    };
    return labels[status] || status;
  }

  exportData() {
    console.log('Exporting data...');
    alert('Export functionality would download the data as CSV/Excel');
  }

  refreshSubmissions() {
    this.loadSubmissions();
    this.calculateStats();
    this.currentPage = 1;
    this.applyFilters();
    this.selectedSubmissions = [];
  }

  // Pagination
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilters();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    
    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1);
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push(this.currentPage - 1);
        pages.push(this.currentPage);
        pages.push(this.currentPage + 1);
        pages.push(this.totalPages);
      }
    }
    
    return pages;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.totalSubmissions ? this.totalSubmissions : end;
  }

  // Modal methods
  confirmAction() {
    switch (this.currentAction) {
      case 'assign':
        console.log('Assigning reviewers to:', this.selectedSubmissions);
        this.selectedSubmissions = [];
        break;
      case 'status':
        console.log('Changing status for:', this.selectedSubmissions);
        this.selectedSubmissions = [];
        break;
      case 'delete':
        console.log('Deleting submissions:', this.selectedSubmissions);
        this.selectedSubmissions = [];
        this.refreshSubmissions();
        break;
      case 'delete-single':
        console.log('Deleting single submission');
        this.refreshSubmissions();
        break;
    }
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.showModalActions = false;
    this.modalTitle = '';
    this.modalContent = '';
    this.currentAction = '';
  }
}