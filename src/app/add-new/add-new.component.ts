import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ContentService } from '../services/content.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewComponent {
  protected readonly contentService = inject(ContentService);
  onSubmit(formData: NgForm) {
    const { state, grade, location, description } = formData.value;

    this.contentService.postBoulderProblem(state, grade, description, location);
    /* this.contentService
      .postBoulderProblem(state, grade, description, location)
      .subscribe({
        next: (response) => {
          console.log('New boulder problem added:', response);
          formData.resetForm();
        },
        error: (err) => {
          console.error('Error adding boulder problem:', err);
          alert('Failed to add the boulder problem. Please try again.');
        },
      });*/
  }
}
