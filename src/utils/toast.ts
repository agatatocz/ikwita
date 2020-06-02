import "izitoast/dist/css/iziToast.min.css";
import iZtoast from "izitoast";

export const toast = {
  error: (message: string, title = "Error") => {
    return iZtoast.error({
      title,
      message,
      position: "bottomCenter",
    });
  },
  success: (message: string, title = "Success") => {
    return iZtoast.success({
      title,
      message,
      position: "bottomCenter",
    });
  },
};
