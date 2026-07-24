import { rollCongamePool } from '../dice.mjs';

/**
 * Custom Actor Sheet for Congame v3 Characters
 */
export class CongameActorSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['congame-v3', 'sheet', 'actor'],
      template: 'systems/congame-v3/templates/actor-sheet.hbs',
      width: 780,
      height: 720,
      tabs: [{ navSelector: '.sheet-tabs', contentSelector: '.sheet-body', initial: 'attributes' }]
    });
  }

  getData() {
    const context = super.getData();
    const actorData = context.data;

    context.system = actorData.system;
    context.flags = actorData.flags;

    // Derived Lethal HP, Stun HP, Initiative
    const physique = actorData.system.attributes.physique || 1;
    const focus = actorData.system.attributes.focus || 1;
    const reflexes = actorData.system.attributes.reflexes || 1;
    const insight = actorData.system.attributes.insight || 1;

    context.lethalHPMax = physique * 5 + 10;
    context.stunHPMax = focus * 5 + 10;
    context.initiativeBonus = reflexes + insight;

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    if (!this.isEditable) return;

    // Attribute Roll
    html.find('.roll-attribute').click(ev => {
      const attrKey = $(ev.currentTarget).data('attr');
      const attrVal = this.actor.system.attributes[attrKey] || 1;
      const label = `${attrKey.toUpperCase()} Attribute Check`;
      rollCongamePool({ poolSize: attrVal, label, actor: this.actor });
    });

    // Item Roll / Skill Roll
    html.find('.roll-skill').click(ev => {
      const itemId = $(ev.currentTarget).data('item-id');
      const item = this.actor.items.get(itemId);
      if (!item) return;

      const attr1 = item.system.attribute1 || 'finesse';
      const attr2 = item.system.attribute2 || 'focus';
      const val1 = this.actor.system.attributes[attr1] || 0;
      const val2 = this.actor.system.attributes[attr2] || 0;
      const basePool = val1 + val2;
      const totalPool = basePool + (item.system.bonusDice || 0);

      const label = `${item.name} Check (${attr1.toUpperCase()} + ${attr2.toUpperCase()})`;
      rollCongamePool({ poolSize: totalPool, label, actor: this.actor });
    });
  }
}
