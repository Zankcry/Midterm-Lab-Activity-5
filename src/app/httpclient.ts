import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class Httpclient {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private genshinUrl = 'https://genshin.jmp.blue/characters';
  constructor(private http: HttpClient) {}

  getGenshinCharacters(): Observable<any> {
    const cachedData = localStorage.getItem('genshinCharacters');
    if (cachedData) {
      return of(JSON.parse(cachedData));
    }
    return this.http.get(this.genshinUrl).pipe(
      tap(data => localStorage.setItem('genshinCharacters', JSON.stringify(data)))
    );
  }

  getUsersRemotely(): Observable<User[]> {
    const cachedUsers = localStorage.getItem('users');
    if (cachedUsers) {
      return of(JSON.parse(cachedUsers));
    }
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap(users => localStorage.setItem('users', JSON.stringify(users)))
    );
  }


}
