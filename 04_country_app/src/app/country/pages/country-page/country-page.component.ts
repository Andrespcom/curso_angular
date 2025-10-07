import { CountryService } from './../../services/country.service';
import { Component, inject } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  imports: [CountryListComponent, NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  CountryService = inject(CountryService);


  countryResource = rxResource({
    params: () => ({code : this.countryCode}),    //request
    stream: ({params}) => {                       //loader
      return this.CountryService.searchCountryByAlphaCode(params.code)
    },
  });

 }
