import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = 'http://localhost:8080/api/publications';

  constructor(private http: HttpClient) {}

  // Upload publication (PDF, metadata, etc.)
  uploadPublication(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }
}
