const num = Math.floor(Math.random() * 6 + 1);

let luck = '';

if (num == 1) luck = '大吉';
else if (num == 2) luck = '中吉';
else if (num == 3) luck = '小吉';
else if (num == 4) luck = '凶';
else if (num == 5) luck = '大凶';
else if (num == 6) luck = '落単';

console.log('あなたの運勢は' + luck + 'です');