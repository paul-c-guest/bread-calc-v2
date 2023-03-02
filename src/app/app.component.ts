import { Component, OnInit } from '@angular/core';
import { Flour } from './flour';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Dough Hydro Calc';
  flours: Flour[] = [];

  ngOnInit(): void {
    this.flours = [
      { name: 'White Flour', amount: 350 },
      { name: 'Spelt Flour', amount: 150 },
    ]
  }

  add(name: string, amount: number): void {
    if (name && amount) {
      this.flours.push({ name, amount } as Flour);
    }
  }

  remove(name: string) : void {
    this.flours = this.flours.filter(flour => flour.name != name);
  }

  total(): number {
    return this.flours.reduce((total, flour) => total + flour.amount, 0);
  }
 }
