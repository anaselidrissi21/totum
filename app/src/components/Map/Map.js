import { Marker, Popup } from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import './map.scss';


function Map() {

return (

  <div className="Map">
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
   integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
   crossorigin=""/>
<MapContainer center={[42.6886591, 2.8948332]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

</MapContainer>
  </div>

)
}

export default Map;
