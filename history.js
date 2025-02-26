// Filing history management
class FilingHistory {
    constructor() {
        this.history = [];
        this.loadFromStorage();
    }

    loadFromStorage() {
        const historyData = localStorage.getItem('taxAssistantHistory');
        if (historyData) {
            this.history = JSON.parse(historyData);
        }
    }

    saveToStorage() {
        localStorage.setItem('taxAssistantHistory', JSON.stringify(this.history));
    }

    addFiling(filingData) {
        const filing = {
            id: Date.now(),
            date: new Date().toISOString(),
            ...filingData
        };
        this.history.unshift(filing); // Add to beginning of array
        this.saveToStorage();
        return filing;
    }

    getFilings() {
        return this.history;
    }

    getFilingById(id) {
        return this.history.find(filing => filing.id === id);
    }

    deleteFilingById(id) {
        this.history = this.history.filter(filing => filing.id !== id);
        this.saveToStorage();
    }

    clearHistory() {
        this.history = [];
        this.saveToStorage();
    }

    // Format currency for display
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    // Format date for display
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Generate HTML for displaying filing history
    generateHistoryHTML() {
        if (this.history.length === 0) {
            return '<p class="no-history">No filing history available.</p>';
        }

        return `
            <div class="history-list">
                ${this.history.map(filing => `
                    <div class="history-item" data-id="${filing.id}">
                        <div class="history-header">
                            <h3>Tax Filing - ${this.formatDate(filing.date)}</h3>
                            <button class="delete-filing" onclick="historyManager.deleteFilingById(${filing.id})">Delete</button>
                        </div>
                        <div class="history-details">
                            <div class="detail-row">
                                <span class="label">Gross Income:</span>
                                <span class="value">${this.formatCurrency(filing.grossIncome)}</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Total Deductions:</span>
                                <span class="value">${this.formatCurrency(filing.deductions)}</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Taxable Income:</span>
                                <span class="value">${this.formatCurrency(filing.taxableIncome)}</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Total Tax:</span>
                                <span class="value">${this.formatCurrency(filing.finalTax)}</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Filing Status:</span>
                                <span class="value">${filing.filingStatus}</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Deduction Type:</span>
                                <span class="value">${filing.deductionType}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

window.historyManager = new FilingHistory();
