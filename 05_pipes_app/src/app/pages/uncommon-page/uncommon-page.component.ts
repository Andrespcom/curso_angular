import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import {
  I18nSelectPipe,
  I18nPluralPipe,
  SlicePipe,
  JsonPipe,
  UpperCasePipe,
  KeyValuePipe,
  TitleCasePipe,
  AsyncPipe,
} from '@angular/common';
import { interval, tap } from 'rxjs';

const client1 = {
  name: 'Jose',
  gender: 'male',
  age: 39,
  address: 'Vigo, Es',
};

const client2 = {
  name: 'Maria',
  gender: 'female',
  age: 39,
  address: 'Vigo, Es',
};

@Component({
  selector: 'app-uncommon-page',
  imports: [
    CardComponent,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    UpperCasePipe,
    KeyValuePipe,
    TitleCasePipe,
    AsyncPipe
  ],
  templateUrl: './uncommon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UncommonPageComponent {
  //i18nSelect
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient() {
    if (this.client() == client1) {
      this.client.set(client2);
      return;
    }
    this.client.set(client1);
  }

  //i18nPlural

  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    '=1': 'tenemos 1 clliente esperando',
    other: 'tenemos # clientes esperando',
  });

  clients = signal(['Maria', 'Pedro', 'Jacobo', 'Josefina', 'Andres', 'Pepe']);

  deleteClient() {
    this.clients.update((prev) => prev.slice(1));
  }

  //keyValuePipe

  profile = {
    name: 'Juan',
    age: 36,
    address: 'Iowa',
  };

  //AsyncPipe

  promiseValue: Promise<string> = new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve('Tenemos data en la promesa');
        console.log('Promesa finalizada');
      },3500);
  });

  myObservableTimer = interval(2000).pipe(
    tap((value) => console.log('tap:',value))
  );

}
