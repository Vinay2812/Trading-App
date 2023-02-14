import ContactCard from "../ContactCard/ContactCard";
import "./ContactDetails.css";

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
