import dayjs, { type Dayjs } from 'dayjs';

/**
 * @example
 * Input: 2024-01-01 00:00:00.000 -> 2024-12-31 00:00:00.000
 *        intervalDaysMax: 31
 * Output:
 * 1    2024-01-01 00:00:00.000 -> 2024-01-31 00:00:00.000 ::: 31d
 * 2    2024-02-01 00:00:00.000 -> 2024-03-02 00:00:00.000 ::: 31d
 * 3    2024-03-03 00:00:00.000 -> 2024-04-02 00:00:00.000 ::: 31d
 * 4    2024-04-03 00:00:00.000 -> 2024-05-03 00:00:00.000 ::: 31d
 * 5    2024-05-04 00:00:00.000 -> 2024-06-03 00:00:00.000 ::: 31d
 * 6    2024-06-04 00:00:00.000 -> 2024-07-04 00:00:00.000 ::: 31d
 * 7    2024-07-05 00:00:00.000 -> 2024-08-04 00:00:00.000 ::: 31d
 * 8    2024-08-05 00:00:00.000 -> 2024-09-04 00:00:00.000 ::: 31d
 * 9    2024-09-05 00:00:00.000 -> 2024-10-05 00:00:00.000 ::: 31d
 * 10   2024-10-06 00:00:00.000 -> 2024-11-05 00:00:00.000 ::: 31d
 * 11   2024-11-06 00:00:00.000 -> 2024-12-06 00:00:00.000 ::: 31d
 * 12   2024-12-07 00:00:00.000 -> 2024-12-31 00:00:00.000 ::: 25d
 */
export function splitDateInterval(args: { dateFrom: Dayjs, dateTo: Dayjs, intervalDaysMax: number }) {
  const intervalDaysSrc = args.dateTo.diff(args.dateFrom, 'days');
  const intervalCount = Math.max(Math.ceil(intervalDaysSrc / args.intervalDaysMax), 1);
  const intervalDays = Math.max(Math.floor(intervalDaysSrc / intervalCount), 1);
  const intervals = [];
  for (let from = dayjs(args.dateFrom); from.isBefore(args.dateTo);) {
    const to = from.add(intervalDays, 'days');
    intervals.push({ dateFrom: from, dateTo: to });
    from = to.startOf('day').add(1, 'day');
  }
  intervals[intervals.length - 1].dateTo = args.dateTo;
  return intervals;
}
