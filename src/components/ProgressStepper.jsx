import React from 'react';
import { FileText, Users, Trophy, Check } from 'lucide-react';

const ProgressStepper = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Match Info', icon: FileText },
    { number: 2, title: 'Teams & Players', icon: Users },
    { number: 3, title: 'Toss & Confirm', icon: Trophy }
  ];

  return (
    <div className="progress-stepper">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;
        
        return (
          <div key={step.number} className="step-container">
            <div className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="step-circle">
                {isCompleted ? <Check size={20} /> : <Icon size={20} />}
              </div>
              <span className="step-title">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`step-connector ${isCompleted ? 'completed' : ''}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressStepper;