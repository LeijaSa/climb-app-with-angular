import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BoulderProblemType } from '../type';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  protected readonly httpClient = inject(HttpClient);
  private boulderProblems = signal<BoulderProblemType[]>([]);

  getBoulderProblems(): void {
    this.httpClient
      .get<BoulderProblemType[]>('http://localhost:5000/boulder_problems')
      .subscribe({
        next: (problems) => {
          this.boulderProblems.set(problems); // Set the signal with the fetched data
        },
        error: (err) => {
          console.error('Failed to fetch boulder problems:', err);
          this.boulderProblems.set([]);
        },
      });
  }

  getBoulderProblem(id: string) {
    return this.httpClient.get<BoulderProblemType[]>(
      `http://localhost:5000/boulder_problems/${id}`
    );
  }

  get boulderProblemsSignal() {
    return this.boulderProblems.asReadonly();
  }

  postBoulderProblem(
    state: string,
    grade: string,
    description: string,
    location_id: number
  ): void {
    const payload = {
      id: uuid(),
      state,
      grade,
      description,
      add_date: new Date(),
      location_id,
    };

    this.httpClient
      .post<BoulderProblemType>(
        'http://localhost:5000/boulder_problems',
        payload
      )
      .subscribe({
        next: (newProblem) => {
          // Update the signal with the new problem added
          console.log('New problem added:', newProblem);
          this.boulderProblems.update((currentProblems) => [
            ...currentProblems,
            newProblem,
          ]);
        },
        error: (err) => {
          console.error('Error adding new problem:', err);
          // Optionally show a user-friendly message or handle the error gracefully
          alert('Failed to add new problem. Please try again later.');
        },
      });
  }

  deleteBoulderProblem(id: string) {
    return this.httpClient
      .delete(`http://localhost:5000/boulder_problems/${id}`)
      .subscribe({
        next: () => {
          this.boulderProblems.update((currentProblems) =>
            currentProblems.filter((problem) => problem.id !== id)
          );
        },
        error: (err) => {
          console.error('Error deleteing a problem:', err);
          // Optionally show a user-friendly message or handle the error gracefully
          alert('Failed to delete a problem. Please try again later.');
        },
      });
  }
}
