import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'upgrade-tab',
  templateUrl: './upgrade-tab.component.html',
  styleUrls: ['./upgrade-tab.component.scss']
})
export class UpgradeTabComponent implements OnInit {
  productionUpgrades = [{
    id: 'p-0',
    name: 'Fork',
    description: 'More efficient and hygienic than using your hands, you hooligan. Grants 1 extra nugget per click.',
    cost: 100,
    picture: '',
  }, {
    id: 'p-1',
    name: 'Active production upgrade 2',
    description: 'Grants 2 extra nuggets per click.',
    cost: 1000,
    picture: '',
  }, {
    id: 'p-2',
    name: 'Active production upgrade 3',
    description: 'Grants 4 extra nuggets per click.',
    cost: 10000,
    picture: '',
  }, {
    id: 'p-3',
    name: 'Active production upgrade 4',
    description: 'Grants 8 extra nuggets per click.',
    cost: 100000,
    picture: '',
  }, {
    id: 'p-4',
    name: 'Active production upgrade 5',
    description: 'Grants 16 extra nuggets per click.',
    cost: 1000000,
    picture: '',
  }, {
    id: 'p-5',
    name: 'Passive production upgrade 1',
    description: 'Generates 1 nugget per second',
    cost: 100,
    picture: '',
  }, {
    id: 'p-6',
    name: 'Passive production upgrade 2',
    description: 'Generates 2 nuggets per second',
    cost: 100,
    picture: '',
  }, {
    id: 'p-7',
    name: 'Passive production upgrade 3',
    description: 'Generates 4 nuggets per second',
    cost: 100,
    picture: '',
  }, {
    id: 'p-8',
    name: 'Passive production upgrade 4',
    description: 'Generates 8 nuggets per second',
    cost: 100,
    picture: '',
  }, {
    id: 'p-9',
    name: 'Passive production upgrade 5',
    description: 'Generates 16 nuggets per second',
    cost: 100,
    picture: '',
  }, {
    id: 'p-10',
    name: "Old MacDonald's Farm",
    description: 'Old MacDonald had a farm, until the rise of factory farms, unshrinkable piles of bills and debts, and a bad back finally put him out of business. How had it come to this? He remembered when his daughter had tried to set up an AdWords campaign for him. "My father and his father before him sold their crops face-to-face and people bought it on the merits of their soil and sweat. Why should I beg strangers to buy my goods on Google?" he\'d replied indignantly. He remembered his golden days, as a young man with a firmness earned through harvest after harvest among the amber waves of the American heartland. He remembered Susan, the sun in his sky, who he never thought would agreed to marry him and stay on the farm, who he buried in a shady copse on the far edge of his property. He only hoped the next owner of his farm, after the bank, might grant him an easement to rest next to her, when the time came. MacDonald took one final walk through his fields, grasping at memories of better days and hoarding them for worse, but the farm was not as alive as he recalled. No cows mooed at his passing, no wheat rustled in the breeze. Even the insects seemed to taken their creaks elsewhere. Unable to return to rosier days, he left 31310 Valley Road with no closure but plenty of good memories to grieve for. Generates 100 nuggets per second.',
    cost: 100,
    picture: 'assets/farm.png'
  }];
  offenseUpgrades = [{
    id: 'o-0',
    name: 'Attack upgrade 1',
    description: 'Increase attack power by 1',
    cost: 100,
    picture: ''
  }, {
    id: 'o-1',
    name: 'Attack upgrade 2',
    description: 'Increase attack power by 5',
    cost: 100,
    picture: ''
  }, {
    id: 'o-2',
    name: 'Attack upgrade 3',
    description: 'Increase attack power by 10',
    cost: 100,
    picture: ''
  }, {
    id: 'o-3',
    name: 'Attack upgrade 4',
    description: 'Increase attack power by 50',
    cost: 100,
    picture: ''
  }, {
    id: 'o-4',
    name: 'Attack upgrade 5',
    description: 'Increase attack power by 100',
    cost: 100,
    picture: ''
  }, {
    id: 'o-5',
    name: 'Attack upgrade X',
    description: 'Deal 2% more damage per attack',
    cost: 100,
    picture: ''
  }, {
    id: 'o-6',
    name: 'Attack upgrade Y',
    description: 'Steal 1% more damage as nuggets',
    cost: 100,
    picture: ''
  }];
  defenseUpgrades = [{
    id: 'd-0',
    name: 'Absolute defense upgrade 1',
    description: 'Block 1 damage from every attack',
    cost: 100,
    picture: ''
  }, {
    id: 'd-1',
    name: 'Absolute defense upgrade 2',
    description: 'Block 5 damage from every attack',
    cost: 100,
    picture: ''
  }, {
    id: 'd-2',
    name: 'Absolute defense upgrade 3',
    description: 'Block 10 damage from every attack',
    cost: 100,
    picture: ''
  }, {
    id: 'd-3',
    name: 'Absolute defense upgrade 4',
    description: 'Block 100 damage from every attack',
    cost: 100,
    picture: ''
  }, {
    id: 'd-4',
    name: 'Absolute defense upgrade 5',
    description: 'Block 1000 damage from every attack',
    cost: 100,
    picture: ''
  }, {
    id: 'd-5',
    name: 'Relative defense upgrade 1',
    description: 'Block 1% damage from every attack',
    cost: 100,
    picture: ''
  }, {
    id: 'd-6',
    name: 'Relative defense upgrade 2',
    description: 'Block 5% damage from every attack',
    cost: 100,
    picture: ''
  }, {
    id: 'd-7',
    name: 'Relative defense upgrade 3',
    description: 'Block 10% damage from every attack',
    cost: 100,
    picture: ''
  }];
  supportUpgrades = [{
    id: 's-0',
    name: 'Support upgrade 1',
    description: 'Generate 2 more nuggets per help click',
    cost: 100,
    picture: ''
  }, {
    id: 's-1',
    name: 'Support upgrade 2',
    description: 'Generate 4 more nuggets per help click',
    cost: 100,
    picture: ''
  }, {
    id: 's-2',
    name: 'Support upgrade 3',
    description: 'Generate 8 more nuggets per help click',
    cost: 100,
    picture: ''
  }, {
    id: 's-3',
    name: 'Support upgrade 4',
    description: 'Generate 16 more nuggets per help click',
    cost: 100,
    picture: ''
  }, {
    id: 's-4',
    name: 'Support upgrade 5',
    description: 'Generate 32 more nuggets per help click',
    cost: 100,
    picture: ''
  }];
  constructor() { }

  ngOnInit() {
  }

}
