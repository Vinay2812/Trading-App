import { format } from 'date-fns';
export default function convertDate(date) {
    if(!date || !date?.length)return;
    return format(new Date(date), "dd/MM/yyyy");
  }