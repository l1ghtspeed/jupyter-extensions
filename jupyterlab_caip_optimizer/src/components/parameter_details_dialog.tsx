import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { ParameterSpec } from '../types';
import { ParameterDetails } from './parameter_details';

interface Props {
  spec?: ParameterSpec;
  onClose?: () => void;
}

const ParameterDetailsDialog: React.FC<Props> = ({ spec, onClose }) => {
  return (
    <Dialog open={!!spec} onClose={onClose}>
      {!!spec && (
        <>
          <DialogTitle>Parameter "{spec.parameter}"</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The study config parameter specification.
            </DialogContentText>
            <ParameterDetails spec={spec} />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary" variant="contained">
              Exit
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ParameterDetailsDialog;
