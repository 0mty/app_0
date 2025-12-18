import Category from "../interface/category";
import Game from "../interface/game";

export const CATEGORIES = [
  new Category(
    "c1",
    "ALL SPORTS",
    "https://store.fastly.steamstatic.com/categories/image/category/sports?cc=MN&l=english"
  ),
  new Category(
    "c2",
    "ACTION",
    "https://store.fastly.steamstatic.com/categories/image/category/action?cc=MN&l=english"
  ),
  new Category(
    "c3",
    "HORROR",
    "https://store.fastly.steamstatic.com/categories/image/category/horror?cc=MN&l=english"
  ),
  new Category(
    "c4",
    "CASUAL",
    "https://store.fastly.steamstatic.com/categories/image/category/casual?cc=MN&l=english"
  ),
  new Category(
    "c5",
    "SURVIVAL",
    "https://store.fastly.steamstatic.com/categories/image/category/survival?cc=MN&l=english"
  ),
];

export const GAMES = [
  // g1 – NBA 2K25
  new Game(
    "g1",
    ["c1", "c4"], // SPORTS, CASUAL
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2878980/header.jpg?t=1754665445",
    "NBA 2K25",
    69.99,
    "Visual Concepts",
    "2K",
    "06 Sep, 2024",
    "Experience next-gen basketball with enhanced gameplay, new modes, and improved online competition.",
    0
  ),

  // g2 – WWE 2K25
  new Game(
    "g2",
    ["c1", "c2", "c4"],
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2878960/header.jpg?t=1762971645",
    "WWE 2K25",
    69.99,
    "Visual Concepts",
    "2K",
    "14 Mar, 2025",
    "Step into the world of WWE with updated rosters, Showcase mode, and expanded gameplay features.",
    0
  ),

  // g3 – F1 24
  new Game(
    "g3",
    ["c1"],
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2488620/header.jpg?t=1748912330",
    "EA SPORTS™ F1® 24",
    69.99,
    "Codemasters",
    "Electronic Arts",
    "31 May, 2024",
    "Race in the official 2024 Formula 1 season with authentic tracks, teams, and drivers.",
    0
  ),

  // g4 – Rust
  new Game(
    "g4",
    ["c1", "c3", "c5"],
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/252490/header.jpg?t=1761667247",
    "Rust",
    39.99,
    "Facepunch Studios",
    "Facepunch Studios",
    "08 Feb, 2018",
    "Survive in a harsh open world against players, wildlife, and hunger. Build, craft, and fight.",
    0
  ),

  // g5 – Elden Ring
  new Game(
    "g5",
    ["c2"],
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg?t=1748630546",
    "ELDEN RING",
    59.99,
    "FromSoftware Inc.",
    "Bandai Namco Entertainment",
    "24 Feb, 2022",
    "Explore a vast open world full of dangerous enemies, bosses, and powerful magic in this action RPG.",
    0
  ),

  // g6 – Resident Evil 4 Remake
  new Game(
    "g6",
    ["c2", "c3", "c5"],
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg?t=1736385712",
    "Resident Evil 4",
    59.99,
    "CAPCOM",
    "CAPCOM",
    "23 Mar, 2023",
    "Leon Kennedy returns in this modern survival-horror remake with intense combat and atmospheric tension.",
    0
  ),

  // g7 – Phasmophobia
  new Game(
    "g7",
    ["c3", "c5"],
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/739630/header.jpg?t=1763980860",
    "Phasmophobia",
    13.99,
    "Kinetic Games",
    "Kinetic Games",
    "18 Sep, 2020",
    "A co-op ghost-hunting horror game where you gather evidence and survive paranormal encounters.",
    0
  ),

  // g8 – The Forest
  new Game(
    "g8",
    ["c3", "c5", "c2"],
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/242760/header.jpg?t=1699381053",
    "The Forest",
    19.99,
    "Endnight Games",
    "Endnight Games",
    "30 Apr, 2018",
    "Survive after a plane crash on an island filled with cannibals. Build shelters, craft weapons, explore caves.",
    0
  ),

  // g9 – Subnautica
  new Game(
    "g9",
    ["c3", "c5", "c4"],
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/264710/header.jpg?t=1751944840",
    "Subnautica",
    29.99,
    "Unknown Worlds Entertainment",
    "Unknown Worlds Entertainment",
    "23 Jan, 2018",
    "Dive into an alien ocean, gather resources, build bases, and survive underwater dangers.",
    0
  ),

  // g10 – Stardew Valley
  new Game(
    "g10",
    ["c4"],
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg?t=1754692865",
    "Stardew Valley",
    14.99,
    "ConcernedApe",
    "ConcernedApe",
    "26 Feb, 2016",
    "Relax on your own farm—grow crops, raise animals, mine, fish, and build relationships with villagers.",
    0
  ),

  // g11 – Among Us
  new Game(
    "g11",
    ["c1", "c2", "c4"],
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/945360/header.jpg?t=1757444903",
    "Among Us",
    4.99,
    "Innersloth",
    "Innersloth",
    "16 Nov, 2018",
    "A multiplayer social-deduction game where Crewmates complete tasks while identifying Impostors.",
    0
  ),
];
