const DAYS_IN_WEEK = 7;

export default (numArr: number[]): number[][] =>
  [...Array(DAYS_IN_WEEK - 1)].map((_, index) =>
    numArr.slice(index * DAYS_IN_WEEK, index * DAYS_IN_WEEK + DAYS_IN_WEEK),
  );
