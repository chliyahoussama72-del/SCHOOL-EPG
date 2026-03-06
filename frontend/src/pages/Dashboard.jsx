import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de Bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/students" className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-blue-600">Étudiants</h2>
          <p className="text-gray-600">Gérer les étudiants et inscriptions</p>
        </Link>
        <Link to="/payments" className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-green-600">Paiements</h2>
          <p className="text-gray-600">Enregistrer les paiements et reçus</p>
        </Link>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold text-red-600">Alertes</h2>
          <p className="text-gray-600">Voir les retards de paiement</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
