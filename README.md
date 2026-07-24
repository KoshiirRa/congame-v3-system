# Congame v3 TTRPG - Official Foundry VTT Game System

Official Foundry VTT (v11 / v12 / v13+ compatible) game system for the **Congame v3 TTRPG**.

---

## 🎲 Core Features

- **Congame v3 d8 Exploding Dice Pool Resolution**:
  - Roll $N$ d8s.
  - $6, 7,$ and $8$ are **Hits**.
  - $8$s **Explode** (roll additional d8 for each 8 rolled).
  - $1$s are **Botches**.
  - Custom styled chat cards in Foundry chat log.
- **Dual Attribute Skill Pools**:
  - Skill dice pools derived from $\text{Attr}_1 + \text{Attr}_2$.
- **Terran Alliance Dark Navy Aesthetic**:
  - Overrides default Foundry parchment backgrounds with sleek dark navy (`#020838` / `#070e46`) and gold (`#ffd700`) styling matching the Congame v3 Character Manager.
- **Actor & Item DataModels**:
  - Full support for `character` and `npc` actors.
  - Support for `skill`, `talent`, `perk`, `weapon`, and `equipment` item documents.

---

## 🚀 Installation & Testing in Foundry VTT

1. Download the `system.json` manifest link or zip release from the [Releases](https://github.com/KoshiirRa/congame-v3-system/releases) page.
2. In Foundry VTT, go to **Game Systems** -> **Install System**.
3. Paste the Manifest URL:
   `https://github.com/KoshiirRa/congame-v3-system/releases/latest/download/system.json`
4. Click **Install**. Create a new World using the **Congame v3 TTRPG** system!

---

## 🛠️ Developer Setup (Local Symlink)

To link this repository directly into your local Foundry VTT installation:

```bash
# Windows PowerShell (Run as Administrator):
New-Item -ItemType SymbolicLink -Path "C:\Users\<User>\AppData\Local\FoundryVTT\Data\systems\congame-v3" -Target "C:\Users\concentus\Documents\Congame v3 Project 2\congame-v3-system"
```
