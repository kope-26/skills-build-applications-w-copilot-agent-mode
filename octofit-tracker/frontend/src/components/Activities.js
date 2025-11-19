import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const endpoint = `https://${codespace}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched activities:', data);
        setActivities(data.results || data);
      });
  }, [endpoint]);

  const filteredActivities = activities.filter(a =>
    a.type.toLowerCase().includes(filter.toLowerCase()) ||
    a.user.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="card shadow mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0 text-primary">Activities</h2>
          <button className="btn btn-success" onClick={() => window.location.reload()}>Refresh</button>
        </div>
        <div className="card-body">
          <form className="mb-3 d-flex" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Filter by type or user"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit">Filter</button>
          </form>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration (min)</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity, idx) => (
                <tr key={idx}>
                  <td>{activity.type}</td>
                  <td>{activity.user}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.date}</td>
                  <td>
                    <button className="btn btn-info btn-sm" onClick={() => setSelected(activity)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for activity details */}
      {selected && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Activity Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelected(null)}></button>
              </div>
              <div className="modal-body">
                <ul className="list-group">
                  <li className="list-group-item"><strong>Type:</strong> {selected.type}</li>
                  <li className="list-group-item"><strong>User:</strong> {selected.user}</li>
                  <li className="list-group-item"><strong>Duration:</strong> {selected.duration} min</li>
                  <li className="list-group-item"><strong>Date:</strong> {selected.date}</li>
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

export default Activities;
