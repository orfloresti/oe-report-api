import { data } from "./data";
import { activity } from "./activity.interface";

class Utils {
  static getTypes(): string[] {
    return [...new Set(data.map((act) => act.courseType))];
  }

  static getDate(date: number): string {
    if (!isNaN(date)) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();

      return `${year}-${month}-${day}`;
    } else {
      return "Invalidate date";
    }
  }

  static getTotalMins(data: activity[]): number {
    let mins = 0;
    data.forEach((element: activity) => {
      mins = mins + (element.dateCompleted - element.dateStarted);
    });
    return mins / 60000;
  }
}

/**
 * @description use service "details?personId" from OpenEnglish to get data
 */
class Report {
  report: { [key: string]: any } = {};
  data: activity[];

  constructor(data: activity[]) {
    this.data = data;

    // Get data date
    this.report['date'] = Utils.getDate(this.data[0].dateCompleted);

    // Calculate activities
    this.report["mins"] = Utils.getTotalMins(this.data);

    this.countByType();
  }

  // TODO: move to util
  private countByType() {
    const types = Utils.getTypes();
    types.forEach((type) => {
      const filterDataByType = this.data.filter(
        (act) => act.courseType === type
      );
      this.report[type] = filterDataByType.length;
    });
  }

  show() {
    return this.report;
  }
}

const report = new Report(data);
console.log(report.show());
