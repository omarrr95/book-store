import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, TranslateModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  isLoggedIn = false;
  langAr: boolean = true;
userName: string = '';
userRoleAdmin: boolean = false;
  constructor(private _Router: Router, private _translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'en';

    this._translate.setDefaultLang(savedLang);
    this._translate.use(savedLang);

    this.langAr = savedLang === 'ar';
    this.updateRTLStylesheet(this.langAr);
  }

  ngOnInit() {
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
  }

  logout() {
    localStorage.removeItem('userToken');
    this.isLoggedIn = false;
    this._Router.navigate(['/auth/login']);
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

    // document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }
}
