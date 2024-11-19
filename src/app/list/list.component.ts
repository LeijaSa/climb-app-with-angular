import { Component, inject, OnInit } from '@angular/core';
import { BoulderProblemType } from '../type';
import { Observable } from 'rxjs';
import { ContentService } from '../services/content.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { format } from 'date-fns';

@Component({
  selector: 'list',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor,MatTableModule, DatePipe, MatFormFieldModule, MatInputModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  protected readonly contentService = inject(ContentService);

  protected content$!: Observable<BoulderProblemType[]>;
  displayedColumns: string[] = ['description', 'grade', 'state', 'add_date'];
  dataSource: MatTableDataSource<BoulderProblemType> = new MatTableDataSource(); // Initialize MatTableDataSource

  ngOnInit(): void {
    this.contentService.getBoulderProblems().subscribe((data) => {
      this.dataSource.data = data;
    });
    
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const formattedDate = format(new Date(data.add_date), 'dd/MM/yyyy'); // Format date for filtering
      // Match filter against description, state, grade or parts of the date (day, month, year)
      return (
        data.description.toLowerCase().includes(filter) ||
        data.state.toLowerCase().includes(filter) ||
        data.grade.toLowerCase().includes(filter)||
        formattedDate.toLowerCase().includes(filter) ||
        // Filter by day, month, or year separately
        format(new Date(data.add_date), 'dd').includes(filter) || // Check the day
        format(new Date(data.add_date), 'MM').includes(filter) || // Check the month
        format(new Date(data.add_date), 'yyyy').includes(filter)  // Check the year
      );
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
