// Import chroma js
import ColorGenerator from './colors.js';

export default class Base {
  constructor() {
    this.categories = [];
    this.series = [];
    this.numberOfDataPoints = 1;
    this.numberOfSeries = 1;
    this.fontSize = '11px';
    this.decimals = 0;
  }

  /**
   * Return base options that are not chart type specific
   * @param Object settings
   * @return Object
   */
  baseOptions(settings) {

    if (settings) {
      // change fontsize, only available when using baseoptions before other functions
      this.fontSize = this.parseFontSize(settings, 'default');
      // smaller frontsize 2 px less then fontsize, only available when using baseoptions before other functions
      this.fontSizeSmaller = this.parseFontSize(settings, 'smaller');
      // change decimals, only available when using baseoptions before other functions
      this.decimals = this.parseDecimals(settings);
      // some base options that are not chart type specific
      let baseOptions = {
        credits: {
          enabled: false
        }
      };

      // add title
      baseOptions.title = this.title(settings);
      // add subtitle
      baseOptions.subtitle = this.subtitle(settings);
      // add legend
      baseOptions.legend = this.legend(settings);
      // add plotoptions
      baseOptions.plotOptions = this.plotoptions(settings);
      // add xAxis
      baseOptions.xAxis = this.xAxis(settings);
      // add yAxis
      baseOptions.yAxis = this.yAxis(settings);
      // series
      baseOptions.series = this.series;
      // add colors
      baseOptions.colors = this.colors(settings);
      // add tooltip
      baseOptions.tooltip = this.tooltip(settings);

      return baseOptions;
    }
    return {};
  }

  /**
   * Return fontsize in px
   * @param string type
   * @return Object
   */
  parseFontSize(settings, size) {
    let fontSize = 11;

    if (settings) {
      fontSize = settings.fontSize;
    }

    if (size === 'smaller') {
      return parseInt(fontSize, 10) - 2 + 'px';
    }
    return parseInt(fontSize, 10) + 'px';
  }

  /**
   * Return number of decimals
   * @param integer type
   * @return Object
   */
  parseDecimals(settings) {
    let decimalsValue = 0;

    // decimalen in grafiek is uitgezet op 2-7-2018 omdat het niet/nauwelijks wordt gebruikt.
    // if (settings) {
    //   decimalsValue = settings.decimalsValue;
    // }
    return parseInt(decimalsValue, 10);
  }

  /**
   * Return the correct chart type https://api.highcharts.com/highcharts/chart.type
   * @param string type
   * @return Object
   */
  chartType(type) {
    return {
      type: type
    };
  }

  /**
   * Return title, The chart's main title.
   * https://api.highcharts.com/highcharts/title
   * @param Object settings
   * @return Object
   */
  title(settings) {
    let chartTitle = '';

    if (settings) {
      chartTitle = settings.chartTitle;
    }

    return {
      text: chartTitle,
      style: {
        fontSize: this.fontSize
      }
    };
  }

  /**
   * Return subtitle, The chart's subtitle.
   * This can be used both to display a subtitle below the main title, and to display random text anywhere in the chart.
   * The subtitle can be updated after chart initialization through the Chart.setTitle method.
   * https://api.highcharts.com/highcharts/subtitle
   * @param Object settings
   * @return Object
   */
  subtitle(settings) {
    let chartSubtitle = '';

    if (settings) {
      chartSubtitle = settings.chartSubtitle;
    }

    return {
      text: chartSubtitle,
      style: {
        fontSize: this.fontSizeSmaller
      }
    };
  }

  /**
   * Return legend, The legend is a box containing a symbol and name for each series item or point item in the chart.
   * Each series (or points in case of pie charts) is represented by a symbol and its name in the legend.
   * https://api.highcharts.com/highcharts/legend
   * @param Object settings
   * @return Object
   */
  legend(settings) {
    // set legend
    // default = disabled
    // if there are multiple series then enable
    let legendEnabled = false;

    // legenda position default onder
    let align = 'center';
    let verticalAlign = 'bottom';
    let layout = 'horizontal';
    let padding = 20;
    let legendaPositie = 'boven';

    if (settings) {
      legendaPositie = settings.legendaPositie;
    }

    // always show legend if we should generate a pie like chart
    if (this.numberOfSeries > 1) {
      legendEnabled = true;
    }

    if (legendaPositie === 'rechts') {
      align = 'right';
      verticalAlign = 'top';
      layout = 'vertical';
    }

    return {
      enabled: legendEnabled,
      align: align,
      verticalAlign: verticalAlign,
      layout: layout,
      padding: padding,
      itemStyle: {
        fontSize: this.fontSize
      }
    };
  }

  /**
   * Return plotoptions, a wrapper object for config objects for each series type
   * https://api.highcharts.com/highcharts/plotOptions
   * @param Object settings
   * @return Object
   */
  plotoptions(settings) {
    let stacked = false;
    let colorByPoint = true;
    let percentages = true;
    let dataLabelsInside = false;
    let type = '';

    if (settings) {
      stacked = settings.stacked;
      percentages = settings.percentages;
      type = settings.type;
    }

    // Do we need to stack the series?
    if (stacked === true) {
      stacked = 'percent';
      dataLabelsInside = true;
    }

    // Don't show percentages in dataLabels if requested
    if (percentages === false) {
      percentages = false;
    }

    // Do we show multiple series, then color by serie instead of by point
    if (type === 'series') {
      colorByPoint = false;
    }

    return {
      series: {
        stacking: stacked,
        colorByPoint: colorByPoint, // https://api.highcharts.com/highcharts/series.bar.colorByPoint
        dataLabels: {
          enabled: percentages, // https://api.highcharts.com/highcharts/series.bar.dataLabels.enabled
          inside: dataLabelsInside, // https://api.highcharts.com/highcharts/series.bar.dataLabels.inside
          format: '{y:.' + this.decimals + 'f}%',
          style: {
            fontSize: this.fontSize,
            textShadow: 'none',
            textOutline: 'none'
          }
        }
      }
    };
  }

  /**
   * Return xAxis
   * The X axis or category axis.
   * Normally this is the horizontal axis, though if the chart is inverted this is the vertical axis.
   * In case of multiple axes, the xAxis node is an array of configuration objects.
   * https://api.highcharts.com/highcharts/xAxis
   * @param Object settings
   * @return Object
   */
  xAxis(settings) {
    let gridLineWidth = 0;
    let categories = [];
    let visible = true;
    let axis = true;
    let type = 'serie';

    if (settings) {
      axis = settings.as;
      type = settings.type;
    }

    // don't show xAxis if requested or when we parse series with one data point
    if ((type === 'series' && this.numberOfDataPoints === 1) || axis === false) {
      visible = false;
    }

    // are there categories? Show them
    categories = this.categories.length > 0 ? this.categories : [];

    return {
      categories: categories,
      visible: visible,
      gridLineWidth: gridLineWidth,
      minorGridLineWidth: gridLineWidth,
      min: undefined,
      max: undefined,
      labels: {
        style: {
          color: 'black',
          fontSize: this.fontSize
        }
      }
    };
  }

  /**
   * Return yAxis
   * The Y axis or value axis.
   * Normally this is the vertical axis, though if the chart is inverted this is the horizontal axis.
   * In case of multiple axes, the yAxis node is an array of configuration objects.
   * https://api.highcharts.com/highcharts/yAxis
   * @param Object settings
   * @return Object
   */
  yAxis(settings) {
    let gridLineWidth = 0;
    let visible = false;
    let title = false;
    let max = settings.scale > 0 ? settings.scale : undefined; // do we need a different scale?
    let min = 0;
    let raster = false;

    if (settings) {
      raster = settings.raster;
    }

    // hulplijnen tonen aan/uit
    if (raster === true) {
      visible = true;
      gridLineWidth = 1;
    }

    return {
      title: title,
      visible: visible,
      reversedStacks: false,
      gridLineWidth: gridLineWidth,
      minorGridLineWidth: gridLineWidth,
      min: min,
      max: max,
      labels: {
        format: '{value:,f}%',
        style: {
          color: 'black',
          fontSize: this.fontSize
        }
      }
    };
  }

  /**
   * Return list of Generator
   * An array containing the default colors for the chart's series.
   * When all colors are used, new colors are pulled from the start again.
   * https://api.highcharts.com/highcharts/colors
   * @param Object settings
   * @return Object
   */
  colors(settings) {
    let numberOfColors = this.numberOfDataPoints;
    let colorPalet = 'dr';

    if (settings) {
      colorPalet = settings.colorPalet;
    }

    // Show a table fomatted tooltip
    if (this.numberOfSeries > 1) {
      numberOfColors = this.numberOfSeries;
    }

    // initiate Color class
    let Color = new ColorGenerator(colorPalet, numberOfColors);

    return Color.renderColors();
  }

  /**
   * Return tooltip
   * Options for the tooltip that appears when the user hovers over a series or point.
   * https://api.highcharts.com/highcharts/tooltip
   * @param Object settings
   * @return Object
   */
  tooltip(settings) {
    let type = 'serie';

    if (settings) {
      type = settings.type;
    }

    // Show a table fomatted tooltip
    if (type === 'series' && this.numberOfDataPoints > 1) {
      return this.stackedTooltip(settings);
    }

    // Show a regular non table formatted tooltip
    return this.notStackedTooltip(settings);
  }

  /**
   * Return a table fomatted tooltip
   * http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/tooltip/footerformat/
   * https://api.highcharts.com/highcharts/tooltip.useHTML
   * @param Object settings
   * @return Object
   */
  stackedTooltip(settings) {
    return {
      headerFormat: '{point.key}<hr><table>',
      pointFormat: '<tr><td>{series.name}: </td>' +
            '<td style="text-align: right">{point.y:.' + this.decimals + 'f}% / {point.n}</td></tr>',
      footerFormat: '</table>',
      useHTML: true,
      shared: true
    };
  }

  /**
   * Return a regular non html formatted tooltip
   * https://api.highcharts.com/highcharts/tooltip.pointFormat
   * @param Object settings
   * @return Object
   */
  notStackedTooltip(settings) {
    let pointFormat = '{series.name}: {point.y:.' + this.decimals + 'f}% <br> n = {point.n:.0f}';

    /**
     * Toon geen serie naam als er geen meerdere series zijn
     */
    if (settings.type === 'serie') {
      pointFormat = '{point.y:.' + this.decimals + 'f}% <br> n = {point.n:.0f}';
    }

    return {
      headerFormat: '',
      pointFormat: pointFormat
    };
  }

  /**
   * Return exporting Options for the exporting module. For an overview on the matter, see
   * https://api.highcharts.com/highcharts/exporting
   * @param Object settings
   * @return Object
   */
  exporting(exportSettings) {
    let exportOptions = {
      enabled: true,
      chartOptions: {}
    };

    if (exportSettings) {
      // change fontsize, only available when using baseoptions before other functions
      this.fontSize = this.parseFontSize(exportSettings, 'default');
      // smaller frontsize 2 px less then fontsize, only available when using baseoptions before other functions
      this.fontSizeSmaller = this.parseFontSize(exportSettings, 'smaller');
      // change decimals, only available when using baseoptions before other functions
      this.decimals = this.parseDecimals(exportSettings);
      // add type
      exportOptions.chartOptions.chart = this.chartType(exportSettings.typeChart);
      // add title
      exportOptions.chartOptions.title = this.title(exportSettings);
      // add subtitle
      exportOptions.chartOptions.subtitle = this.subtitle(exportSettings);
      // add legend
      exportOptions.chartOptions.legend = this.legend(exportSettings);
      // add plotOptions
      exportOptions.chartOptions.plotOptions = this.plotoptions(exportSettings);
      // add xAxis
      exportOptions.chartOptions.xAxis = this.xAxis(exportSettings);
      // add yAxis
      exportOptions.chartOptions.yAxis = this.yAxis(exportSettings);
      // add colors
      exportOptions.chartOptions.colors = this.colors(exportSettings);

      return exportOptions;
    }
    return {};
  }

  parseData(data) {
    for (let serieName of Object.keys(data)) {
      let serie = {
        'name': serieName,
        'data': []
      };

      // loop over series to add categories and data
      for (let element of data[serieName]) {
        // add categories
        if (this.categories.indexOf(element.name) === -1) {
          this.categories.push(element.name);
        }
        // add data
        serie.data.push({
          y: element.data,
          n: element.n
        });
        serie.y = element.data;
      }

      // count number of datapoints
      this.numberOfDataPoints = serie.data.length;
      // add new series to existing series
      this.series.push(serie);
    }
    this.numberOfSeries = this.series.length;
  }
}

// list of available settings
// settings without custom export settings
// {
//   "cumulatief": "aan",
//   "hideCumulative": false,
//   "typeChart": "bar",
//   "stacked": false,
//   "decimalsValue": 0,
//   "legendaPositie": "onder",
//   "colorPalet": "blauw-rood",
//   "chartTitle": "",
//   "chartSubtitle": "",
//   "percentages": true,
//   "as": true,
//   "raster": true,
//   "scale": 0,
//   "fontSize": 11,
//   "type": "serie"
// }
// setting with custom export settings
// {
//   "settings": {
//     "cumulatief": "aan",
//     "hideCumulative": false,
//     "typeChart": "bar",
//     "stacked": false,
//     "decimalsValue": 0,
//     "aPositie": "onder",
//     "colorPalet": "blauw-rood",
//     "chartTitle": "",
//     "chartSubtitle": "",
//     "percentages": true,
//     "as": true,
//     "raster": true,
//     "scale": 0,
//     "fontSize": 11,
//     "type": "serie"
//   },
//   "export": {
//     "cumulatief": "uit",
//     "hideCumulative": true,
//     "typeChart": "bar",
//     "stacked": false,
//     "decimalsValue": 0,
//     "legendaPositie": "rechts",
//     "colorPalet": "rood-blauw",
//     "chartTitle": "",
//     "chartSubtitle": "",
//     "percentages": false,
//     "as": false,
//     "raster": false,
//     "scale": 100,
//     "fontSize": 13,
//     "type": "series"
//   }
// }
