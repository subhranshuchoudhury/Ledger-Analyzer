export const stringDateToNumberDate = (dateString: string): Date => {
    // dateString is in format "dd-mon-yyyy" , eg. "01-Apr-2020"
    // return js object of type Date
    // Company Name : UNIVERSAL COMPONENTS DISTRIBUTION PRIVATE LIMITED


    var parts = dateString.split('-');
    var day = parseInt(parts[0], 10);
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(parts[1]);
    var year = parseInt(parts[2], 10);

    var convertedDate = new Date(year, month, day);
    // console.log("CONVERTED DATE", convertedDate);

    return convertedDate;


}