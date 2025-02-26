// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up calculator');

    // Check if accountManager is available
    if (!window.accountManager) {
        console.error('Account manager not found');
        return;
    }

    // Get form elements
    const form = document.getElementById('tax-form');
    const loginMessage = document.getElementById('login-message');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsDiv = document.getElementById('results');

    console.log('Elements found:', {
        form: !!form,
        loginMessage: !!loginMessage,
        calculateBtn: !!calculateBtn,
        resultsDiv: !!resultsDiv
    });

    // Check login status and show/hide appropriate elements
    function updateFormVisibility() {
        const isLoggedIn = window.accountManager.isLoggedIn();
        console.log('Checking login status:', isLoggedIn);

        if (isLoggedIn) {
            console.log('User is logged in, showing calculator form');
            if (form) {
                form.style.display = 'block';
                console.log('Form displayed');
            }
            if (loginMessage) {
                loginMessage.style.display = 'none';
                console.log('Login message hidden');
            }
        } else {
            console.log('User not logged in, showing login message');
            if (form) {
                form.style.display = 'none';
                console.log('Form hidden');
            }
            if (loginMessage) {
                loginMessage.style.display = 'block';
                console.log('Login message displayed');
            }
            // Redirect to login page
            window.location.href = 'account.html';
        }
    }

    // Initial visibility check
    updateFormVisibility();

    // Add click handler to calculate button if user is logged in
    if (calculateBtn && window.accountManager.isLoggedIn()) {
        calculateBtn.addEventListener('click', function() {
            console.log('Calculate button clicked');
            
            try {
                // Get form values
                const income = parseFloat(document.getElementById('income').value) || 0;
                const deductions = parseFloat(document.getElementById('deductions').value) || 0;
                const deductionType = document.getElementById('deduction-type').value;
                const filingStatus = document.getElementById('filing-status').value;
                const credits = parseFloat(document.getElementById('credits').value) || 0;

                console.log('Form values:', {
                    income, deductions, deductionType, filingStatus, credits
                });

                // Calculate tax
                const result = window.calculateTax(income, deductions, deductionType, filingStatus, credits);
                console.log('Calculation result:', result);

                // Save to history
                if (window.historyManager) {
                    window.historyManager.addFiling(result);
                    console.log('Filing saved to history');
                }

                // Display results
                resultsDiv.innerHTML = `
                    <div class="results-container">
                        <h3>Tax Calculation Results</h3>
                        <div class="result-row">
                            <span class="label">Gross Income:</span>
                            <span class="value">$${result.grossIncome.toLocaleString()}</span>
                        </div>
                        <div class="result-row">
                            <span class="label">Total Deductions:</span>
                            <span class="value">$${result.deductions.toLocaleString()}</span>
                        </div>
                        <div class="result-row">
                            <span class="label">Taxable Income:</span>
                            <span class="value">$${result.taxableIncome.toLocaleString()}</span>
                        </div>
                        <div class="result-row">
                            <span class="label">Initial Tax:</span>
                            <span class="value">$${result.calculatedTax.toLocaleString()}</span>
                        </div>
                        <div class="result-row">
                            <span class="label">Tax Credits:</span>
                            <span class="value">$${result.taxCredits.toLocaleString()}</span>
                        </div>
                        <div class="result-row">
                            <span class="label">Total Tax:</span>
                            <span class="value">$${result.finalTax.toLocaleString()}</span>
                        </div>
                        <div class="result-row">
                            <span class="label">Effective Tax Rate:</span>
                            <span class="value">${result.effectiveRate}%</span>
                        </div>
                        <div class="bracket-breakdown">
                            <h4>Tax Bracket Breakdown</h4>
                            ${result.bracketBreakdown.map(bracket => `
                                <div class="bracket-row">
                                    <span class="bracket-rate">${bracket.rate}</span>
                                    <span class="bracket-income">$${bracket.income.toLocaleString()}</span>
                                    <span class="bracket-tax">$${bracket.tax.toLocaleString()}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="filing-info">
                            <p>Filing Status: ${result.filingStatus.charAt(0).toUpperCase() + result.filingStatus.slice(1)}</p>
                            <p>Deduction Type: ${result.deductionType.charAt(0).toUpperCase() + result.deductionType.slice(1)}</p>
                        </div>
                        <div class="action-buttons">
                            <a href="history.html" class="view-history-btn">View Filing History</a>
                        </div>
                    </div>
                `;
                console.log('Results displayed');
            } catch (error) {
                console.error('Error in calculation:', error);
                resultsDiv.innerHTML = `
                    <div class="results-container error">
                        <h3>Error</h3>
                        <p>There was an error calculating your taxes: ${error.message}</p>
                    </div>
                `;
            }
        });
        console.log('Calculate button handler attached');
    }

    console.log('Calculator setup complete');
});
