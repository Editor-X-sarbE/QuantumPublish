import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Manuscript {
  id: string;
  manuscriptId: string;
  title: string;
  category: string;
  submittedDate: string;
  priority: 'high' | 'medium' | 'low';
  assignedReviewers: string[];
  requiredReviewers: number;
}

interface Reviewer {
  id: string;
  name: string;
  title: string;
  expertise: string;
  avatar: string;
  availability: 'available' | 'limited' | 'unavailable';
  completedReviews: number;
  avgResponseDays: number;
  matchScore?: number;
}

@Component({
  selector: 'app-assignreviewers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignreviewers.html',
  styleUrl: './assignreviewers.scss'
})
export class Assignreviewers implements OnInit {
  // Stats
  pendingAssignments = 0;
  assignedManuscripts = 0;
  availableReviewers = 0;
  avgResponseTime = 0;

  // Manuscripts data
  manuscripts: Manuscript[] = [];
  filteredManuscripts: Manuscript[] = [];
  selectedManuscript: Manuscript | null = null;

  // Reviewers data
  reviewers: Reviewer[] = [];
  filteredReviewers: Reviewer[] = [];

  // Filters
  selectedFilter: 'all' | 'urgent' | 'unassigned' = 'all';
  manuscriptSearch = '';
  reviewerSearch = '';
  expertiseFilter = '';
  availabilityFilter = 'all';

  // Expertise areas
  expertiseAreas: string[] = [
    'Quantum Computing',
    'Artificial Intelligence',
    'Machine Learning',
    'Blockchain',
    'Cybersecurity',
    'Biotechnology'
  ];

  // Modal
  showModal = false;
  showModalActions = false;
  modalTitle = '';
  modalContent = '';

  ngOnInit() {
    this.loadManuscripts();
    this.loadReviewers();
    this.calculateStats();
    this.filterManuscripts();
  }

  loadManuscripts() {
    this.manuscripts = [
      {
        id: '1',
        manuscriptId: 'MS-2025-001',
        title: 'Quantum Entanglement in Machine Learning: A Revolutionary Approach',
        category: 'Quantum Computing',
        submittedDate: 'Nov 01, 2025',
        priority: 'high',
        assignedReviewers: [],
        requiredReviewers: 3
      },
      {
        id: '2',
        manuscriptId: 'MS-2025-002',
        title: 'Federated Learning for Privacy-Preserving Healthcare Analytics',
        category: 'Artificial Intelligence',
        submittedDate: 'Oct 30, 2025',
        priority: 'high',
        assignedReviewers: ['1'],
        requiredReviewers: 3
      },
      {
        id: '3',
        manuscriptId: 'MS-2025-003',
        title: 'Blockchain-Based Supply Chain Transparency Framework',
        category: 'Blockchain',
        submittedDate: 'Oct 28, 2025',
        priority: 'medium',
        assignedReviewers: ['2', '3'],
        requiredReviewers: 2
      },
      {
        id: '4',
        manuscriptId: 'MS-2025-004',
        title: 'Zero-Trust Security Architecture for Cloud Environments',
        category: 'Cybersecurity',
        submittedDate: 'Oct 25, 2025',
        priority: 'medium',
        assignedReviewers: [],
        requiredReviewers: 2
      },
      {
        id: '5',
        manuscriptId: 'MS-2025-005',
        title: 'Deep Reinforcement Learning for Autonomous Navigation',
        category: 'Machine Learning',
        submittedDate: 'Nov 02, 2025',
        priority: 'high',
        assignedReviewers: [],
        requiredReviewers: 3
      },
      {
        id: '6',
        manuscriptId: 'MS-2025-006',
        title: 'CRISPR-Cas9 Gene Editing: Advances in Precision Medicine',
        category: 'Biotechnology',
        submittedDate: 'Oct 27, 2025',
        priority: 'low',
        assignedReviewers: ['4'],
        requiredReviewers: 3
      }
    ];
  }

  loadReviewers() {
    this.reviewers = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        title: 'Professor of Computer Science',
        expertise: 'Quantum Computing',
        avatar: 'https://i.pravatar.cc/150?img=1',
        availability: 'available',
        completedReviews: 47,
        avgResponseDays: 12,
        matchScore: 95
      },
      {
        id: '2',
        name: 'Prof. Michael Chen',
        title: 'Senior Researcher',
        expertise: 'Artificial Intelligence',
        avatar: 'https://i.pravatar.cc/150?img=12',
        availability: 'available',
        completedReviews: 63,
        avgResponseDays: 10,
        matchScore: 92
      },
      {
        id: '3',
        name: 'Dr. Emily Brown',
        title: 'Associate Professor',
        expertise: 'Machine Learning',
        avatar: 'https://i.pravatar.cc/150?img=5',
        availability: 'limited',
        completedReviews: 38,
        avgResponseDays: 15,
        matchScore: 88
      },
      {
        id: '4',
        name: 'Prof. David Lee',
        title: 'Department Head',
        expertise: 'Blockchain',
        avatar: 'https://i.pravatar.cc/150?img=13',
        availability: 'available',
        completedReviews: 52,
        avgResponseDays: 8,
        matchScore: 90
      },
      {
        id: '5',
        name: 'Dr. Amanda White',
        title: 'Research Scientist',
        expertise: 'Cybersecurity',
        avatar: 'https://i.pravatar.cc/150?img=9',
        availability: 'available',
        completedReviews: 41,
        avgResponseDays: 11,
        matchScore: 87
      },
      {
        id: '6',
        name: 'Prof. James Wilson',
        title: 'Professor Emeritus',
        expertise: 'Artificial Intelligence',
        avatar: 'https://i.pravatar.cc/150?img=14',
        availability: 'limited',
        completedReviews: 89,
        avgResponseDays: 18,
        matchScore: 85
      },
      {
        id: '7',
        name: 'Dr. Robert Garcia',
        title: 'Senior Lecturer',
        expertise: 'Machine Learning',
        avatar: 'https://i.pravatar.cc/150?img=15',
        availability: 'available',
        completedReviews: 34,
        avgResponseDays: 9,
        matchScore: 91
      },
      {
        id: '8',
        name: 'Prof. Lisa Martinez',
        title: 'Research Director',
        expertise: 'Biotechnology',
        avatar: 'https://i.pravatar.cc/150?img=10',
        availability: 'available',
        completedReviews: 56,
        avgResponseDays: 13,
        matchScore: 93
      },
      {
        id: '9',
        name: 'Dr. Kevin Anderson',
        title: 'Assistant Professor',
        expertise: 'Quantum Computing',
        avatar: 'https://i.pravatar.cc/150?img=16',
        availability: 'available',
        completedReviews: 28,
        avgResponseDays: 14,
        matchScore: 89
      },
      {
        id: '10',
        name: 'Prof. Michelle Clark',
        title: 'Chief Scientist',
        expertise: 'Cybersecurity',
        avatar: 'https://i.pravatar.cc/150?img=20',
        availability: 'limited',
        completedReviews: 71,
        avgResponseDays: 16,
        matchScore: 86
      }
    ];
  }

  calculateStats() {
    this.pendingAssignments = this.manuscripts.filter(m => 
      m.assignedReviewers.length < m.requiredReviewers
    ).length;

    this.assignedManuscripts = this.manuscripts.filter(m => 
      m.assignedReviewers.length >= m.requiredReviewers
    ).length;

    this.availableReviewers = this.reviewers.filter(r => 
      r.availability === 'available'
    ).length;

    const totalDays = this.reviewers.reduce((sum, r) => sum + r.avgResponseDays, 0);
    this.avgResponseTime = Math.round(totalDays / this.reviewers.length);
  }

  // Manuscript filtering
  filterByStatus(status: 'all' | 'urgent' | 'unassigned') {
    this.selectedFilter = status;
    this.filterManuscripts();
  }

  filterManuscripts() {
    let filtered = [...this.manuscripts];

    // Filter by status
    if (this.selectedFilter === 'urgent') {
      filtered = filtered.filter(m => m.priority === 'high');
    } else if (this.selectedFilter === 'unassigned') {
      filtered = filtered.filter(m => m.assignedReviewers.length === 0);
    }

    // Search filter
    if (this.manuscriptSearch) {
      const query = this.manuscriptSearch.toLowerCase();
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(query) ||
        m.manuscriptId.toLowerCase().includes(query) ||
        m.category.toLowerCase().includes(query)
      );
    }

    this.filteredManuscripts = filtered;
  }

  selectManuscript(manuscript: Manuscript) {
    this.selectedManuscript = manuscript;
    this.updateReviewerMatchScores();
    this.filterReviewers();
  }

  updateReviewerMatchScores() {
    if (!this.selectedManuscript) return;

    // Calculate match scores based on category and availability
    this.reviewers.forEach(reviewer => {
      let score = 70; // Base score

      // Expertise match
      if (reviewer.expertise === this.selectedManuscript!.category) {
        score += 20;
      }

      // Availability bonus
      if (reviewer.availability === 'available') {
        score += 10;
      } else if (reviewer.availability === 'limited') {
        score += 5;
      }

      // Experience factor
      if (reviewer.completedReviews > 50) {
        score += 5;
      }

      // Response time factor
      if (reviewer.avgResponseDays < 10) {
        score += 5;
      }

      reviewer.matchScore = Math.min(score, 100);
    });

    // Sort by match score
    this.reviewers.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }

  // Reviewer filtering
  filterReviewers() {
    if (!this.selectedManuscript) {
      this.filteredReviewers = [];
      return;
    }

    let filtered = [...this.reviewers];

    // Search filter
    if (this.reviewerSearch) {
      const query = this.reviewerSearch.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(query) ||
        r.expertise.toLowerCase().includes(query) ||
        r.title.toLowerCase().includes(query)
      );
    }

    // Expertise filter
    if (this.expertiseFilter) {
      filtered = filtered.filter(r => r.expertise === this.expertiseFilter);
    }

    // Availability filter
    if (this.availabilityFilter !== 'all') {
      filtered = filtered.filter(r => r.availability === this.availabilityFilter);
    }

    this.filteredReviewers = filtered;
  }

  // Reviewer assignment
  isReviewerAssigned(reviewerId: string): boolean {
    return this.selectedManuscript?.assignedReviewers.includes(reviewerId) || false;
  }

  canAssignMore(): boolean {
    if (!this.selectedManuscript) return false;
    return this.selectedManuscript.assignedReviewers.length < this.selectedManuscript.requiredReviewers;
  }

  assignReviewer(reviewerId: string) {
    if (!this.selectedManuscript || !this.canAssignMore()) return;

    if (!this.selectedManuscript.assignedReviewers.includes(reviewerId)) {
      this.selectedManuscript.assignedReviewers.push(reviewerId);
      
      // Update the manuscript in the array
      const index = this.manuscripts.findIndex(m => m.id === this.selectedManuscript!.id);
      if (index !== -1) {
        this.manuscripts[index] = { ...this.selectedManuscript };
      }

      this.calculateStats();
    }
  }

  removeReviewer(reviewerId: string) {
    if (!this.selectedManuscript) return;

    const index = this.selectedManuscript.assignedReviewers.indexOf(reviewerId);
    if (index > -1) {
      this.selectedManuscript.assignedReviewers.splice(index, 1);
      
      // Update the manuscript in the array
      const mIndex = this.manuscripts.findIndex(m => m.id === this.selectedManuscript!.id);
      if (mIndex !== -1) {
        this.manuscripts[mIndex] = { ...this.selectedManuscript };
      }

      this.calculateStats();
    }
  }

  getReviewerById(reviewerId: string): Reviewer | undefined {
    return this.reviewers.find(r => r.id === reviewerId);
  }

  // Actions
  saveAssignments() {
    if (!this.selectedManuscript) return;

    this.showModal = true;
    this.showModalActions = true;
    this.modalTitle = 'Confirm Assignment';
    this.modalContent = `Send review invitations to ${this.selectedManuscript.assignedReviewers.length} reviewer(s) for:\n\n"${this.selectedManuscript.title}"\n\nReviewers will receive email notifications with review instructions.`;
  }

  confirmAction() {
    console.log('Assignments saved and notifications sent');
    this.closeModal();
    
    // Show success message
    this.showModal = true;
    this.modalTitle = 'Success';
    this.modalContent = 'Reviewers have been assigned and notified successfully!';
    
    setTimeout(() => {
      this.closeModal();
      this.selectedManuscript = null;
      this.calculateStats();
      this.filterManuscripts();
    }, 2000);
  }

  cancelAssignment() {
    this.selectedManuscript = null;
    this.reviewerSearch = '';
    this.expertiseFilter = '';
    this.availabilityFilter = 'all';
  }

  autoAssign() {
    this.showModal = true;
    this.showModalActions = true;
    this.modalTitle = 'Auto-Assign Reviewers';
    this.modalContent = 'Automatically assign the best-matched reviewers to manuscripts based on expertise and availability?\n\nThis will assign reviewers to all manuscripts with incomplete assignments.';
  }

  showReviewerPool() {
    this.showModal = true;
    this.modalTitle = 'Reviewer Pool';
    this.modalContent = `Total Reviewers: ${this.reviewers.length}\nAvailable: ${this.availableReviewers}\nLimited Availability: ${this.reviewers.filter(r => r.availability === 'limited').length}\n\nExpertise Distribution:\n${this.expertiseAreas.map(e => `- ${e}: ${this.reviewers.filter(r => r.expertise === e).length}`).join('\n')}`;
  }

  closeModal() {
    this.showModal = false;
    this.showModalActions = false;
    this.modalTitle = '';
    this.modalContent = '';
  }
}