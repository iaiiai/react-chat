import React from 'react';

const App = (props) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h4>Channels list</h4>
      <ul className="list-group">
        {props
        .gon
        .channels
        .map(
          (element) => (
            <li className="list-group-item">
              <span class="badge bg-secondary text-light mr-1">ID: {element.id}</span>
              <span class="lead mr-1">{element.name.toUpperCase()}</span>
              {element.removable ? <span className="badge rounded-pill bg-success">Removable</span> : <span className="badge rounded-pill bg-danger text-light">Unremovable</span>}
            </li>)
          )}
      </ul>
    </div>
    );
};

export default App;
