import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogData } from '../dialog/dialog.component';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `<h1 mat-dialog-title>Confirm Deletion</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to delete this problem?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="warn" (click)="onDelete()">
        Delete
      </button>
    </div>`,
  styleUrl: './delete-dialog.component.css',
})
export class DeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  protected readonly contentService = inject(ContentService);

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.contentService.deleteBoulderProblem(this.data.id);
    this.dialogRef.close();
  }
}
