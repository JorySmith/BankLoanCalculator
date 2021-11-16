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
        totalPrincipal: 0,
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
    // Calculate i = monthly interest rate
    let monthlyIntRate = (intRate/12);

    //  M = monthly payment; P = parsedLoanAmount; i = monthlyIntRate; n = totalPayments

    // Need to calculate each months payment for as long as totalPayments requires
    // Need to calculate how much each payment reduces the principal, and how much goes towards interest
    // Need to track total interest paid after each payment
    // Need to track loan balance new total after each payment

    


    // Calculate amortizationTable
    // Calculate total principal, interest, and cost

    

    return loanDetails
}

// Display function
function displayLoanDetails(loanDetails) {

}