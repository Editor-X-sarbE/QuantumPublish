import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Decision {
  id: string;
  title: string;
  author: string;
  category: string;
  submissionDate: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'revision';
  urgent: boolean;
  reviewerComments?: string;
}

interface Stats {
  pending: number;
  accepted: number;
  rejected: number;
  revision: number;
}

@Component({
  selector: 'app-decisions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './decisions.html',
  styleUrl: './decisions.scss'
})
export class Decisions implements OnInit {
  // Data properties
  decisions: Decision[] = [];
  filteredDecisions: Decision[] = [];
  
  // Filter properties
  searchTerm: string = '';
  selectedStatus: string = '';
  selectedCategory: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  
  // Statistics
  stats: Stats = {
    pending: 0,
    accepted: 0,
    rejected: 0,
    revision: 0
  };
  
  // Modal properties
  showDecisionModal: boolean = false;
  selectedDecision: Decision | null = null;
  decisionType: string = 'accepted';
  decisionComments: string = '';

  ngOnInit(): void {
    this.loadDecisions();
    this.calculateStats();
  }

  loadDecisions(): void {
    // Mock data - Replace with actual API call
    this.decisions = [
      {
        id: 'QP-2024-001',
        title: 'Quantum Entanglement in Multi-Particle Systems: A Comprehensive Study',
        author: 'Dr. Sarah Mitchell',
        category: 'quantum',
        submissionDate: new Date('2024-10-15'),
        status: 'pending',
        urgent: true
      },
      {
        id: 'AI-2024-023',
        title: 'Deep Learning Approaches for Natural Language Understanding',
        author: 'Prof. James Chen',
        category: 'ai',
        submissionDate: new Date('2024-10-20'),
        status: 'revision',
        urgent: false
      },
      {
        id: 'BT-2024-012',
        title: 'CRISPR-Cas9 Applications in Gene Therapy',
        author: 'Dr. Emily Rodriguez',
        category: 'biotech',
        submissionDate: new Date('2024-10-18'),
        status: 'pending',
        urgent: true
      },
      {
        id: 'SP-2024-008',
        title: 'Exoplanet Detection Using Advanced Spectroscopy',
        author: 'Dr. Michael Foster',
        category: 'space',
        submissionDate: new Date('2024-10-12'),
        status: 'accepted',
        urgent: false
      },
      {
        id: 'QP-2024-002',
        title: 'Quantum Computing Algorithms for Optimization Problems',
        author: 'Dr. Anna Kowalski',
        category: 'quantum',
        submissionDate: new Date('2024-10-22'),
        status: 'pending',
        urgent: false
      },
      {
        id: 'AI-2024-024',
        title: 'Reinforcement Learning in Autonomous Vehicle Systems',
        author: 'Prof. David Park',
        category: 'ai',
        submissionDate: new Date('2024-10-10'),
        status: 'rejected',
        urgent: false
      },
      {
        id: 'BT-2024-013',
        title: 'Stem Cell Research: Recent Advances and Future Directions',
        author: 'Dr. Lisa Wang',
        category: 'biotech',
        submissionDate: new Date('2024-10-19'),
        status: 'revision',
        urgent: false
      },
      {
        id: 'SP-2024-009',
        title: 'Mars Colonization: Technological and Biological Challenges',
        author: 'Dr. Robert Turner',
        category: 'space',
        submissionDate: new Date('2024-10-21'),
        status: 'pending',
        urgent: true
      },
      {
        id: 'QP-2024-003',
        title: 'Topological Quantum Computing: Theory and Practice',
        author: 'Prof. Maria Garcia',
        category: 'quantum',
        submissionDate: new Date('2024-10-16'),
        status: 'accepted',
        urgent: false
      },
      {
        id: 'AI-2024-025',
        title: 'Explainable AI: Bridging the Gap Between Models and Users',
        author: 'Dr. Thomas Brown',
        category: 'ai',
        submissionDate: new Date('2024-10-14'),
        status: 'revision',
        urgent: false
      }
    ];
    
    this.filteredDecisions = [...this.decisions];
    this.updatePagination();
  }

  calculateStats(): void {
    this.stats = {
      pending: this.decisions.filter(d => d.status === 'pending').length,
      accepted: this.decisions.filter(d => d.status === 'accepted').length,
      rejected: this.decisions.filter(d => d.status === 'rejected').length,
      revision: this.decisions.filter(d => d.status === 'revision').length
    };
  }

  filterDecisions(): void {
    this.filteredDecisions = this.decisions.filter(decision => {
      const matchesSearch = this.searchTerm === '' || 
        decision.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        decision.author.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.selectedStatus === '' || 
        decision.status === this.selectedStatus;
      
      const matchesCategory = this.selectedCategory === '' || 
        decision.category === this.selectedCategory;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
    
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredDecisions.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredDecisions = this.filteredDecisions.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterDecisions();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterDecisions();
    }
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'pending': 'Pending Decision',
      'accepted': 'Accepted',
      'rejected': 'Rejected',
      'revision': 'Revision Required'
    };
    return labels[status] || status;
  }

  viewDetails(decision: Decision): void {
    console.log('Viewing details for:', decision);
    // Navigate to detail view or open detailed modal
    // this.router.navigate(['/decisions', decision.id]);
  }

  makeDecision(decision: Decision): void {
    this.selectedDecision = decision;
    this.decisionType = 'accepted';
    this.decisionComments = '';
    this.showDecisionModal = true;
  }

  closeModal(): void {
    this.showDecisionModal = false;
    this.selectedDecision = null;
    this.decisionComments = '';
  }

  submitDecision(): void {
    if (!this.selectedDecision) return;
    
    console.log('Submitting decision:', {
      decision: this.selectedDecision,
      type: this.decisionType,
      comments: this.decisionComments
    });
    
    // Update the decision status
    const index = this.decisions.findIndex(d => d.id === this.selectedDecision!.id);
    if (index !== -1) {
      this.decisions[index].status = this.decisionType as any;
    }
    
    // Recalculate stats
    this.calculateStats();
    
    // Reapply filters
    this.filterDecisions();
    
    // Close modal
    this.closeModal();
    
    // Show success message (you can use a toast/notification service)
    alert('Decision submitted successfully!');
    
    // In a real application, you would make an API call here:
    // this.decisionService.submitDecision(this.selectedDecision.id, {
    //   type: this.decisionType,
    //   comments: this.decisionComments
    // }).subscribe(response => {
    //   // Handle success
    // });
  }
}
