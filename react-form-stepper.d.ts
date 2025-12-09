// react-form-stepper.d.ts
import * as React from 'react';

declare module 'react-form-stepper' {
  export interface StepProps {
    label?: React.ReactNode;  // Changed from string to React.ReactNode
    children?: React.ReactNode;
    completed?: boolean;
    active?: boolean;
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
    // Include other props that might exist
    [key: string]: any;
  }

  export class Step extends React.Component<StepProps> {}
  
  // Keep the original Stepper export
  export const Stepper: React.ComponentType<any>;
  
  // Export other types that might be needed
  export interface StepperProps {
    activeStep: number;
    connectorStateColors?: boolean;
    styleConfig?: any;
    connectorStyleConfig?: any;
    children?: React.ReactNode;
    [key: string]: any;
  }
}