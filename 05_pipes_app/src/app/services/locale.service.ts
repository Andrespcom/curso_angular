import { Injectable, signal } from '@angular/core';

export type AvaliableLocale = 'es'|'fr'|'en';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private currentLocale = signal<AvaliableLocale>('es');

  constructor(){
    this.currentLocale.set(
      (localStorage.getItem('locale') as AvaliableLocale) ?? 'es'
    )
  }

  get getLocale(){
    return this.currentLocale()
  }


  changeLocale(locale: AvaliableLocale){
    localStorage.setItem('locale',locale);
    this.currentLocale.set(locale);
    window.location.reload();
  }

}
