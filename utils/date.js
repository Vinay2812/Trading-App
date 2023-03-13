export function convertDate(date) {
    if(!date || !date?.length)return;
    let d = new Date(date)
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " at " + d.toLocaleTimeString()
  }