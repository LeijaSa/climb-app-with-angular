import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    MatTableModule,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  protected readonly contentService = inject(ContentService);
  subscription: Subscription | undefined = undefined;

  displayedColumns: string[] = [
    'description',
    'grade',
    'state',
    'add_date',
    'trash',
  ];
  boulderProblemsSignal = this.contentService.boulderProblemsSignal;

  ngOnInit(): void {
    this.contentService.getBoulderProblems();
  }
  deleteProblem(id: string) {
    this.contentService.deleteBoulderProblem(id);
  }
}
