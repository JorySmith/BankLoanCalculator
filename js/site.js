// Get function
function userInputs() {
    // Get user supplied loan details
    let userLoanAmount = document.getElementById("loanAmount").value;
    let userTotalPayments = document.getElementById("payments").value;
    let userIntRate = document.getElementById("intRate").value;

    // Calculate loan details based on inputs
    let loanDetails = calculateLoanDetails(userLoanAmount, userTotalPayments, userIntRate)

    // Display loan details in the page/DOM
    displayLoanDetails(loanDetails)
}

// Logic function
// Calculate monthly payment and total interest, cost, and amortization table
function calculateLoanDetails(loanAmount, totalPayments, intRate) {
    // Ensure loanAmount and intRate parameters are parsed from strings into float numbers
    let parsedLoanAmount = parseFloat(loanAmount);
    let parsedIntRate = parseFloat(intRate);
    // Ensure totalPayments parameter is parsed from a string into an integer numbers
    let parsedTotalPayments = parseInt(totalPayments);

    // Declare loanDetails object, which this function will return
    // Return data should include totalPrincipal, totalInterest, totalCost, and amortizationTable
    let loanDetails = {
        totalPrincipal: parsedLoanAmount,
        monthlyPayment: 0,
        totalInterest: 0,
        totalCost: 0,
        amortizationTable: []
    };

    // Monthly mortgage payment formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]    
    // M = monthly payment; P = principal loan amount; i = monthly interest rate; n = number of months required to repay the loan    
    
    // Monthly interest rate
    // Calculate i = monthly interest rate after converting user-supplied whole number interest rate into decimal form first
    let monthlyIntRate = (parsedIntRate/100/12);   

    // Updated monthly mortgage payment formula:
    // M = monthlyPayment; P = parsedLoanAmount; i = monthlyIntRate; n = totalPayments
    // monthlyPayment = parsedLoanAmount * ((monthlyIntRate(1 + monthlyIntRate)) ** totalPayments) / (((1 + monthlyIntRate) ** totalPayments) – 1)
    
    // Calculate monthly payment, interest, and principal      
    monthlyPaymentDetails = calculateMonthlyPayment(parsedLoanAmount, monthlyIntRate, parsedTotalPayments);
    loanDetails.monthlyPayment = monthlyPaymentDetails.totalMonthlyPayment

    // Calculate totalInterest and totalCost
    loanDetails.totalCost = (monthlyPaymentDetails.totalMonthlyPayment * parsedTotalPayments);
    loanDetails.totalInterest = (loanDetails.totalCost - parsedLoanAmount);    

    // Create monthly payment amortization table row for as many payments totalPayments requires  
    // Add each monthly payment data array to loanDetails.amortizationTable array
    // Track and update total interest paid after each payment
    // Track and update loan balance after each payment reduction
    // Track and update remaining payments after each payment
    let monthlyPaymentRow = [];
    let monthlyPaymentInfo = {};
    let updatedLoanAmount = parsedLoanAmount;
    let totalInterestPaid = 0;
    let paymentsRemaining = totalPayments;
    for (let payment = 1; payment <= totalPayments; payment++) {        
        // Push payment number to monthlyPaymentRow
        monthlyPaymentRow.push(payment);

        // Calculate monthly payment info
        monthlyPaymentInfo = calculateMonthlyPayment(updatedLoanAmount, monthlyIntRate, paymentsRemaining);

        // Get total monthly payment, push to monthlyPaymentRow
        monthlyPaymentRow.push(monthlyPaymentInfo.totalMonthlyPayment);

        // Get monthly principal payment, push to monthlyPaymentInfo
        monthlyPaymentRow.push(monthlyPaymentInfo.monthlyPrincipalPayment);

        // Get monthly interest payment, push to monthlyPaymentInfo, update totalInterestPaid, push to monthlyPaymentInfo
        monthlyPaymentRow.push(monthlyPaymentInfo.monthlyInterestPayment);
        totalInterestPaid += monthlyPaymentInfo.monthlyInterestPayment;
        monthlyPaymentRow.push(totalInterestPaid);

        // Reduce updated loan amount by total monthly payment, push to monthlyPaymentInfo
        updatedLoanAmount = Math.round((updatedLoanAmount - monthlyPaymentInfo.totalMonthlyPayment) * 100) / 100;
        monthlyPaymentRow.push(updatedLoanAmount);

        // Push monthlyPaymentRow array to loanDetails.amortizationTable and clear monthlyPaymentRow
        loanDetails.amortizationTable.push(monthlyPaymentRow);
        monthlyPaymentRow = [];

        // Update paymentsRemaining
        paymentsRemaining--;

        // Increment for loop
        payment++;        
    }    
    return loanDetails
}

// Calculate monthly payment, interest, and principal
function calculateMonthlyPayment(loanAmount, monthlyIntRate, totalPayments) {
    // Parse floats for inputs
    let parsedLoanAmount = parseFloat(loanAmount);
    let parsedMonthlyIntRate = parseFloat(monthlyIntRate);
    let parsedTotalPayments = parseFloat(totalPayments);

    // Declare return object
    let returnObj = {}    

    // Step through monthly mortgage payment formula, force result to 2 decimals spaces 
    let resultA = (parsedMonthlyIntRate * ((1 + parsedMonthlyIntRate) ** parsedTotalPayments));
    let resultB = (((1 + parsedMonthlyIntRate) ** parsedTotalPayments) - 1);
    let resultC = (resultA/resultB);
    returnObj.totalMonthlyPayment = Math.round(parseFloat((parsedLoanAmount * resultC)) * 100) / 100;

    // Monthly interest payment formula: loan balance * monthlyIntRate
    returnObj.monthlyInterestPayment = Math.round(parseFloat((parsedLoanAmount * parsedMonthlyIntRate)) * 100) / 100;
    // Monthly principal payment formula: monthly payment - monthly interest payment
    returnObj.monthlyPrincipalPayment = Math.round(parseFloat((returnObj.totalMonthlyPayment - returnObj.monthlyInterestPayment)) * 100) / 100;

    return returnObj;
}

// Display function
// Take loanDetails object and inject amortization table into the DOM 
function displayLoanDetails(loanDetails) {

}