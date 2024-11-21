import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
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
  private readonly dialog = inject(MatDialog);

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
  openDialog(element_id: string): void {
    this.dialog.open(DialogComponent, {
      data: { id: element_id },
    });
  }
  openDeleteDialog(element_id: string): void {
    this.dialog.open(DeleteDialogComponent, {
      data: { id: element_id },
    });
  }
}
