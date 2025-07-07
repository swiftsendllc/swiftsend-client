import { TextField } from '@mui/material';
import React from 'react';

interface CustomTextFieldProps {
  id:string
  focused: boolean;
  autoFocus: boolean;
  type: string;
  label: string;
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
}
export function CustomTextField({ id,type, label, value, setValue }: CustomTextFieldProps) {
  return (
    <TextField
      required
      id={id}
      label={label}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
