class DateParser {
    // fetch the elasticsearch date query format data: YYYY-MM-DD by slicing the
    // javascript ISOdate format: i.e. 2018-03-08T08:15:16.097Z
    static parseDate(date) {
        return date.split('T')[0];
    }
}

export default DateParser;
