import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Flour } from './flour';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Hydration Calculator';
  
  flours: Flour[] = [];

  @ViewChild('newFlourName') inputFlourName!: ElementRef<HTMLInputElement>;
  @ViewChild('newFlourAmount') inputFlourAmount!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.flours = [
      { name: 'White Flour', amount: 350, hydration: 80 },
      { name: 'Spelt Flour', amount: 150, hydration: 60 },
    ]
  }

  add(name: string, amount: number, hydration: number): void {
    if (name && amount && hydration) {
      this.flours.push({ name, amount, hydration } as Flour);
      this.inputFlourName.nativeElement.value = '';
      this.inputFlourAmount.nativeElement.value = '';
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
