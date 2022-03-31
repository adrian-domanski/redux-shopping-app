import React from 'react';
import { Alert, AlertColor } from '@mui/material';
import { useDispatch } from 'react-redux';
import { uiActions } from 'src/store/ui-slice';

interface INotification {
  type: AlertColor;
  message: string;
}

const Notification: React.FC<INotification> = ({ message, type }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    // Close alert
    dispatch(uiActions.showNotification({ open: false }));
  };

  return (
    <div>
      <Alert severity={type} onClose={handleClose}>
        {message}
      </Alert>
    </div>
  );
};

export default Notification;
