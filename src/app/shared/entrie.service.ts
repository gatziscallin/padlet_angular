import { Injectable } from '@angular/core';
import {catchError, Observable, throwError, retry} from "rxjs";
import {Padlet} from "./padlet";
import {Entrie} from "./entrie";
import {HttpClient} from "@angular/common/http";
import {Rating} from "./rating";
import {Comment} from "./comment";


@Injectable({
  providedIn: 'root'
})
export class EntrieService {

  private api = 'http://padlet.s2010456018.student.kwmhgb.at/api';
  constructor(private http: HttpClient) {}

  getSingleEntrie(id:number) : Observable<Entrie>{
    return this.http.get<Entrie>(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  saveEntrie (entrie: Entrie): Observable<any> {
    return this.http.post(`${this.api}/padlets/${entrie.padlet_id}/entries`, entrie)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }

  updateEntrie (entrie: Entrie): Observable<any> {
    return this.http.put(`${this.api}/entries/${entrie.id}`, entrie)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteEntrie (id: number): Observable<any> {
    return this.http.delete(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  saveComment (comment: Comment): Observable<any> {
    return this.http.post(`${this.api}/entries/${comment.entrie_id}/comments`, comment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingleComment(id:number) : Observable<Comment>{
    return this.http.get<Comment>(`${this.api}/entries/${id}/comments`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  saveRating (rating: Rating): Observable<any> {
    console.log(rating);
    return this.http.post(`${this.api}/entries/${rating.entrie_id}/ratings`, rating)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingleRating(entrie_id:number) : Observable<Comment>{
    return this.http.get<Rating>(`${this.api}/entries/${entrie_id}/ratings`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
