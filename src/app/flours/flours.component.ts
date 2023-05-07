import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Flour } from 'server/src/flour';
import { FlourService } from '../flour.service';
import { DEFAULT_HYDRATION, MAX_HYDRATION } from '../shared.constants';

@Component({
  selector: 'app-flours',
  templateUrl: './flours.component.html',
  styleUrls: ['../app.component.css']
})

export class FloursComponent implements OnInit {

  constructor(private flourService: FlourService) { }

  @ViewChild('newFlourName') newFlourNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('newFlourHydration') newFlourHydrationInput!: ElementRef<HTMLInputElement>;

  flours$: Flour[] = [];
  changeMap = new Map<string, boolean>();

  ngOnInit(): void {
    this.refreshLocalFlours();
  }

  // returns success of creation on db as boolean
  create(name: string, defaultHydration?: string): boolean {
    if (name) {

      let parsedHydration: number = defaultHydration ? Number.parseInt(defaultHydration) : DEFAULT_HYDRATION;
      parsedHydration = parsedHydration > MAX_HYDRATION ? MAX_HYDRATION : parsedHydration;

      this.flourService
        .createFlour({ name: name, defaultHydration: parsedHydration } as Flour)
        .subscribe(result => this.refreshLocalFlours());

      this.newFlourNameInput.nativeElement.value = '';
      this.newFlourHydrationInput.nativeElement.value = '';

      return true;

    } else {
      return false;
    }
  }

  update(id: string, updatedName: string, updatedHydration: number) {
    this.flourService
      .updateFlour(id, { name: updatedName, defaultHydration: updatedHydration } as Flour)
      .subscribe(result => {
        this.refreshLocalFlours();
        this.changeMap.set(id, false);
      });
  }

  delete(id: string) {
    if (confirm('delete the flour from the database?')) {

      this.flourService
        .deleteFlour(id)
        .subscribe(result => {
          this.refreshLocalFlours();
          this.changeMap.delete(id);
        });

    }
  }

  private refreshLocalFlours() {
    this.flourService
      .getFlours()
      .subscribe(result => this.flours$ = result);
  }

  resetMapId(id: string) {
    this.changeMap.set(id, false);
  }

  log(message: string) {
    console.log(message);
  }

  registerChange(flour: Flour, updatedName: string, updatedHydration: number) {
    const differsFromDb = updatedName !== flour.name || updatedHydration != flour.defaultHydration;
    this.changeMap.set(flour._id!.toString(), differsFromDb);
  }

  hasChanges(id: string): boolean {
    const result = this.changeMap.get(id);
    return result != undefined ? result : false;
  }

}
