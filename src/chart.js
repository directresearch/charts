import Pie from './pie.js';
import Bar from './bar.js';
import Prijsmeter from './prijsmeter.js';
import Column from './column.js';
import Nps from './nps.js';

export default class Chart {
  chartOptions(settings, exportSettings, data) {
    let chartType = settings.typeChart;
    let chartObject = null;

    // check if valid chartType is given
    if (!this.validateChartType(chartType)) {
      alert('no valid chart type is given');
    }
    // check if valid data is given
    if (typeof data !== 'object') {
      alert('no valid data is given');
    }
    // render pie
    if (chartType === 'pie') {
      chartObject = new Pie(data);
    }
    // render nps
    if (chartType === 'nps') {
      chartObject = new Nps(data);
    }
    // render bar
    if (chartType === 'bar') {
      chartObject = new Bar(data);
    }
    // render prijsmeter
    if (chartType === 'line') {
      chartObject = new Prijsmeter(data);
    }
    // render column
    if (chartType === 'column') {
      chartObject = new Column(data);
    }

    return chartObject.renderOptions(settings, exportSettings);
  }

  validateChartType(chartType) {
    let validTypes = ['bar', 'column', 'line', 'pie', 'nps'];

    return validTypes.indexOf(chartType) >= 0;
  }
};
