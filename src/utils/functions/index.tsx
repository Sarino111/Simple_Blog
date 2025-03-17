

export function handleDate(date: string) {
    const newDate = new Date(date).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' });
    return newDate;
}

export function handleDateToIso(dateString: string): Date {
    const dateParts = dateString.split(', ')[1];
    
    const [month, day, year] = dateParts.split('/');
    
    const isoDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    return new Date(isoDateString);
}
