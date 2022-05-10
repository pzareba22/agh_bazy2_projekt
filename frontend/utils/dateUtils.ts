import moment from "moment";

export const formatStartEndDate = (startDate: Date, endDate: Date, alwaysAppendYear?: boolean): string => {
    const yearAppending =
        (moment().isSame(moment(startDate), 'year') &&
            moment().isSame(moment(endDate), 'year') &&
            !alwaysAppendYear
        )
            ? ''
            : `.${moment(endDate).format('YY')}`

    if (moment(startDate).isSame(moment(endDate), 'day')) {
        return moment(startDate).format('DD.MM') + yearAppending;
    }
    if (moment(startDate).isSame(moment(endDate), 'month')) {
        return moment(startDate).format('DD') + '-' + moment(endDate).format('DD.MM') + yearAppending;
    }
    if (moment(startDate).isSame(moment(endDate), 'year')) {
        return moment(startDate).format('DD.MM') + '-' + moment(endDate).format('DD.MM') + yearAppending;
    }

    return moment(startDate).format('DD.MM.YY') + '-' + moment(endDate).format('DD.MM.YY');
}
