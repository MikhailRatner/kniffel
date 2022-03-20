import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../category';
import { Die } from '../die';
import { DiceService } from '../services/dice.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  categoryList$!: Observable<Category[]>;
  diceValues$!: Observable<Die[]>;
  dissabledRollButton = false;

  constructor(private diceService: DiceService) {}

  ngOnInit(): void {
    this.categoryList$ = this.diceService.getCategoryList();
    this.diceValues$ = this.diceService.getCurrentValuesOfDice();
  }

  rollDice() {
    this.dissabledRollButton = true;
    return this.diceService.rollDice();
  }

  addPossibleToScoredPoints(category: number) {
    this.diceService.addPossibleToScoredPoints(category);
    this.dissabledRollButton = false;
    return;
  }
}
