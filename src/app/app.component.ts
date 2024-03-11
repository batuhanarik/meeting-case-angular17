import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule],
  providers: [MessageService],
  template: `<router-outlet/><p-toast></p-toast>`
})
export class AppComponent {
  title = 'ES-MEETING';
}
