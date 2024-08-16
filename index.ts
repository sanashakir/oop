#! /usr/bin/env node

import inquirer from "inquirer";

interface Player {
  name: string;
  health: number;
  inventory: string[];
}

const player: Player = {
  name: '',
  health: 100,
  inventory: [],
};

async function startGame() {
  console.log('Welcome to the Adventure Game!');
  player.name = await askQuestion('What is your name?');
  console.log(`Hello, ${player.name}! Let's begin your adventure.`);

  // Game loop
  while (player.health > 0) {
    const action = await askQuestion('What do you want to do? (explore, check inventory, quit)');
    switch (action) {
      case 'explore':
        explore();
        break;
      case 'check inventory':
        checkInventory();
        break;
      case 'quit':
        console.log('Thanks for playing!');
        return;
      default:
        console.log('Invalid action.');
    }
  }

  console.log('You have died.');
}

async function askQuestion(question: string): Promise<string> {
  const answer = await inquirer.prompt({
    name: 'answer',
    type: 'input',
    message: question,
  });
  return answer.answer;
}

function explore() {
 
  console.log('You explore the forest...');

  console.log('You found a health potion!');
  player.health += 20;

  console.log(`Your health is now ${player.health}.`);
}

function checkInventory() {
  console.log('Your inventory:');
  if (player.inventory.length === 0) {
    console.log('Your inventory is empty.');
  } else {
    player.inventory.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });
  }
}

startGame();
