function calcCircle(r){
  return Math.PI * r * 2 ;
}
function calcArea(r){
  return Math.PI * r * r ;
}
function add(n1, n2){
  return n1 + n2;
}
module.exports = {
  calcCircle,
  calcArea,
  add
}