export class Common {
    public getDate(dateString: string) {
        var date = new Date(dateString);
        var day = date.getDate();       // yields date
        var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
        var year = date.getFullYear();  // yields year
        var hour = date.getHours();     // yields hours 
        var minute = date.getMinutes(); // yields minutes
        var second = date.getSeconds(); // yields seconds

        // After this construct a string with the above results as below
        //var time = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;

        return day + "/" + month + "/" + year;
    }
}