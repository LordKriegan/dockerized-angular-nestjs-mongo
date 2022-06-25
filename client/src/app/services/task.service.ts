import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = '/api/task'
  constructor(
    private http: HttpClient
  ) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
  }
  
  deleteTask(id: string): Observable<Task> {
    const url = `${this.apiUrl}?id=${id}`;
    console.log(url)
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(reminder: boolean, id: string): Observable<Task> {
    return this.http.put<Task>(this.apiUrl, { reminder, id }, httpOptions)
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
