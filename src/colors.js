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
    if (this.type === 'rood-blauw') {
      return this.redBlueColors(false);
    }
    if (this.type === 'blauw-rood') {
      return this.redBlueColors(true);
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
    let numberOfColors = this.numberOfColors / 3;
    let rood = this.redColors(numberOfColors, 2);
    let blauw = this.blueColors(numberOfColors, 2);
    let grey = this.greyColors(numberOfColors, 2);
    let roodReversed = this.redColors(numberOfColors).reverse();
    let blauwReversed = this.blueColors(numberOfColors).reverse();

    if (reversed) {
      return blauw.concat(grey, roodReversed);
    }
    return rood.concat(grey, blauwReversed);
  }

  redColors(numberOfColors, spread) {
    let colors = ['#e2001a', '#f6b2ba'];

    if (spread === 3) {
      colors = ['#4f0700', '#e2001a', '#f6b2ba'];
    }
    return Chroma.scale(colors).colors(numberOfColors);
  }

  blueColors(numberOfColors, spread) {
    let colors = ['#009bd5', '#b2e1f2'];

    if (spread === 3) {
      colors = ['#003349', '#009bd5', '#b2e1f2'];
    }
    return Chroma.scale(colors).colors(numberOfColors);
  }

  greenColors(numberOfColors, spread) {
    let colors = ['#57ab27', '#cce6be'];

    if (spread === 3) {
      colors = ['#22440f', '#57ab27', '#cce6be'];
    }
    return Chroma.scale(colors).colors(numberOfColors);
  }

  yellowColors(numberOfColors, spread) {
    let colors = ['#ffcc00', '#fff0b2'];

    return Chroma.scale(colors).colors(numberOfColors);
  }

  orangeColors(numberOfColors, spread) {
    let colors = ['#ad5103', '#ed8c00', '#f7c69c'];

    return Chroma.scale(colors).colors(numberOfColors);
  }

  blackColors(numberOfColors, spread) {
    let colors = ['#000000', '#b2b2b2'];

    return Chroma.scale(colors).colors(numberOfColors);
  }

  greyColors(numberOfColors, spread) {
    let colors = ['#989898', '#efefef'];

    return Chroma.scale(colors).colors(numberOfColors);
  }
}
