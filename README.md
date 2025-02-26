# Finance-Tax Assistant

A comprehensive web-based tax assistant application that helps users calculate their taxes, manage their tax filing history, and simplify the tax filing process.

## Features

### Tax Calculator
- Calculate tax liability based on income, deductions, and credits
- Support for different filing statuses (Single, Married Filing Jointly, Head of Household)
- Standard and itemized deduction options
- Real-time tax bracket breakdown
- Effective tax rate calculation
- Detailed results display

### Account Management
- User registration and login system
- Secure profile management
- Session persistence using local storage
- Protected access to tax calculation features

### Filing History
- Save and track tax calculations
- View historical tax filing records
- Detailed breakdown of past calculations
- Option to clear filing history
- Chronological listing of all tax calculations

## File Structure
```
tax-assistant/
├── index.html           # Main application page
├── account.html         # Account management page
├── history.html         # Filing history page
├── css/
│   └── style.css       # Application styles
└── js/
    ├── app.js          # Main application logic
    ├── account.js      # Account management functionality
    ├── history.js      # Filing history functionality
    └── taxCalculator.js # Tax calculation logic
```

## Technical Details

### Tax Calculation
- Uses 2023 tax brackets and rates
- Supports standard deductions for different filing statuses
- Handles tax credits and deductions
- Provides detailed bracket breakdown

### Account System
- Email-based login system
- Secure password handling
- Profile management with last login tracking
- Session persistence using browser storage

### History Management
- Chronological storage of tax calculations
- Detailed record keeping of all inputs and results
- Ability to view and manage historical records
- Data persistence using local storage

## Usage

1. **Account Creation and Login**
   - Visit the account page
   - Enter your email and password
   - Login to access tax calculation features

2. **Tax Calculation**
   - Enter your annual income
   - Add any deductions
   - Select deduction type (Standard/Itemized)
   - Choose filing status
   - Enter any tax credits
   - Click "Calculate Tax" to see results

3. **View Filing History**
   - Access the history page
   - View all past calculations
   - See detailed breakdowns of each filing
   - Option to clear history if needed

## Tax Brackets (2023)

### Single Filing Status
- 10% : $0 to $11,000
- 12% : $11,001 to $44,725
- 22% : $44,726 to $95,375
- 24% : $95,376 to $182,100
- 32% : $182,101 to $231,250
- 35% : $231,251 to $578,125
- 37% : $578,126 and above

### Married Filing Jointly
- 10% : $0 to $22,000
- 12% : $22,001 to $89,450
- 22% : $89,451 to $190,750
- 24% : $190,751 to $364,200
- 32% : $364,201 to $462,500
- 35% : $462,501 to $693,750
- 37% : $693,751 and above

### Head of Household
- 10% : $0 to $15,700
- 12% : $15,701 to $59,850
- 22% : $59,851 to $95,350
- 24% : $95,351 to $182,100
- 32% : $182,101 to $231,250
- 35% : $231,251 to $578,100
- 37% : $578,101 and above

## Standard Deductions (2023)
- Single: $13,850
- Married Filing Jointly: $27,700
- Head of Household: $20,800

## Development

The application is built using:
- HTML5 for structure
- CSS3 for styling
- Vanilla JavaScript for functionality
- Local Storage for data persistence

## Security Notes
- Passwords are handled securely
- User data is stored locally
- Session management is implemented
- Protected routes require authentication

## Future Enhancements
- Additional tax forms support
- PDF generation of tax reports
- Multi-year tax comparison
- State tax calculation support
- Data export functionality
- Enhanced security features
