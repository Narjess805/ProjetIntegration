'use client';

import React, { useState, useEffect } from 'react';
import { Plus, X, Loader2, Save } from 'lucide-react';
import { Departement } from '@/types';

interface DepartementFormProps {
  departement?: Departement;
  onSubmit: (data: { nom: string }) => Promise<void>;
  onCancel?: () => void;
}

export default function DepartementForm({ departement, onSubmit, onCancel }: DepartementFormProps) {
  const [nom, setNom] = useState(departement?.nom || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (departement) {
      setNom(departement.nom);
    }
  }, [departement]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit({ nom });
      if (!departement) setNom('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="nom" className="block text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
          Unit_Name_Identifier
        </label>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="INPUT_NOMENCLATURE..."
            className="w-full px-6 py-4 bg-[#050505] border border-white/10 rounded-none focus:border-secondary outline-none transition-all text-xs font-mono text-white placeholder:text-white/10"
            required
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={isLoading || !nom.trim()}
              className="flex-1 px-8 py-4 bg-secondary text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center disabled:opacity-50 disabled:grayscale"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : departement ? (
                <>
                  <Save size={16} className="mr-3" />
                  COMMIT_CHANGES
                </>
              ) : (
                <>
                  <Plus size={16} className="mr-3" />
                  EXECUTE_ADD
                </>
              )}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-4 border border-white/10 text-white/40 hover:text-white hover:border-white transition-all uppercase text-[10px] font-mono"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

