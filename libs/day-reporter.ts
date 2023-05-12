import { activity } from "../interfaces/activity.interface";
import {
  countByType,
  dateOpenEnglishToIsoFormat,
  getActivityTypes,
  getTotalMins,
} from "./day-reporter.util";

/**
 * Class to generate report by day
 */
export class DayReporter {
  report: { [key: string]: any } = {};
  data: activity[];

  constructor(data: activity[], date: string) {
    this.data = data;

    // Get data date
    this.report["date"] = dateOpenEnglishToIsoFormat(date);

    // Get total minuts
    this.report["mins"] = getTotalMins(this.data);

    // Get types list
    this.report["types"] = getActivityTypes(this.data);

    // Calculate quantity of activities
    this.report = {
      ...countByType(this.data),
      ...this.report,
    };
  }
  getResult() {
    return this.report;
  }
}
