import { lazy } from "react";
import "./ContactDetails.css";
const  ContactCard = lazy(() => import("../ContactCard/ContactCard"));

function ContactDetails({ contactArray, setContactArray }) {
  return (
    <div className="contact-container">
      <div className="contact-title">Contacts</div>
      {contactArray.map((contactDetails) => {
        return (
          <ContactCard
            contactDetails={contactDetails}
            contactArray={contactArray}
            setContactArray={setContactArray}
            key={contactDetails.id}
          />
        );
      })}
    </div>
  );
}

export default ContactDetails;
