import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = 'http://localhost:8082/api/publications';

  constructor(private http: HttpClient) { }

  /** 🔹 Get all publications */
  getAllPublications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /** 🔹 Download stored PDF */
  downloadPDF(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${id}`, { responseType: 'blob' });
  }

  /** 🔹 Upload new publication */
  uploadPublication(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }

  /** 🔹 Update publication status (Approve / Reject) */
  updatePublicationStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }
}
