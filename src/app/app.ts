import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Httpclient } from './httpclient';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ng-httpclient-demo');
  httpusers: User[] = [];
  genshinCharacters: string[] = [];

  constructor(private httpClient: Httpclient) {}

  ngOnInit() {
    this.httpClient.getUsersRemotely().subscribe({
      next: (data) => {
        this.httpusers = data;
        console.log('Users fetched successfully:', this.httpusers);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });

    this.httpClient.getGenshinCharacters().subscribe({
      next: (data: string[]) => {
        this.genshinCharacters = data;
        console.log('Genshin characters fetched successfully:', this.genshinCharacters);
      },
      error: (error) => {
        console.error('Error fetching Genshin characters:', error);
      }
    });
  }
}
