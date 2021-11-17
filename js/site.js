// Get function
function getUserInputs() {
    // Get user supplied loan details
    let userLoanAmount = document.getElementById("loanAmount").value;
    let userTotalPayments = document.getElementById("payments").value;
    let userIntRate = document.getElementById("intRate").value;

    // Calculate loan details based on inputs
    let loanDetails = calculateLoanDetails(userLoanAmount, userTotalPayments, userIntRate)

    // Display loan details in the page/DOM
    displayLoanDetails(loanDetails);
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
        theMonthlyPayment: 0,
        totalInterest: 0,
        totalCost: 0,
        amortizationTable: []
    };

    // Monthly mortgage payment formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]    
    // M = monthly payment; P = principal loan amount; i = monthly interest rate; n = number of months required to repay the loan    
    
    // Monthly interest rate
    // Calculate i = monthly interest rate after converting user-supplied whole number interest rate into decimal form first
    let monthlyIntRate = (parsedIntRate / 100 / 12);   

    // Updated monthly mortgage payment formula:
    // M = monthlyPayment; P = parsedLoanAmount; i = monthlyIntRate; n = totalPayments
    // monthlyPayment = parsedLoanAmount * ((monthlyIntRate(1 + monthlyIntRate)) ** totalPayments) / (((1 + monthlyIntRate) ** totalPayments) – 1)
    
    // Calculate monthly payment, interest, and principal        
    monthlyPaymentDetails = calculateMonthlyPayment(parsedLoanAmount, monthlyIntRate, parsedTotalPayments);
    loanDetails.theMonthlyPayment = monthlyPaymentDetails.totalMonthlyPayment;

    // Calculate totalInterest and totalCost
    loanDetails.totalCost = (loanDetails.theMonthlyPayment * parsedTotalPayments).toFixed(2);
    loanDetails.totalInterest = (loanDetails.totalCost - parsedLoanAmount).toFixed(2);    

    // Create monthly payment amortization table row for as many payments totalPayments requires  
    // Add each monthly payment data array to loanDetails.amortizationTable array
    // Calculate total monthly payment    
    // Track and update total interest, loan balance, and remaining payments after each payment
    let monthlyPaymentRow = []; 
    let updatedLoanAmount = parsedLoanAmount;
    let totalInterestPaid = 0;
    let paymentsRemaining = totalPayments;
    for (let payment = 1; payment <= totalPayments; payment++) {        
        // Push payment number to monthlyPaymentRow
        monthlyPaymentRow.push(payment);

        // Push theMonthlyPayment to monthlyPaymentRow        
        monthlyPaymentRow.push(loanDetails.theMonthlyPayment);

        // Get monthly principal payment, push to monthlyPaymentRow 
        let updatedMonthlyPaymentInfo = calculateMonthlyPayment(updatedLoanAmount, monthlyIntRate, paymentsRemaining);
        monthlyPaymentRow.push(updatedMonthlyPaymentInfo.monthlyPrincipalPayment.toFixed(2));

        // Get monthly interest payment, push to monthlyPaymentRow, update totalInterestPaid, push to monthlyPaymentRow
        monthlyPaymentRow.push(updatedMonthlyPaymentInfo.monthlyInterestPayment.toFixed(2));
        totalInterestPaid += Math.round(parseFloat(updatedMonthlyPaymentInfo.monthlyInterestPayment) * 100) / 100;
        monthlyPaymentRow.push(totalInterestPaid.toFixed(2));

        // Update loan amount by reducing it by principle only payment, push to monthlyPaymentRow
        updatedLoanAmount = Math.round(parseFloat((updatedLoanAmount - updatedMonthlyPaymentInfo.monthlyPrincipalPayment)) * 100) / 100;
        monthlyPaymentRow.push(updatedLoanAmount.toFixed(2));

        // Push monthlyPaymentRow array to loanDetails.amortizationTable and clear monthlyPaymentRow
        loanDetails.amortizationTable.push(monthlyPaymentRow);
        monthlyPaymentRow = [];

        // Update paymentsRemaining
        paymentsRemaining--;           
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
    let returnObj = {};

    // Total monthly payment, force result to 2 decimals spaces 
    let resultA = parsedMonthlyIntRate * ((1 + parsedMonthlyIntRate) ** parsedTotalPayments);
    let resultB = ((1 + parsedMonthlyIntRate) ** parsedTotalPayments) - 1;
    let resultC = resultA / resultB;
    returnObj.totalMonthlyPayment = Math.round(parseFloat((parsedLoanAmount * resultC).toFixed(2)) * 100) / 100;

    // Monthly interest payment formula: loan balance * monthlyIntRate
    returnObj.monthlyInterestPayment = Math.round(parseFloat((parsedLoanAmount * parsedMonthlyIntRate).toFixed(2)) * 100) / 100;

    // Monthly principal payment formula: monthly payment - monthly interest payment
    returnObj.monthlyPrincipalPayment = Math.round(parseFloat((returnObj.totalMonthlyPayment - returnObj.monthlyInterestPayment).toFixed(2)) * 100) / 100;

    return returnObj;
}

function addCommasToNumbers(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Display function
// Display loan details and full amortization table in the DOM 
function displayLoanDetails(loanDetails) {    
    // Add commas in the monthly payment and total principal, interest, and cost numbers if needed via addCommasToNumbers()
    let mPayment = addCommasToNumbers(loanDetails.theMonthlyPayment);
    let tPrincipal = addCommasToNumbers(loanDetails.totalPrincipal);
    let tInterest = addCommasToNumbers(loanDetails.totalInterest);
    let tCost = addCommasToNumbers(loanDetails.totalCost);

    // Inject monthlyPayment, totalPrincipal, totalInterest, and totalCost amounts into the DOM
    document.getElementById("monthlyPayments").innerHTML = `$${mPayment}`;
    document.getElementById("totalPrincipal").innerHTML = `$${tPrincipal}`;
    document.getElementById("totalInterest").innerHTML = `$${tInterest}`;
    document.getElementById("totalCost").innerHTML = `$${tCost}`;
    
     // Get and store results table from the HTML DOM
     let resultsTable = document.getElementById("resultsTable");

     // Get and store the template row doc fragment from the HTML DOM
     let templateRow = document.getElementById("monthlyPaymentTemplate");
 
     // Clear table first, always start fresh 
     resultsTable.innerHTML= "";

    // Loop through loanDetails.amortizationTable and inject each monthly payment into the DOM
    for (let i = 0; i < loanDetails.amortizationTable.length; i++) {
        // Inject into each row: payment month, payment amount, principal payment, interest payment, interest paid after payment, updated balance after payment
        // Get and store document fragment template 
        let tableRow = document.importNode(templateRow.content, true);

        // Get and store the TDs from the document fragment        
        let rowCols = tableRow.querySelectorAll("td");
        
        // Assign loanDetails.amortizationTable data to respective TD element 
        rowCols[0].textContent = loanDetails.amortizationTable[i][0];   
        rowCols[1].textContent = loanDetails.amortizationTable[i][1];   
        rowCols[2].textContent = loanDetails.amortizationTable[i][2];   
        rowCols[3].textContent = loanDetails.amortizationTable[i][3];   
        rowCols[4].textContent = loanDetails.amortizationTable[i][4];   
        rowCols[5].textContent = loanDetails.amortizationTable[i][5];           

        // Append rowCols to the resultsTable
        resultsTable.appendChild(tableRow);
    }
}