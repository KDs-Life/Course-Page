import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../api/axios";
import {
  format,
  formatDistanceToNow,
  formatDistanceStrict,
  parseISO,
} from "date-fns";
import "./ActivitiesDetails.css";
import { Button } from "react-bootstrap";

function ActivitiesDetails() {
  const [activity, setActivity] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBooking = (event) => {
    toast.info(`Booking #${id}`);
  };

  useEffect(() => {
    if (isNaN(id)) return navigate("/activities");
    axios
      .get(`/activities/${id}`)
      .then((response) => {
        setActivity(response.data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Daten: ", error);
      });
  }, []);

  if (!activity) {
    return <p>Lade...</p>;
  }

  const freeSlots = (max, booked) => {
    if(max === 0){
      return "Es sind noch Plätze frei" }
    if(max-booked<=0){
      return "Es sind keine Plätze frei"
    } 
     return `Es sind noch ${max - booked} Plätze frei`
  }

  return (
    <>
      <div className="activity-wrapper-container">
        <h1>{activity.title}</h1>
        <div className="activity-wrapper">
          <img
            src={activity.image_url}
            alt={activity.image_alt}
            width={`720px`}
          />
          <div className="inner-details">
            <table className="details">
              <tr>
                <th>Informationen</th>
              </tr>
              <tr>
                <td>{freeSlots(activity.maxslots,activity.total_quantity)}</td>
              </tr>

              <tr>
                <td>Price:</td>
                <td>{activity.price} €</td>
              </tr>
              <tr>
                <td>Requirements:</td>
                <td>{activity.requirements}</td>
              </tr>
              <tr>
                <td>Category:</td>
                <td>{activity.category}</td>
              </tr>
              <tr>
                <td>Start date:</td>
                <td>
                  {" "}
                  <div className="activityDetails-date">
                    {format(parseISO(activity.startdate), "dd.MM.yyyy")}
                    <p>
                      (
                      {formatDistanceToNow(parseISO(activity.startdate), {
                        addSuffix: true,
                      })}
                      )
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Button onClick={handleBooking} className="booking-btn">
                    BUCHEN DU SAU
                  </Button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="activity-description">
          <div>{activity.description}</div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ActivitiesDetails;
