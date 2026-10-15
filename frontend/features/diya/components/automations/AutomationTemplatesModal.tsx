'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { DIYA_CONSTANTS } from '../../constants';
import { Zap, Plus, Clock } from 'lucide-react';

export interface AutomationTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: {
    id: string;
    name: string;
    trigger: string;
    description: string;
  }) => void;
}

export const AutomationTemplatesModal: React.FC<AutomationTemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Automation Starter Templates"
      description="Choose a verified autonomous workflow recipe to customize and deploy."
      maxWidth="lg"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
        {DIYA_CONSTANTS.starterAutomationTemplates.map((template) => (
          <div
            key={template.id}
            className="p-3.5 rounded-xl border border-[#E4E4E7] bg-white hover:border-[#7C3AED]/40 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#EDE9FE] text-[#7C3AED]">
                  <Zap className="h-3.5 w-3.5" />
                </div>
                <h5 className="text-xs font-bold text-[#18181B]">{template.name}</h5>
              </div>

              <p className="text-[11px] text-[#71717A] leading-relaxed mb-2">
                {template.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#F4F4F6] flex items-center justify-between">
              <span className="text-[10px] text-[#A1A1AA] flex items-center gap-1">
                <Clock className="h-3 w-3" /> {template.trigger}
              </span>

              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  onSelectTemplate(template);
                  onClose();
                }}
                className="text-xs h-7 px-2.5"
                leftIcon={<Plus className="h-3 w-3" />}
              >
                Use Recipe
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
