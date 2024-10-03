import { contactUsApi } from "@/services/webflowServices";
import { Modal } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const ContactPopup = ({ open, close }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Categories");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const validate = () => {
    let tempErrors = {};
    if (!name) tempErrors.name = "Name is required.";
    if (!email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is not valid.";
    }
    if (!subject) tempErrors.subject = "Subject is required.";
    if (selectedOption === "Categories")
      tempErrors.category = "Please select a category.";
    if (!description) tempErrors.description = "Description is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const payload = {
          name,
          email,
          subject,
          categories: selectedOption,
          description,
        };
        await contactUsApi(payload);
        toast.success("Your message has been sent successfully.");
        setName("");
        setEmail("");
        setSubject("");
        setSelectedOption("Categories");
        setDescription("");
        setErrors({});
        close();
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error(
          "There was an error sending your message. Please try again."
        );
      }
    }
  };

  if (!open) return null;

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div sx={style}>
        <div className="bg-white rounded-2xl max-w-[700px] mx-auto left-1/2 absolute w-[95%] top-1/2 -translate-y-1/2 -translate-x-1/2 p-8">
          <div className="pb-6 font-manrope">
            <div className="flex flex-col justify-center items-center mb-6 relative">
              <div className="text-[#40E0D0] flex text-2xl font-extrabold mb-3">
                Mix<p className="text-black text-2xl font-extrabold">Dorm</p>
              </div>
              <h2 className="text-2xl font-bold text-center">👋 Contact Us</h2>
              <button
                onClick={close}
                className="text-black ml-auto text-xl font-semibold hover:text-gray-600 transition duration-150 absolute right-0 top-0"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="h-[445px] overflow-auto gap-5 fancy_y_scroll grid grid-cols-2"
            >
              <div>
                <input
                  className={`w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-black text-sm placeholder:text-gray-500 ${
                    errors.name && "border-red-500"
                  }`}
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  className={`w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-black text-sm placeholder:text-gray-500 ${
                    errors.email && "border-red-500"
                  }`}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  className={`w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-black text-sm placeholder:text-gray-500 ${
                    errors.subject && "border-red-500"
                  }`}
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                )}
              </div>
              <div>
                <div className="relative w-full">
                  <div
                    className={`w-full flex items-center border rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-black text-sm placeholder:text-gray-500 cursor-pointer ${
                      errors.category && "border-red-500"
                    }`}
                    onClick={toggleDropdown}
                  >
                    <input
                      type="text"
                      className="px-3 py-4 w-full focus:outline-none cursor-pointer"
                      value={selectedOption}
                      readOnly
                    />
                    <span className="mr-2 text-xl">
                      {isDropdownOpen ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </span>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-2">
                      <ul>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleOptionClick("General")}
                        >
                          General
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleOptionClick("Support")}
                        >
                          Support
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleOptionClick("Feedback")}
                        >
                          Feedback
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>

              <div className="col-span-2">
                <textarea
                  className={`w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-black text-sm placeholder:text-gray-500 ${
                    errors.description && "border-red-500"
                  }`}
                  placeholder="Description"
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
              <p className="text-black/55 text-sm mb-5 col-span-2">
                Please enter the details of your request. A member of our
                support staff will respond as soon as possible. Please ensure
                that you do not enter credit card details/username/ passwords in
                this form.
              </p>

              <button
                type="submit"
                className="bg-[#40E0D0] text-white col-span-2 font-semibold w-full py-4 rounded-full hover:bg-sky-blue-750 transition duration-150"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ContactPopup;
