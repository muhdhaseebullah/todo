const months = {
    'January' : '01',
    'February' : '02',
    'March' : '03',
    'April' : '04',
    'May' : '05',
    'June' : '06',
    'July' : '07',
    'August' : '08',
    'September' : '09',
    'October' : '10',
    'November' : '11',
    'December' : '12'
}

class DateUtils {

    static getFormatedDate(dateObj) {
        const today = new Date(dateObj);
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!

        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return mm + '/' + dd + '/' + yyyy;
    }

    static getYesterday(dateObj) {
        const today = new Date(dateObj);
        today.setDate(today.getDate() - 1);
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!

        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return mm + '/' + dd + '/' + yyyy;
    }

    static getHiphenatedDate(dateObj) {
        const today = new Date(dateObj);
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!

        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return mm + '-' + dd + '-' + yyyy;
    }

    static getHiphenatedYesterday(dateObj) {
        const today = new Date(dateObj);
        today.setDate(today.getDate() - 1);
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!

        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return mm + '-' + dd + '-' + yyyy;
    }

    static getLastWeek() {
        let today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    }

    static getMonthStartDate(month, year) {
        return new Date(year + '-' + months[month] + '-01');
    }

    static getMonthEndDate(month, year) {
        let endDate = new Date(year + '-' + months[month] + '-01');
        endDate.setMonth(endDate.getMonth()+1);
        // endDate.setDate(endDate.getDate()-1)
        return endDate;
    }

    static getMonthEndDay(month, year) {
        let endDate = new Date(year + '-' + months[month] + '-01');
        endDate.setMonth(endDate.getMonth()+1);
        endDate.setDate(endDate.getDate()-1)
        return endDate.getDate();
    }

    static getMonthDayDate(month, year, day) {
        if(day < 10){
            day = '0' + day;
        }
        let endDate = new Date(year + '-' + months[month] + '-' + day);
        // endDate.setMonth(endDate.getMonth()+1);
        // endDate.setDate(endDate.getDate()-1)
        // console.log('endDate :', endDate);
        return endDate;
    }
    static isDateOnward(selected) {

        let selectDate = new Date(selected);
        let currentDate = new Date();
        // currentDate.setDate(currentDate.getDate()+1);
        // console.log('currentDate : ',currentDate);
        // console.log('diff : ',selectDate.getTime()-currentDate.getTime());
        let diff = (selectDate.getTime()-currentDate.getTime()) >= 0
        return diff;
    }
}

module.exports = DateUtils;
