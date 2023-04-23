import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Flour } from '../flour';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['../app.component.css']
})

export class TableComponent implements OnInit {

  STORAGE_KEY = 'storedFlours';
  DEFAULT_HYDRATION = 70;

  flours: Flour[] = [];

  @ViewChild('newFlourName') inputFlourName!: ElementRef<HTMLInputElement>;
  @ViewChild('newFlourAmount') inputFlourAmount!: ElementRef<HTMLInputElement>;
  @ViewChild('newFlourHydration') inputHydrationPercent!: ElementRef<HTMLInputElement>;

  // check local storage for previous flours selections
  ngOnInit(): void {
    try {

      const locallyStored = localStorage.getItem(this.STORAGE_KEY);
      this.flours = locallyStored ? JSON.parse(locallyStored) : [];

    } catch (error) {

      localStorage.clear();

    }
  }

  // user click event 
  add(name: string, amount: number, hydration: number): void {

    if (name && amount) {

      // use 70% if value not provided
      hydration = hydration || this.DEFAULT_HYDRATION;

      this.flours.push({ name, amount, hydration } as Flour);

      // clear entry fields
      this.inputFlourName.nativeElement.value = '';
      this.inputFlourAmount.nativeElement.value = '';
      this.inputHydrationPercent.nativeElement.value = '';

      this.updateLocalStorage();

    }

  }

  // user click event 
  remove(name: string): void {
    this.flours = this.flours.filter(flour => flour.name != name);
    this.updateLocalStorage();
  }

  totalDry(): number {
    return this.flours.reduce((total, flour) => total + flour.amount, 0);
  }

  totalWet(): number {
    return this.flours.reduce((total, flour) => total + (flour.hydration * .01) * flour.amount, 0);
  }

  updateLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.flours));
  }

}  
