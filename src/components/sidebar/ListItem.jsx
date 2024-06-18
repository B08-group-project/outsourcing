const ListItem = ({ index, places }) => {
  return (
    <li className="item flex">
      <div className="info">
        <span className={`marker marker_${index + 1}`}>{index + 1}</span>
        <a href={places.place_url}>
          <h5 className="info-item place-name">{places.place_name}</h5>
          {places.road_address_name ? (
            <>
              <span className="info-item road-address-name">{places.road_address_name}</span>
              <span className="info-item address-name">{places.address_name}</span>
            </>
          ) : (
            <span className="info-item address-name">{places.address_name}</span>
          )}
          <span className="info-item tel">{places.phone}</span>
        </a>
      </div>
      <input type="checkbox" />
    </li>
  );
};

export default ListItem;
