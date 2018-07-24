// Import chroma js
import Chroma from 'chroma-js';

export default class Colors {
  constructor(type, numberOfColors) {
    this.type = type;
    this.numberOfColors = numberOfColors;
  }

  /**
   * Return list of colors
   * An array containing the default colors for the chart's series.
   * When all colors are used, new colors are pulled from the start again.
   * https://api.highcharts.com/highcharts/colors
   * @param Object settings
   * @return Object
   */
  renderColors() {
    // Show a table fomatted tooltip
    if (this.type === 'dr') {
      return this.drColors();
    }
    if (this.type === 'nps') {
      return this.npsColors();
    }
    if (this.type === 'rood-blauw') {
      return this.redBlueColors(false);
    }
    if (this.type === 'blauw-rood') {
      return this.redBlueColors(true);
    }
    if (this.type === 'blauw-rood-plus') {
      return this.redBluePlusColors(true);
    }
    if (this.type === 'rood-blauw-plus') {
      return this.redBluePlusColors(false);
    }
    if (this.type === 'rood') {
      return this.redColors(this.numberOfColors, 3);
    }
    if (this.type === 'blauw') {
      return this.blueColors(this.numberOfColors, 3);
    }
    if (this.type === 'groen') {
      return this.greenColors(this.numberOfColors, 3);
    }
    if (this.type === 'oranje') {
      return this.orangeColors(this.numberOfColors, 3);
    }
    if (this.type === 'rood-mono') {
      return ['#e2001a'];
    }
    if (this.type === 'blauw-mono') {
      return ['#009bd5'];
    }
    if (this.type === 'groen-mono') {
      return ['#57ab27'];
    }
    if (this.type === 'oranje-mono') {
      return ['#ed8c00'];
    }
    return Chroma.scale(['#4f0700', '#e2001a', '#f6b2ba']).colors(this.numberOfColors);
  }

  drColors() {
    let numberOfColors = this.numberOfColors / 5;
    let rood = this.redColors(numberOfColors, 2);
    let blauw = this.blueColors(numberOfColors, 2);
    let groen = this.greenColors(numberOfColors, 2);
    let geel = this.yellowColors(numberOfColors, 2);
    let zwart = this.blackColors(numberOfColors, 2);
    let colorsDr = [];
    let counter = 0;

    for (counter = 0; counter < numberOfColors; counter++) {
      colorsDr.push(rood[counter]);
      colorsDr.push(blauw[counter]);
      colorsDr.push(groen[counter]);
      colorsDr.push(geel[counter]);
      colorsDr.push(zwart[counter]);
    }

    return colorsDr;
  }

  redBlueColors(reversed) {
    let numberOfBlues = 0;
    let numberOfReds = 0;
    let numberOfGreys = 0;
    let red = [];
    let blue = [];
    let grey = [];
    let redReversed = [];
    let blueReversed = [];

    // select number of colors
    numberOfBlues = Math.ceil(this.numberOfColors / 3);
    numberOfReds = Math.ceil(this.numberOfColors / 3);
    numberOfGreys = this.numberOfColors - numberOfBlues - numberOfReds;

    // build list of colors
    red = numberOfReds > 0 ? this.redColors(numberOfReds, 2) : [];
    blue = numberOfBlues > 0 ? this.blueColors(numberOfBlues, 2) : [];
    grey = numberOfGreys > 0 ? this.greyColors(numberOfGreys, 2) : [];
    redReversed = numberOfReds > 0 ? this.redColors(numberOfReds, 2).reverse() : [];
    blueReversed = numberOfReds > 0 ? this.blueColors(numberOfBlues, 2).reverse() : [];

    if (reversed) {
      return blue.concat(grey, redReversed);
    }
    return red.concat(grey, blueReversed);
  }

  npsColors() {
    return ['#e2001a', '#ffcc00', '#57ab27'];
  }

  redColors(numberOfColors, spread) {
    let colors = ['#e2001a', '#f6b2ba'];

    if (spread === 3) {
      colors = ['#4f0700', '#e2001a', '#f6b2ba'];
    }

    if (numberOfColors > 1) {
      return Chroma.scale(colors).colors(numberOfColors);
    }
    return [colors[0]];
  }

  blueColors(numberOfColors, spread) {
    let colors = ['#009bd5', '#b2e1f2'];

    if (spread === 3) {
      colors = ['#003349', '#009bd5', '#b2e1f2'];
    }

    if (numberOfColors > 1) {
      return Chroma.scale(colors).colors(numberOfColors);
    }
    return [colors[0]];
  }

  greenColors(numberOfColors, spread) {
    let colors = ['#57ab27', '#cce6be'];

    if (spread === 3) {
      colors = ['#22440f', '#57ab27', '#cce6be'];
    }

    if (numberOfColors > 1) {
      return Chroma.scale(colors).colors(numberOfColors);
    }
    return [colors[0]];
  }

  yellowColors(numberOfColors, spread) {
    let colors = ['#ffcc00', '#fff0b2'];

    if (numberOfColors > 1) {
      return Chroma.scale(colors).colors(numberOfColors);
    }
    return [colors[0]];
  }

  orangeColors(numberOfColors, spread) {
    let colors = ['#ad5103', '#ed8c00', '#f7c69c'];

    if (numberOfColors > 1) {
      return Chroma.scale(colors).colors(numberOfColors);
    }
    return [colors[0]];
  }

  blackColors(numberOfColors, spread) {
    let colors = ['#000000', '#b2b2b2'];

    if (numberOfColors > 1) {
      return Chroma.scale(colors).colors(numberOfColors);
    }
    return [colors[0]];
  }

  greyColors(numberOfColors, spread) {
    let colors = ['#989898', '#efefef'];

    if (numberOfColors > 1) {
      return Chroma.scale(colors).colors(numberOfColors);
    }
    return [colors[0]];
  }

  redBluePlusColors(reversed) {
    let numberOfBlues = 0;
    let numberOfReds = 0;
    let numberOfGreys = 0;
    let red = [];
    let blue = [];
    let grey = [];
    let redReversed = [];
    let blueReversed = [];
    let numberOfColors = this.numberOfColors - 1; // The last one is grey so this is the count for red and blue
    let generatedColors = [];

    // new settings.
    if (this.isEven(numberOfColors)) {
      numberOfBlues = Math.floor(this.numberOfColors / 2);
      numberOfReds = Math.floor(this.numberOfColors / 2);
      numberOfGreys = 0;
    } else {
      numberOfBlues = (this.numberOfColors / 2) - 1;
      numberOfReds = (this.numberOfColors / 2) - 1;
      numberOfGreys = 1;
    }

    // build list of colors
    red = numberOfReds > 0 ? this.redColors(numberOfReds, 2) : [];
    blue = numberOfBlues > 0 ? this.blueColors(numberOfBlues, 2) : [];
    grey = numberOfGreys > 0 ? this.greyColors(numberOfGreys, 2) : [];
    redReversed = numberOfReds > 0 ? this.redColors(numberOfReds, 2).reverse() : [];
    blueReversed = numberOfReds > 0 ? this.blueColors(numberOfBlues, 2).reverse() : [];

    if (reversed) {
      generatedColors = blue.concat(grey, redReversed);
      generatedColors[numberOfColors] = '#989898';
      // return blue.concat(grey, redReversed);
      return generatedColors;
    }
    generatedColors = red.concat(grey, blueReversed);
    generatedColors[numberOfColors] = '#989898';
    // return red.concat(grey, blueReversed);
    return generatedColors;
  }

  isEven(n) {
    return n % 2 === 0;
  }

}
