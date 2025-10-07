import { FormUtils } from './../../../utils/form-utils';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);

  formUtils = FormUtils;
  myForm : FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ],
    Validators.minLength(3)
  ),
  });

  newFavoriteGame = new FormControl('',Validators.required);


  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites(){
    if(this.newFavoriteGame.invalid)return;

    const newGame = this.newFavoriteGame.value;

    this.favoriteGames.push(this.fb.control(newGame,Validators.required));
    this.newFavoriteGame.reset;
  }

  onDeleteFavorite(index: number){
    this.favoriteGames.removeAt(index);
  }


  onSubmit(){
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
    
  }

 }
