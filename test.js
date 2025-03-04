const nach = require("./index");
const moment = require("moment");
const fs = require("fs");

var file = new nach.File({
    immediateDestination: '110000000',
    immediateOrigin: '123456789',
    immediateDestinationName: 'Stripe Test Bank',
    immediateOriginName: 'Your Company Inc',
    referenceCode: '#A000001',
});

var batch = new nach.Batch({
    serviceClassCode: '220',
    companyName: 'Your Company Inc',
    standardEntryClassCode: 'CCD',
    companyIdentification: '123456789',
    companyEntryDescription: 'Trans Description',
    companyDescriptiveDate: moment(nach.Utils.computeBusinessDay(8)).format('MMM D'),
    effectiveEntryDate: nach.Utils.computeBusinessDay(8),
    originatingDFI: '081000032'
});

var entry = new nach.Entry({
    receivingDFI: '081000210',
    DFIAccount: '5654221',
    amount: '175',
    idNumber: 'RAj##32b1kn1bb3',
    individualName: 'Luke Skywalker',
    discretionaryData: ' ',
    transactionCode: '22'
});
batch.addEntry(entry);
file.addBatch(batch);
// Generate the file (result is a string with the file contents)
file.generateFile(function(result) {

    // Write result to a NACHA.txt file
    fs.writeFile('NACHA.txt', result, function(err) {
        if(err) console.log(err);

        // Log the output
        console.log(result);
    });
});