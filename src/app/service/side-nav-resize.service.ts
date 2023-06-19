import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SideNavResizeService implements OnInit {

  private showSideNav$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(undefined);

  constructor() {
  }

  ngOnInit() {
  }

  getShowNav() {
    return this.showSideNav$.asObservable();
  }

  setShowNav(showHide: boolean) {
    localStorage.setItem('showNav', String(showHide))
    this.showSideNav$.next(showHide);
  }

  isNavOpen() {
    return localStorage.getItem('showNav') == 'true';
  }
}
