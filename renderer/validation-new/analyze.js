const countPositiveDebitOccurrences = (ledger) => {
    const debitCount = new Map();

    for (let i = 0; i < ledger.length; i++) {
        const transaction = ledger[i];
        const debitAmount = transaction.debit;

        if (debitAmount > 0) {
            if (debitCount.has(debitAmount)) {
                debitCount.get(debitAmount).count += 1;
                debitCount.get(debitAmount).indexes.push(i);
            } else {
                debitCount.set(debitAmount, { count: 1, indexes: [i] });
            }
        }
    }

    return debitCount;
};

const countPositiveCreditOccurrences = (ledger) => {
    const creditCount = new Map();

    for (let i = 0; i < ledger.length; i++) {
        const transaction = ledger[i];
        const creditAmount = transaction.credit;

        if (creditAmount > 0) {
            if (creditCount.has(creditAmount)) {
                creditCount.get(creditAmount).count += 1;
                creditCount.get(creditAmount).indexes.push(i);
            } else {
                creditCount.set(creditAmount, { count: 1, indexes: [i] });
            }
        }
    }

    return creditCount;
};

// Function to compare credit counts from ledgerOne with debit counts from ledgerTwo
const compareCreditDebitCounts = async (ledgerOne, ledgerTwo) => {
    console.log("ledgerOne", ledgerOne);
    console.log("ledgerTwo", ledgerTwo);
    const debitCountLedgerOne = countPositiveDebitOccurrences(ledgerOne);
    const creditCountLedgerTwo = countPositiveCreditOccurrences(ledgerTwo);

    const mismatchReport = [];

    for (const [debitAmount, { count: debitCount, indexes: debitIndexes }] of debitCountLedgerOne) {
        if (creditCountLedgerTwo.has(debitAmount)) {
            const { count: creditCount, indexes: creditIndexes } = creditCountLedgerTwo.get(debitAmount);
            if (debitCount !== creditCount) {
                mismatchReport.push({
                    amount: debitAmount,
                    debitCount: debitCount,
                    creditCount: creditCount,
                    indexes: {
                        ledgerOne: debitIndexes,
                        ledgerTwo: creditIndexes,
                    },
                    reportString: `Debit amount of "${debitAmount}" has ${debitCount} occurrence(s) in Your Ledger File and ${creditCount} occurrence(s) in Creditor's Ledger File.`,
                });
            }
        } else {
            mismatchReport.push({
                amount: debitAmount,
                debitCount: debitCount,
                creditCount: 0,
                indexes: {
                    ledgerOne: debitIndexes,
                    ledgerTwo: [],
                },
                reportString: `Debit amount of "${debitAmount}" has ${debitCount} occurrence(s) in Your Ledger File and 0 occurrence(s) in Creditor's Ledger File.`,
            });
        }
    }

    for (const [creditAmount, { count: creditCount, indexes: creditIndexes }] of creditCountLedgerTwo) {
        if (debitCountLedgerOne.has(creditAmount)) {
            const { count: debitCount, indexes: debitIndexes } = debitCountLedgerOne.get(creditAmount);
            if (creditCount !== debitCount) {
                mismatchReport.push({
                    amount: creditAmount,
                    debitCount: debitCount,
                    creditCount: creditCount,
                    indexes: {
                        ledgerOne: debitIndexes,
                        ledgerTwo: creditIndexes,
                    },
                    reportString: `Credit amount of "${creditAmount}" has ${creditCount} occurrence(s) in Creditor's Ledger File and ${debitCount} occurrence(s) in "Your Ledger File".`,
                });
            }
        } else {
            mismatchReport.push({
                amount: creditAmount,
                debitCount: 0,
                creditCount: creditCount,
                indexes: {
                    ledgerOne: [],
                    ledgerTwo: creditIndexes,
                },
                reportString: `Credit amount of "${creditAmount}" has ${creditCount} occurrence(s) in Creditor's Ledger File and 0 occurrence(s) in Your Ledger File.`,
            });
        }
    }

    return mismatchReport.length === 0 ? undefined : mismatchReport;
};

export { compareCreditDebitCounts };
