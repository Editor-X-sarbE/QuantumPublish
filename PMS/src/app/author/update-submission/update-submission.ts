import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for @if, @for, etc.
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]

@Component({
  selector: 'app-update-submission',
  standalone: true,
  imports: [CommonModule, FormsModule], // Added required modules
  templateUrl: './update-submission.html',
  styleUrl: './update-submission.scss',
})
export class UpdateSubmission {
  // 🔹 Pre-filled data model for an existing submission
  submissionData = {
    id: 'PMC-2023-0456',
    articleType: 'Research Article',
    title: 'The Impact of AI on Renewable Energy Grids',
    abstract:
      'This paper explores the integration of artificial intelligence in managing and optimizing renewable energy grids. We analyze performance data from three different AI models...',
    keywords: 'AI, Renewable Energy, Smart Grid, Optimization',
    files: [
      {
        name: 'Manuscript_v2.pdf',
        size: 4718592, // Mock size in bytes (approx 4.5 MB)
      },
      {
        name: 'Drug_med.pdf',
        size: 4713592, // Mock size in bytes (approx 4.5 MB)
      },
      {
        name: 'Figures_and_Tables.zip',
        size: 12328960, // Mock size in bytes (approx 11.8 MB)
      },
    ],
  };

  isDragging = false;
  isUpdating = false;
  isUpdateComplete = false;
  newFiles: File[] = []; // To hold newly added files separately

  /** 🔹 Triggered when files are selected from file dialog */
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      this.addFiles(Array.from(target.files));
    }
  }

  /** 🔹 Drag-over event handler */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  /** 🔹 Drag-leave event handler */
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  /** 🔹 Drop event handler */
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files?.length) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
  }

  /** 🔹 Add new files, avoiding duplicates */
  private addFiles(files: File[]): void {
    // Check against both existing and newly added files
    const existingNames = new Set([
      ...this.submissionData.files.map((f) => f.name),
      ...this.newFiles.map((f) => f.name),
    ]);
    const uniqueFiles = files.filter((file) => !existingNames.has(file.name));
    this.newFiles.push(...uniqueFiles);
  }

  /** 🔹 Remove an *existing* file from the list */
  removeExistingFile(index: number): void {
    this.submissionData.files.splice(index, 1);
  }

  /** 🔹 Remove a *newly added* file from the list */
  removeNewFile(index: number): void {
    this.newFiles.splice(index, 1);
  }

  /** 🔹 Validate required fields before submission */
  isFormValid(): boolean {
    return (
      this.submissionData.articleType.trim() !== '' &&
      this.submissionData.title.trim() !== '' &&
      this.submissionData.abstract.trim() !== '' &&
      (this.submissionData.files.length > 0 || this.newFiles.length > 0) // Must have at least one file
    );
  }

  /** 🔹 Handle form submission */
  handleSubmit(event: Event): void {
    event.preventDefault();

    if (!this.isFormValid()) {
      // You would use a modal here, but for this example, we'll use a console log
      console.error('⚠️ Please fill out all required fields before submitting.');
      return;
    }

    this.isUpdating = true;
    this.isUpdateComplete = false;
    console.log('🚀 Submitting updates...');
    console.log('Existing Data:', this.submissionData);
    console.log('New Files:', this.newFiles);

    // Simulate network request
    setTimeout(() => {
      this.isUpdating = false;
      this.isUpdateComplete = true;
      console.log('✅ Manuscript updated successfully!');

      // Reset success message after a few seconds
      setTimeout(() => (this.isUpdateComplete = false), 4000);
    }, 1500);
  }

  /** 🔹 Handle cancel */
  handleCancel(): void {
    console.log('Update cancelled. Navigating away...');
    // In a real app, you'd use Router.navigate() here
  }

  /** 🔹 Convert file size to readable format */
  getFileSize(size: number): string {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }
}