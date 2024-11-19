import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BoulderProblemType } from '../type';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  protected readonly httpClient = inject(HttpClient);

  getBoulderProblems(): Observable<BoulderProblemType[]> {
    return this.httpClient.get<BoulderProblemType[]>(
      'http://localhost:5000/boulder_problems'
    ).pipe(
      map((data) =>
        data.map((item) => ({
          ...item,
          add_date: new Date(item.add_date), // Convert date strings to `Date` objects
        }))
      )
    );
  }
}
