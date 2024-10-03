import httpServices from "./httpServices";

export const getlistApi = (state, checkIn, checkOut,) => {
  // return httpServices.get(`/otaProperties?search=${state}&checkIn=${checkIn}&checkOut=${checkOut}&guest=3`)
  return httpServices.get(`/otaProperties?search=${state}`)

  };
  
  
  export const getlistApiPagination = (state, currentPage,propertiesPerPage,sort,checkIn,checkOut,currency) => {
    // return httpServices.get(`/otaProperties?search=${state}&checkIn=${checkIn}&checkOut=${checkOut}&guest=3`)
    return httpServices.get(`/otaProperties?search=${state}&sortCondition=${sort}&page=${currentPage}&limit=${propertiesPerPage}&checkIn=${checkIn}&checkOut=${checkOut}&currency=${currency}`)
  
    };
    
export const getHostelDeatil = (id,checkIn,checkOut,currency) => {
  return httpServices.get(`/otaProperties/property/${id}?checkIn=${checkIn}&checkOut=${checkOut}&currency=${currency}`)
}

export const registerApi = (payload) => {
  return httpServices.post(`/auth/register`,payload)
}

export const logInApi = (payload) => {
  return httpServices.post(`/auth/login/`,payload)
}

export const verifyOtp = (payload) => {
  return httpServices.post(`/auth/verify-otp/`,payload)
}

export const resendOtpApi = (payload) => {
  return httpServices.post(`/auth/verify-email/`,payload)
}

export const getCalenderApi = (payload) => {
  return httpServices.post(`booking/check-booking-range`,payload)
}
export const forgotPassApi = (payload) => {
  return httpServices.post(`/auth/forgot-password/`,payload)
}

export const resetPassApi = (payload) => {
  return httpServices.put(`/auth/reset-password/`,payload)
}
export const getRoomData = (payload) => {
  return httpServices.post(`/booking/checkout`,payload)
}

export const getProfileApi = (payload) => {
  return httpServices.get(`/auth/profile/`,payload)
}

export const editProfileApi = (payload) => {
  return httpServices.put(`/auth/profile/`,payload)
}

export const CreateOrder = (payload) => {
  return httpServices.post(`/api/payment/createOrder/`,payload)
}

export const PaymentVarification=(payload)=>{
  return httpServices.post(`/api/payment/paymentVerification`,payload)
}

export const contactUsApi=(payload)=>{
  return httpServices.post(`/contact-us`,payload)
}

export const addReviewApi=(payload)=>{
  return httpServices.post(`/reviews`,payload)
}

export const getReviewApi=(id,currentPage,reviewPerPage)=>{
  return httpServices.get(`/reviews/all/${id}?page=${currentPage}&limit=${reviewPerPage}`)
}

export const getMyStayApi = (currentPage,limit) => {
  return httpServices.get(`/users/my-stays?page=${currentPage}&limit=${limit}`)
}

export const getMyEventApi = () => {
  return httpServices.get(`/eventBookings/my-events`)
}

export const getPropertyCountApi = () => {
  return httpServices.get(`/property/my-properties-counts`)
}
