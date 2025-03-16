

export function handleDate(date: string) {
    const newDate = new Date(date).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' });
    return newDate;
}