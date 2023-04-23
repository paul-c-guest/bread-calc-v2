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

  ngOnInit(): void {

    const locallyStored = localStorage.getItem(this.STORAGE_KEY);

    this.flours = locallyStored ? JSON.parse(locallyStored) : [];

    // preset some flours to show something while testing 
    // this.flours = [
    //   { name: 'White Flour', amount: 350, hydration: 80 },
    //   { name: 'Spelt Flour', amount: 150, hydration: 60 },
    // ]
  }

  add(name: string, amount: number, hydration: number): void {

    if (name && amount) {

      // use 70% if value not provided
      hydration = hydration || this.DEFAULT_HYDRATION;

      this.flours.push({ name, amount, hydration } as Flour);

      // clear entry fields
      this.inputFlourName.nativeElement.value = '';
      this.inputFlourAmount.nativeElement.value = '';
      this.inputHydrationPercent.nativeElement.value = '';

      // update local storage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.flours));

    }

  }

  remove(name: string): void {
    this.flours = this.flours.filter(flour => flour.name != name);
  }

  totalDry(): number {
    return this.flours.reduce((total, flour) => total + flour.amount, 0);
  }
  totalWet(): number {
    return this.flours.reduce((total, flour) => total + (flour.hydration * .01) * flour.amount, 0);
  }

}
