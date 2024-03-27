export const getDatesByMonth = (data) => data.reduce((acc, item, index) => {
    const monthYear = item.date_create.slice(0, 7);
    acc[monthYear] = [...(acc[monthYear] || []), index];
    return acc;
}, {});

export const earliestObject = (data) => data.reduce((earliest, current) => {
    if (!earliest || new Date(current.date_create) < new Date(earliest.date_create)) {
        return current;
    } else {
        return earliest;
    }
}, null);

export const howMuchDays = (dateStr) => (new Date() - new Date(dateStr)) / (24 * 60 * 60 * 1000);

export const getSumOfAll = (data) => parseFloat((data.map(amount => amount.amount).reduce((a, b) => a + b, 0) / 100).toFixed(2));

export const sortedDataByDateCreate = (data) => [...data].sort((a, b) => new Date(a.date_create) - new Date(b.date_create));