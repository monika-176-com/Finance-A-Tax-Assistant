// Tax brackets for different filing statuses (2023 rates)
const TAX_BRACKETS = {
    single: [
        { rate: 0.10, limit: 11000 },
        { rate: 0.12, limit: 44725 },
        { rate: 0.22, limit: 95375 },
        { rate: 0.24, limit: 182100 },
        { rate: 0.32, limit: 231250 },
        { rate: 0.35, limit: 578125 },
        { rate: 0.37, limit: Infinity }
    ],
    married: [
        { rate: 0.10, limit: 22000 },
        { rate: 0.12, limit: 89450 },
        { rate: 0.22, limit: 190750 },
        { rate: 0.24, limit: 364200 },
        { rate: 0.32, limit: 462500 },
        { rate: 0.35, limit: 693750 },
        { rate: 0.37, limit: Infinity }
    ],
    head: [
        { rate: 0.10, limit: 15700 },
        { rate: 0.12, limit: 59850 },
        { rate: 0.22, limit: 95350 },
        { rate: 0.24, limit: 182100 },
        { rate: 0.32, limit: 231250 },
        { rate: 0.35, limit: 578100 },
        { rate: 0.37, limit: Infinity }
    ]
};

// Standard deduction amounts for 2023
const STANDARD_DEDUCTIONS = {
    single: 13850,
    married: 27700,
    head: 20800
};

window.calculateTax = function(income, deductions, deductionType, filingStatus, credits) {
    // Validate inputs
    const grossIncome = Math.max(0, income);
    const taxCredits = Math.max(0, credits);
    let totalDeductions = Math.max(0, deductions);

    // Apply standard deduction if selected or if it's greater than itemized
    if (deductionType === 'standard' || totalDeductions < STANDARD_DEDUCTIONS[filingStatus]) {
        totalDeductions = STANDARD_DEDUCTIONS[filingStatus];
    }

    // Calculate taxable income
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);

    // Get appropriate tax brackets
    const brackets = TAX_BRACKETS[filingStatus];
    
    // Calculate tax and track breakdown
    let remainingIncome = taxableIncome;
    let totalTax = 0;
    const bracketBreakdown = [];
    let previousLimit = 0;

    for (const bracket of brackets) {
        const bracketIncome = Math.min(
            remainingIncome,
            bracket.limit - previousLimit
        );

        if (bracketIncome <= 0) break;

        const bracketTax = bracketIncome * bracket.rate;
        totalTax += bracketTax;

        bracketBreakdown.push({
            rate: (bracket.rate * 100).toFixed(1) + '%',
            income: bracketIncome,
            tax: bracketTax
        });

        remainingIncome -= bracketIncome;
        previousLimit = bracket.limit;

        if (remainingIncome <= 0) break;
    }

    // Apply tax credits
    const finalTax = Math.max(0, totalTax - taxCredits);

    // Calculate effective tax rate
    const effectiveRate = taxableIncome > 0 
        ? ((finalTax / taxableIncome) * 100).toFixed(1)
        : '0.0';

    return {
        grossIncome,
        deductions: totalDeductions,
        taxableIncome,
        calculatedTax: totalTax,
        taxCredits,
        finalTax,
        effectiveRate,
        bracketBreakdown,
        filingStatus,
        deductionType
    };
};

console.log('Tax calculator functions loaded');
