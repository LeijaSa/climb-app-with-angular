import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  protected readonly contentService = inject(ContentService);

  displayedColumns: string[] = ['description', 'grade', 'state', 'add_date'];
  boulderProblemsSignal = this.contentService.boulderProblemsSignal;

  ngOnInit(): void {
    this.contentService.getBoulderProblems();
    console.log(this.boulderProblemsSignal());
  }
}
