// Get function
function userInputs() {
    // Get user supplied loan details
    let userLoanAmount = document.getElementById("loanAmount").value;
    let userTotalPayments = document.getElementById("payments").value;
    let userIntRate = document.getElementById("intRate").value;

    // Calculate loan details based on inputs
    calculateLoanDetails(userLoanAmount, userTotalPayments, userIntRate)

    // Display loan details in the page/DOM
    displayLoanDetails(loanDetails)
}

// Logic function
function calculateLoanDetails(loanAmount, totalPayments, intRate) {
    // Declare loanDetails object, which this function will return
    // Return data should include totalPrincipal, totalInterest, totalCost, and amortizationTable
    let loanDetails = {
        totalPrincipal: loanAmount,
        totalInterest: 0.0,
        totalCost: 0,
        amortizationTable: []
    };

    // Ensure loanAmount and intRate parameters are parsed from strings into float numbers
    let parsedLoanAmount = parseFloat(loanAmount);
    let parsedIntRate = parseFloat(intRate);
    // Ensure totalPayments parameter is parsed from a string into an integer numbers
    let parsedTotalPayments = parseInt(totalPayments);

    // Monthly mortgage payment formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]    
    // M = monthly payment; P = principal loan amount; i = monthly interest rate; n = number of months required to repay the loan

    // Declare monthly payment - M
    let monthlyPayment = 0; 
    // Calculate i = monthly interest rate after converting user-supplied whole number interest rate into decimal form first
    let monthlyIntRate = (parsedIntRate/100/12);   

    // Updated monthly mortgage payment formula:
    // M = monthlyPayment; P = parsedLoanAmount; i = monthlyIntRate; n = totalPayments
    // monthlyPayment = parsedLoanAmount * ((monthlyIntRate(1 + monthlyIntRate)) ** totalPayments) / (((1 + monthlyIntRate) ** totalPayments) – 1)
    
    // Calculate monthly payment        
    monthlyPayment = calculateMonthlyPayment(parsedLoanAmount, monthlyIntRate, totalPayments);

    // Calculate totalInterest and totalCost
    totalCost = (monthlyPayment.totalMonthlyPayment * totalPayments);
    totalInterest = (totalCost - parsedLoanAmount);

    // Create amortization table for as long as totalPayments requires 
    let    
    for (let payment = 1; payment <= totalPayments; payment++) {
        
        calculateMonthlyPayment(parsedLoanAmount, monthlyIntRate, totalPayments)
        // Calculate how much of each payment reduces the principal only
        // Calculate how much of each payment goes towards interest
        // Track and update total interest paid after each payment
        // Add each monthly payment data array to amortizationTable array
        // Track and update reduced loan balance after each payment
    }
    
    return loanDetails
}

// Calculate monthly payment
// Return total monthly payment, monthly interest payment, and monthly principal payment
function calculateMonthlyPayment(parsedLoanAmount, monthlyIntRate, totalPayments) {
    // Declare return object
    let returnObj = {
        totalMonthlyPayment: 0,
        monthlyInterestPayment: 0,
        monthlyPrincipalPayment: 0,
    }    
    // Step through monthly mortgage payment formula
    let resultA = monthlyIntRate * ((1 + monthlyIntRate) ** totalPayments);
    let resultB = (((1 + monthlyIntRate) ** totalPayments) - 1);
    let resultC = (resultA/resultB);
    totalMonthlyPayment = (parsedLoanAmount * resultC);

    // Monthly interest payment formula: loan balance * monthlyIntRate
    monthlyInterestPayment = (parsedLoanAmount * monthlyIntRate);
    // Monthly principal payment formula: monthly payment - monthly interest payment
    monthlyPrincipalPayment = (totalMonthlyPayment - monthlyInterestPayment);
}

// Display function
function displayLoanDetails(loanDetails) {

}