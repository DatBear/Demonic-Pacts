export interface LeagueQuickStat {
  label: string;
  value: string;
}

export interface LeagueSectionGroup {
  title: string;
  items: string[];
}

export interface EchoBossReveal {
  regionSlug: "asgarnia" | "varlamore" | "kandarin" | "kourend-kebos" | "fremennik" | "wilderness";
  regionName: string;
  bossName: string;
  bossWikiUrl: string;
  revealUrl?: string;
  knownDrops: {
    name: string;
    description?: string;
    url?: string;
  }[];
}

export interface RegionData {
  slug: string;
  name: string;
  strapline: string;
  summary: string;
  overview: string[];
  travelRestrictions: string[];
  keyDetails: LeagueSectionGroup[];
  unlocks: LeagueSectionGroup[];
  drops: LeagueSectionGroup[];
  cardHighlights: string[];
}

export interface RelicData {
  name: string;
  summary: string;
  toggleableEffect?: string;
  toggleableEffects?: string[];
  activeEffects: string[];
  notes: string[];
}

export interface RelicTierData {
  tier: number;
  title: string;
  passiveEffects: string[];
  status: string;
  relics: RelicData[];
}

export const leagueQuickStats: LeagueQuickStat[] = [
  {
    label: "Release",
    value: "April 15, 2026",
  },
  {
    label: "Duration",
    value: "56 days",
  },
  {
    label: "Format",
    value: "Ironman",
  },
  {
    label: "Unlock Path",
    value: "Karamja + 3 chosen regions",
  },
];

export const leagueRules: string[] = [
  "You begin in Yama's Lair and exit into Varlamore instead of Misthalin.",
  "Your character starts restricted to Varlamore, with Misthalin fully inaccessible throughout the league.",
  "Karamja is no longer free at the start. It force-unlocks when you earn your first area unlock, then you choose three more regions.",
  "All league characters are Ironmen and cannot trade or use the Grand Exchange.",
  "League XP is heavily boosted and continues scaling upward as you unlock relic tiers.",
  "Each area has an Echo Boss variant unlocked by obtaining an Echo Orb from the regular boss.",
  "Sailing is disabled for Leagues VI and brand-new 2026 content is enabled case-by-case.",
];

export const initialSetupGroups: LeagueSectionGroup[] = [
  {
    title: "Auto-Completed Quests",
    items: [
      "Dragon Slayer I",
      "Learning the Ropes",
      "The Restless Ghost",
      "Rune Mysteries",
      "Children of the Sun",
      "Desert Treasure II - The Fallen Empire",
      "Druidic Ritual",
      "Eagles' Peak",
      "Elemental Workshop I",
      "Fairytale I - Growing Pains",
      "Fairytale II - Cure a Queen",
      "Lost City",
      "Nature Spirit",
      "Perilous Moons",
      "Priest in Peril",
      "Twilight's Promise",
    ],
  },
  {
    title: "Starting Combat Achievements",
    items: ["Back to Our Roots", "Demonic Rebound"],
  },
  {
    title: "Starting Stats",
    items: ["3 Herblore", "5 Runecraft"],
  },
  {
    title: "Starter Utility",
    items: [
      "A Dramen staff is added to your inventory so Fairy Rings are available immediately.",
      "The Leagues Tutor in Yama's Lair can hand out a free spade, impling jar, and two Strange devices.",
      "The Leagues Tutor can also replace reclaimed utility items lost during the run.",
    ],
  },
];

export const tierOnePassives: string[] = [
  "All experience is multiplied by 5x.",
  "Items from eligible sources are 2x as common.",
  "Farming ticks occur every minute instead of every five minutes.",
  "Minigame points are boosted by 4x.",
  "Run energy never drains while running.",
  "Clue scrolls drop as stackable scroll boxes and clue-step progress is saved between clues.",
];

export const contentChangeGroups: LeagueSectionGroup[] = [
  {
    title: "Bosses and Monsters",
    items: [
      "Echo Boss rewards become guaranteed after a certain threshold.",
      "Chambers of Xeric: Challenge Mode, Theatre of Blood: Hard Mode, and Tombs of Amascut 500+ all have sharply increased difficulty and unique rates.",
      "When ToA or ToB rolls a unique, all players in the raid receive one.",
      "Wilderness bosses no longer require the Wilderness Medium Diary.",
      "Zulrah loses both the damage cap and melee damage immunity.",
      "Impling spawn rates are higher and rare implings are more common.",
      "Dragon implings drop reduced dragon bones.",
    ],
  },
  {
    title: "Items and Rewards",
    items: [
      "Most shop stock no longer depletes.",
      "Every Desert Treasure II boss can drop all Soulreaper axe pieces.",
      "Multi-region component drops become the finished item when necessary.",
      "Twisted bow, Scythe of vitur, and Tumeken's shadow can now appear from all three raids.",
      "Scythe of vitur only needs Blood runes to charge.",
      "Nihil shard quantities from Nex are increased.",
      "The Leagues Tutor in Yama's Lair can sell Max capes once you qualify.",
    ],
  },
  {
    title: "Access and Routing",
    items: [
      "The Abyss and Zanaris count as general regions and can be reached from anywhere via Fairy Rings.",
      "All Slayer Masters now assign from the same pool while respecting your unlocked regions.",
      "The Ancient Guthixian Temple can be entered from the Chasm of Tears without While Guthix Sleeps.",
      "Teleports and transport into locked regions are blocked.",
      "Your Player Owned House starts tied to Aldarin and can only be moved into regions you have unlocked.",
      "Unlocking an area can auto-complete quests and diary tasks without awarding quest XP, so self-completing them first can still matter.",
    ],
  },
  {
    title: "Miscellaneous",
    items: [
      "Forestry events are three times as likely to spawn.",
      "Pet transmogs now roll over between leagues.",
      "Collection log tasks ignore carried-over pets and their transmogs.",
    ],
  },
];

export const yamasLairNotes: string[] = [
  "Leagues VI opens inside a custom version of Yama's domain, where the tutorial and your first minutes take place.",
  "After the tutorial, the lair remains accessible and acts as a reusable early-game utility hub.",
  "A new stepping-stones agility course lets you train Agility from level 1 at roughly Draynor Rooftop pace, with a more punishing failure pattern.",
  "Casting Home Teleport returns you to Yama's Lair at any point during the league.",
];

export const echoBossReveals: EchoBossReveal[] = [
  {
    regionSlug: "asgarnia",
    regionName: "Asgarnia",
    bossName: "Cerberus",
    bossWikiUrl: "https://oldschool.runescape.wiki/w/Cerberus_(Echo)",
    knownDrops: [
      {
        name: "A new echo dagger",
        description: "Can ignite, scales with elemental weaknesses, and has a special attack.",
      },
    ],
  },
  {
    regionSlug: "varlamore",
    regionName: "Varlamore",
    bossName: "Amoxliatl",
    bossWikiUrl: "https://oldschool.runescape.wiki/w/Amoxliatl_(Echo)",
    knownDrops: [],
  },
  {
    regionSlug: "kandarin",
    regionName: "Kandarin",
    bossName: "Thermonuclear Smoke Devil",
    bossWikiUrl: "https://oldschool.runescape.wiki/w/Thermonuclear_smoke_devil_(Echo)",
    revealUrl: "https://x.com/OldSchoolRS/status/2037953009183826030",
    knownDrops: [
      {
        name: "Devil's Element",
        description: "A four-pronged main hand teased alongside a recognizable off-hand echo magic item.",
        url: "https://oldschool.runescape.wiki/w/Devil%27s_element",
      },
    ],
  },
  {
    regionSlug: "kourend-kebos",
    regionName: "Kourend",
    bossName: "Hespori",
    bossWikiUrl: "https://oldschool.runescape.wiki/w/Hespori_(Echo)",
    revealUrl: "https://x.com/OldSchoolRS/status/2038300320980140385",
    knownDrops: [
      {
        name: "A new short bow forged from tangled roots",
      },
    ],
  },
  {
    regionSlug: "fremennik",
    regionName: "Fremennik",
    bossName: "Dagannoth Kings",
    bossWikiUrl: "https://oldschool.runescape.wiki/w/Dagannoth_Kings_(Echo)",
    revealUrl: "https://x.com/OldSchoolRS/status/2038662854140703009",
    knownDrops: [
      {
        name: "A new best-in-slot Viking helmet",
      },
    ],
  },
  {
    regionSlug: "wilderness",
    regionName: "Wilderness",
    bossName: "King Black Dragon",
    bossWikiUrl: "https://oldschool.runescape.wiki/w/King_Black_Dragon_(Echo)",
    knownDrops: [
      {
        name: "A new echo crossbow",
        description: "Double-hits and applies Ice Barrage-like effects.",
      },
    ],
  },
];

export const varlamoreGroups: LeagueSectionGroup[] = [
  {
    title: "Bosses",
    items: [
      "Amoxliatl",
      "Doom of Mokhaiotl",
      "Gemstone Crab",
      "Hueycoatl",
      "Moons of Peril",
      "Sol Heredit in the Fortis Colosseum",
      "Vardorvis",
    ],
  },
  {
    title: "Notable Monsters",
    items: [
      "Ancient Zygomites",
      "Blue Dragons",
      "Brutal Blue Dragons",
      "Custodian Stalkers",
      "Frost Naguas",
      "Earthen Naguas",
      "Red Dragons",
      "Sulphur Naguas",
    ],
  },
  {
    title: "Quests",
    items: [
      "At First Light",
      "Death on the Isle",
      "The Final Dawn",
      "The Heart of Darkness",
      "Meat and Greet",
      "Perilous Moons",
      "The Ribbiting Tale of a Lily Pad Labour Dispute",
      "Scrambled!",
      "Shadows of Custodia",
      "Twilight's Promise",
      "Vale Totems",
    ],
  },
  {
    title: "Services and Shops",
    items: [
      "Anvil, furnace, loom, spinning wheel, tanner, and sawmill",
      "Archery, armour, axe, gem, helmet, magic, pickaxe, shield, staff, and sword shops",
      "General store, herb supplies, farming shop, fishing shop, crafting shop, and hunter shop",
      "House portal, stonemason, and charter ship",
      "Stalls for baker, fur, gem, silk, and spice theft",
      "Farming patches across the region",
    ],
  },
  {
    title: "Skilling Activities",
    items: [
      "Blessing Bone Shards",
      "Colossal Wyrm Agility Course",
      "Forestry",
      "Hunter Rumours",
      "Mastering Mixology",
      "Stealing Valuables",
      "Sunfire Runecrafting",
      "Vale Totems",
    ],
  },
];

export const varlamorePreparation: string[] = [
  "Your auto-completed quest set gives instant access to Fairy Rings and Zanaris, Cam Torum and the Moons of Peril, and Vardorvis.",
  "You can train Slayer immediately through Chaeldar in Zanaris, and all Slayer Masters use the same shared task logic across unlocked regions.",
  "The Yama's Lair stepping stones bridge the gap from level 1 until the Colossal Wyrm Agility Course opens up.",
  "Slayer equipment shops now stock elemental and anti-dragon shields.",
  "Fortis shops were expanded for league routing, including box traps, bird snares, and a hunting crossbow on the Sunset Coast charter ship.",
  "The Hunter's Guild bank works before At First Light is completed.",
  "Cows and Hill Giants in the region respawn faster to support the starting population.",
];

export const varlamoreDrops: string[] = [
  "All unique rewards from Moons of Peril",
  "All unique rewards from the Fortis Colosseum",
  "All unique rewards from Amoxliatl",
  "All unique rewards from Frost, Sulphur, and Earthen Nagua encounters",
  "All unique rewards from Hueycoatl",
  "All unique rewards from Vardorvis",
  "All unique rewards from Doom of Mokhaiotl",
  "All unique rewards from Vale Totems",
  "Pendant of Ates",
  "Rare loot sack rewards from the Hunter's Guild",
  "Tecu salamanders",
  "Antler guard from Custodian slayer creatures",
];

export const unlockableRegions: RegionData[] = [
  {
    slug: "asgarnia",
    name: "Asgarnia",
    strapline: "God Wars, utility skilling, and some of the league's biggest PvM spikes.",
    summary: "Asgarnia is a high-pressure combat pick with God Wars, Nex, Cerberus, Whisperer, and one of the cleanest utility spreads in the league.",
    overview: [
      "Asgarnia includes the kingdom itself, Entrana, the Pest Control islands, and Troll Country.",
      "Instanced areas and underground spaces with Asgarnian entrances are included.",
      "White Wolf Mountain access into Kandarin is blocked and most transport respects your unlocked-area state.",
    ],
    travelRestrictions: [
      "The Port Sarim to Draynor under-wall shortcut",
      "The Death Plateau to Fremennik rubble shortcut",
      "The Trollweiss to Keldagrim cave",
      "The Troll Stronghold to Wilderness rock climb",
      "The God Wars Dungeon to Wilderness rock climb",
      "The Taverley Dungeon ladder to the Water Obelisk",
      "The Taverley to Catherby tunnel",
      "The Entrana cave leading into the Wilderness",
    ],
    keyDetails: [
      {
        title: "Key Details",
        items: [
          "Settlements: Burthorpe, Falador, Port Sarim, Taverley, Rimmington, Entrana, Troll Stronghold, the Ruins of Camdozaal, and the Void Knights' Outpost.",
          "Combat: God Wars Dungeon with Nex, Cerberus, Giant Mole, The Whisperer, Warriors' Guild, Pest Control, Asgarnia Ice Dungeon, and Taverley Dungeon.",
          "Skilling and utility: Motherlode Mine, Mining Guild, Rogue's Den, Mahogany Homes, Crafting Guild, Falador farming patches, Troll Stronghold herb patch, and multiple rune altars.",
        ],
      },
    ],
    unlocks: [
      {
        title: "Quest Unlocks",
        items: ["Merlin's Crystal", "My Arm's Big Adventure", "Below Ice Mountain", "Dwarf Cannon"],
      },
      {
        title: "Auto-Completed Diaries and Extras",
        items: [
          "Falador Medium: Visit the Port Sarim Rat Pits.",
          "Falador Hard: Recharge prayer in Port Sarim church while wearing full Proselyte.",
          "Falador Elite: Purchase a white 2-handed sword from Sir Vyvin.",
          "The Frozen Door becomes completable if it was still pending.",
        ],
      },
    ],
    drops: [
      {
        title: "Priority Drops",
        items: [
          "All defenders from Cyclopes",
          "All uniques from Cerberus, Kree'arra, General Graardor, Commander Zilyana, K'ril Tsutsaroth, Nex, The Whisperer, and Superior Slayer Creatures",
          "Dragon boots from spiritual mages",
          "Smouldering stones from hellhounds",
        ],
      },
    ],
    cardHighlights: ["God Wars + Nex", "Cerberus + Whisperer", "Motherlode + Rogue's Den"],
  },
  {
    slug: "desert",
    name: "Desert",
    strapline: "Raid-heavy routing, Leviathan access, and one of the most warped late-game drop tables.",
    summary: "The Desert leans hard into Tombs of Amascut, Leviathan, strong utility skilling, and some of the most aggressive league-specific raid modifiers announced so far.",
    overview: [
      "The Kharidian Desert area covers the entire desert.",
      "The Emir's Arena is physically accessible but the minigame itself is disabled.",
      "Instanced desert areas are included and all transport continues to respect locked destinations.",
    ],
    travelRestrictions: [],
    keyDetails: [
      {
        title: "Key Details",
        items: [
          "Settlements: Bandit Camp, Necropolis, Ruins of Unkah, Bedabin Camp, Nardah, Pollnivneach, Uzer Oasis, Giants' Plateau, and Sophanem.",
          "Combat: Tombs of Amascut, The Leviathan, Kalphite Queen, bandits, and the Pollnivneach Slayer Dungeon.",
          "Skilling and utility: Guardians of the Rift, Tempoross, Mage Training Arena, Giants' Foundry, Agility Pyramid, Pyramid Plunder, Sorceress' Garden, Pollnivneach blackjacking, and sandstone or granite mining.",
        ],
      },
    ],
    unlocks: [
      {
        title: "Quest Unlocks",
        items: ["Desert Treasure II", "Prince Ali Rescue", "Icthlarin's Little Helper", "Temple of the Eye"],
      },
      {
        title: "Auto-Completed Diaries and Extras",
        items: [
          "Desert Medium: Travel to the desert via the eagle transport system.",
          "Desert Hard: Slay a dust devil with a Slayer helmet and refill waterskins with Lunar spells.",
          "Desert Elite: Bake a wild pie in Nardah and display the Kalphite Queen head in your house.",
          "A portal to Guardians of the Rift appears near the Mage Training Arena entrance.",
          "Combat Achievements: Tomb Explorer, Tomb Raider, Tomb Looter, Novice Tomb Explorer, Novice Tomb Raider, Novice Tomb Looter, Expert Tomb Looter, Expert Tomb Raider, and Insect Deflection.",
        ],
      },
    ],
    drops: [
      {
        title: "Priority Drops",
        items: [
          "ToA now supports two extra invocations and scales to raid level 1000.",
          "Pharaoh's sceptres from Pyramid Plunder",
          "Dragon chainbodies and dragon 2h swords from all sources",
          "Dust battlestaves from dust devils",
          "All uniques from Superior Slayer Creatures, Tombs of Amascut, The Leviathan, Tempoross, and Guardians of the Rift",
          "Dragon pickaxes from all sources",
        ],
      },
    ],
    cardHighlights: ["ToA up to 1000", "Leviathan", "Tempoross + GotR"],
  },
  {
    slug: "fremennik",
    name: "Fremennik",
    strapline: "Vorkath, Muspah, Duke, DKs, and some of the cleanest dragon progression in the league.",
    summary: "Fremennik bundles Vorkath, Phantom Muspah, Duke Sucellus, and Dagannoth Kings into one route with strong utility from Weiss, Lunar Isle, and Blast Furnace.",
    overview: [
      "Fremennik Province includes the mainland province, the Isles, Lunar Isle, and Weiss.",
      "Instanced and underground spaces entered from the province count as part of the region.",
      "The Rellekka bridge into Kandarin is blocked and travel systems remain unlock-aware.",
    ],
    travelRestrictions: [
      "The Sinclair Manor shortcut into Fremennik",
      "The Death Plateau rubble shortcut",
      "The Keldagrim tunnel cave leading toward Trollweiss",
      "The Lighthouse to Barbarian Outpost basalt shortcut",
    ],
    keyDetails: [
      {
        title: "Key Details",
        items: [
          "Settlements: Rellekka, Lunar Isle, Weiss, Keldagrim, Miscellania and Etceteria, Neitiznot and Jatizso, Waterbirth Island, and Ungael.",
          "Combat: Vorkath, The Phantom Muspah, Duke Sucellus, Dagannoth Kings, Basilisk Knights, Waterbirth Island Dungeon, and the Rellekka Slayer Cave.",
          "Skilling and utility: Blast Furnace, Kingdom Management, Rellekka rooftop, Penguin Agility, Astral Altar, Weiss herb patch, and the Rellekka house portal.",
          "Ice Gloves are granted automatically when you unlock the region and can be reclaimed later.",
        ],
      },
    ],
    unlocks: [
      {
        title: "Quest Unlocks",
        items: [
          "Secrets of the North",
          "Horror from the Deep",
          "Dragon Slayer II",
          "Mountain Daughter",
          "Fremennik Trials",
          "Fremennik Isles",
          "Olaf's Quest",
        ],
      },
      {
        title: "Auto-Completed Diaries and Extras",
        items: [
          "Fremennik Easy: Enter Troll Stronghold.",
          "Fremennik Medium: Mine gold in the Arzinian Mine and travel to the snowy hunter area via eagle.",
          "Fremennik Hard: Teleport to Trollheim.",
          "Fremennik Elite: Kill the four GWD generals and a spiritual mage in God Wars.",
          "Super Antifire potions unlock automatically.",
          "Combat Achievements: Versatile Drainer and More Than Just a Ranged Weapon.",
        ],
      },
    ],
    drops: [
      {
        title: "Priority Drops",
        items: [
          "Skeletal visages and dragonbone necklaces from Vorkath",
          "Draconic visages and dragon axes from all sources",
          "Full Dagannoth ring suite plus Seercull and mud battlestaves",
          "Basilisk jaws",
          "Leaf-bladed swords and battleaxes",
          "Brine sabres",
          "All uniques from Duke Sucellus, The Phantom Muspah, and Superior Slayer Creatures",
        ],
      },
    ],
    cardHighlights: ["Vorkath", "Muspah + Duke", "Dagannoth ring set"],
  },
  {
    slug: "kandarin",
    name: "Kandarin",
    strapline: "Broad skilling coverage, heavy Slayer value, and strong midgame utility density.",
    summary: "Kandarin is still one of the most flexible regions in the pool, offering excellent skilling breadth, strong Slayer payoffs, and reliable PvM progression without forcing a single lane.",
    overview: [
      "Kandarin includes the kingdom proper, Feldip Hills, Ape Atoll, and Crash Island.",
      "Taverley Dungeon and the Underground Pass are excluded even though the surrounding region counts.",
      "Nightmare Zone access is changed so points can be purchased from Dominic Onion for 1 GP each.",
      "White Wolf Mountain and the Fremennik bridge are hard-blocked by magical barriers.",
    ],
    travelRestrictions: [
      "The Underground Pass between Ardougne and Isafdar",
      "The Catherby to Taverley tunnel and grapple route",
      "The Sinclair Mansion shortcut into Fremennik",
      "The Arandar gates into Tirannwn",
      "The Barbarian Outpost to Lighthouse basalt shortcut",
      "The Mourner Headquarters doors into the Temple of Light",
    ],
    keyDetails: [
      {
        title: "Key Details",
        items: [
          "Settlements: Ardougne, Catherby, Seers' Village, Yanille, Ape Atoll, Corsair Cove, the Gnome strongholds, Piscatoris, and the Myths' Guild.",
          "Combat: Demonic gorillas, Kraken, Smoke Devils, Thermonuclear Smoke Devil, Barbarian Assault, Castle Wars, Waterfall Dungeon, and the Stronghold Slayer Cave.",
          "Skilling and utility: Ardougne market thieving, Barbarian Fishing, Catherby fishing, Chompy Bird Hunting, Fishing Trawler, Spirit Trees, Ourania and Wrath altars, Seers rooftop, and Yanille house portal.",
          "The East Ardougne General Store now stocks a Wrath talisman.",
        ],
      },
    ],
    unlocks: [
      {
        title: "Quest Unlocks",
        items: ["Monkey Madness II", "Swan Song", "King's Ransom", "Dragon Slayer II"],
      },
      {
        title: "Auto-Completed Diaries and Extras",
        items: [
          "Kandarin diary skips cover the Water Obelisk grapple, charging a water orb, killing a shadow hound, cooking sharks in Catherby, and teleporting to Catherby.",
          "Western Provinces diary skips cover the full Pest Control ladder, the Isafdar painting, and a complete Void set task.",
          "Ardougne diary skips cover the combat training camp, Wilderness lever, Castle Wars balloon, Bert's sand, upgraded Iban's staff, Legends' Guild jewellery recharge, dragon square shield smithing, Death altar runecrafting, Salve amulet imbue, and Ice Barrage in Castle Wars.",
          "Combat Achievement: Hitting Them Where it Hurts.",
          "Alfred Grimhand's Barcrawl also pre-completes The Rising Sun and The Rusty Anchor.",
        ],
      },
    ],
    drops: [
      {
        title: "Priority Drops",
        items: [
          "Angler's outfit from Fishing Trawler",
          "Zenyte shards and ballista parts from Glough's Experiments",
          "Monkey tails from Maniacal Monkeys",
          "Trident of the seas and Kraken tentacles",
          "Occult necklaces and smoke battlestaves",
          "Dragon chainbodies and dragon full helms",
          "Warped sceptres",
          "All uniques from Superior Slayer Creatures",
          "Smouldering stones from hellhounds",
        ],
      },
    ],
    cardHighlights: ["Kraken + Smoke Devils", "Ardougne skilling", "MM2 + zenytes"],
  },
  {
    slug: "karamja",
    name: "Karamja",
    strapline: "Your guaranteed unlock, with Construction routing, Inferno access, and strong early resource utility.",
    summary: "Karamja is the forced first unlock after Varlamore, giving everyone Brimhaven housing, TzHaar progression, and a compact package of skilling staples.",
    overview: [
      "Karamja includes the island, Crandor, and the Realm of the Fisher King.",
      "Underground and instanced areas entered from Karamja are included.",
      "Buying a Player Owned House here places it in Brimhaven so Construction can start from level 1.",
    ],
    travelRestrictions: [],
    keyDetails: [
      {
        title: "Key Details",
        items: [
          "Settlements: Brimhaven, Musa Point, Karamja Shipyard, Shilo Village, Tai Bwo Wannai, and Mor Ul Rek.",
          "Combat: Brimhaven Dungeon, Tai Bwo Wannai Dungeon, Fight Caves, Fight Pits, TzHaar creatures, TzHaar-Ket-Rak's Challenges, and Inferno.",
          "Skilling and utility: Brimhaven Agility Arena, Karambwan fishing, infernal eels, teak and mahogany cutting, the Nature altar, Brimhaven house portal, calquat and fruit tree patches, Tai Bwo Wannai Cleanup, and TzHaar thieving.",
        ],
      },
    ],
    unlocks: [
      {
        title: "Quest Unlocks",
        items: ["Shilo Village"],
      },
      {
        title: "Auto-Completed Diaries and Extras",
        items: [
          "Karamja Easy: Travel by dock to Port Sarim and by port to Ardougne.",
          "Karamja Medium: Use the Gnome Glider, charter from the shipyard, and charter the Lady of the Waves.",
          "Karamja Hard: Eat an oomlie wrap, collect five palm leaves, and kill a deathwing under Kharazi Jungle.",
          "Karamja Elite: Create an anti-venom potion in the Horseshoe Mine.",
          "TzHaar-Ket-Rak allows all of his challenges immediately.",
        ],
      },
    ],
    drops: [
      {
        title: "Priority Drops",
        items: [
          "All TzHaar equipment from TzHaar sources",
          "Obsidian helmet, platelegs, and platebody from TzHaar-Ket",
          "Draconic visages from all sources",
          "All uniques from Superior Slayer Creatures",
          "Gout tubers",
        ],
      },
    ],
    cardHighlights: ["Guaranteed first unlock", "Inferno route", "Brimhaven house"],
  },
  {
    slug: "kourend-kebos",
    name: "Kourend and Kebos",
    strapline: "A raid-and-slayer package backed by Wintertodt, Aerial Fishing, and guild utility.",
    summary: "Kourend and Kebos remains a premium high-end PvM region thanks to CoX, Hydras, and shamans, while also carrying excellent skilling infrastructure and guild coverage.",
    overview: [
      "The region covers the entirety of Kourend and Kebos.",
      "Instanced areas and underground spaces entered from Kourend or Kebos are included.",
      "Charter ships, Fairy Rings, balloons, gliders, and similar transport all respect locked-region routing.",
    ],
    travelRestrictions: [],
    keyDetails: [
      {
        title: "Key Details",
        items: [
          "Settlements: Hosidius, Arceuus, Lovakengj, Port Piscarilius, Shayzien, Kingstown, Mount Karuulm, Kebos Swamp, Mount Quidamortem, and the Northern Tundras.",
          "Combat: Chambers of Xeric, Mount Karuulm Slayer Dungeon, Sarachnis, Catacombs of Kourend, Giants' Den, and lizardman shamans.",
          "Skilling and utility: Farming Guild, Woodcutting Guild, Arceuus Library, Tithe Farm, Lake Molch, Aerial Fishing, Wintertodt, Hosidius patches, Soul and Blood altars, Blast Mine, and the Hosidius house portal.",
          "Konar's Slayer assignments update dynamically based on your unlocked regions.",
        ],
      },
    ],
    unlocks: [
      {
        title: "Quest Unlocks",
        items: ["A Kingdom Divided"],
      },
      {
        title: "Auto-Completed Diaries and Extras",
        items: [
          "Kourend and Kebos Hard: Cast Monster Examine on a mountain troll south of Mount Quidamortem.",
          "Combat Achievements: Chambers of Xeric Veteran, Master, Grandmaster, CM Master, CM Grandmaster, Demonbane Weaponry, and No Pressure.",
        ],
      },
    ],
    drops: [
      {
        title: "Priority Drops",
        items: [
          "CoX Challenge Mode gains 25% extra damage and defence, 50% more monster HP, and a 3x unique multiplier.",
          "Arcane and Dexterous scrolls are weighted at 5 instead of 20 in CM.",
          "All uniques from Chambers of Xeric and Wintertodt",
          "Dragon thrownaxes, dragon knives, dragon swords, and dragon harpoons from drakes, hydras, and wyrms",
          "Hydra uniques including claw, leather, eye, heart, fang, and tail",
          "Dragon warhammers, draconic visages, Sarachnis cudgels, bottomless compost buckets, Brimstone Chest uniques, Superior Slayer uniques, Hespori seeds, and golden tenches",
        ],
      },
    ],
    cardHighlights: ["CoX + CM buffs", "Hydra + shamans", "Wintertodt + guilds"],
  },
  {
    slug: "morytania",
    name: "Morytania",
    strapline: "Barrows, ToB, Nightmare, Sepulchre, and one of the strongest endgame loot packages in the league.",
    summary: "Morytania combines elite endgame PvM with some of the best niche skilling and utility in the game, and its league drop modifiers make the region especially explosive.",
    overview: [
      "Morytania includes the mainland, Mos Le'Harmless, Braindeath Island, Dragontooth Island, and Harmony Island.",
      "Instanced and underground content entered from Morytania counts as part of the region.",
      "Transport options stay locked to your available regions and the Paterdomus exits into Misthalin are blocked.",
    ],
    travelRestrictions: [
      "The Paterdomus agility railing into Misthalin",
      "The Paterdomus stair route back up into Misthalin",
    ],
    keyDetails: [
      {
        title: "Key Details",
        items: [
          "Settlements: Canifis, Darkmeyer, Meiyerditch, Port Phasmatys, Mort'ton, Burgh de Rott, Slepe, and Ver Sinhaza.",
          "Combat: Barrows, Grotesque Guardians, Cave Horrors, Nightmare of Ashihama, Theatre of Blood, Vyrewatch Sentinels, Shades of Mort'ton, Slayer Tower, and Fenkenstrain's Experiments.",
          "Skilling and utility: Hallowed Sepulchre, the True Blood Altar, Daeyalt mining, Ectofuntus, Temple Trekking, Canifis rooftop, Werewolf agility, Harmony herb patch, and Vyre pickpocketing.",
          "Canifis General Store now stocks a Blood talisman.",
        ],
      },
    ],
    unlocks: [
      {
        title: "Quest Unlocks",
        items: ["Taste of Hope", "The Great Brain Robbery", "Ghosts Ahoy"],
      },
      {
        title: "Auto-Completed Diaries and Extras",
        items: [
          "Morytania Medium: Make cannonballs at Port Phasmatys.",
          "Morytania Hard: Use the Kharyrll portal in your house and pray at the Nature Grotto altar with Piety.",
          "Morytania Elite: Barehand a shark in Burgh de Rott and fertilize the Morytania herb patch with Lunar spells.",
          "Combat Achievements: Theatre of Blood Veteran, Master, Grandmaster, HM Grandmaster, Chally Time, Nylocas On the Rocks, and Faithless Crypt Run.",
        ],
      },
    ],
    drops: [
      {
        title: "Priority Drops",
        items: [
          "Theatre of Blood Hard Mode and Phosani's Nightmare gain 25% more damage and defence, 50% more monster HP, and a 2x extra unique multiplier.",
          "Black masks, Barrows items, Granite Gloves, Granite Hammers, Granite Rings, Dark Tourmaline Cores, Rings of Endurance, and Blood Shards",
          "All uniques from Theatre of Blood, Nightmare, Araxxor and Araxytes, and Superior Slayer Creatures",
          "Zealot robes, runescrolls, Granite Mauls, and Brittle Keys",
        ],
      },
    ],
    cardHighlights: ["ToB + Nightmare", "Barrows + Sepulchre", "Blood shard route"],
  },
  {
    slug: "tirannwn",
    name: "Tirannwn",
    strapline: "Prifddinas access, crystal seed economy, Zalcano, Gauntlet, and Zulrah in one lane.",
    summary: "Tirannwn is one of the cleanest specialist unlocks in the league, packing Prif, crystal progression, Zalcano, and Gauntlet seed hunting into a single region.",
    overview: [
      "Tirannwn covers the whole region, the Temple of Light, and the Underground Pass.",
      "Instanced and underground content entered from Tirannwn counts.",
      "Travel into Kandarin via Arandar or the Underground Pass stays locked behind region ownership.",
    ],
    travelRestrictions: [
      "The Arandar gate into Kandarin",
      "The Mourner Headquarters entrance by the Temple of Light",
      "The Underground Pass exit into West Ardougne",
    ],
    keyDetails: [
      {
        title: "Key Details",
        items: [
          "Settlements: Prifddinas, Lletya, Iorwerth Camp, Gwenith, Tyras Camp, and Zul-Andra.",
          "Combat: Zulrah, The Gauntlet, Iorwerth Slayer Dungeon, and A Rabbit.",
          "Skilling and utility: Zalcano, Prifddinas agility, thieving, house portal, hardwoods, hunting grounds, crystal implings, allotment patch, Sacred Eels, Lletya fruit tree, Enhanced Crystal Chest, and the Death Altar.",
        ],
      },
    ],
    unlocks: [
      {
        title: "Quest Unlocks",
        items: ["Song of the Elves"],
      },
      {
        title: "Auto-Completed Achievements",
        items: ["Combat Achievement: Snake Rebound."],
      },
    ],
    drops: [
      {
        title: "Priority Drops",
        items: [
          "Zalcano uses MVP weighting for unique drop-rate modifiers.",
          "Elven signets, crystal armour seeds, crystal weapon seeds, enhanced crystal weapon seeds, crystal tool seeds, and Zalcano shards",
          "Tanzanite fangs, magic fangs, serpentine visages, and onyxes from Zulrah",
          "Dark bows, dragonstone armour, enhanced crystal teleport seeds, mist battlestaves, leaf-bladed battleaxes and swords, and Superior Slayer uniques",
        ],
      },
    ],
    cardHighlights: ["Prifddinas", "Gauntlet + Zulrah", "Crystal economy"],
  },
  {
    slug: "wilderness",
    name: "Wilderness",
    strapline: "High-risk routing without real PvP punishment, plus Revenants, singles bosses, and Corp value.",
    summary: "The Wilderness keeps its bossing and drop upside while league death rules strip away much of the usual PvP tax, making it far more practical as a progression pick.",
    overview: [
      "The region covers the entire Wilderness.",
      "Last Man Standing and Bounty Hunter are disabled for the league.",
      "PvP deaths behave like PvM deaths, sending lost items to a gravestone that relocates to your respawn point.",
      "Loot keys are disabled on league worlds.",
    ],
    travelRestrictions: [
      "Crossing the Wilderness Ditch into an area you have not unlocked",
      "Using the Deserted Keep lever into a locked destination",
    ],
    keyDetails: [
      {
        title: "Key Details",
        items: [
          "Settlements: Ferox Enclave, Mage Arena, Rogues' Castle, Dark Warriors' Fortress, Bandit Camp, and the Pirates' Hideout.",
          "Combat: Callisto and Artio, Venenatis and Spindel, Vet'ion and Calvar'ion, Chaos Elemental, Chaos Fanatic, Corporeal Beast, Crazy Archaeologist, KBD, Scorpia, Lava Dragons, Wilderness GWD, and the Wilderness Slayer Cave.",
          "Skilling and utility: Black chinchompas, black salamanders, dark crabs, Fountain of Rune, Chaos Altar, Wilderness Agility, Wilderness Resource Area, Rogue Chests, and the Air and Earth obelisks.",
          "Revenant Caves and Wilderness Agility are free to enter.",
          "Dying does not reset your Wilderness Agility lap count.",
          "Krystilia uses the shared Slayer system, and Wilderness Slayer targets can drop Larran's Keys.",
        ],
      },
    ],
    unlocks: [
      {
        title: "Quest Unlocks",
        items: ["Enter the Abyss"],
      },
      {
        title: "Auto-Completed Diaries and Extras",
        items: [
          "Wilderness Medium: Smith a gold helmet in the resource area.",
          "Wilderness Hard: Use the Trollheim agility shortcut and catch a lava eel.",
          "Wilderness Elite: Teleport to Ghorrock.",
          "Combat Achievement: Finding the Weak Spot.",
        ],
      },
    ],
    drops: [
      {
        title: "Priority Drops",
        items: [
          "All unique rewards from Revenants",
          "Malediction and Odium shards",
          "Fedoras from Crazy Archaeologist",
          "Dragon boots, dragon 2h swords, dragon pickaxes, draconic visages, Amulets of Eternal Glory, Dagon'hai robes, and Smouldering Stones",
          "All uniques from Venenatis, Callisto, Vet'ion, Zombie Pirates and their lockers, Elder Chaos Druids, the Corporeal Beast, and Superior Slayer Creatures",
        ],
      },
    ],
    cardHighlights: ["League-safe PvP deaths", "Revenants + singles bosses", "Corp + agility value"],
  },
];

export const relicTiers: RelicTierData[] = [
  {
    tier: 1,
    title: "Starter Relics",
    passiveEffects: tierOnePassives,
    status: "Officially revealed on March 23, 2026.",
    relics: [
      {
        name: "Endless Harvest",
        summary: "A resource-routing relic built around passive banked gathering and doubled yield from the three classic gathering skills.",
        toggleableEffect: "All resources gathered will be sent to the bank.",
        activeEffects: [
          "You can endlessly gather from fishing spots, trees, and mining rocks even if they deplete after your initial interaction.",
          "Resources gathered from Fishing, Woodcutting, and Mining are multiplied by 2.",
          "XP is granted for all additional resources gathered.",
        ],
        notes: [],
      },
      {
        name: "Barbarian Gathering",
        summary: "A hands-free gathering relic that converts utility friction into raw tempo and adds a knapsack-based inventory extension.",
        toggleableEffect: "The Dispose option asks what to destroy.",
        activeEffects: [
          "You can chop wood, mine rocks, and fish with your bare hands without tools or bait.",
          "Your hands count as the crystal version of those tools where crystal tools exist.",
          "Whenever you gain Fishing, Woodcutting, or Mining XP while gathering, you also gain an extra 10% XP in both Strength and Agility.",
          "Up to three different gathered item types can be stored in the Knapsack, with a total capacity of 140.",
          "Failed mining, fishing, and chopping actions each get a separate 50% chance to succeed instead.",
        ],
        notes: [
          "Choosing the relic grants the Knapsack immediately.",
          "The Knapsack can be reclaimed from the Leagues Tutor in Yama's Lair if lost.",
        ],
      },
      {
        name: "Abundance",
        summary: "An economy-and-XP relic that snowballs non-combat progression while turning every XP drop into direct coin generation.",
        toggleableEffect: "Coins generated will be put into your inventory.",
        activeEffects: [
          "All non-combat skills are permanently boosted by 10.",
          "Every time you receive an XP drop, you gain an additional 2 XP in the same skill. This is affected by the league passive XP modifier.",
          "For every XP gained, you gain 2x as many coins. These can go either to your bank or to your inventory if there is room.",
        ],
        notes: [],
      },
    ],
  },
  {
    tier: 2,
    title: "Tier 2",
    passiveEffects: ["XP multiplier increases from 5x to 8x."],
    status: "The Tier 2 relics Woodsman and Hotfoot have been revealed.",
    relics: [
      {
        name: "Woodsman",
        summary: "A gathering relic focused on Woodcutting, Fletching, and Hunter, with guaranteed catches, faster traps, and automated log burning.",
        toggleableEffects: [
          "Hunter traps harvest directly to your bank.",
          "Logs chopped will be automatically burned.",
        ],
        activeEffects: [
          "All items are processed at once while Fletching. Stackable Fletching items are capped at 10x the regular amount per action.",
          "Chopped logs are automatically burned while Woodcutting, granting full Firemaking XP. This effect can be toggled above.",
          "Hunter actions have a 100% success rate.",
          "Traps attract animals faster and give double loot and XP.",
          "Traps always drop a random herb seed or tree seed when harvested.",
          "Hunter rumours give double XP and Hunters' loot sacks award 2x as much loot.",
          "All loot from jarred implings is doubled and noted, and the jars no longer break when opened.",
          "Quetzal whistles no longer lose charges.",
        ],
        notes: [],
      },
      {
        name: "Hotfoot",
        summary: "An Agility-centered skilling relic that grants the Searing boots, turns movement into XP, and heavily upgrades course rewards and success rates.",
        toggleableEffect: "Upon choosing this relic, you receive the Searing boots.",
        activeEffects: [
          "While the Searing boots are worn, you gain Agility experience based on your Agility level while you run.",
          "While the Searing boots are worn, caught fish are automatically cooked.",
          "While the Searing boots are worn, mined ore is automatically smelted.",
          "Picking up some Termites or a Mark of grace from a course will automatically complete the lap, granting completion XP and 10,000 coins.",
          "Marks of grace always have a 33% chance to spawn on all rooftop courses.",
          "Completing a course grants double completion count and 25% bonus experience.",
          "You have a 100% success rate on all Agility and Cooking actions.",
          "You receive 2x Termites from the Colossal Wyrm Agility Course.",
          "You receive 10x Crystal shards from the Prifddinas Agility Course.",
        ],
        notes: ["The Searing boots can be retrieved from the Leagues Tutor in Yama's Lair if lost."],
      },
    ],
  },
  {
    tier: 3,
    title: "Tier 3",
    passiveEffects: [
      "Combat skills, including Hitpoints and Prayer, gain a 1.5x multiplier that stacks multiplicatively with other modifiers.",
      "Bigger and Badder is unlocked for free.",
      "Slayer points are multiplied by 5 and you no longer need five starter tasks before earning points.",
      "Superior Slayer rates improve to a 1 in 50 chance.",
    ],
    status: "The Tier 3 relics Evil Eye and Map of Alacrity have been revealed.",
    relics: [
      {
        name: "Evil Eye",
        summary: "A combat-routing relic that grants the Evil Eye, giving direct teleports to boss and raid entrances from the Combat Achievements list.",
        toggleableEffect: "Upon choosing this relic, you receive the Evil Eye.",
        activeEffects: [
          "The Evil Eye lets you teleport to the entrance of any boss or raid listed in the Combat Achievements interface.",
          "Barrows teleports can send you either to the chest or back to the surface.",
          "You can teleport to each Moon of Peril individually.",
          "The Evil Eye ignores Wilderness teleport restrictions.",
          "The Evil Eye cannot teleport you into an area you have not unlocked.",
        ],
        notes: ["The Evil Eye can be retrieved from the Leagues Tutor in Yama's Lair if lost."],
      },
      {
        name: "Map of Alacrity",
        summary: "A mobility relic that grants the Map of alacrity, letting you teleport to Agility shortcuts while still enforcing shortcut and location requirements.",
        toggleableEffect: "Upon choosing this relic, you receive the Map of alacrity.",
        activeEffects: [
          "The Map of alacrity lets you teleport to Agility shortcuts.",
          "You are sent to the less favourable side of the shortcut, or to the starting side if it is one-way.",
          "Teleports can only be used if you meet all requirements to reach their location.",
          "Shortcuts retain all of their usual requirements.",
          "The Map of alacrity ignores Wilderness teleport restrictions.",
        ],
        notes: ["The Map of alacrity can be retrieved from the Leagues Tutor in Yama's Lair if lost."],
      },
    ],
  },
  {
    tier: 4,
    title: "Tier 4",
    passiveEffects: [
      "Eligible item drops increase from 2x to 5x as common.",
      "Minigame point boosts increase from 4x to 8x.",
    ],
    status: "The Tier 4 relic Conniving Clues has been revealed.",
    relics: [
      {
        name: "Conniving Clues",
        summary: "A clue-focused relic that generates teleport contracts from caskets, improves clue source rates, and compresses every clue down to its shortest possible route.",
        activeEffects: [
          "When opening a Reward casket, you have a 1/3 chance to receive Clue contracts which can be consumed to teleport to your current clue step.",
          "Beginner clues give 0-2 contracts at a time.",
          "Easy clues give 1-4 contracts at a time.",
          "Medium clues give 1-5 contracts at a time.",
          "Hard clues give 1-7 contracts at a time.",
          "Elite clues give 1-9 contracts at a time.",
          "Master clues give 1-10 contracts at a time.",
          "Reward caskets also have a 1/4 chance to contain a clue scroll box of the same tier.",
          "Clues from creatures and impling jars now have a drop rate of 1/15.",
          "Clue vessels obtained from skilling, such as clue geodes and clue nests, are 10x more likely to drop.",
          "All clues have the lowest possible number of steps and will give the maximum amount of reward rolls.",
        ],
        notes: [],
      },
    ],
  },
  {
    tier: 5,
    title: "Tier 5",
    passiveEffects: ["XP multiplier increases from 8x to 12x."],
    status: "The Tier 5 relics Nature's Accord and Larcenist have been revealed.",
    relics: [
      {
        name: "Nature's Accord",
        summary: "A farming and travel relic that grants the Fairy mushroom, removing patch level requirements, massively increasing yields, and opening direct teleports to every Fairy Ring, Spirit Tree, and tool leprechaun.",
        toggleableEffect: "Upon choosing this relic, you receive the Fairy mushroom.",
        activeEffects: [
          "Farming patches and plants no longer have any level requirements to harvest, plant, or make.",
          "You receive 10x yield from all farming patches and it is automatically noted.",
          "XP is granted for all additional resources gathered.",
          "Your plants never die.",
          "You have a 20% chance to not use a seed or sapling when planting crops in patches.",
          "The Fairy mushroom lets you teleport to any Fairy Ring, Spirit Tree, or tool leprechaun.",
          "Unlocking this relic auto-completes Tree Gnome Village.",
          "The Fairy mushroom ignores Wilderness teleport restrictions.",
          "The Fairy mushroom cannot teleport you to an area you have not unlocked.",
        ],
        notes: ["The Fairy mushroom can be retrieved from the Leagues Tutor in Yama's Lair if lost."],
      },
      {
        name: "Larcenist",
        summary: "A thieving relic that guarantees successful steals, automates repeat actions, notes stolen goods, and heavily boosts core Thieving loot.",
        activeEffects: [
          "All Thieving actions have a 100% success rate.",
          "You automatically repeat pickpocket attempts on NPCs.",
          "You automatically repeat stall thefts.",
          "Items stolen from pickpocketing and stalls are automatically noted.",
          "Stalls never deplete, and guards will not stop you while stealing from them.",
          "Your coin pouch capacity is increased by 10x.",
          "Pickpocketing loot is increased by 10x, excluding scrolls.",
          "Stall loot is increased by 10x.",
          "House valuables stolen in Varlamore are increased by 10x.",
        ],
        notes: [],
      },
    ],
  },
  {
    tier: 6,
    title: "Tier 6",
    passiveEffects: ["No passive effect has been announced yet."],
    status: "The Tier 6 relics Culling Spree and Grimoire have been revealed.",
    relics: [
      {
        name: "Culling Spree",
        summary: "A Slayer relic built around task selection control, boss-task access, and a large bundle of superior, clue, and reward-store bonuses.",
        activeEffects: [
          "When you are assigned a Slayer task, you can choose from three different options.",
          "You can also choose how many monsters you wish to slay, from 5 to 200.",
          "Where possible, at least one of the choices will be a boss Slayer task.",
          "Upon slaying a superior Slayer monster, there is a 50% chance that another superior will spawn.",
          "Superior Slayer creatures always drop 1-3 elite clue scrolls.",
          "You gain all of the effects of a Slayer helmet without needing to wear one.",
          "You can purchase any of the Slayer reward store perks for free.",
          "Rune pouches, herb sacks, and looting bags can be purchased for free from the Slayer reward store.",
        ],
        notes: [],
      },
      {
        name: "Grimoire",
        summary: "A utility relic centered on full spellbook and prayer access, with instant spellbook swapping and built-in necromancy support through the Arcane grimoire.",
        toggleableEffect: "Upon choosing this relic, you receive the Arcane grimoire.",
        activeEffects: [
          "The Grimoire can be used to freely swap between spellbooks.",
          "The Grimoire acts as a Book of the dead.",
          "You unlock access to all prayers and spells, regardless of area, quest, or diary requirements.",
        ],
        notes: ["The Arcane grimoire can be retrieved from the Leagues Tutor in Yama's Lair if lost."],
      },
    ],
  },
  {
    tier: 7,
    title: "Tier 7",
    passiveEffects: ["XP multiplier increases from 12x to 16x."],
    status: "The Tier 7 relic Reloaded has been revealed.",
    relics: [
      {
        name: "Reloaded",
        summary: "A flexibility relic that lets you take an extra relic pick from any lower tier, effectively reopening your build path late in the run.",
        activeEffects: ["Choose another Relic from any tier below this one."],
        notes: [],
      },
    ],
  },
  {
    tier: 8,
    title: "Tier 8",
    passiveEffects: ["No passive effect has been announced yet."],
    status: "The Tier 8 relics Minion and Flask of Fervour have been revealed.",
    relics: [
      {
        name: "Minion",
        summary: "A summoning relic that grants a Minion whistle, letting you call a durable combat companion with fixed stats, item-fueled scaling, and configurable auto-looting.",
        toggleableEffect: "Upon choosing this relic, you receive the Minion whistle.",
        activeEffects: [
          "The whistle lets you summon a powerful Minion which lasts for 30 minutes.",
          "The Minion attacks your target with whatever style it is weakest to.",
          "In multi-combat, the Minion casts an AOE attack if the target is weakest to Ranged or Magic.",
          "The Minion's base stats are: Min hit 3, max hit 10, attack speed 1.8, and accuracy 45,000.",
          "The whistle can consume up to 5 unique equippable Zamorak items, increasing your Minion's max hit by 2 per unique item.",
          "The Minion automatically loots items from creatures you kill, including fired range ammo.",
          "A minimum value threshold and whether or not items should be noted is configurable on the whistle.",
          "The Minion deals damage to targets which are immune to thralls.",
          "The Minion does not fight in PvP and does not fight against Yama.",
        ],
        notes: ["The Minion whistle can be retrieved from the Leagues Tutor in Yama's Lair if lost."],
      },
      {
        name: "Flask of Fervour",
        summary: "A panic-button combat relic that grants the Flask of Fervour, restoring your core combat resources before triggering a brief invulnerability window and Prayer-scaled explosions around you.",
        toggleableEffect: "Upon choosing this relic, you receive the Flask of Fervour.",
        activeEffects: [
          "When the Flask is consumed, your Hitpoints are restored to full.",
          "When the Flask is consumed, your Prayer points are restored to full.",
          "When the Flask is consumed, your special attack energy is restored to full.",
          "Over the next 2.4 seconds, the sigil triggers three explosions which deal 60% of your base Prayer level as typeless damage to all enemies within 3 tiles of you.",
          "In PvP, those explosions deal 30% of your base Prayer level instead.",
          "During that 2.4 second window, all damage you take is reduced to 0.",
          "The sigil does not deal damage to Yama.",
          "The Flask has a base cooldown of 3 minutes.",
          "For every 10 damage you deal in a single hit, the cooldown is reduced by 0.6 seconds.",
        ],
        notes: ["The Flask of Fervour can be retrieved from the Leagues Tutor in Yama's Lair if lost."],
      },
    ],
  },
];

export function getRegionBySlug(regionSlug: string | undefined) {
  return unlockableRegions.find(region => region.slug === regionSlug);
}