export default function convertDate(date) {
    if(!date || !date?.length)return;
    return new Date(date).toLocaleDateString();
  }