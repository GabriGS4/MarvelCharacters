import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit{
  public heroForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required
    ]),
    superpower:new FormControl(null,[
      Validators.maxLength(16)
    ]),
    hasCape:new FormControl(true),
    height:new FormControl()
  });

  ngOnInit(): void {
    this.heroForm.valueChanges.subscribe(values => {
      console.log(values);
    })
  }

  public save() {
    if (this.heroForm.invalid) {
      alert('Formulario invalido');
      return;
    }
    console.log(this.heroForm.value);
  }

  public load() {

  }

  public reset() {

  }
}
