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
    existingOptions.pie = {
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        formatter: function () {
          return this.point.y + ' %';
        },
        distance: -30,
        color: 'white'
      },
      showInLegend: true
    };
    return existingOptions;
  }

  parseData(data) {
    for (let serieName of Object.keys(data)) {
      let serie = {
        'name': serieName,
        'data': [],
        'y': 0
      };

      // loop over series to add categories and data
      for (let element of data[serieName]) {
        // add categories
        if (this.categories.indexOf(element.name) === -1) {
          this.categories.push(element.name);
        }
        // add data
        serie.data.push(element.data);
        serie.y = element.data;
      }

      // count number of datapoints
      this.numberOfDataPoints = serie.data.length;
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
