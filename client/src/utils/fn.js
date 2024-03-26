export const getDatesByMonth =(data)=> data.reduce((acc, item, index) => {
    const monthYear = item.date_create.slice(0, 7);
    acc[monthYear] = [...(acc[monthYear] || []), index];
    return acc;
}, {});