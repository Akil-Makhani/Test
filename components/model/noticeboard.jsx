import React, { useState } from "react";
import Image from "next/image";

import { Modal, Fade,  Backdrop } from "@mui/material";
import NoticeBoardDetail from "./noticeBoardDetail";

const Noticeboard = ({ close, open }) => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 384,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "20px",
    p: 4,
  };

  // Modal 2
  const [openBoardDetail, setOpenBoardDetail] = useState(false);
  const handleOpenBoardDetail = () => {
    setOpenBoardDetail(true);
  };
  const handleCloseBoardDetail = () => {
    setOpenBoardDetail(false);
  };

  return (
    <>
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
        className="bg-black/70"
      >
        <Fade in={open} sx={style}>
          <div className="bg-white rounded-2xl max-w-[384px] mx-auto left-1/2 absolute w-[95%] top-1/2 -translate-y-1/2 -translate-x-1/2 p-8">
            <div className="-mx-8">
              <h2 className="text-[27px] leading-none text-center font-bold text-gray-800 border-b p-4">
                <span className="text-teal-500">Notice</span>board
              </h2>
            </div>
            <div className="text-center pt-10">
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/noticeboard_img.png`}
                alt="Noticeboard Image"
                className="max-w-full h-auto mb-6 block mx-auto"
                width={245}
                height={151}
              />

              <p className="text-lg font-medium text-center text-[#888888] mb-6">
                Please Book Your Stay To Visit Noticeboard
              </p>
              <button
                onClick={handleOpenBoardDetail}
                className="bg-[#40E0D0] text-sm font-semibold w-full py-4 rounded-3xl hover:bg-sky-blue-750 hover:text-white transition-all"
              >
                Go To Booking
              </button>
            </div>
          </div>
        </Fade>
      </Modal>

      <NoticeBoardDetail
        open={openBoardDetail}
        close={handleCloseBoardDetail}
      />
    </>
  );
};

export default Noticeboard;
