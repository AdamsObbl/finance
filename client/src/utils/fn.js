export const getDatesByMonth = (data) => data.reduce((acc, item, index) => {
    const monthYear = item.date_create.slice(0, 7);
    acc[monthYear] = [...(acc[monthYear] || []), index];
    return acc;
}, {});

export const getDatesByDay = (data) => data.reduce((acc, item, index) => {
    const monthYear = item.date_create.slice(0, 10);
    acc[monthYear] = [...(acc[monthYear] || []), index];
    return acc;
}, {});

export const getDatesByWeek = (data,moment) => data.reduce((acc, item, index) => {
    const weekYear = moment(item.date_create).isoWeek();
    acc[weekYear] = [...(acc[weekYear] || []), index];
    return acc;
}, {});

export const earliestObject = (data) => data.reduce((earliest, current) => {
    if (!earliest || new Date(current.date_create) < new Date(earliest.date_create)) {
        return current;
    } else {
        return earliest;
    }
}, null);

export const getSumOfAll = (data) => parseFloat((data.map(amount => amount.amount).reduce((a, b) => a + b, 0) / 100).toFixed(2));

