"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
// import plugin
const weekOfYear_1 = __importDefault(require("dayjs/plugin/weekOfYear"));
// import locale
require("dayjs/locale/es-mx");
// use plugin
dayjs_1.default.extend(weekOfYear_1.default);
// use locale
dayjs_1.default.locale("es-mx");
const date = (0, dayjs_1.default)("2023-10-23");
const week = date.week();
console.log(week);
