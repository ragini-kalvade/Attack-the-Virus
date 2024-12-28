import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  private apiUrl = 'http://localhost:8080/leaderboard'; 

  constructor(private http: HttpClient) { }

  getTopScores(): Observable<{ username: string; score: number }[]> {
    return this.http.get<{ username: string; score: number }[]>(this.apiUrl);
  }

  addNewScore(username: string, score: number): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('score', score.toString()); // Convert score to string as HttpParams expects string values
    return this.http.post<any>(this.apiUrl, null, { params });
  }
}
