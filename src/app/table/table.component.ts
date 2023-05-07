import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Selection } from '../model/selection';
import { Flour } from 'server/src/flour';
import { FlourService } from '../flour.service';
import { DEFAULT_HYDRATION, STORED_FLOURS_KEY, STORED_STARTER_KEY } from '../shared.constants';
import { Starter } from '../model/starter';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['../app.component.css']
})

export class TableComponent implements OnInit {

  constructor(private flourService: FlourService) { }

  flours$: Flour[] = [];
  selections: Selection[] = [];
  starter: Starter = {} as Starter;

  dryTotal: number = 0;
  wetTotal: number = 0;

  @ViewChild('newFlourName') inputFlourName!: ElementRef<HTMLInputElement>;
  @ViewChild('newFlourAmount') inputFlourAmount!: ElementRef<HTMLInputElement>;
  @ViewChild('newFlourHydration') inputHydrationPercent!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.flourService
      .getFlours()
      .subscribe(result => this.flours$ = result);

    // check local storage for previous selection data
    try {
      const locallyStored = localStorage.getItem(STORED_FLOURS_KEY);
      this.selections = locallyStored ? JSON.parse(locallyStored) : [];
    } catch (error) {
      localStorage.removeItem(STORED_FLOURS_KEY);
    }

    // check local storage for previous starter data 
    try {
      const localStarter = localStorage.getItem(STORED_STARTER_KEY);
      this.starter = localStarter ? JSON.parse(localStarter) : {} as Starter;
    } catch (error) {
      localStorage.removeItem(STORED_STARTER_KEY);
    }
  }

  getHydration(name: string): string {
    if (name == 'My Starter') {
      return this.starter.hydration.toString();
    } else {
      const result = this.flours$.find(entry => entry.name === name);
      return result ? result.defaultHydration.toString() : '';
    }
  }

  // user click event 
  add(name: string, amount: number, hydration: number): void {

    if (name && amount) {

      // use 70% if value not provided
      hydration = hydration || DEFAULT_HYDRATION;

      const flour: Flour = {
        name: name,
        defaultHydration: hydration
      };

      this.selections.push({ flour, amount, hydration } as Selection);

      // clear entry fields
      this.inputFlourName.nativeElement.value = '';
      this.inputFlourAmount.nativeElement.value = '';
      this.inputHydrationPercent.nativeElement.value = '';

      this.updateLocalStorage();

    }

  }

  // user click event 
  remove(selection: Selection): void {
    if (confirm('remove the flour from the recipe?')) {

      this.selections = this.selections.filter(entry => entry != selection);
      this.updateLocalStorage();

    }
  }

  totalDry(): number {
    this.dryTotal = this.selections.reduce((total, selection) => total + selection.amount, 0);
    return this.dryTotal;
  }

  totalWet(): string {
    this.wetTotal = this.selections.reduce((total, selection) => total + ((selection.hydration || DEFAULT_HYDRATION) * .01) * selection.amount, 0);
    return this.wetTotal.toFixed(0);
  }

  finalHydration(): string {
    const result = (this.wetTotal / this.dryTotal) * 100;
    return result.toFixed(1);
  }

  updateLocalStorage(): void {
    localStorage.setItem(STORED_FLOURS_KEY, JSON.stringify(this.selections));
  }

}  
