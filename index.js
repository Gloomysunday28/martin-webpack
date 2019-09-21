// console.log("我是老骚");

// switch (true) {
//   case a.length === 5:
//     console.log("5");
//   case a.length === 6:
//     console.log("6");
//   case a.length === 7:
//     console.log("22222");
//     break
//   case a.length === 8:
//     console.log("8888");
//     break
//   default:
//     break
// }

// for (let i = 0; i < 2; i++) {
//   console.log(i);
//   for (let j = 0 ; j < 2; j++) {
//     console.log(j);
//     break
//   }

const b = function(a) {
  arguments.a = 312
  console.log(a);
}

b({a: 1})

;(function() {
  console.log('1231');
})()

;(function() {
  console.log('1231');
}())

console.log('6'.toString().padStart(2, '0'));

// const a = '2019-5-1 21:58:00'
// const b = '2019-5-1 20:59:00'
// console.log(b > a)