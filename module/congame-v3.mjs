import { CongameActorSheet } from './sheets/actor-sheet.mjs';
import { rollCongamePool } from './dice.mjs';

/* -------------------------------------------- */
/*  Foundry VTT System Initialization           */
/* -------------------------------------------- */
Hooks.once('init', async function() {
  console.log('Congame v3 | Initializing Congame v3 TTRPG System');

  game.congame = {
    rollCongamePool
  };

  // Register Custom Actor Sheet
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('congame-v3', CongameActorSheet, {
    types: ['character', 'npc'],
    makeDefault: true,
    label: 'Congame v3 Character Sheet'
  });

  // Preload Handlebars Templates
  return preloadHandlebarsTemplates();
});

async function preloadHandlebarsTemplates() {
  const templatePaths = [
    'systems/congame-v3/templates/actor-sheet.hbs',
    'systems/congame-v3/templates/chat/roll-card.hbs'
  ];
  return loadTemplates(templatePaths);
}
