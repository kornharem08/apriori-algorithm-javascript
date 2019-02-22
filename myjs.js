
function test(k) {
  

var dataset = k
console.log(dataset);

var result = [];
var temp;
var num;
for (var i = 0; i < dataset.length; i++) {
  temp = dataset[i].length;
  for (var j = 0; j < temp; j++) {
    result.push(dataset[i][j])
  }
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
function countUnique(iterable) {
  return new Set(iterable).size;
}

// console.log(getAllSubsets(result));
var uniqs = result.reduce((acc, val) => {
  acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
  // console.log(acc)
  return acc;
}, {});
var minsup = 40;
var dataset2 = [];
var frequent = [];
for (var key in uniqs) {
  var itemset = (uniqs[key] / 5) * 100;
  if (itemset >= minsup) {
    //console.log(key+":"+itemset);
    dataset2.push(key);
    frequent.push({key:[key],sup:itemset})
  }
}

const getAllSubsets =
  theArray => theArray.reduce(
    (subsets, value) => subsets.concat(
      subsets.map(set => [value, ...set])
    ),
    [[]]
  );
var subset = getAllSubsets(dataset2)

subset.forEach(function (element) {
  //console.log(element);
  if (element != [] && element.length > 1) {
    // console.log(element);
    var count = 0
    dataset.forEach(function (element2) {
      // console.log(element2);
      if (contains(element2, element) == true) {
        count += 1
      }
    })
    if ((count/5)*100 >= minsup) {
      frequent.push({key:element,sup:(count/5)*100})
    }
  }
});
console.log(frequent);
function contains(haystack, needles) {
  return needles.map(function (needle) {
    return haystack.indexOf(needle);
  }).indexOf(-1) == -1;
}
var ip=0
frequent.forEach(function(assosition) {
  var subset2 = getAllSubsets(assosition.key)
 // console.log(subset2);
  subset2.forEach(function(assosition2) {
    if(assosition2 != '' && assosition2.length != assosition.key.length){
        
        frequent.forEach(function(assosition3) {
          if (assosition2.sort().toString()==assosition3.key.sort().toString()) {
            var remove =removeFromArray(assosition.key, assosition2)
           console.log(assosition2,'---->',remove,'=',(assosition.sup/assosition3.sup)*100);
           ip+=1 
          }
        });

    }

  });
});
console.log(ip);

function removeFromArray(original, remove) {
  return original.filter(value => !remove.includes(value));
}
}



var tid=0
function table(){
 var table = document.getElementById("table").value;
 tid=table;
var html = "";
 for(var i=0;i<table;i++){

  html += '<input type="text"   class="form-control" name="'+i+'" id="'+i+'" aria-describedby="helpId" placeholder=""></input>';
  


 }
console.log(html)
document.getElementById('showbox').innerHTML=html;
}
function inputarr() {
  var k=[]
  for(var i=0;i<tid;i++){
    var array = document.getElementById(i).value.split(",");
   k.push(array.map(str => str.replace(/\s/g, '')) );
  }
  console.log(k);
  
  test(k)
}















  // dataset_two(dataset2);
  // function dataset_two(dataset2){
  // let dataset_C3 = [];  
  // let index;
  // let pair;
  // let current = 0;
  // let dataleng = dataset2.length;


//   for(let i=0;i<dataleng;i++){

//     index = dataset2[0];

//         for(let j = 0;j<dataset2.length;j++){
//             pair = dataset2[j]
//             if(index!=pair){
//             let text = index+pair
//             console.log(text);
//             dataset_C3.push(text)
//             }
//         }
//         dataset2.shift();
//   }
//   console.log(dataset_C3)
//   }  
//  var unique = result.filter(onlyUnique);
//  var count = countUnique(result);


