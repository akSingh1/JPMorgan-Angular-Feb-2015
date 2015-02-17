var products = [
	{id : 8, name : "Pen", cost : 50, units : 30, category : 1},
	{id : 4, name : "Hen", cost : 80, units : 90, category : 2},
	{id : 9, name : "Ten", cost : 60, units : 70, category : 1},
	{id : 6, name : "Den", cost : 90, units : 80, category : 2},
	{id : 7, name : "Zen", cost : 40, units : 40, category : 1},
	{id : 3, name : "Ken", cost : 30, units : 20, category : 2}
];

var printGroup = function(title, fn){
	console.group(title)
	fn();
	console.groupEnd();
}

printGroup("Default List", function(){
	console.table(products);
});

printGroup("Sort", function(){
	printGroup("Default Sort By Id", function(){
		function sort(){
			for(var i=0;i<products.length-1;i++)
				for(var j=i+1; j<products.length;j++){
					var left = products[i],
						right = products[j];
					if (left.id > right.id){
						products[i] = products[j];
						products[j] = left;
					}
				}
		}
		sort();
		console.table(products);
	});

	printGroup("Sort implementation using attribute name", function(){
		function sort(list, attrName){
			for(var i=0;i<list.length-1;i++)
				for(var j=i+1; j<list.length;j++){
					var left = list[i],
						right = list[j];
					if (left[attrName] > right[attrName]){
						list[i] = list[j];
						list[j] = left;
					}
				}
		}
		sort(products, "cost");
		console.table(products);
	})

	printGroup("Sort implementation using comparer function", function(){
		function sort(list, comparerFn){
			for(var i=0;i<list.length-1;i++)
				for(var j=i+1; j<list.length;j++){
					var left = list[i],
						right = list[j];
					if (comparerFn(left, right) > 0){
						list[i] = list[j];
						list[j] = left;
					}
				}
		}
		var productComparerByValue = function(p1, p2){
			var p1Value = p1.units * p1.cost,
				p2Value = p2.units * p2.cost;
			if (p1Value < p2Value) return -1;
			if (p1Value === p2Value) return 0;
			return 1;
		}
		sort(products, productComparerByValue);
		console.table(products);
	})
});

printGroup("Filter", function(){
	var costlyProducts = [];

	for(var i=0; i<products.length; i++)
		if (products[i].cost > 50)
			costlyProducts.push(products[i]);
	console.table(costlyProducts);
})


