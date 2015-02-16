describe("A calculator", function(){
	it("Should be able to add 2 numbers", function(){
		//Arrange
		var number1 = 10,
			number2 = 20,
			expectedResult = 30;

		//Act
		var result = add(number1, number2);

		//Assert
		expect(result).toBe(expectedResult);
	});

	it("Should be able to add 2 numbers in string format", function(){
		//Arrange
		var number1 = "10",
			number2 = "20",
			expectedResult = 30;

		//Act
		var result = add(number1, number2);

		//Assert
		expect(result).toBe(expectedResult);
	});

});