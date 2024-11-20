import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ContentService } from '../services/content.service';

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

    formData.resetForm();
  }
}
