'use client';

import { useState, useEffect } from 'react';
import { leadsService } from '../services/leads.service';
import type { LeadRecord } from '../types';

export function useLeads() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    leadsService
      .listLeads()
      .then(setLeads)
      .finally(() => setLoading(false));
  }, []);

  return { leads, loading };
}
