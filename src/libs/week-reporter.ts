import {
  getActivityTypesSeveralDays,
  getReportSeveralDays,
  getTotalReport,
} from "./day-reporter.util";
import { getListOfDays } from "./week-reporter.util";
// import { cookie, dates, personId } from "../config";

export const weekReport = async (
  startDate: string,
  endDate: string,
  personId: string,
  cookie: string
) => {
  // Get list of dates
  const dates: string[] = getListOfDays(startDate, endDate);

  // Get report for each day
  const days = await getReportSeveralDays(dates, personId, cookie);

  // Get total types of activities in all days
  const types = getActivityTypesSeveralDays(days);

  // Include mins type to sum all time:
  types.push("mins");

  // Get total report
  const totalReport = getTotalReport(days, types);

  // Calculate total hours using minuts and saving in a new prop named hours
  totalReport["hours"] = totalReport["mins"] / 60;

  // Show total report
  return totalReport;
};
