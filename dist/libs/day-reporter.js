"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayReporter = void 0;
const day_reporter_util_1 = require("./day-reporter.util");
/**
 * Class to generate report by day
 */
class DayReporter {
  constructor(data, date) {
    this.report = {};
    this.data = data;
    // Get data date
    this.report["date"] = (0, day_reporter_util_1.dateOpenEnglishToIsoFormat)(
      date
    );
    // Get total minuts
    this.report["mins"] = (0, day_reporter_util_1.getTotalMins)(this.data);
    // Get types list
    this.report["types"] = (0, day_reporter_util_1.getActivityTypes)(this.data);
    // Calculate quantity of activities
    this.report = Object.assign(
      Object.assign({}, (0, day_reporter_util_1.countByType)(this.data)),
      this.report
    );
  }
  getResult() {
    return this.report;
  }
}
exports.DayReporter = DayReporter;
