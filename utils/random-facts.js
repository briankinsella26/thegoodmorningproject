const facts = {
  1: "You can tell the temperature by counting a cricket’s chirps!",
  2: "Sandstorms can swallow up entire cities.",
  3: "Dirt mixed with wind can make dust storms called black blizzards.",
  4: "Mild autumn weather often means bigger spiders in our homes.",
  5: "The coldest temperature ever officially recorded was -89.2°C.",
  6: "A heatwave can make train tracks bend!",
  7: "About 2,000 thunderstorms rain down on Earth every minute.",
  8: "A 2003 heatwave turned grapes to raisins before they were picked from the vine!",
  9: "Lightning often follows a volcanic eruption.",
  10: "Raindrops can be the size of a housefly and fall at more than 30kmph.",
  11: "Cape Farewell in Greenland is the windiest place on the planet.",
  12: "Hurricanes can push more than 6m of water ashore.",
  13: "In July 2001 the rainfall in Kerala, India, was blood red!",
  14: "Blizzards can make snowflakes feel like pellets hitting your face.",
  15: "Worms wriggle up from underground when a flood is coming.",
  16: "In Antarctica, snow can fall so hard you can’t see your hand in front of your face.",
  17: "A whiteout or heavy snowfall that makes it difficult to see, can make you feel sick.",
  18: "Wildfires sometimes create tornadoes made of fire called fire whirls.",
  19: "In 1972, a blizzard dumped 8m of snowfall on Iran, burying 200 villages.",
  20: "Some frogs get noisier just before it rains.",
};

const randomFact = (getRandomFact) => {
  let randomNumber = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  return facts[randomNumber];
};

module.exports = randomFact;
