import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const endpoint = `https://${codespace}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched leaderboard:', data);
        setLeaderboard(data.results || data);
      });
  }, [endpoint]);

  const filteredLeaderboard = leaderboard.filter(entry =>
    entry.team.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="card shadow mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0 text-success">Leaderboard</h2>
          <button className="btn btn-success" onClick={() => window.location.reload()}>Refresh</button>
        </div>
        <div className="card-body">
          <form className="mb-3 d-flex" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Filter by team name"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">Filter</button>
          </form>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Team</th>
                <th>Points</th>
                <th>Rank</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboard.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.team}</td>
                  <td>{entry.points}</td>
                  <td>{entry.rank}</td>
                  <td>
                    <button className="btn btn-info btn-sm" onClick={() => setSelected(entry)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for leaderboard entry details */}
      {selected && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Leaderboard Entry Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelected(null)}></button>
              </div>
              <div className="modal-body">
                <ul className="list-group">
                  <li className="list-group-item"><strong>Team:</strong> {selected.team}</li>
                  <li className="list-group-item"><strong>Points:</strong> {selected.points}</li>
                  <li className="list-group-item"><strong>Rank:</strong> {selected.rank}</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
