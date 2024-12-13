const db = require('../database/database');

// Save PDF to the database
exports.savePdf = (name, pdfData) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO pdf_files (name, pdf_data) VALUES (?, ?)';
        db.run(query, [name, pdfData], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
};

// Retrieve PDF by name
exports.getPdfByName = (name) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT pdf_data FROM pdf_files WHERE name = ?';
        db.get(query, [name], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.pdf_data : null);
            }
        });
    });
};

// Delete PDF by its name from the database
exports.deletePdfByName = (name) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM pdf_files WHERE name = ?';
        db.run(query, [name], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ deletedCount: this.changes });
            }
        });
    });
};