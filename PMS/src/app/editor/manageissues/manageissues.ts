import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Issue {
  id: string;
  volume: number;
  issueNumber: number;
  title: string;
  description: string;
  publicationDate: Date;
  status: 'draft' | 'inProgress' | 'published' | 'archived';
  articleCount: number;
  completionPercentage: number;
  coverImage: string;
}

interface IssueForm {
  volume: number;
  issueNumber: number;
  title: string;
  description: string;
  publicationDate: string;
  status: string;
  coverImage: string;
}

interface Statistics {
  draft: number;
  inProgress: number;
  published: number;
  totalArticles: number;
}

@Component({
  selector: 'app-manageissues',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manageissues.html',
  styleUrl: './manageissues.scss'
})
export class Manageissues implements OnInit {
  // Data
  issues: Issue[] = [];
  filteredIssues: Issue[] = [];

  // Filters
  searchTerm: string = '';
  filterStatus: string = '';
  filterYear: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;

  // Statistics
  statistics: Statistics = {
    draft: 0,
    inProgress: 0,
    published: 0,
    totalArticles: 0
  };

  // Modal states
  showIssueModal: boolean = false;
  showConfirmModal: boolean = false;
  isEditMode: boolean = false;
  activeMenuId: string | null = null;

  // Form
  issueForm: IssueForm = this.getEmptyForm();
  currentEditingIssue: Issue | null = null;

  // Confirmation
  confirmTitle: string = '';
  confirmMessage: string = '';
  confirmCallback: (() => void) | null = null;

  ngOnInit(): void {
    this.loadIssues();
    this.calculateStatistics();
    this.applyFilters();
  }

  loadIssues(): void {
    // Mock data - Replace with actual API call
    this.issues = [
      {
        id: 'ISS-001',
        volume: 5,
        issueNumber: 3,
        title: 'Special Edition on Quantum Computing',
        description: 'Exploring the latest breakthroughs in quantum algorithms, hardware, and applications across various industries.',
        publicationDate: new Date('2024-12-15'),
        status: 'inProgress',
        articleCount: 12,
        completionPercentage: 75,
        coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400'
      },
      {
        id: 'ISS-002',
        volume: 5,
        issueNumber: 2,
        title: 'Artificial Intelligence in Healthcare',
        description: 'Comprehensive analysis of AI applications in medical diagnostics, treatment planning, and patient care.',
        publicationDate: new Date('2024-09-30'),
        status: 'published',
        articleCount: 15,
        completionPercentage: 100,
        coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400'
      },
      {
        id: 'ISS-003',
        volume: 5,
        issueNumber: 1,
        title: 'Climate Science and Technology',
        description: 'Innovative solutions and research addressing climate change through advanced technology and scientific methods.',
        publicationDate: new Date('2024-06-15'),
        status: 'published',
        articleCount: 18,
        completionPercentage: 100,
        coverImage: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400'
      },
      {
        id: 'ISS-004',
        volume: 6,
        issueNumber: 1,
        title: 'Future of Space Exploration',
        description: 'Examining upcoming missions, technologies, and the potential for human colonization of other planets.',
        publicationDate: new Date('2025-03-01'),
        status: 'draft',
        articleCount: 8,
        completionPercentage: 35,
        coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400'
      },
      {
        id: 'ISS-005',
        volume: 4,
        issueNumber: 4,
        title: 'Biotechnology Innovations',
        description: 'Recent advances in genetic engineering, CRISPR technology, and personalized medicine.',
        publicationDate: new Date('2024-03-20'),
        status: 'published',
        articleCount: 14,
        completionPercentage: 100,
        coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400'
      },
      {
        id: 'ISS-006',
        volume: 4,
        issueNumber: 3,
        title: 'Renewable Energy Systems',
        description: 'Comprehensive review of solar, wind, and emerging renewable energy technologies.',
        publicationDate: new Date('2023-12-10'),
        status: 'archived',
        articleCount: 16,
        completionPercentage: 100,
        coverImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400'
      },
      {
        id: 'ISS-007',
        volume: 6,
        issueNumber: 2,
        title: 'Neural Networks and Deep Learning',
        description: 'Latest developments in neural network architectures and their applications in various domains.',
        publicationDate: new Date('2025-06-15'),
        status: 'draft',
        articleCount: 5,
        completionPercentage: 20,
        coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400'
      },
      {
        id: 'ISS-008',
        volume: 5,
        issueNumber: 4,
        title: 'Cybersecurity in the Modern Age',
        description: 'Addressing emerging threats and defense strategies in an increasingly connected world.',
        publicationDate: new Date('2025-01-20'),
        status: 'inProgress',
        articleCount: 11,
        completionPercentage: 60,
        coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400'
      }
    ];
  }

  calculateStatistics(): void {
    this.statistics = {
      draft: this.issues.filter(i => i.status === 'draft').length,
      inProgress: this.issues.filter(i => i.status === 'inProgress').length,
      published: this.issues.filter(i => i.status === 'published').length,
      totalArticles: this.issues.reduce((sum, issue) => sum + issue.articleCount, 0)
    };
  }

  applyFilters(): void {
    this.filteredIssues = this.issues.filter(issue => {
      const matchesSearch = this.searchTerm === '' ||
        issue.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        `Volume ${issue.volume}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        issue.publicationDate.getFullYear().toString().includes(this.searchTerm);

      const matchesStatus = this.filterStatus === '' || issue.status === this.filterStatus;

      const matchesYear = this.filterYear === '' || 
        issue.publicationDate.getFullYear().toString() === this.filterYear;

      return matchesSearch && matchesStatus && matchesYear;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredIssues.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredIssues = this.filteredIssues.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filterStatus = '';
    this.filterYear = '';
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return this.searchTerm !== '' || this.filterStatus !== '' || this.filterYear !== '';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      draft: 'Draft',
      inProgress: 'In Progress',
      published: 'Published',
      archived: 'Archived'
    };
    return labels[status] || status;
  }

  // Modal Management
  openCreateIssueModal(): void {
    this.isEditMode = false;
    this.issueForm = this.getEmptyForm();
    this.currentEditingIssue = null;
    this.showIssueModal = true;
  }

  closeIssueModal(): void {
    this.showIssueModal = false;
    this.issueForm = this.getEmptyForm();
    this.currentEditingIssue = null;
  }

  getEmptyForm(): IssueForm {
    return {
      volume: 1,
      issueNumber: 1,
      title: '',
      description: '',
      publicationDate: '',
      status: 'draft',
      coverImage: ''
    };
  }

  // Issue Actions
  editIssue(issue: Issue): void {
    this.isEditMode = true;
    this.currentEditingIssue = issue;
    this.issueForm = {
      volume: issue.volume,
      issueNumber: issue.issueNumber,
      title: issue.title,
      description: issue.description,
      publicationDate: issue.publicationDate.toISOString().split('T')[0],
      status: issue.status,
      coverImage: issue.coverImage
    };
    this.showIssueModal = true;
    this.activeMenuId = null;
  }

  saveIssue(): void {
    if (this.isEditMode && this.currentEditingIssue) {
      // Update existing issue
      const index = this.issues.findIndex(i => i.id === this.currentEditingIssue!.id);
      if (index !== -1) {
        this.issues[index] = {
          ...this.currentEditingIssue,
          volume: this.issueForm.volume,
          issueNumber: this.issueForm.issueNumber,
          title: this.issueForm.title,
          description: this.issueForm.description,
          publicationDate: new Date(this.issueForm.publicationDate),
          status: this.issueForm.status as any,
          coverImage: this.issueForm.coverImage || this.issues[index].coverImage
        };
      }
    } else {
      // Create new issue
      const newIssue: Issue = {
        id: `ISS-${String(this.issues.length + 1).padStart(3, '0')}`,
        volume: this.issueForm.volume,
        issueNumber: this.issueForm.issueNumber,
        title: this.issueForm.title,
        description: this.issueForm.description,
        publicationDate: new Date(this.issueForm.publicationDate),
        status: this.issueForm.status as any,
        articleCount: 0,
        completionPercentage: 0,
        coverImage: this.issueForm.coverImage || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400'
      };
      this.issues.unshift(newIssue);
    }

    this.calculateStatistics();
    this.applyFilters();
    this.closeIssueModal();
  }

  duplicateIssue(issue: Issue): void {
    const duplicatedIssue: Issue = {
      ...issue,
      id: `ISS-${String(this.issues.length + 1).padStart(3, '0')}`,
      title: `${issue.title} (Copy)`,
      status: 'draft',
      completionPercentage: 0
    };
    this.issues.unshift(duplicatedIssue);
    this.calculateStatistics();
    this.applyFilters();
    this.activeMenuId = null;
  }

  archiveIssue(issue: Issue): void {
    this.confirmTitle = 'Archive Issue';
    this.confirmMessage = `Are you sure you want to archive "${issue.title}"?`;
    this.confirmCallback = () => {
      const index = this.issues.findIndex(i => i.id === issue.id);
      if (index !== -1) {
        this.issues[index].status = 'archived';
        this.calculateStatistics();
        this.applyFilters();
      }
    };
    this.showConfirmModal = true;
    this.activeMenuId = null;
  }

  deleteIssue(issue: Issue): void {
    this.confirmTitle = 'Delete Issue';
    this.confirmMessage = `Are you sure you want to permanently delete "${issue.title}"? This action cannot be undone.`;
    this.confirmCallback = () => {
      this.issues = this.issues.filter(i => i.id !== issue.id);
      this.calculateStatistics();
      this.applyFilters();
    };
    this.showConfirmModal = true;
    this.activeMenuId = null;
  }

  publishIssue(issue: Issue): void {
    this.confirmTitle = 'Publish Issue';
    this.confirmMessage = `Are you sure you want to publish "${issue.title}"? It will be visible to all users.`;
    this.confirmCallback = () => {
      const index = this.issues.findIndex(i => i.id === issue.id);
      if (index !== -1) {
        this.issues[index].status = 'published';
        this.issues[index].completionPercentage = 100;
        this.calculateStatistics();
        this.applyFilters();
      }
    };
    this.showConfirmModal = true;
  }

  manageArticles(issue: Issue): void {
    console.log('Managing articles for:', issue);
    // Navigate to articles management page
    // this.router.navigate(['/issues', issue.id, 'articles']);
  }

  viewIssue(issue: Issue): void {
    console.log('Viewing issue:', issue);
    // Navigate to public issue view
    // this.router.navigate(['/issues', issue.id, 'view']);
  }

  toggleMenu(issueId: string): void {
    this.activeMenuId = this.activeMenuId === issueId ? null : issueId;
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.confirmCallback = null;
  }

  confirmAction(): void {
    if (this.confirmCallback) {
      this.confirmCallback();
    }
    this.closeConfirmModal();
  }
}