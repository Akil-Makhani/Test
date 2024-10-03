import React, { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { Modal, Fade, Box, Backdrop } from "@mui/material";
import ReactStars from "react-rating-stars-component";
import httpServices from "@/services/httpServices";
import toast from "react-hot-toast";
import { BASE_URL } from "@/utils/api";
import { getItemLocalStorage } from "@/utils/browserSetting";

const WriteReview = ({ close, open, id, isEventReview }) => {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    user: "",
    comment: "",
    profilePic: "",
  });
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");
  const [hostelId, setHostelId] = useState();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    width: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "20px",
    p: 4,
    overflowY: "auto",
  };

  useEffect(() => {
    const hostelIdLocal = getItemLocalStorage("hostelId");
    if(id){
      setHostelId(id);
    }
    else if (hostelIdLocal) {
      setHostelId(hostelIdLocal);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.user) newErrors.user = "Name is required";
    if (!formData.comment) newErrors.comment = "Comment is required";
    if (!rating) newErrors.rating = "Rating is required";
    if (!fileName) newErrors.file = "File is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUploading(true);
      setFileName(selectedFile.name);
      setErrors({ ...errors, file: null });

      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const presignedUrlResponse = await fetch(
          `${BASE_URL}/fileUpload/generate-presigned-url`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!presignedUrlResponse.ok) {
          throw new Error("Failed to get presigned URL");
        }

        const presignedUrlData = await presignedUrlResponse.json();
        const { objectURL } = presignedUrlData.data;

        setFormData((prevData) => ({
          ...prevData,
          profilePic: objectURL,
        }));

        toast.success("Profile picture uploaded successfully!");
      } catch (error) {
        console.error("Error uploading profile picture", error);
        toast.error("Error uploading profile picture");
        setErrors({
          ...errors,
          file: "Error uploading file. Please try again.",
        });
      } finally {
        setUploading(false);
      }
    } else {
      setErrors({ ...errors, file: "File is required" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      user: formData.user,
      property: hostelId, // Hostel or Event Id
      rating,
      comment: formData.comment,
      images: [
        {
          url: formData.profilePic,
          caption: "Review Image",
        },
      ],
      likes: 0,
      dislikes: 0,
      isActive: true,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    

    try {
      const response = await httpServices.post(isEventReview ? `/events/reviews/${hostelId}` : "/reviews" , payload);
      if (response?.data?.status) {
        toast.success("Review submitted successfully!");
        close();

        // Reset form data after successful submission
        setFormData({
          user: "",
          comment: "",
          profilePic: "",
        });
        setRating(0);
        setFileName("");
        setErrors({});
      }
      else{
        toast.error("Error submitting review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review", error);
      toast.error("Error submitting review. Please try again.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      className=""
    >
      <Fade in={open}>
        <Box sx={style}>
          <div className="-mx-8">
            <h2 className="text-[27px] leading-none flex items-center font-bold text-gray-800 border-b pb-4 px-4">
              <span className="text-teal-500 mr-1">Write </span>Review
              <button
                className="ml-auto text-gray-400 hover:text-red-600"
                onClick={close}
              >
                <IoClose />
              </button>
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="pt-8 ">
            <label htmlFor="rating" className="mb-1 block">
              Rate us
            </label>
            <ReactStars
              count={5}
              onChange={setRating}
              size={40}
              activeColor="#ffd700"
              value={rating}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating}</p>
            )}

            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-black text-sm placeholder:text-gray-500 mb-4"
              value={formData.user}
              onChange={(e) =>
                setFormData({ ...formData, user: e.target.value })
              }
              required
            />
            {errors.user && (
              <p className="text-red-500 text-sm">{errors.user}</p>
            )}

            <div className="relative w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm text-gray-500 mb-4 cursor-pointer flex items-center justify-between">
              <span>
                {uploading ? "Uploading..." : fileName || "Upload file"}
              </span>
              <LuUpload />
              <input
                type="file"
                className="w-full h-full top-0 left-0 right-0 bottom-0 absolute opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </div>
            {errors.file && (
              <p className="text-red-500 text-sm">{errors.file}</p>
            )}

            <textarea
              type="text"
              rows={4}
              placeholder="Write review..."
              className="w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-black text-sm placeholder:text-gray-500"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              required
            ></textarea>
            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment}</p>
            )}

            <div className="text-right font-normal text-xs text-gray-400 mb-4">
              200 Words
            </div>

            <button
              type="submit"
              className="w-full font-semibold py-3 bg-primary-blue hover:bg-sky-blue-750 hover:text-white rounded-full"
              disabled={uploading}
            >
              Submit
            </button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default WriteReview;
