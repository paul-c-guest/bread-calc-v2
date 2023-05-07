import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlourService } from '../flour.service';
import { Flour } from 'server/src/flour';
import { STORED_STARTER_KEY } from '../shared.constants';
import { Starter } from '../model/starter';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['../app.component.css']
})

export class StarterComponent implements OnInit {

  flours$: Flour[] = [];

  @ViewChild('starterFlourName') starterFlourNameElement!: ElementRef<HTMLInputElement>;
  @ViewChild('starterFlourAmount') starterFlourAmountElement!: ElementRef<HTMLInputElement>;
  @ViewChild('starterLiquidAmount') starterLiquidAmountElement!: ElementRef<HTMLInputElement>;

  constructor(private flourService: FlourService) { }

  ngOnInit(): void {
    this.flourService
      .getFlours()
      .subscribe(result => this.flours$ = result);
  }

  updateStarter(flourName: string, flourAmount: number, liquidAmount: number) {
    if (flourName && flourAmount && liquidAmount) {

      const starter: Starter = { flourName, flourAmount, liquidAmount };

      // make or update user starter 
      localStorage.setItem(STORED_STARTER_KEY, JSON.stringify(starter));

      // clear fields on success
      this.starterFlourNameElement.nativeElement.value = '';
      this.starterFlourAmountElement.nativeElement.value = '';
      this.starterLiquidAmountElement.nativeElement.value = '';
    }
  }

}
