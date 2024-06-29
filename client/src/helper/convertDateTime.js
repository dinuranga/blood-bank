function convertDateTime(inputDateTime) {
  const inputDate = new Date(inputDateTime);
  return inputDate.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true });
}

export default convertDateTime;
