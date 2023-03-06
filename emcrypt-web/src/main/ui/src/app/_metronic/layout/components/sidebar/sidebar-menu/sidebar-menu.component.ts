import { Component, OnInit } from '@angular/core';
import { Account, AuthService } from 'src/app/modules/auth';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  allItems: MenuItem[] = [
    {
      link: '/dashboard',
      icon: './assets/media/icons/duotune/general/gen001.svg',
      text: 'MENU.DASHBOARD',
    },
    {
      link: '/company',
      icon: './assets/media/icons/duotune/general/gen017.svg',
      text: 'MENU.COMPANY',
    },
    {
      link: '/companies',
      icon: './assets/media/icons/duotune/general/gen008.svg',
      text: 'MENU.COMPANIES',
    },
    {
      link: '/accounts',
      icon: './assets/media/icons/duotune/general/gen049.svg',
      text: 'MENU.ACCOUNTS',
    },
    {
      link: '/settings',
      icon: './assets/media/icons/duotune/general/gen062.svg',
      text: 'MENU.SETTINGS',
    },
  ];

  items: MenuItem[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    let account = this.authService.currentUserValue as Account;

    if (account?.hasRole('ROLE_ADMIN')) {
      this.items = [this.allItems[0], this.allItems[2], this.allItems[4]];
    }

    if (account?.hasRole('ROLE_MANAGER')) {
      this.items = [this.allItems[1], this.allItems[3], this.allItems[4]];
    }
  }
}
