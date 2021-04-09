export function getInitials(name) {
    let names = name.split(' ');
    let initials = '';
    names.forEach(name => {
        if (name.toLowerCase() != 'dr.' && name.toLowerCase() != 'dr') {
            initials += name.substring(0, 1).toUpperCase();
        }
    });
    return initials;
};

export function getDateList(days) {

    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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