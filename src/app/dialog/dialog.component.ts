import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ContentService } from '../services/content.service';

export interface DialogData {
  id: string;
  state: string;
}

@Component({
  selector: 'app-dialog',
  template: `
    <h1 mat-dialog-title>Edit State</h1>
    <form class="form-container" #stateForm="ngForm" (ngSubmit)="onSubmit()">
      <div mat-dialog-content>
        <mat-radio-group
          aria-label="Select an option"
          name="state"
          [(ngModel)]="data.state"
          required
        >
          <mat-radio-button value="project">Project</mat-radio-button>
          <mat-radio-button value="attempted">Attempted</mat-radio-button>
          <mat-radio-button value="completed">Completed</mat-radio-button>
        </mat-radio-group>
      </div>
      <div mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Cancel</button>
        <button
          mat-raised-button
          color="primary"
          [disabled]="stateForm.invalid"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  `,
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
  ],
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  protected readonly contentService = inject(ContentService);

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.data.state) {
      this.contentService.updateProblemState(this.data.id, this.data.state);
      this.dialogRef.close();
    } else {
      console.error('Form is invalid');
    }
  }
}
