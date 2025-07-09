import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet,CommonModule,TranslateModule,RouterLink ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
  langAr: boolean = true;
  constructor(private _Router: Router, private _translate: TranslateService) {
    this.langAr = this._translate.currentLang === 'ar';
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
  
  
}
