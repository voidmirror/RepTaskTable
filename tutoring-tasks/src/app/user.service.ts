import { Injectable } from '@angular/core';
import { AES } from 'crypto-ts'
import { WordArray } from 'crypto-ts/src/lib/WordArray';
import { USERS, USERSSS } from './user-list'
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedUser: string;
  private users = USERS;
  private userMap = new Map(
    USERSSS.map(x => [x.name, x.login] as [string, string])
  );
  CryptoTs = require("crypto-ts");

  constructor() {
    this.loggedUser = 'None'
   }

  public setLogin(login: string): void {
    let current = AES.encrypt(login, 'myHash').toString();
    if (this.isUserHere(login)) {
      this.loggedUser = AES.encrypt(login, 'myHash').toString();
    }
    console.log(this.loggedUser);

    // console.log(AES.decrypt('U2FsdGVkX19CanHhRDp77aXgu04mqoEu06NDNWc8/fc=', 'myHash').toString(this.CryptoTs.enc.Utf8));
  }

  public decryptUser(login: string): string {
    return AES.decrypt(login, 'myHash').toString(this.CryptoTs.enc.Utf8)
  }

  public getLoggedUser(): string {
    return this.loggedUser;
  }

  public getUsers() {
    return this.users;
  }

  private isUserHere(login: string): boolean {
    for (let val of this.userMap.values()) {
      if (this.decryptUser(val) == login) {
        console.log('User found');
        return true;
      }
    }
    console.log('User not found');
    return false;
  }

  // private isUser(login: string): boolean {
  //   const res = (Object.keys(this.users) as (keyof typeof this.users)[]).find((key) => {
  //     return this.users[key] === login;
  //   });
  //   return res != undefined;
  // }
}
