import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Submission {
  id: string;
  title: string;
  author: string;
  submittedDate: Date;
  category: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  priority: 'high' | 'medium' | 'low';
}

interface PendingAction {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'urgent' | 'normal';
}

interface ChartBar {
  label: string;
  value: number;
  percentage: number;
  type: string;
}

interface Reviewer {
  id: string;
  name: string;
  reviewsCompleted: number;
  avgTime: number;
  rating: number;
  avatarColor: string;
}

interface Deadline {
  id: string;
  title: string;
  description: string;
  date: Date;
  urgency: 'urgent' | 'soon' | 'normal';
}

interface StatData {
  count: number;
  trend: number;
}

interface Statistics {
  pending: StatData;
  underReview: StatData;
  accepted: StatData;
  revision: StatData;
}

interface QuickStats {
  avgReviewTime: number;
  acceptanceRate: number;
  activeReviewers: number;
  totalSubmissions: number;
}

@Component({
  selector: 'app-dasboardeditor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dasboardeditor.html',
  styleUrl: './dasboardeditor.scss'
})
export class Dasboardeditor implements OnInit {
  // User info
  editorName: string = 'Dr. Sarah Johnson';
  currentDate: Date = new Date();

  // Statistics
  stats: Statistics = {
    pending: { count: 23, trend: 15 },
    underReview: { count: 18, trend: -5 },
    accepted: { count: 12, trend: 8 },
    revision: { count: 7, trend: 0 }
  };

  // Recent Submissions
  recentSubmissions: Submission[] = [];

  // Pending Actions
  pendingActions: PendingAction[] = [];

  // Chart Data
  chartPeriod: string = 'week';
  chartData: ChartBar[] = [];

  // Top Reviewers
  topReviewers: Reviewer[] = [];

  // Upcoming Deadlines
  upcomingDeadlines: Deadline[] = [];

  // Quick Stats
  quickStats: QuickStats = {
    avgReviewTime: 14,
    acceptanceRate: 42,
    activeReviewers: 25,
    totalSubmissions: 156
  };

  // For accessing Math in template
  Math = Math;

  ngOnInit(): void {
    this.loadRecentSubmissions();
    this.loadPendingActions();
    this.loadTopReviewers();
    this.loadUpcomingDeadlines();
    this.updateChart();
  }

  loadRecentSubmissions(): void {
    this.recentSubmissions = [
      {
        id: 'SUB-2024-156',
        title: 'Quantum Entanglement in Multi-Particle Systems',
        author: 'Dr. Michael Chen',
        submittedDate: new Date('2024-11-01'),
        category: 'quantum',
        status: 'pending',
        priority: 'high'
      },
      {
        id: 'SUB-2024-155',
        title: 'Machine Learning Applications in Drug Discovery',
        author: 'Prof. Emily Rodriguez',
        submittedDate: new Date('2024-10-30'),
        category: 'ai',
        status: 'reviewing',
        priority: 'medium'
      },
      {
        id: 'SUB-2024-154',
        title: 'CRISPR Technology Advances in Gene Therapy',
        author: 'Dr. James Wilson',
        submittedDate: new Date('2024-10-28'),
        category: 'biotech',
        status: 'reviewing',
        priority: 'high'
      },
      {
        id: 'SUB-2024-153',
        title: 'Exoplanet Detection Using Advanced Spectroscopy',
        author: 'Dr. Lisa Kumar',
        submittedDate: new Date('2024-10-27'),
        category: 'space',
        status: 'accepted',
        priority: 'low'
      },
      {
        id: 'SUB-2024-152',
        title: 'Deep Learning for Climate Prediction Models',
        author: 'Prof. Robert Taylor',
        submittedDate: new Date('2024-10-25'),
        category: 'ai',
        status: 'pending',
        priority: 'medium'
      }
    ];
  }

  loadPendingActions(): void {
    this.pendingActions = [
      {
        id: 'ACT-001',
        title: 'Assign Reviewer',
        description: 'Quantum Entanglement paper needs reviewer assignment',
        dueDate: new Date('2024-11-05'),
        priority: 'urgent'
      },
      {
        id: 'ACT-002',
        title: 'Review Decision',
        description: 'Final decision needed for CRISPR Technology paper',
        dueDate: new Date('2024-11-06'),
        priority: 'urgent'
      },
      {
        id: 'ACT-003',
        title: 'Author Revision',
        description: 'Request revisions for Machine Learning paper',
        dueDate: new Date('2024-11-08'),
        priority: 'normal'
      },
      {
        id: 'ACT-004',
        title: 'Quality Check',
        description: 'Final quality check for accepted articles',
        dueDate: new Date('2024-11-10'),
        priority: 'normal'
      }
    ];
  }

  loadTopReviewers(): void {
    const colors = ['#667eea', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];
    
    this.topReviewers = [
      {
        id: 'REV-001',
        name: 'Dr. Amanda Stevens',
        reviewsCompleted: 45,
        avgTime: 12,
        rating: 4.9,
        avatarColor: colors[0]
      },
      {
        id: 'REV-002',
        name: 'Prof. David Martinez',
        reviewsCompleted: 38,
        avgTime: 14,
        rating: 4.8,
        avatarColor: colors[1]
      },
      {
        id: 'REV-003',
        name: 'Dr. Rachel Kim',
        reviewsCompleted: 36,
        avgTime: 13,
        rating: 4.7,
        avatarColor: colors[2]
      },
      {
        id: 'REV-004',
        name: 'Prof. Thomas Wright',
        reviewsCompleted: 32,
        avgTime: 15,
        rating: 4.6,
        avatarColor: colors[3]
      },
      {
        id: 'REV-005',
        name: 'Dr. Sophie Anderson',
        reviewsCompleted: 29,
        avgTime: 16,
        rating: 4.5,
        avatarColor: colors[4]
      }
    ];
  }

  loadUpcomingDeadlines(): void {
    this.upcomingDeadlines = [
      {
        id: 'DL-001',
        title: 'Volume 6, Issue 1',
        description: 'Final submission deadline',
        date: new Date('2024-11-15'),
        urgency: 'urgent'
      },
      {
        id: 'DL-002',
        title: 'Special Edition',
        description: 'Quantum Computing special edition deadline',
        date: new Date('2024-11-22'),
        urgency: 'soon'
      },
      {
        id: 'DL-003',
        title: 'Annual Review',
        description: 'Annual editorial review meeting',
        date: new Date('2024-12-01'),
        urgency: 'normal'
      },
      {
        id: 'DL-004',
        title: 'Reviewer Workshop',
        description: 'Quarterly reviewer training session',
        date: new Date('2024-12-10'),
        urgency: 'normal'
      }
    ];
  }

  updateChart(): void {
    // Generate chart data based on selected period
    const data = this.getChartData(this.chartPeriod);
    const maxValue = Math.max(...data.map(d => d.value));

    this.chartData = data.map(item => ({
      ...item,
      percentage: (item.value / maxValue) * 100
    }));
  }

  getChartData(period: string): ChartBar[] {
    // Mock data - would normally come from API based on period
    const weekData = [
      { label: 'Mon', value: 15, percentage: 0, type: 'pending' },
      { label: 'Tue', value: 23, percentage: 0, type: 'reviewing' },
      { label: 'Wed', value: 18, percentage: 0, type: 'accepted' },
      { label: 'Thu', value: 12, percentage: 0, type: 'pending' },
      { label: 'Fri', value: 28, percentage: 0, type: 'reviewing' },
      { label: 'Sat', value: 8, percentage: 0, type: 'accepted' },
      { label: 'Sun', value: 5, percentage: 0, type: 'rejected' }
    ];

    const monthData = [
      { label: 'Week 1', value: 45, percentage: 0, type: 'pending' },
      { label: 'Week 2', value: 52, percentage: 0, type: 'reviewing' },
      { label: 'Week 3', value: 38, percentage: 0, type: 'accepted' },
      { label: 'Week 4', value: 41, percentage: 0, type: 'reviewing' }
    ];

    const quarterData = [
      { label: 'Month 1', value: 120, percentage: 0, type: 'pending' },
      { label: 'Month 2', value: 145, percentage: 0, type: 'reviewing' },
      { label: 'Month 3', value: 98, percentage: 0, type: 'accepted' }
    ];

    switch (period) {
      case 'week':
        return weekData;
      case 'month':
        return monthData;
      case 'quarter':
        return quarterData;
      default:
        return weekData;
    }
  }

  // Action Methods
  navigateToSubmissions(): void {
    console.log('Navigating to submissions');
    // this.router.navigate(['/editor/submissions']);
  }

  assignReviewer(): void {
    console.log('Opening assign reviewer modal');
    // Open modal or navigate to reviewer assignment
  }

  viewAllSubmissions(): void {
    console.log('Viewing all submissions');
    // this.router.navigate(['/editor/submissions']);
  }

  viewSubmission(submission: Submission): void {
    console.log('Viewing submission:', submission);
    // this.router.navigate(['/editor/submissions', submission.id]);
  }

  completeAction(action: PendingAction): void {
    console.log('Completing action:', action);
    
    // Remove from pending actions
    this.pendingActions = this.pendingActions.filter(a => a.id !== action.id);
    
    // In real app, make API call
    // this.actionService.complete(action.id).subscribe();
  }

  viewAllReviewers(): void {
    console.log('Viewing all reviewers');
    // this.router.navigate(['/editor/reviewers']);
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      pending: 'Pending',
      reviewing: 'Under Review',
      accepted: 'Accepted',
      rejected: 'Rejected'
    };
    return labels[status] || status;
  }

  // Utility method to format numbers
  formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
}