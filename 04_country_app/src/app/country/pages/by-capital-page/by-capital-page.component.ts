import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from './../../services/country.service';
import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent { 

  countryService = inject(CountryService);  

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query')?? '';
  
  query = linkedSignal(()=> this.queryParam);

  countryResource = rxResource({
    params: () => ({query: this.query()}),
    stream: ({params}) => {
      console.log({query: params.query});
      
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: params.query,
        }
      })

      if(!params.query) return of([]);    //of devuelve un observable de lo que fuera a devolver?
      return this.countryService.searchByCapital(params.query);
    },
  })

  // countryResource = resource({
  //   params: () => ({query: this.query()}),
  //   loader: async({params}) => {
  //     if(!params.query) return[];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(params.query)
  //     ); 
  //   }
  // })


  // isLoading = signal(false);
  // isError= signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string){

  //   if(this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null)

  //   console.log(query);
  //   this.countryService.searchByCapital(query).subscribe({
  //     next: (countries) => {
         
  //     this.isLoading.set(false);
  //     this.countries.set(countries);
  //     console.log(countries);
      
  //     },
  //     error: (err) => {        
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     },
  //   });
  // }

}
