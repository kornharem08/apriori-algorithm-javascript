
function apriori(itemsetinput) {

  var dataset = itemsetinput
  console.log(dataset);
  var result = [];
  var temp;

  
  for (var i = 0; i < dataset.length; i++) {
    temp = dataset[i].length;
    for (var j = 0; j < temp; j++) {
      result.push(dataset[i][j])
    }
  }
 


  // console.log(getAllSubsets(result));
  var uniqs = result.reduce((acc, val) => {
    acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
    // console.log(acc)
    return acc;
  }, {});


  var transaction = document.getElementById("table").value;
  var confident = document.getElementById("ConfidentSupport").value;
  console.log(confident);
  console.log(transaction);
  
  
  var minsup = document.getElementById("MinimumSupport").value;
  console.log(minsup);
  
  var dataset2 = [];
  var frequent = [];
  for (var key in uniqs) {
    var itemset = (uniqs[key] / transaction) * 100;
    if (itemset >= minsup) {
      //console.log(key+":"+itemset);
      dataset2.push(key);
      
        // console.log({ key: [key], sup: itemset });
        
      frequent.push({ key: [key], sup: itemset })
      console.log("{"+key+"}"+" ("+itemset +")");
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
      if ((count / transaction) * 100 >= minsup) {
        console.log("{"+element+"}"+" ( Support: "+(count / transaction) * 100 +"% )");
        frequent.push({ key: element, sup: (count / transaction) * 100 })
      }
      
      
    }
  });


  // console.log(JSON.stringify(frequent));


  function contains(haystack, needles) {
    return needles.map(function (needle) {
      return haystack.indexOf(needle);
    }).indexOf(-1) == -1;
  }




  var ip = 0
  frequent.forEach(function (assosition) {
    var subset2 = getAllSubsets(assosition.key)
    // console.log(subset2);
    subset2.forEach(function (assosition2) {
     // console.log(assosition2.length);
      
      if (assosition2 != '' && assosition2.length != assosition.key.length) {
          
        frequent.forEach(function (assosition3) {
          if((assosition.sup / assosition3.sup) * 100 >= confident){
            if (assosition2.sort().toString() == assosition3.key.sort().toString()) {
            var remove = removeFromArray(assosition.key, assosition2)
            console.log("{"+assosition2.toString()+"}", '==>', "{"+remove.toString()+"}",'( Support :',assosition.sup +"% )" ,', ( Confidence :', (assosition.sup / assosition3.sup) * 100,"% )");
            ip += 1
          }
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

var tid = 0

function table() {
  var table = document.getElementById("table").value;
  tid = table;
  var html = "";

for (var i = 0; i < table; i++) {
    html += '<input type="text"class="form-control" name="' + i + '" id="' + i + '" aria-describedby="helpId" placeholder=""></input>'+'<br>';   
  }
   console.log(html)
    html +=
    '<div id="button1" style="text-align: center"><button type="button"  onclick="inputarr()">OK</button> </div>';
   document.getElementById('showbox').innerHTML = html;
  
}

function inputarr() {
  var itemsetinput = []
  for (var i = 0; i < tid; i++) {
    var array = document.getElementById(i).value.split(",");
    itemsetinput.push(array.map(str => str.replace(/\s/g, '')));
  }
  console.log(itemsetinput);
  apriori(itemsetinput)
}
