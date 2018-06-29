import Base from './base';

export default class Prijsmeter extends Base {
  constructor(data) {
    super();
    this.parseNpsData(data);
  }
  renderOptions(settings, exportSettings) {
    let baseOptions = {};

    if (this.series.length > 0) {
      baseOptions = this.baseOptions(settings);
      // add type
      baseOptions.chart = this.chartType('line');
      // add plotoptions
      baseOptions.plotOptions = this.plotoptions(settings);
      // add xAxis
      baseOptions.xAxis = this.xAxis(settings);
      // add yAxis
      baseOptions.yAxis = this.yAxis(settings);
      // add colors
      baseOptions.colors = this.colors(settings);
      // add tooltip
      baseOptions.tooltip = this.tooltip(settings);

      // add export specific options
      if (exportSettings !== null) {
        baseOptions.exporting = this.exporting(exportSettings);
      }
    }
    return baseOptions;
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
    return ['#009bd5', '#e2001a', '#57ab27', '#ffcc00'];
  }

  /**
   * Return plotoptions, a wrapper object for config objects for each series type
   * https://api.highcharts.com/highcharts/plotOptions
   * @param Object settings
   * @return Object
   */
  plotoptions(settings) {
    return {
      line: {
        marker: {
          enabled: false
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
    let categories = [];

    // are there categories? Show them
    categories = this.categories.length > 0 ? this.categories : [];

    return {
      categories: categories,
      labels: {
        format: '{value:,f}',
        style: {
          color: 'black',
          fontSize: this.fontSize
        }
      }
    };
  }

  /**
   * Return tooltip
   * Options for the tooltip that appears when the user hovers over a series or point.
   * https://api.highcharts.com/highcharts/tooltip
   * @param Object settings
   * @return Object
   */
  tooltip(settings) {
    let decimals = this.parseDecimals(settings);

    return {
      formatter: function () {
        let value = this.key;
        let startValue, stepSize;

        // er kunnen numerieke en textuele nummers terug komen van highcharts
        // de textuele kunnen direct doorgezet worden, de numerieke moeten uitgerekend worden
        if (typeof this.x === 'number') {
          startValue = Number(this.point.series.xAxis.categories[0]);
          stepSize = Number(Number(this.point.series.xAxis.categories[1]) - startValue);
          value = Number(startValue + Number(Number(stepSize) * Number(this.x)));
        }

        return '<span>' + this.series.name + '</span><br /><table>' +
          '<tr> <span>' +
          String(Number(value)).replace('.', ',') + ': </span></tr> <td>' +
          this.y.toFixed(decimals).replace('.', ',') + '%</td></tr></table>';
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
    return {
      title: {
        text: ''
      },
      max: 100,
      labels: {
        style: {
          color: 'black',
          fontSize: this.fontSize
        }
      }
    };
  }

  parseNpsData(data) {
    this.parseData(data);
    // add intersection points
    let intersections = [{
      name: 'IDP',
      showInLegend: false,
      data: [],
      type: 'scatter'
    },
    {
      name: 'OPS',
      showInLegend: false,
      data: [],
      type: 'scatter'
    },
    {
      name: 'MGP',
      showInLegend: false,
      data: [],
      type: 'scatter'
    },
    {
      name: 'MDP',
      showInLegend: false,
      data: [],
      type: 'scatter'
    }];

    // push intersections to series
    this.series = this.series.concat(intersections);
  }
}
