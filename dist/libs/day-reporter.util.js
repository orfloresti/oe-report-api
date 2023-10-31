"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalReport =
  exports.getReportSeveralDays =
  exports.countByType =
  exports.getTotalMins =
  exports.getActivityTypesSeveralDays =
  exports.getActivityTypes =
  exports.dateOpenEnglishToIsoFormat =
  exports.changeDateFormat =
    void 0;
const day_reporter_1 = require("./day-reporter");
const open_english_1 = require("./open-english");
/**
 * Format input: 'aaaa-mm-dd'  output: 'mmddaaaa'
 * @param dates: string[]
 */
const changeDateFormat = (dates) => {
  return dates.map(
    (date) =>
      `${date[5]}${date[6]}${date[8]}${date[9]}${date[0]}${date[1]}${date[2]}${date[3]}`
  );
};
exports.changeDateFormat = changeDateFormat;
/**
 * Format input: 'mmddaaaa'  output: 'aaaa-mm-dd'
 * @param date: string
 */
const dateOpenEnglishToIsoFormat = (date) => {
  return `${date[4]}${date[5]}${date[6]}${date[7]}-${date[0]}${date[1]}-${date[2]}${date[3]}`;
};
exports.dateOpenEnglishToIsoFormat = dateOpenEnglishToIsoFormat;
/**
 * Return list of activities types based on activities list
 * @param data: activity[]
 * @returns string[]
 */
const getActivityTypes = (data) => {
  return [...new Set(data.map((act) => act.courseType))];
};
exports.getActivityTypes = getActivityTypes;
/**
 *
 * @param days
 * @returns
 */
const getActivityTypesSeveralDays = (days) => {
  let types = [];
  days.forEach((day) => {
    types = types.concat(day.types);
  });
  return [...new Set(types)];
};
exports.getActivityTypesSeveralDays = getActivityTypesSeveralDays;
/**
 * Function to calculate total minutes worked in current activities list
 * @param data activity[]
 * @returns total minutes of all activities
 */
const getTotalMins = (data) => {
  let mins = 0;
  data.forEach((element) => {
    mins = mins + (element.dateCompleted - element.dateStarted);
  });
  return mins / 60000;
};
exports.getTotalMins = getTotalMins;
/**
 * Function to calculate quantity of activities in current list
 * @param data activity[]
 */
const countByType = (data) => {
  const acc = {};
  const types = (0, exports.getActivityTypes)(data);
  types.forEach((type) => {
    const filterDataByType = data.filter((act) => act.courseType === type);
    acc[type] = filterDataByType.length;
  });
  return acc;
};
exports.countByType = countByType;
/**
 *
 * @param dates
 * @param personId
 * @param cookie
 * @returns
 */
const getReportSeveralDays = (dates, personId, cookie) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const days = [];
    for (const date of dates) {
      const { data } = yield (0, open_english_1.OpenEnglish)(
        date,
        personId,
        cookie
      );
      const report = new day_reporter_1.DayReporter(data, date);
      days.push(report.getResult());
    }
    return days;
  });
exports.getReportSeveralDays = getReportSeveralDays;
/**
 *
 * @param days
 * @param types
 * @returns
 */
const getTotalReport = (days, types) => {
  const totalReport = {};
  days.forEach((day) => {
    Object.keys(day).forEach((key) => {
      if (types.includes(key)) {
        totalReport[key] = !!totalReport[key]
          ? totalReport[key] + day[key]
          : day[key];
      }
    });
  });
  return totalReport;
};
exports.getTotalReport = getTotalReport;
