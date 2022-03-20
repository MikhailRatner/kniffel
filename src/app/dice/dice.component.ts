import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Die } from '../die';
import { DiceService } from '../services/dice.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
})
export class DiceComponent implements OnInit {
  diceValues$!: Observable<Die[]>;

  constructor(private diceService: DiceService) {}

  ngOnInit(): void {
    this.diceValues$ = this.diceService.getCurrentValuesOfDice();
  }
}
