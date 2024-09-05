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
// Vue.filter("myDateGlobal", (created) =>
//   moment(created).format("ddd, D MMM YYYY")
// )

// Vue.filter("myDateGlobal2", (created) =>
//   moment(created).format("D MMM YYYY")
// )

// Vue.filter("myDateGlobalWithHour", (created) =>
//   moment(created).format("ddd, D MMM YYYY hh:mm A")
// )

// Vue.filter("myTime", (created) => {
//   if (created) return moment(created, "HH:mm:ss").format("hh:mm A")
//   return "-"
// })

// Vue.filter("myTimeOrNothing", (created) => {
//   if (created) return moment(created, "HH:mm:ss").format("hh:mm A")
//   return ""
// })

// Vue.filter("myFullTime", (created) => {
//   if (created) return moment(created, "HH:mm:ss").format("HH:mm")
//   return "-"
// })

// Vue.filter("myGlobalDay", (created) => {
//   if (created) return moment(created).format("MM/DD/YYYY hh:mm A")
//   return "-"
// })
// Vue.filter("countHoursMinute", (value) => {
//   if (value) {
//     const hour = parseInt(moment(value, "HH:mm:ss").format("HH"))
//     const minutes = moment(value, "HH:mm:ss").format("mm")
//     return `${hour} h ${minutes} min`
//   }
//   return "-"
// })

// Vue.filter("countHour", (value) => {
//   if (value) {
//     const hour = parseInt(moment(value, "HH:mm:ss").format("HH"))
//     return `${hour} h`
//   }
//   return "-"
// })

// Vue.filter("myDate", function (created) {
//   return moment(created).format("MMMM Do YYYY")
// })
// Vue.filter("formatDate", function (created) {
//   return moment(created).format("YYYY-MM-DD")
// })
// Vue.filter("myDateText", function (created) {
//   return moment(created).format("dddd, Do")
// })

// Vue.filter("myMonthYear", function (created) {
//   return moment(created).format("MMM YY")
// })

// Vue.filter("myGlobalDayText", function (created) {
//   if (created)
//     return moment(created)
//       .format("dddd, MMMM DD, YYYY")
//       .toLocaleString("en-us", { weekday: "long" })
//   return "-"
// })

// Vue.filter("myFromNow", function (created) {
//   if (created) return moment(created).fromNow()
//   return "-"
// })
