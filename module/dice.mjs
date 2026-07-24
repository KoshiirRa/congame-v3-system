/**
 * Congame v3 d8 Exploding Dice Pool Resolution Helper
 * 
 * Rules Baseline:
 * - Roll N d8s
 * - 6, 7, and 8 are Hits
 * - 8s Explode (roll an additional d8 for each 8 rolled)
 * - 1s are Botches
 */
export async function rollCongamePool({ poolSize, label = 'Dice Pool Check', actor = null }) {
  if (!poolSize || poolSize < 1) poolSize = 1;

  let initialDice = [];
  let explodedDice = [];
  let totalHits = 0;
  let totalExplosions = 0;
  let totalBotches = 0;

  // 1. Initial Roll
  for (let i = 0; i < poolSize; i++) {
    const val = Math.floor(Math.random() * 8) + 1;
    initialDice.push(val);
    if (val >= 6) totalHits++;
    if (val === 8) totalExplosions++;
    if (val === 1) totalBotches++;
  }

  // 2. Resolve Exploding 8s recursively
  let pendingExplosions = totalExplosions;
  while (pendingExplosions > 0) {
    let currentRoundExplosions = 0;
    for (let i = 0; i < pendingExplosions; i++) {
      const val = Math.floor(Math.random() * 8) + 1;
      explodedDice.push(val);
      if (val >= 6) totalHits++;
      if (val === 8) currentRoundExplosions++;
      if (val === 1) totalBotches++;
    }
    pendingExplosions = currentRoundExplosions;
  }

  // 3. Render Custom Chat Message
  const templateData = {
    label,
    poolSize,
    totalHits,
    totalExplosions: explodedDice.length,
    totalBotches,
    initialDice,
    explodedDice,
    actorName: actor ? actor.name : 'Unknown Agent'
  };

  const html = await renderTemplate('systems/congame-v3/templates/chat/roll-card.hbs', templateData);

  const chatData = {
    user: game.user.id,
    speaker: ChatMessage.getSpeaker({ actor }),
    content: html,
    sound: CONFIG.sounds.dice
  };

  return ChatMessage.create(chatData);
}
