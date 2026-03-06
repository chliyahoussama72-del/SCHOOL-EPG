import { useEffect, useState } from 'react';
import api from '../api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ cne: '', firstName: '', lastName: '', status: 'active' });

  const fetchStudents = async () => {
    try {
      const { data } = await api.get(`/students?search=${search}`);
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/students', form);
      alert('Étudiant ajouté');
      setForm({ cne: '', firstName: '', lastName: '', status: 'active' });
      fetchStudents();
    } catch (error) {
      alert('Erreur');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des Étudiants</h1>
      
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Ajouter un Étudiant</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            type="text" placeholder="CNE" 
            className="border p-2 rounded"
            value={form.cne}
            onChange={(e) => setForm({...form, cne: e.target.value})}
            required
          />
          <input 
            type="text" placeholder="Nom" 
            className="border p-2 rounded"
            value={form.lastName}
            onChange={(e) => setForm({...form, lastName: e.target.value})}
            required
          />
          <input 
            type="text" placeholder="Prénom" 
            className="border p-2 rounded"
            value={form.firstName}
            onChange={(e) => setForm({...form, firstName: e.target.value})}
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Ajouter</button>
        </form>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Liste</h2>
        <input 
          type="text" 
          placeholder="Rechercher..." 
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CNE</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nom</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Prénom</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student.cne}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student.lastName}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student.firstName}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button 
                    onClick={async () => {
                      if(window.confirm('Supprimer cet étudiant ?')) {
                        try {
                          await api.delete(`/students/${student.id}`);
                          fetchStudents();
                        } catch(e) { alert('Erreur'); }
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
