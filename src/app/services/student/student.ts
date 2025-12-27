import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  // Use dev proxy (/api) to avoid CORS and preflight
  private apiUrl = '/api/v1/Student/getstudents';
  constructor(private http: HttpClient) {}
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }
}
