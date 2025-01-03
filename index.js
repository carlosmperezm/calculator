function add(...numbers) {
  return numbers.reduce((total, current) => total + current, 0);
}

function rest(...numbers) {
  return numbers.reduce((total, current) => total - current);
}


