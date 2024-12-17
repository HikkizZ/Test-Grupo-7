import React from 'react';
import ForoForm from './ForoForm';
import styles from '@/styles/popup.css';
import CloseIcon from '@/assets/XIcon.svg';

interface ForoPopupProps {
  show: boolean;
  setShow: (show: boolean) => void;
  action: (formData: FormData) => void;
}

export default function ForoPopup({ show, setShow, action }: ForoPopupProps) {
  const handleSubmit = (formData: FormData) => {
    action(formData);
  };

  return (
    <div>
      {show && (
        <div className={styles.bg}>
          <div className={styles.popup}>
            <button className={styles.close} onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="Close" />
            </button>
            <ForoForm
              onSubmit={handleSubmit}
              buttonText="Crear Foro"
              backgroundColor="#fff"
            />
          </div>
        </div>
      )}
    </div>
  );
}

