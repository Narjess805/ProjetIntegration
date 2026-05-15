'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Etudiant } from '@/types';
import EtudiantCard from '@/components/EtudiantCard';
import { UserPlus, Search, Loader2, Activity } from 'lucide-react';

export default function EtudiantsPage() {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadEtudiants = async () => {
    setIsLoading(true);
    try {
      const data = await api.etudiants.getAll();
      setEtudiants(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading etudiants:', error);
      setEtudiants([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEtudiants();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('CONFIRM_DELETION: DATA_RECOVERY_IMPOSSIBLE')) return;
    try {
      await api.etudiants.delete(id);
      loadEtudiants();
    } catch (error) {
      console.error('Error deleting etudiant:', error);
    }
  };

  const filteredEtudiants = Array.isArray(etudiants) ? etudiants.filter((e: Etudiant) => 
    (e?.nom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (e?.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (e?.departementNom?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="space-y-16">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.4em] text-primary">
            <Activity size={12} />
            <span>DATALINK_ESTABLISHED // REGISTRY_01</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase">Étudiants</h1>
          <p className="text-white/40 max-w-sm font-light text-sm leading-relaxed">
            Interface for personnel identification and biometric data management within the core infrastructure.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={16} />
            <input
              type="text"
              placeholder="FILTER_RECORDS..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 bg-[#080808] border border-white/10 rounded-none focus:border-primary outline-none w-full sm:w-80 transition-all text-xs font-mono text-white placeholder:text-white/10"
            />
          </div>
          <Link
            href="/etudiants/new"
            className="btn-noir flex items-center justify-center space-x-3 px-8"
          >
            <UserPlus size={16} />
            <span>NEW_ENTRY</span>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="py-48 flex flex-col items-center justify-center text-white/20">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary blur-3xl opacity-10 animate-pulse" />
            <Loader2 size={48} className="animate-spin relative z-10 text-primary" />
          </div>
          <p className="text-[10px] font-mono uppercase tracking-[0.5em] animate-pulse">Accessing_Encrypted_Nodes...</p>
        </div>
      ) : filteredEtudiants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEtudiants.map((etudiant: Etudiant) => (
            <EtudiantCard 
              key={etudiant.id} 
              etudiant={etudiant} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center border border-dashed border-white/10">
          <div className="mx-auto w-16 h-16 border border-white/5 flex items-center justify-center text-white/10 mb-8">
            <Search size={24} />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-tighter">Query_Returned_Null</h3>
          <p className="text-white/30 mt-4 text-xs font-mono max-w-xs mx-auto uppercase">
            {searchTerm 
              ? "Zero matches found for specified filter parameters." 
              : "Registry is currently void of data."}
          </p>
          {!searchTerm && (
            <Link
              href="/etudiants/new"
              className="inline-flex items-center mt-12 px-10 py-4 border border-white/10 text-white/50 text-[10px] font-mono tracking-widest hover:border-primary hover:text-primary transition-all"
            >
              INITIALIZE_SEQUENCE
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
