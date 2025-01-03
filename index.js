function add(...numbers) {
  return numbers.reduce((total, current) => total + current, 0);
}

function rest(...numbers) {
  return numbers.reduce((total, current) => total - current);
}


function multiply(...numbers) {
  return numbers.reduce((total, current) => total * current, 1);
}
