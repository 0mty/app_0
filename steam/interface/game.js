class Game {
  constructor(
    id,
    categoryIds,
    GameImage,
    title,
    price,
    Developer,
    Publisher,
    Released,
    description,
    SellPercentage
  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.GameImage = GameImage;
    this.title = title;
    this.price = price;
    this.Developer = Developer;
    this.Publisher = Publisher;
    this.Released = Released;
    this.description = description;
    this.SellPercentage = SellPercentage;
  }
}

export default Game;
