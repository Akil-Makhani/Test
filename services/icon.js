import { FaCarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaWifi } from "react-icons/fa6";
import { GiRolledCloth } from "react-icons/gi";
import {
  MdLunchDining,
  MdOutlineNightShelter,
  MdOutlineSignalCellularConnectedNoInternet4Bar,
} from "react-icons/md";

const iconStyle = {
  color: "#40E0D0", // Sets the color of the icon
  fontSize: "24px", // Adjust size as needed
};

const Faciicons = {
  "Free Breakfast": <MdLunchDining style={iconStyle} />,
  "Free WiFi": <FaWifi style={iconStyle} />,
  "Linen Included": <MdOutlineNightShelter style={iconStyle} />,
  "Towels Included": <GiRolledCloth style={iconStyle} />,
  "Free Parking": <FaCarAlt style={iconStyle} />,
  "Free City Maps": <FaMapMarkerAlt style={iconStyle} />,
  "Free Internet Access": (
    <MdOutlineSignalCellularConnectedNoInternet4Bar style={iconStyle} />
  ),
};

export default Faciicons;
