import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import utc from 'dayjs/plugin/utc.js';
import 'dayjs/locale/ru.js';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
