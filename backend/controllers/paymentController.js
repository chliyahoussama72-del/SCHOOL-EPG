const { Payment, Student, Receipt, Fee } = require('../models');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.createPayment = async (req, res) => {
  try {
    const { studentId, amount, period, method, reference, date } = req.body;
    
    // Create payment
    const payment = await Payment.create({
      StudentId: studentId,
      amount,
      period,
      method,
      reference,
      date,
      status: 'completed'
    });

    // Generate Receipt Number
    const receiptNumber = `REC-${new Date().getFullYear()}-${payment.id.toString().padStart(6, '0')}`;
    
    // Generate PDF
    const doc = new PDFDocument();
    const fileName = `${receiptNumber}.pdf`;
    const filePath = path.join(__dirname, '../public/receipts', fileName);
    
    // Ensure directory exists
    if (!fs.existsSync(path.join(__dirname, '../public/receipts'))) {
      fs.mkdirSync(path.join(__dirname, '../public/receipts'), { recursive: true });
    }

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(25).text('Reçu de Paiement', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Numéro: ${receiptNumber}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Étudiant ID: ${studentId}`);
    doc.text(`Montant: ${amount} MAD`);
    doc.text(`Période: ${period}`);
    doc.text(`Mode: ${method}`);
    doc.end();

    writeStream.on('finish', async () => {
      // Save Receipt record
      await Receipt.create({
        number: receiptNumber,
        url: `/receipts/${fileName}`,
        PaymentId: payment.id
      });
      
      res.status(201).json({ payment, receiptUrl: `/receipts/${fileName}` });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const { studentId } = req.query;
    let where = {};
    if (studentId) where.StudentId = studentId;

    const payments = await Payment.findAll({ where, include: [Student, Receipt] });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
