import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface RecommendationOption {
  value: string;
  label: string;
  description: string;
  color: string;
  icon: string;
}

interface QualityCriterion {
  name: string;
  description: string;
  rating: number;
}

@Component({
  selector: 'app-submitreview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './submitreview.html',
  styleUrl: './submitreview.scss'
})
export class Submitreview implements OnInit {
  // Paper Information
  paperTitle = 'Quantum Computing Applications in Machine Learning';
  paperAuthors = 'Dr. Sarah Johnson, Prof. Michael Chen, Dr. Emily Brown';
  paperCategory = 'Quantum Computing';
  submissionDate = 'October 28, 2025';
  dueDate = 'November 10, 2025';
  priority: 'high' | 'medium' | 'low' = 'high';
  isDueDateNear = false;

  // Form Fields
  recommendation = '';
  summary = '';
  strengths = '';
  weaknesses = '';
  detailedComments = '';
  questionsForAuthors = '';
  confidentialComments = '';

  // File Upload
  uploadedFile: File | null = null;
  isDragging = false;

  // Modal
  showModal = false;
  modalTitle = '';
  modalContent = '';
  showModalActions = false;

  // Recommendation Options
  recommendationOptions: RecommendationOption[] = [
    {
      value: 'accept',
      label: 'Accept',
      description: 'Ready for publication',
      color: '#10b981',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      value: 'minor',
      label: 'Minor Revisions',
      description: 'Small changes needed',
      color: '#3b82f6',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
    },
    {
      value: 'major',
      label: 'Major Revisions',
      description: 'Significant improvements required',
      color: '#f59e0b',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    },
    {
      value: 'reject',
      label: 'Reject',
      description: 'Not suitable for publication',
      color: '#ef4444',
      icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  // Quality Criteria
  qualityCriteria: QualityCriterion[] = [
    {
      name: 'Originality',
      description: 'Novel contribution to the field',
      rating: 0
    },
    {
      name: 'Technical Quality',
      description: 'Methodology and experimental design',
      rating: 0
    },
    {
      name: 'Clarity',
      description: 'Writing quality and presentation',
      rating: 0
    },
    {
      name: 'Relevance',
      description: 'Significance to the field',
      rating: 0
    },
    {
      name: 'Reproducibility',
      description: 'Ability to replicate results',
      rating: 0
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if due date is near (within 3 days)
    const due = new Date(this.dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.isDueDateNear = diffDays <= 3;

    // Load saved draft if exists
    this.loadDraft();
  }

  setRating(criterion: QualityCriterion, rating: number) {
    criterion.rating = rating;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.validateAndUploadFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.validateAndUploadFile(file);
    }
  }

  validateAndUploadFile(file: File) {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      this.showModal = true;
      this.modalTitle = 'Invalid File Type';
      this.modalContent = 'Please upload a PDF, DOC, or DOCX file.';
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      this.showModal = true;
      this.modalTitle = 'File Too Large';
      this.modalContent = 'File size must be less than 10MB.';
      return;
    }

    this.uploadedFile = file;
  }

  removeFile() {
    this.uploadedFile = null;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  isFormValid(): boolean {
    return !!(
      this.recommendation &&
      this.summary.trim() &&
      this.strengths.trim() &&
      this.weaknesses.trim() &&
      this.detailedComments.trim() &&
      this.qualityCriteria.every(c => c.rating > 0)
    );
  }

  saveDraft() {
    const draft = {
      recommendation: this.recommendation,
      summary: this.summary,
      strengths: this.strengths,
      weaknesses: this.weaknesses,
      detailedComments: this.detailedComments,
      questionsForAuthors: this.questionsForAuthors,
      confidentialComments: this.confidentialComments,
      qualityCriteria: this.qualityCriteria,
      uploadedFileName: this.uploadedFile?.name || null
    };

    // Save to localStorage or backend
    localStorage.setItem('reviewDraft', JSON.stringify(draft));

    this.showModal = true;
    this.modalTitle = 'Draft Saved';
    this.modalContent = 'Your review has been saved as a draft. You can continue editing it later.';
  }

  loadDraft() {
    const draftStr = localStorage.getItem('reviewDraft');
    if (draftStr) {
      try {
        const draft = JSON.parse(draftStr);
        this.recommendation = draft.recommendation || '';
        this.summary = draft.summary || '';
        this.strengths = draft.strengths || '';
        this.weaknesses = draft.weaknesses || '';
        this.detailedComments = draft.detailedComments || '';
        this.questionsForAuthors = draft.questionsForAuthors || '';
        this.confidentialComments = draft.confidentialComments || '';
        if (draft.qualityCriteria) {
          this.qualityCriteria = draft.qualityCriteria;
        }
      } catch (e) {
        console.error('Error loading draft:', e);
      }
    }
  }

  previewReview() {
    const selectedOption = this.recommendationOptions.find(o => o.value === this.recommendation);
    
    this.modalTitle = 'Review Preview';
    this.modalContent = `
Recommendation: ${selectedOption?.label || 'Not selected'}

Quality Ratings:
${this.qualityCriteria.map(c => `${c.name}: ${c.rating}/5`).join('\n')}

Summary:
${this.summary || 'Not provided'}

Strengths:
${this.strengths || 'Not provided'}

Weaknesses:
${this.weaknesses || 'Not provided'}

Detailed Comments:
${this.detailedComments || 'Not provided'}

${this.questionsForAuthors ? `Questions for Authors:\n${this.questionsForAuthors}` : ''}

${this.uploadedFile ? `Attached File: ${this.uploadedFile.name}` : 'No file attached'}
    `;
    this.showModal = true;
  }

  submitReview() {
    if (!this.isFormValid()) {
      this.showModal = true;
      this.modalTitle = 'Incomplete Form';
      this.modalContent = 'Please fill in all required fields before submitting.';
      return;
    }

    this.showModal = true;
    this.showModalActions = true;
    this.modalTitle = 'Confirm Submission';
    this.modalContent = 'Are you sure you want to submit this review? Once submitted, you cannot edit it.';
  }

  confirmSubmit() {
    // Prepare review data
    const reviewData = {
      paperId: '1', // Would come from route params
      recommendation: this.recommendation,
      summary: this.summary,
      strengths: this.strengths,
      weaknesses: this.weaknesses,
      detailedComments: this.detailedComments,
      questionsForAuthors: this.questionsForAuthors,
      confidentialComments: this.confidentialComments,
      qualityCriteria: this.qualityCriteria,
      uploadedFile: this.uploadedFile
    };

    // In real application, send to backend
    console.log('Submitting review:', reviewData);

    // Clear draft
    localStorage.removeItem('reviewDraft');

    // Show success message
    this.showModalActions = false;
    this.modalTitle = 'Review Submitted';
    this.modalContent = 'Your review has been successfully submitted. Thank you for your contribution!';

    // Redirect after 2 seconds
    setTimeout(() => {
      this.closeModal();
      this.router.navigate(['/assignedreview']);
    }, 2000);
  }

  downloadPaper() {
    this.showModal = true;
    this.modalTitle = 'Downloading Paper';
    this.modalContent = 'The paper is being downloaded...';

    // In real application, trigger actual download
    setTimeout(() => {
      this.closeModal();
    }, 1500);
  }

  goBack() {
    this.router.navigate(['/assignedreview']);
  }

  closeModal() {
    this.showModal = false;
    this.showModalActions = false;
    this.modalTitle = '';
    this.modalContent = '';
  }
}