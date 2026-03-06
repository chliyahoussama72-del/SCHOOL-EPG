import { useEffect, useState } from 'react';
import api from '../api';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: '', amount: '', period: '', method: 'cash', reference: '' });

  useEffect(() => {
    fetchPayments();
    fetchStudents();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data } = await api.get('/payments');
      setPayments(data);
    } catch (error) { console.error(error); }
  };

  const fetchStudents = async () => {
    try {
      const { data } = await api.get('/students');
      setStudents(data);
    } catch (error) { console.error(error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/payments', form);
      alert('Paiement enregistré!');
      if (data.receiptUrl) {
        window.open(`http://localhost:5000${data.receiptUrl}`, '_blank');
      }
      fetchPayments();
      setForm({ studentId: '', amount: '', period: '', method: 'cash', reference: '' });
    } catch (error) {
      alert('Erreur lors de l\'enregistrement');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des Paiements</h1>
      
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Nouveau Paiement</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select 
            className="border p-2 rounded" 
            value={form.studentId} 
            onChange={(e) => setForm({...form, studentId: e.target.value})}
            required
          >
            <option value="">Sélectionner un étudiant</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.cne})</option>
            ))}
          </select>
          <input 
            type="number" placeholder="Montant" 
            className="border p-2 rounded"
            value={form.amount}
            onChange={(e) => setForm({...form, amount: e.target.value})}
            required
          />
          <input 
            type="text" placeholder="Période (ex: Octobre 2023)" 
            className="border p-2 rounded"
            value={form.period}
            onChange={(e) => setForm({...form, period: e.target.value})}
            required
          />
          <select 
            className="border p-2 rounded" 
            value={form.method} 
            onChange={(e) => setForm({...form, method: e.target.value})}
          >
            <option value="cash">Espèces</option>
            <option value="check">Chèque</option>
            <option value="transfer">Virement</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Enregistrer & Imprimer Reçu</button>
        </form>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reçu</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Étudiant</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Montant</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{payment.Receipt?.number}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{payment.Student?.firstName} {payment.Student?.lastName}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{payment.amount} MAD</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{payment.date}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {payment.Receipt && (
                    <a href={`http://localhost:5000${payment.Receipt.url}`} target="_blank" className="text-blue-600 hover:text-blue-900">Voir Reçu</a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
