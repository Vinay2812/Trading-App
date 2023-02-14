import { useEffect } from "react";
import "./ContactCard.css";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
function ContactCard({ contactDetails, contactArray, setContactArray }) {
  useEffect(() => {
    // console.log(contactDetails);
  }, [contactDetails]);

  function handleAddContact() {
    if (contactArray.length >= 5) return;
    const contactData = {
      id: contactArray.length + 1,
      full_name: "",
      designation: "",
      mobile: "",
      whatsapp: "",
      email: "",
    };

    setContactArray((prev) => [...prev, contactData]);
  }

  function handleDeleteContact() {
    if (contactArray.length <= 1) return;
    let count = 1;
    const updatedContactArray = contactArray
      .map((contact) => {
        return contact.id === contactDetails.id
          ? null
          : { ...contact, id: count++ };
      })
      .filter((contact) => contact !== null);

    setContactArray(updatedContactArray);
  }

  function handleChange(e) {
    setContactArray((prev) => {
      return prev.map((contact) => {
        return contact.id === contactDetails.id
          ? { ...contact, [e.target.name]: e.target.value }
          : contact;
      });
    });
  }
  return (
    <div className="contact-row">
      <input
        type="text"
        placeholder="Full Name"
        required={true}
        name="full_name"
        value={contactDetails.full_name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Designation"
        required={true}
        name="designation"
        value={contactDetails.designation}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Mobile"
        required={true}
        name="mobile"
        value={contactDetails.mobile}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Whatsapp Number"
        name="whatsapp"
        value={contactDetails.whatsapp}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        required={true}
        name="email"
        value={contactDetails.email}
        onChange={handleChange}
      />
      <div className="action-btns">
        <AiOutlinePlus onClick={handleAddContact} />
        <AiFillDelete onClick={handleDeleteContact} />
      </div>
    </div>
  );
}

export default ContactCard;
