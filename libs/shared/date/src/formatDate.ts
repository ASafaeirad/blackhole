import { format } from 'date-fns/format';

export const formatDate = (date: Date | number) => format(date, 'yyyy-MM-dd');
