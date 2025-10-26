import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for @for and [class]

@Component({
  selector: 'app-revision-management',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './revision-management.html',
  styleUrl: './revision-management.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionManagement {
  // Mock data for the "Action Required" card
  actionRequiredPaper = {
    id: 'PMC-2023-0456',
    title: 'The Impact of AI on Renewable Energy Grids',
    decision: 'Minor Revisions',
    dueDate: 'November 15, 2025',
  };

  // Mock data for the "Revision History" list
  revisionHistory = [
    {
      id: 'PMC-2023-0112',
      title: 'Data-Driven Approaches to Climate Modeling',
      status: 'Revision Submitted',
      date: 'Oct 20, 2025',
      statusClass: 'pending',
    },
    {
      id: 'PMC-2022-0987',
      title: 'Advanced Photovoltaic Materials',
      status: 'Accepted',
      date: 'Sep 05, 2025',
      statusClass: 'accepted',
    },
    {
      id: 'PMC-2022-0750',
      title: 'Quantum Computing in Drug Discovery',
      status: 'Rejected',
      date: 'Aug 12, 2025',
      statusClass: 'rejected',
    },
  ];

  constructor() {
    // In a real app, you would fetch this data from a service
  }
}