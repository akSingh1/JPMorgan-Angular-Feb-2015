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
	function filter(list, criteriaFn){
		var result = [];
		for(var i=0; i<list.length; i++)
			if (criteriaFn(list[i]))
				result.push(list[i]);
		return result;
	}
	function getInverseCriteriaFor(criteriaFn){
		return function(){
			return !criteriaFn.apply(this,arguments);
		}
	}
	function costlyProductCriteria(item){
		return item.cost > 50
	}
	printGroup("Costly products", function(){
		
		var costlyProducts = filter(products, costlyProductCriteria);
		console.table(costlyProducts);
	});

	printGroup("Affordable products", function(){
		/*function affordableProductCriteria(item){
			return item.cost <= 50;
		}*/
		var affordableProductCriteria = getInverseCriteriaFor(costlyProductCriteria);
		var affordableProducts = filter(products, affordableProductCriteria);
		console.table(affordableProducts);
	});
	function InsufficientlyStockedProductCriteria(item){
		return item.units < 50
	}
	printGroup("Insufficiently stocked products", function(){
		
		var insufficientlyStockedProducts = filter(products, InsufficientlyStockedProductCriteria);
		console.table(insufficientlyStockedProducts);
	});
	printGroup("Insufficiently stocked products", function(){
		var sufficientlyStockedProductCriteria = getInverseCriteriaFor(InsufficientlyStockedProductCriteria);
		var sufficientlyStockedProducts = filter(products, sufficientlyStockedProductCriteria);
		console.table(sufficientlyStockedProducts);
	});


	printGroup("Category - 1 Products", function(){
		function category1ProductCriteria(item){
			return item.category === 1;
		}
		var category1Products = filter(products, category1ProductCriteria);
		console.table(category1Products);
	});
});

printGroup("GroupBy", function(){
	function groupBy(list, keySelectorFn){
		var result = {};
		for(var i=0;i < list.length; i++){
			var key = keySelectorFn(list[i]);
			if (typeof result[key] === "undefined")
				result[key] = [];
			result[key].push(list[i]);
		}
		return result;
	}

	function categoryKeySelector(product){
		return product.category;
	}
	printGroup("Products By Category", function(){
		var productsByCategory = groupBy(products, categoryKeySelector);
		for(var key in productsByCategory)
			printGroup("Products in Category - " + key, function(){
				console.table(productsByCategory[key]);
			});
	});

	function keySelectorByCost(product){
		return product.cost > 50 ? "costly" : "affordable";
	}
	var productsByCost = groupBy(products, keySelectorByCost);
	printGroup("Products By Cost", function(){
		var productsByCost = groupBy(products, keySelectorByCost);
		for(var key in productsByCost)
			printGroup("Products in Cost Category - " + key, function(){
				console.table(productsByCost[key]);
			});
	});
});


