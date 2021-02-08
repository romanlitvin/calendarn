import moment, { Moment, MomentFormatSpecification, MomentInput } from "moment";

export interface IOutcomeMonthDates {
  date: Moment;
  isCurrent: boolean;
  isNext: boolean;
  isPrev: boolean;
  isWeekend: boolean;
  isFirstDayOfMonth: boolean;
}

export default class TimeUtils {
  public static now(
    inp?: MomentInput,
    format?: MomentFormatSpecification,
  ): Moment {
    return moment(inp, format);
  }

  public static getDayWeeksShort(): string[] {
    return ["M", "T", "W", "T", "F", "S", "S"];
  }

  public static getDayWeeksShorten(): string[] {
    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  }

  public static formatDateCreation(inputDate: Moment) {
    return inputDate.format("YYYY-MM-DD");
  }

  public static months(): string[] {
    return moment.months();
  }

  public static monthsShort(): string[] {
    return moment.monthsShort();
  }

  public static getMonthDays(
    monthNum: number,
    year = 2020,
  ): IOutcomeMonthDates[] {
    const now = TimeUtils.now();
    const monthDates: IOutcomeMonthDates[] = [];

    now.set("month", monthNum);
    now.startOf("month");
    now.set("year", year);

    const currWeekday = now.isoWeekday();
    const endOfMonth = TimeUtils.daysInMonth(now.get("month"), now.get("year"));

    if (currWeekday !== 1) {
      const prevDaysOfMonth = TimeUtils.extractPrevDaysOfMonth(
        monthNum,
        currWeekday,
        year,
      );
      monthDates.push(...prevDaysOfMonth);
    }

    const currDaysOfMonth = TimeUtils.extractCurrDaysOfMonth(
      monthNum,
      endOfMonth,
      year,
    );
    monthDates.push(...currDaysOfMonth);

    const restOfMonthDates = 42 - monthDates.length;

    const restOfMonth = TimeUtils.extractRestOfDaysOfMonth(
      monthNum,
      restOfMonthDates,
      year,
    );
    monthDates.push(...restOfMonth);

    return monthDates;
  }

  private static daysInMonth(iMonth: number, iYear: number): number {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  private static extractPrevDaysOfMonth(
    monthNum: number,
    currWeekday: number,
    year: number,
  ): IOutcomeMonthDates[] {
    const prev = TimeUtils.now();
    const monthDates: IOutcomeMonthDates[] = [];
    prev.set("month", monthNum - 1);
    prev.endOf("month");
    // to handle december months in previous year
    const responseYear = monthNum === 0 ? year - 1 : year;

    const lastDayOfMonth = prev.get("date");
    const startOfWeekPrevMonth = lastDayOfMonth - (currWeekday - 2);

    for (let i = startOfWeekPrevMonth; i <= lastDayOfMonth; i++) {
      const outcome = TimeUtils.now()
        .set("month", monthNum - 1)
        .set("date", i)
        .set("year", responseYear);
      monthDates.push({
        date: outcome,
        isPrev: true,
        isCurrent: false,
        isNext: false,
        isWeekend: TimeUtils.isDateWeekend(outcome),
        isFirstDayOfMonth: i === 1,
      });
    }

    return monthDates;
  }

  private static extractCurrDaysOfMonth(
    monthNum: number,
    endOfMonth: number,
    year: number,
  ): IOutcomeMonthDates[] {
    const monthDates: IOutcomeMonthDates[] = [];
    for (let i = 1; i <= endOfMonth; i++) {
      const outcome = TimeUtils.now()
        .set("month", monthNum)
        .set("date", i)
        .set("year", year);
      monthDates.push({
        date: outcome,
        isCurrent: true,
        isNext: false,
        isPrev: false,
        isWeekend: TimeUtils.isDateWeekend(outcome),
        isFirstDayOfMonth: i === 1,
      });
    }

    return monthDates;
  }

  private static extractRestOfDaysOfMonth(
    monthNum: number,
    restOfMonthDates: number,
    year: number,
  ): IOutcomeMonthDates[] {
    const monthDates: IOutcomeMonthDates[] = [];
    // to handle january months in next year
    const responseYear = monthNum === 11 ? year + 1 : year;

    for (let i = 1; i <= restOfMonthDates; i++) {
      const outcome = TimeUtils.now()
        .set("month", monthNum + 1)
        .set("date", i)
        .set("year", responseYear);
      monthDates.push({
        date: outcome,
        isNext: true,
        isPrev: false,
        isCurrent: false,
        isWeekend: TimeUtils.isDateWeekend(outcome),
        isFirstDayOfMonth: i === 1,
      });
    }

    return monthDates;
  }

  private static isDateWeekend(income: Moment) {
    const day = income.isoWeekday();
    return day === 7 || day === 6;
  }
}
