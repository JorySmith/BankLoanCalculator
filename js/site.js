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
    monthlyPaymentDetails = calculateMonthlyPayment(parsedLoanAmount, monthlyIntRate, totalPayments);

    // Calculate totalInterest and totalCost
    totalCost = (monthlyPaymentDetails.totalMonthlyPayment * totalPayments);
    totalInterest = (totalCost - parsedLoanAmount);
    

    // Create amortization table for as long as totalPayments requires        
    for (let payment = 1; payment <= totalPayments; payment++) {
        
        
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
function calculateMonthlyPayment(loanAmount, monthlyIntRate, totalPayments) {
    // Parse floats for inputs
    let parsedLoanAmount = parseFloat(loanAmount);
    let parsedMonthlyIntRate = parseFloat(monthlyIntRate);
    let parsedTotalPayments = parseFloat(totalPayments);

    // Declare return object
    let returnObj = {}    

    // Step through monthly mortgage payment formula
    let resultA = (parsedMonthlyIntRate * ((1 + parsedMonthlyIntRate) ** parsedTotalPayments));
    let resultB = (((1 + parsedMonthlyIntRate) ** parsedTotalPayments) - 1);
    let resultC = (resultA/resultB);
    returnObj.totalMonthlyPayment = parseFloat((parsedLoanAmount * resultC).toFixed(2));

    // Monthly interest payment formula: loan balance * monthlyIntRate
    returnObj.monthlyInterestPayment = parseFloat((parsedLoanAmount * parsedMonthlyIntRate).toFixed(2));
    // Monthly principal payment formula: monthly payment - monthly interest payment
    returnObj.monthlyPrincipalPayment = parseFloat((returnObj.totalMonthlyPayment - returnObj.monthlyInterestPayment).toFixed(2));

    return returnObj;
}

// Display function
function displayLoanDetails(loanDetails) {

}