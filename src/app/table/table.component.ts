import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Selection } from '../selection';
import { Flour } from 'server/src/flour';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['../app.component.css']
})

export class TableComponent implements OnInit {

  STORAGE_KEY = 'storedFlours';
  DEFAULT_HYDRATION = 70;

  selections: Selection[] = [];

  @ViewChild('newFlourName') inputFlourName!: ElementRef<HTMLInputElement>;
  @ViewChild('newFlourAmount') inputFlourAmount!: ElementRef<HTMLInputElement>;
  @ViewChild('newFlourHydration') inputHydrationPercent!: ElementRef<HTMLInputElement>;

  // check local storage for previous flours selections
  ngOnInit(): void {
    try {

      const locallyStored = localStorage.getItem(this.STORAGE_KEY);
      this.selections = locallyStored ? JSON.parse(locallyStored) : [];

    } catch (error) {

      localStorage.clear();

    }
  }

  // user click event 
  add(name: string, amount: number, hydration: number): void {

    if (name && amount) {

      // use 70% if value not provided
      hydration = hydration || this.DEFAULT_HYDRATION;

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
    this.selections = this.selections.filter(entry => entry != selection);
    this.updateLocalStorage();
  }

  totalDry(): number {
    return this.selections.reduce((total, selection) => total + selection.amount, 0);
  }

  totalWet(): number {
    return this.selections.reduce((total, selection) => total + ((selection.hydration || this.DEFAULT_HYDRATION) * .01) * selection.amount, 0);
  }

  updateLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.selections));
  }

}  
