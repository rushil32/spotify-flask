import React from 'react';

const RoomCard = ({ data }) => {
  const { 
    room_name, 
    full_name: host,
    display_image: img = 'http://via.placeholder.com/60x60' 
  } = data;

  return ( 
    <div className="card card-horizontal">
      <img className="card-img-left" src={img} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{room_name}</h5>
        <p className="card-text">Hosted by {host}</p>
      </div>
    </div>
   );
}
 
export default RoomCard;