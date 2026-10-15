'use client';

import React, { useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Zap,
  Filter,
  Bot,
  ShieldAlert,
  Play,
  CheckCircle2,
  ArrowDown,
  Settings,
} from 'lucide-react';
import type { Automation, AutomationNode } from '../../types';
import { cn } from '@/lib/utils/cn';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { isReducedMotion } from '@/lib/animations/pageTransition';

export interface AutomationFlowBuilderProps {
  automation: Automation;
  onSelectNode: (node: AutomationNode) => void;
}

export const AutomationFlowBuilder: React.FC<AutomationFlowBuilderProps> = ({
  automation,
  onSelectNode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || isReducedMotion()) return;
      const nodes = containerRef.current.querySelectorAll('.flow-node-card');
      gsap.fromTo(
        nodes,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' }
      );
    },
    { dependencies: [automation.id], scope: containerRef }
  );

  const getNodeIcon = (type: AutomationNode['type']) => {
    switch (type) {
      case 'trigger':
        return <Zap className="h-4 w-4 text-[#F59E0B]" />;
      case 'condition':
        return <Filter className="h-4 w-4 text-[#2563EB]" />;
      case 'ai_action':
        return <Bot className="h-4 w-4 text-[#7C3AED]" />;
      case 'approval':
        return <ShieldAlert className="h-4 w-4 text-[#DC2626]" />;
      case 'execution':
        return <Play className="h-4 w-4 text-[#16A34A]" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />;
    }
  };

  const getNodeTypeBadge = (type: AutomationNode['type']) => {
    switch (type) {
      case 'trigger':
        return <Badge variant="warning" size="sm">Trigger</Badge>;
      case 'condition':
        return <Badge variant="info" size="sm">Condition</Badge>;
      case 'ai_action':
        return <Badge variant="primary" size="sm">AI Agent</Badge>;
      case 'approval':
        return <Badge variant="danger" size="sm">Sign-off Gate</Badge>;
      case 'execution':
        return <Badge variant="success" size="sm">Execution</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Result</Badge>;
    }
  };

  return (
    <Card className="p-6 border border-[#E4E4E7] bg-white flex flex-col justify-between">
      <div className="flex items-center justify-between pb-4 border-b border-[#F4F4F6]">
        <div>
          <span className="text-[10px] text-[#7C3AED] font-bold uppercase tracking-wider block">
            Visual Automation Workflow
          </span>
          <h4 className="text-base font-bold text-[#18181B] mt-0.5">{automation.name}</h4>
        </div>

        <span className="text-xs text-[#71717A] bg-[#FAFAFC] px-3 py-1 rounded-full border border-[#E4E4E7]">
          Click any node to configure parameters
        </span>
      </div>

      {/* Visual Vertical Node Flow Pipeline */}
      <div
        ref={containerRef}
        className="my-6 max-w-lg mx-auto flex flex-col items-center w-full relative"
      >
        {automation.nodes.map((node, idx) => {
          const isLast = idx === automation.nodes.length - 1;

          return (
            <React.Fragment key={node.id}>
              {/* Node Card */}
              <div
                onClick={() => onSelectNode(node)}
                className={cn(
                  'flow-node-card w-full p-4 rounded-xl border bg-white shadow-2xs hover:shadow-md transition-all cursor-pointer',
                  'hover:border-[#7C3AED] hover:ring-2 hover:ring-[#7C3AED]/20 relative z-10'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FAFAFC] border border-[#E4E4E7] shadow-2xs mt-0.5">
                      {getNodeIcon(node.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs sm:text-sm font-bold text-[#18181B]">
                          {node.title}
                        </h5>
                        {getNodeTypeBadge(node.type)}
                      </div>
                      <p className="text-xs text-[#71717A] mt-1 leading-relaxed">
                        {node.description}
                      </p>
                    </div>
                  </div>

                  <span className="p-1 rounded-md text-[#A1A1AA] hover:text-[#18181B]">
                    <Settings className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>

              {/* Connecting animated arrow line */}
              {!isLast && (
                <div className="my-2 flex flex-col items-center justify-center">
                  <div className="h-6 w-0.5 bg-[#DDD6FE]" />
                  <ArrowDown className="h-3.5 w-3.5 text-[#7C3AED] -mt-1" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer Permission Guard Summary */}
      <div className="p-3.5 rounded-xl bg-[#FAFAFC] border border-[#F4F4F6] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#71717A] gap-2">
        <span className="font-semibold text-[#18181B]">Workflow Safety Contract:</span>
        <div className="flex items-center gap-3">
          <span className="text-[#16A34A] font-medium">✓ Read Ad Analytics</span>
          <span className="text-[#16A34A] font-medium">✓ Draft Campaigns</span>
          <span className="text-[#DC2626] font-medium">✕ Auto-Spend Forbidden</span>
        </div>
      </div>
    </Card>
  );
};
