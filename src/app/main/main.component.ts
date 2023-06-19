import { Component, HostListener, OnInit } from '@angular/core';
import { SideNavResizeService } from '../service/side-nav-resize.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isMobileSize = false;
  showSideNav = undefined;

  constructor(private sideNavResizeService: SideNavResizeService) {
    this.sideNavResizeService.getShowNav().subscribe(isShow => {
        this.showSideNav = isShow
      }
    )
  }

  ngOnInit(): void {
    this.isMobileSize = window.innerWidth < 700 && window.innerHeight < 900;
    this.showSideNav = this.sideNavResizeService.isNavOpen();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobileSize = window.innerWidth < 700 && window.innerHeight < 900;
    this.showSideNav = this.sideNavResizeService.isNavOpen();
  }

}
