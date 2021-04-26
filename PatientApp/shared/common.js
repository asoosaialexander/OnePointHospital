export function getInitials(name) {
  let names = name.split(' ');
  let initials = '';
  names.forEach(name => {
    if (name.toLowerCase() != 'dr.' && name.toLowerCase() != 'dr') {
      initials += name.substring(0, 1).toUpperCase();
    }
  });
  return initials;
}

export function getDateComponents(input) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  var date = input ? new Date(input) : new Date();
  return {
    day: ('0' + date.getDate()).slice(-2),
    month: monthNames[date.getMonth()],
    year: date.getFullYear() - 2000,
    hour: ('0' + date.getHours()).slice(-2),
    minute: ('0' + date.getMinutes()).slice(-2),
    second: ('0' + date.getSeconds()).slice(-2)
  }
}

export function dateDisplay(input) {
  // const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  //   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  // ];
  // var date = input ? new Date(input) : new Date();

  // return ('0' + date.getHours()).slice(-2) +":"('0' + date.getMinutes()).slice(-2)+
  // " "+('0' + date.getDate()).slice(-2)+" "+monthNames[date.getMonth()]+" "+date.getFullYear();
  // return {
  //   day: ('0' + date.getDate()).slice(-2),
  //   month: monthNames[date.getMonth()],
  //   year: date.getFullYear() - 2000,
  //   hour: ,
  //   minute: ,
  //   second: ('0' + date.getSeconds()).slice(-2)
  // }
}

//12:35 PM Monday 1st Mar 2021

export function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

export function getDateList(days) {
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var today = new Date();
  var dates = [];

  while (days) {
    var date = String(today.getDate());
    var mm = today.getMonth(); //January is 0!
    var day = date + ' ' + month[mm];
    dates.push(day);

    today.setDate(today.getDate() + 1);
    days--;
  }

  return dates;
}

export function getAge(dateOfBirthText) {
  var dob = new Date(dateOfBirthText);
  var month_diff = Date.now() - dob.getTime();
  var age_dt = new Date(month_diff);
  var year = age_dt.getUTCFullYear();
  return Math.abs(year - 1970);
}
