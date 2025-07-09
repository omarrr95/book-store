
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet,CommonModule,TranslateModule,RouterLink ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit {
  langAr: boolean = true;
    isLoading: boolean = true; 
      isLoggedIn = false;
      userName: string = '';
userRoleAdmin: boolean = false;
  constructor(private _Router: Router, private _translate: TranslateService) {
    this.langAr = this._translate.currentLang === 'ar';
  }
    ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isLoggedIn = !!localStorage.getItem('userToken');
       this.userName = localStorage.getItem('user') || '';
       if(localStorage.getItem('userRole') == "Admin") {
       this.userRoleAdmin =  true;
       }
       else{
       this.userRoleAdmin =  false;
       }
    }
    this.isLoading = false;

  }
  toggleLanguage(): void {
    this.langAr = !this.langAr;
    const newLang = this.langAr ? 'ar' : 'en';
    this._translate.use(newLang);
    localStorage.setItem('lang', newLang); 
    this.updateRTLStylesheet(newLang === 'ar');
  }
  updateRTLStylesheet(isArabic: boolean): void {
    const existingLink = document.getElementById('rtl-style') as HTMLLinkElement;
  
    if (isArabic) {
      if (!existingLink) {
        const link = document.createElement('link');
        link.id = 'rtl-style';
        link.rel = 'stylesheet';
        link.href = 'assets/css/rtl.css';
        document.head.appendChild(link);
      }
    } else {
      if (existingLink) {
        existingLink.remove();
      }
    }
  
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }
    logout() {
    localStorage.removeItem('userToken');
    this.isLoggedIn = false;
    this._Router.navigate(['/auth/login']);
  }
  
}