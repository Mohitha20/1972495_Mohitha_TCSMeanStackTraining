import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(public http:HttpClient) { }

  loadQuizDetails():Observable<Quiz[]>{
    return this.http.get<Quiz[]>("/assets/quiz.json");
  }
}