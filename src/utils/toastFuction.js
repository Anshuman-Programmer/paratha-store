import { toast } from 'react-toastify';

const callToast = (message) => {
  toast(message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    progress: undefined,
  });
}

export default callToast