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
    // Return data includes totalPrincipal, totalInterest, totalCost, and amortizationTable
    let loanDetails = {
        totalPrincipal = 0,
        totalInterest = 0.0,
        totalCost = 0,
        amortizationTable = []
    };

    // Ensure loanAmount and totalPayments parameters are numbers (data type) and integers
    // Ensure intRate parameter is a number (data type) and a float
    if (condition) {
        
    } else {
        alert("Please enter numbers only")
    }

    return loanDetails
}

// Display function
function displayLoanDetails(loanDetails) {

}