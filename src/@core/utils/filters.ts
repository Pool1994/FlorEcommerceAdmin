// import Vue from "vue"
import moment from "moment";
export const myGlobal = (created_at: Date) => {
  if (!isEmpty(created_at)) return moment(created_at).format("MM/DD/YYYY");
  return "-";
}
export const myGlobalWithHour = (created_at: string) => {
  if (!isEmpty(created_at)) return moment(created_at).format("MM/DD/YYYY h:mm A");
  return "-";
}

export const myDateGlobal = (created_at: string) => {
  if (!isEmpty(created_at)) return moment(created_at).format("ddd, D MMM YYYY");
  return "-";
}

export const myDateGlobal2 = (created_at: string) => {
  if (!isEmpty(created_at)) return moment(created_at).format("D MMM YYYY");
  return "-";
}

export const myDateGlobalWithHour = (created_at: string) => {
  if (!isEmpty(created_at)) return moment(created_at).format("ddd, D MMM YYYY hh:mm A");
  return "-";
}

export const myTime = (created_at: string) => {
  if (!isEmpty(created_at)) return moment(created_at, "HH:mm:ss").format("hh:mm A")
  return "-";
}

export const myTimeOrNothing = (created_at: string) => {
  if (!isEmpty(created_at)) return moment(created_at, "HH:mm:ss").format("hh:mm A")
  return "-";
}
export const myFullTime = (created_at: string) => {
  if (!isEmpty(created_at)) return moment(created_at, "HH:mm:ss").format("HH:mm")
  return "-";
}
export const myGlobalDay = (created_at: string) => {
  if (!isEmpty(created_at)) return moment(created_at).format("DD/MM/YYYY hh:mm A")
  return "-";
}
export const countHoursMinute = (created_at: string) => {
  if (!isEmpty(created_at)) {
    const hour = parseInt(moment(created_at, "HH:mm:ss").format("HH"))
    const minutes = moment(created_at, "HH:mm:ss").format("mm")
    return `${hour} h ${minutes} min`
  }
  return "-"
}
export const countHour = (created_at: string) => {
  if (!isEmpty(created_at)) {
    const hour = parseInt(moment(created_at, "HH:mm:ss").format("HH"))
    return `${hour} h`
  }
  return "-"
}
export const myDate = (created_at: string) => {
  if (!isEmpty(created_at)) return moment(created_at).format("MMMM Do YYYY")
  return "-";
}
export const formatDateFilter = (created_at: string) => {
  if (!isEmpty(created_at)) return moment(created_at).format("YYYY-MM-DD");
  return "-";
}
export const myDateText = (created_at: string) => {
  if (!isEmpty(created_at)) moment(created_at).format("dddd, Do")
  return "-";
}
export const myMonthYear = (created_at: string) => {
  if (!isEmpty(created_at)) moment(created_at).format("MMM YY")
  return "-";
}

export const myFromNow = (created_at: string) => {
  if (!isEmpty(created_at)) return moment(created_at).fromNow()
  return "-";
}
export const formatMoney = (value: number, locale = "es-PE", currency = 'PEN') => {
  return Intl.NumberFormat(locale, { style: 'currency', currency }).format(value ?? 0).concat(` ${currency}`);
}
