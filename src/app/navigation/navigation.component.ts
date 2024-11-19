import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [MatTabsModule, ListComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {}
