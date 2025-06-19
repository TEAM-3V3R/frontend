function formatDate(isoString) {
  if (typeof isoString !== 'string') {
    return 'Invalid input';
  }

  const trimmed = isoString.split('.')[0];
  const date = new Date(trimmed);

  if (isNaN(date)) {
    return 'Invalid date';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}

export default formatDate;
