import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Category } from '../category';
import { Die } from '../die';

@Injectable({
  providedIn: 'root',
})
export class DiceService {
  private diceSource$ = new BehaviorSubject<Die[]>([
    { id: 1, value: 5 },
    { id: 2, value: 4 },
    { id: 3, value: 3 },
    { id: 4, value: 2 },
    { id: 5, value: 1 },
  ]);

  categoryList: Category[] = [
    {
      name: 'Aces',
      scoredPoints: 0,
      possiblePoints: 0,
      dissabledButton: false,
    },
    {
      name: 'Twos',
      scoredPoints: 0,
      possiblePoints: 0,
      dissabledButton: false,
    },
    {
      name: 'Threes',
      scoredPoints: 0,
      possiblePoints: 0,
      dissabledButton: false,
    },
    {
      name: 'Fours',
      scoredPoints: 0,
      possiblePoints: 0,
      dissabledButton: false,
    },
    {
      name: 'Fives',
      scoredPoints: 0,
      possiblePoints: 0,
      dissabledButton: false,
    },
    {
      name: 'Sixes',
      scoredPoints: 0,
      possiblePoints: 0,
      dissabledButton: false,
    },
    {
      name: '3 of a kind',
      scoredPoints: 0,
      possiblePoints: 0,
      dissabledButton: false,
    },
    {
      name: '5 of a kind',
      scoredPoints: 0,
      possiblePoints: 0,
      dissabledButton: false,
    },
    {
      name: 'Full House',
      scoredPoints: 0,
      possiblePoints: 0,
      dissabledButton: false,
    },
    {
      name: 'Sm. Straight',
      scoredPoints: 0,
      possiblePoints: 0,
      dissabledButton: false,
    },
    {
      name: 'Lg. Straight',
      scoredPoints: 0,
      possiblePoints: 0,
      dissabledButton: false,
    },
    {
      name: 'Yahtzee',
      scoredPoints: 0,
      possiblePoints: 0,
      dissabledButton: false,
    },
    {
      name: 'Chance',
      scoredPoints: 0,
      possiblePoints: 0,
      dissabledButton: false,
    },
  ];

  upperSectionCombinationList = [0, 0, 0, 0, 0, 0];
  lowerSectionCombinationList = [0, 0, 0, 0, 0, 0, 0];

  constructor() {}

  getCategoryList() {
    return of(this.categoryList);
  }

  getCurrentValuesOfDice() {
    return this.diceSource$.asObservable();
  }

  rollDice() {
    this.diceSource$.getValue().map((die) => {
      die.value = Math.floor(Math.random() * 6) + 1;
    });
    this.checkUpperSectionCombinations();
    this.checkLowerSectionCombinations();
    this.addPossibleUpperPointsToSource();
    this.addPossibleLowerPointsToSource();
    return;
  }

  checkUpperSectionCombinations() {
    this.diceSource$.getValue().map((die) => {
      // wie viele 1er?
      if (die.value === 1) {
        this.upperSectionCombinationList[0]++;
      }

      // wie viele 2er?
      if (die.value === 2) {
        this.upperSectionCombinationList[1]++;
      }

      // wie viele 3er?
      if (die.value === 3) {
        this.upperSectionCombinationList[2]++;
      }

      // wie viele 4er?
      if (die.value === 4) {
        this.upperSectionCombinationList[3]++;
      }

      // wie viele 5er?
      if (die.value === 5) {
        this.upperSectionCombinationList[4]++;
      }

      // wie viele 6er?
      if (die.value === 6) {
        this.upperSectionCombinationList[5]++;
      }
    });
  }

  checkLowerSectionCombinations() {
    let sequentialDice = 0;
    let threeOfAKind = 0;
    let twoOfAKind = 0;

    for (let i = 0; i < this.upperSectionCombinationList.length; i++) {
      const element = this.upperSectionCombinationList[i];

      if (element > 0) {
        sequentialDice++;
      } else {
        sequentialDice = 0;
      }

      if (element === 2) {
        twoOfAKind++;
      }

      // Three Of A Kind - 3 Zahlen gleich
      if (element === 3) {
        this.lowerSectionCombinationList[0]++;
        threeOfAKind++;
      }

      // Four Of A Kind - 4 Zahlen gleich
      if (element === 4) {
        this.lowerSectionCombinationList[1]++;
      }

      // Yahtzee - 5 Zahlen gleich
      if (element === 5) {
        this.lowerSectionCombinationList[5]++;
      }
    }

    // Full House - 3 einer Zahl, 2 einer anderen Zahl
    if (threeOfAKind === 1 && twoOfAKind === 1) {
      this.lowerSectionCombinationList[2]++;
    }

    // Small Straight - vier aufeinander folgende Zahlen
    if (sequentialDice === 4) {
      this.lowerSectionCombinationList[3]++;
    }

    // Large Straight -fünf aufeinander folgende Zahlen
    if (sequentialDice === 5) {
      this.lowerSectionCombinationList[4]++;
    }

    // Chance - summe aller Zahlen
    // keine Kondition!
  }

  addPossibleUpperPointsToSource() {
    for (let i = 0; i < this.upperSectionCombinationList.length; i++) {
      const element = this.upperSectionCombinationList[i] * (i + 1);
      this.categoryList[i].possiblePoints = element;
    }
  }

  addPossibleLowerPointsToSource() {
    for (let i = 0; i < this.lowerSectionCombinationList.length; i++) {
      // Full House
      if (i === 2 && this.lowerSectionCombinationList[2] > 0) {
        this.categoryList[8].possiblePoints = 25;
      }

      // Small Straight
      if (i === 3 && this.lowerSectionCombinationList[3] > 0) {
        this.categoryList[9].possiblePoints = 30;
      }

      // Large Straight
      if (i === 4 && this.lowerSectionCombinationList[4] > 0) {
        this.categoryList[10].possiblePoints = 40;
      }

      // Yathzee
      if (i === 5 && this.lowerSectionCombinationList[5] > 0) {
        this.categoryList[11].possiblePoints = 50;
      }
    }

    for (let i = 0; i < this.upperSectionCombinationList.length; i++) {
      const element = this.upperSectionCombinationList[i];

      // Three Of A Kind
      if (element === 3) {
        this.categoryList[6].possiblePoints = (i + 1) * 3;
      }

      // Four Of A Kind
      if (element === 4) {
        this.categoryList[7].possiblePoints = (i + 1) * 4;
      }

      // Chance - Summe aller Würfel
      this.categoryList[12].possiblePoints += (i + 1) * element;
    }
  }

  addPossibleToScoredPoints(index: number) {
    // add possible points to the index (category)
    for (let i = 0; i < this.categoryList.length; i++) {
      if (i === index) {
        this.categoryList[i].scoredPoints = this.categoryList[i].possiblePoints;
        this.categoryList[i].dissabledButton = true;
      }
      this.categoryList[i].possiblePoints = 0;
    }

    for (let i = 0; i < this.upperSectionCombinationList.length; i++) {
      this.upperSectionCombinationList[i] = 0;
    }

    for (let i = 0; i < this.lowerSectionCombinationList.length; i++) {
      this.lowerSectionCombinationList[i] = 0;
    }
  }
}
