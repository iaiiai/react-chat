import React from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from '../../routes';

const Channels = ({ gon }) => (
  <div className="d-flex flex-column justify-content-center align-items-center">
    <h4>Channels list</h4>
    <ul className="list-group">
      {gon
        .gon
        .channels
        .map(
          (element) => (
            <li className="list-group-item" key={element.name}>
              <span className="badge bg-secondary text-light mr-1">
                ID:
                {element.id}
              </span>
              <span className="lead mr-1">{element.name.toUpperCase()}</span>
              {element.removable ? <span className="badge rounded-pill bg-success">Removable</span> : <span className="badge rounded-pill bg-danger text-light">Unremovable</span>}
              <Link to={AppRoutes.channelPath(element.id)} className="btn btn-success ml-2">Join chat</Link>
            </li>
          ),
        )}
    </ul>
  </div>
);

export default Channels;
