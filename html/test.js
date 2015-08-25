var compareArray = function(array1, array2) {
    str1 = JSON.stringify(array1);
    str2 = JSON.stringify(array2);
    return str1 === str2 ? true : false ;
  };


var isValidPos = function(pos) {
  var segments = [[0,0], [0,1], [0,2], [0,3]];
    var res = true;
    segments.forEach(function (sp) {
      if (compareArray(sp,pos)) {
        res = false;
        return false;
      }
    });
    return res;
  };

console.log(isValidPos([0,5]));
