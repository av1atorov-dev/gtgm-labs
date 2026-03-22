console.log('Варiант 13. Завдання 3')
let area = 50; // гектар
let yield = 30; // центнер з гектара

console.log('Рік 1:');
console.log('Площа:', area, 'га');
console.log('Врожайність:', yield, 'З гектару');
console.log('Урожай:', area * yield);
console.log('------------------------------------');

// a) за 2-7 років
console.log('a) Врожайність за 2-7 років:');
yield = 30;
for (let year = 2; year <= 7; year++) {
  yield = yield * 1.01;
  console.log('Рік', year, ':', yield.toFixed(2), 'З гектару');
}
console.log('');

// b) Площа за 3-8 років
console.log('b) Площа за 3-8 років:');
area = 50;
for (let year = 2; year <= 8; year++) {
  area = area * 1.10;
  if (year >= 3) {
    console.log('Рік', year, ':', area.toFixed(2), 'га');
  }
}
console.log('');

// c) За перші 5 років загальний урожай
console.log('c) Загальний урожай за перші 5 років:');
area = 50;
yield = 30;
let totalHarvest = 0;

for (let year = 1; year <= 5; year++) {
  let harvest = area * yield;
  totalHarvest = totalHarvest + harvest;
  console.log('Рік', year, ':', harvest.toFixed(2));
  
  area = area * 1.10;
  yield = yield * 1.01;
}

console.log('Разом:', totalHarvest.toFixed(2));