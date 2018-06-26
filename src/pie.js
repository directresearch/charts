import Base from './base';

export default class Pie extends Base {
  constructor(data) {
    super();
    this.parseData(data);
  }
  renderOptions(settings, exportSettings) {
    let baseOptions = {};
    let plotOptions = this.plotoptions(settings);

    if (this.series.length > 0) {
      baseOptions = this.baseOptions(settings);
      // add type
      baseOptions.chart = this.chartType('pie');
      // add pie plotoptions
      baseOptions.plotOptions = this.piePlotoptions(settings, plotOptions);

      // add export specific options
      if (exportSettings !== null) {
        baseOptions.exporting = this.exporting(exportSettings);
      }
    }
    return baseOptions;
  }

  /**
   * Return plotoptions, a wrapper object for config objects for each series type
   * https://api.highcharts.com/highcharts/plotOptions
   * @param Object settings
   * @return Object
   */
  piePlotoptions(settings, existingOptions) {
    existingOptions.series = {
      stacking: null,
      colorByPoint: true
    };
    existingOptions.pie = {
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '{y:.' + this.decimals + 'f}%',
        distance: -30,
        style: {
          fontSize: this.fontSize,
          textShadow: 'none',
          textOutline: 'none'
        }
      },
      showInLegend: true
    };
    return existingOptions;
  }

  parseData(data) {
    for (let serieName of Object.keys(data)) {
      let serie = {
        name: serieName,
        y: 0,
        n: 0
      };

      // loop over series to add categories and data
      for (let element of data[serieName]) {
        // add categories
        if (this.categories.indexOf(element.name) === -1) {
          this.categories.push(element.name);
        }
        // add data
        serie.y = element.data;
        serie.n = element.n;
      }

      // count number of datapoints
      this.numberOfDataPoints = 1;
      // add new series to existing series
      this.series.push(serie);
    }
    this.numberOfSeries = this.series.length;
    // pi specific
    let piedata = [{
      data: this.series,
      colorByPoint: true
    }];

    this.series = piedata;
  }
};
