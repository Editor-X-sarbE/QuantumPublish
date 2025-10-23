import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-submission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './submission.html',
  styleUrls: ['./submission.scss'],
})
export class SubmissionComponent {
  // 🔹 Data model for form
  submissionData = {
    articleType: '',
    title: '',
    abstract: '',
    keywords: '',
    files: [] as File[],
  };

  isDragging = false;
  isSubmitted = false;

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
  private addFiles(newFiles: File[]): void {
    const existingNames = new Set(this.submissionData.files.map(f => f.name));
    const uniqueFiles = newFiles.filter(file => !existingNames.has(file.name));
    this.submissionData.files.push(...uniqueFiles);
  }

  /** 🔹 Remove a file from the list */
  removeFile(index: number): void {
    this.submissionData.files.splice(index, 1);
  }

  /** 🔹 Validate required fields before submission */
  isFormValid(): boolean {
    return (
      this.submissionData.articleType.trim() !== '' &&
      this.submissionData.title.trim() !== '' &&
      this.submissionData.abstract.trim() !== ''
    );
  }

  /** 🔹 Handle form submission */
  handleSubmit(event: Event): void {
    event.preventDefault();

    if (!this.isFormValid()) {
      alert('⚠️ Please fill out all required fields before submitting.');
      return;
    }

    this.isSubmitted = true;
    console.log('✅ Manuscript submitted successfully!');
    console.log('Form Data:', this.submissionData);

    setTimeout(() => {
      alert('🎉 Your manuscript has been successfully submitted!');
      this.resetForm();
    }, 1200);
  }

  /** 🔹 Reset the form */
  resetForm(): void {
    this.submissionData = {
      articleType: '',
      title: '',
      abstract: '',
      keywords: '',
      files: [],
    };
    this.isSubmitted = false;
  }

  /** 🔹 Convert file size to readable format */
  getFileSize(size: number): string {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }
}
