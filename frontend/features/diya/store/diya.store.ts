'use client';

import { create } from 'zustand';
import type {
  Message,
  Plan,
  PlanStepState,
  StrategyInput,
  StrategyOutput,
  Automation,
  AutomationNode,
  TimelineRun,
  ApprovalRequest,
} from '../types';
import {
  mockInitialMessages,
  mockStrategyOutput,
  mockAutomations,
  mockTimelineRuns,
} from '../mocks';

export interface DIYAStoreState {
  activeTab: 'chat' | 'strategy' | 'automations' | 'timeline';
  setActiveTab: (tab: 'chat' | 'strategy' | 'automations' | 'timeline') => void;

  // Chat
  messages: Message[];
  isStreaming: boolean;
  streamingMessageId: string | null;
  selectedLanguage: 'en' | 'te' | 'hi';
  setSelectedLanguage: (lang: 'en' | 'te' | 'hi') => void;
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
  loadDemoSession: () => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  setIsStreaming: (streaming: boolean, messageId?: string | null) => void;

  // Plan mutations
  approvePlanStep: (planId: string, stepId: string) => void;
  rejectPlanStep: (planId: string, stepId: string) => void;
  approveEntirePlan: (planId: string) => void;
  rejectEntirePlan: (planId: string) => void;

  // Approval Modal
  approvalModal: {
    isOpen: boolean;
    request: ApprovalRequest | null;
    onConfirm: (() => void) | null;
  };
  openApprovalModal: (request: ApprovalRequest, onConfirm: () => void) => void;
  closeApprovalModal: () => void;

  // Strategy
  strategyInput: StrategyInput;
  strategyOutput: StrategyOutput | null;
  isGeneratingStrategy: boolean;
  setStrategyInput: (updates: Partial<StrategyInput>) => void;
  setStrategyOutput: (output: StrategyOutput | null) => void;
  setIsGeneratingStrategy: (generating: boolean) => void;

  // Automations
  automations: Automation[];
  selectedAutomation: Automation | null;
  activeNode: AutomationNode | null;
  setSelectedAutomation: (auto: Automation | null) => void;
  setActiveNode: (node: AutomationNode | null) => void;
  toggleAutomationStatus: (id: string) => void;
  addAutomation: (auto: Automation) => void;

  // Timeline runs
  timelineRuns: TimelineRun[];
  retryTimelineStep: (runId: string, stepId: string) => void;
}

const defaultStrategyInput: StrategyInput = {
  businessName: 'Mentneo Realty',
  industry: 'Real Estate & Property Development',
  productsServices: 'Ultra-luxury 3BHK & 4BHK Sky Villas and gated apartments',
  targetAudience: 'High-Net-Worth Individuals, Tech Leadership, NRI Investors',
  locations: 'Hyderabad (Kokapet, Financial District, Jubilee Hills)',
  marketingObjectives: ['Generate Qualified Leads', 'Brand Prestige', 'Lower Customer Acquisition Cost'],
  monthlyBudgetINR: 100000,
  preferredPlatforms: ['meta', 'google', 'linkedin'],
  brandPositioning: 'Understated elegance, zero commute stress, panoramic skyline views',
  competitors: 'Prestige Group, My Home Bhooja, Jayabheri',
};

export const useDIYAStore = create<DIYAStoreState>((set) => ({
  activeTab: 'chat',
  setActiveTab: (activeTab) => set({ activeTab }),

  messages: [],
  isStreaming: false,
  streamingMessageId: null,
  selectedLanguage: 'en',
  setSelectedLanguage: (selectedLanguage) => set({ selectedLanguage }),

  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),

  clearMessages: () => set({ messages: [] }),
  loadDemoSession: () => set({ messages: mockInitialMessages }),

  updateMessage: (id, updates) =>
    set((state) => ({
      messages: state.messages.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),

  setIsStreaming: (isStreaming, streamingMessageId = null) =>
    set({ isStreaming, streamingMessageId }),

  approvePlanStep: (planId, stepId) =>
    set((state) => ({
      messages: state.messages.map((msg) => ({
        ...msg,
        blocks: msg.blocks.map((block) => {
          if (block.type === 'plan' && block.plan.id === planId) {
            return {
              ...block,
              plan: {
                ...block.plan,
                steps: block.plan.steps.map((s) =>
                  s.id === stepId ? { ...s, status: 'approved' } : s
                ),
              },
            };
          }
          return block;
        }),
      })),
    })),

  rejectPlanStep: (planId, stepId) =>
    set((state) => ({
      messages: state.messages.map((msg) => ({
        ...msg,
        blocks: msg.blocks.map((block) => {
          if (block.type === 'plan' && block.plan.id === planId) {
            return {
              ...block,
              plan: {
                ...block.plan,
                steps: block.plan.steps.map((s) =>
                  s.id === stepId ? { ...s, status: 'rejected' } : s
                ),
              },
            };
          }
          return block;
        }),
      })),
    })),

  approveEntirePlan: (planId) =>
    set((state) => ({
      messages: state.messages.map((msg) => ({
        ...msg,
        blocks: msg.blocks.map((block) => {
          if (block.type === 'plan' && block.plan.id === planId) {
            return {
              ...block,
              plan: {
                ...block.plan,
                status: 'approved',
                steps: block.plan.steps.map((s) => ({
                  ...s,
                  status: s.status === 'draft' ? 'approved' : s.status,
                })),
              },
            };
          }
          return block;
        }),
      })),
    })),

  rejectEntirePlan: (planId) =>
    set((state) => ({
      messages: state.messages.map((msg) => ({
        ...msg,
        blocks: msg.blocks.map((block) => {
          if (block.type === 'plan' && block.plan.id === planId) {
            return {
              ...block,
              plan: {
                ...block.plan,
                status: 'rejected',
                steps: block.plan.steps.map((s) => ({
                  ...s,
                  status: s.status === 'draft' ? 'rejected' : s.status,
                })),
              },
            };
          }
          return block;
        }),
      })),
    })),

  approvalModal: {
    isOpen: false,
    request: null,
    onConfirm: null,
  },

  openApprovalModal: (request, onConfirm) =>
    set({
      approvalModal: {
        isOpen: true,
        request,
        onConfirm,
      },
    }),

  closeApprovalModal: () =>
    set({
      approvalModal: {
        isOpen: false,
        request: null,
        onConfirm: null,
      },
    }),

  // Strategy
  strategyInput: defaultStrategyInput,
  strategyOutput: mockStrategyOutput,
  isGeneratingStrategy: false,
  setStrategyInput: (updates) =>
    set((state) => ({ strategyInput: { ...state.strategyInput, ...updates } })),
  setStrategyOutput: (strategyOutput) => set({ strategyOutput }),
  setIsGeneratingStrategy: (isGeneratingStrategy) => set({ isGeneratingStrategy }),

  // Automations
  automations: mockAutomations,
  selectedAutomation: mockAutomations[0],
  activeNode: null,
  setSelectedAutomation: (selectedAutomation) => set({ selectedAutomation }),
  setActiveNode: (activeNode) => set({ activeNode }),
  toggleAutomationStatus: (id) =>
    set((state) => ({
      automations: state.automations.map((a) =>
        a.id === id ? { ...a, status: a.status === 'active' ? 'paused' : 'active' } : a
      ),
    })),
  addAutomation: (auto) =>
    set((state) => ({
      automations: [auto, ...state.automations],
      selectedAutomation: auto,
    })),

  // Timeline
  timelineRuns: mockTimelineRuns,
  retryTimelineStep: (runId, stepId) =>
    set((state) => ({
      timelineRuns: state.timelineRuns.map((r) => {
        if (r.id === runId) {
          return {
            ...r,
            steps: r.steps.map((s) =>
              s.id === stepId ? { ...s, status: 'running', error: undefined } : s
            ),
          };
        }
        return r;
      }),
    })),
}));
