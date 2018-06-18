import Base from './base';

export default class Bar extends Base {
  constructor(data) {
    super();
    this.parseData(data);
  }
  renderOptions(settings, exportSettings) {
    let baseOptions = {};

    if (this.series.length > 0) {
      baseOptions = this.baseOptions(settings);
      // add type
      baseOptions.chart = this.chartType('bar');

      // add export specific options
      if (exportSettings !== null) {
        baseOptions.exporting = this.exporting(exportSettings);
      }
    }
    return baseOptions;
  }

}
