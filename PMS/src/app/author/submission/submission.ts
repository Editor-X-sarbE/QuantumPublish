import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'app-submission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './submission.html',
  styleUrls: ['./submission.scss'],
})
export class SubmissionComponent {
  submissionData = {
    articleType: '',
    title: '',
    abstract: '',
    keywords: '',
    files: [] as File[],
  };

  isDragging = false;
  isSubmitted = false;

  constructor(private publicationService: PublicationService) {} // ✅ proper injection

  // 🔹 File selection
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      this.addFiles(Array.from(target.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files?.length) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
  }

  private addFiles(newFiles: File[]): void {
    const existingNames = new Set(this.submissionData.files.map(f => f.name));
    const uniqueFiles = newFiles.filter(file => !existingNames.has(file.name));
    this.submissionData.files.push(...uniqueFiles);
  }

  removeFile(index: number): void {
    this.submissionData.files.splice(index, 1);
  }

  isFormValid(): boolean {
    return (
      this.submissionData.articleType.trim() !== '' &&
      this.submissionData.title.trim() !== '' &&
      this.submissionData.abstract.trim() !== ''
    );
  }

  // ✅ Updated to handle upload via PublicationService
  handleSubmit(event: Event): void {
  event.preventDefault();

  if (!this.isFormValid()) {
    alert('⚠️ Please fill out all required fields before submitting.');
    return;
  }

  const formData = new FormData();
  formData.append('articleType', this.submissionData.articleType);
  formData.append('title', this.submissionData.title);
  formData.append('abstractText', this.submissionData.abstract); // ✅ fixed key
  formData.append('keywords', this.submissionData.keywords);

  // ✅ backend expects "file" (singular), not "files"
  if (this.submissionData.files.length > 0) {
    formData.append('file', this.submissionData.files[0]);
  } else {
    alert('⚠️ Please attach at least one PDF file.');
    return;
  }

  this.publicationService.uploadPublication(formData).subscribe({
    next: (res: any) => {
      console.log('✅ Upload successful:', res);
      alert('🎉 Manuscript uploaded successfully!');
      this.resetForm();
    },
    error: (err: any) => {
      console.error('❌ Upload failed:', err);
      alert('❌ Failed to upload. Please try again.');
    },
  });
}


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

  getFileSize(size: number): string {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }
}
