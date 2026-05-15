'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Departement } from '@/types';
import DepartementForm from '@/components/DepartementForm';
import { Building2, Edit2, Trash2, Search, Loader2, Activity, Terminal } from 'lucide-react';

export default function DepartementsPage() {
  const [departements, setDepartements] = useState<Departement[]>([]);
  const [editingDept, setEditingDept] = useState<Departement | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadDepartements = async () => {
    setIsLoading(true);
    try {
      const data = await api.departements.getAll();
      setDepartements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading departements:', error);
      setDepartements([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDepartements();
  }, []);

  const handleSubmit = async (data: { nom: string }) => {
    try {
      if (editingDept) {
        await api.departements.update(editingDept.id, data);
      } else {
        await api.departements.create(data);
      }
      setEditingDept(undefined);
      loadDepartements();
    } catch (error) {
      console.error('Error saving departement:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('CONFIRM_DECOMMISSION: STRUCTURAL_INTEGRITY_CHECK_REQUIRED')) return;
    try {
      await api.departements.delete(id);
      loadDepartements();
    } catch (error) {
      console.error('Error deleting departement:', error);
    }
  };

  const filteredDepartements = Array.isArray(departements) ? departements.filter((d: Departement) => 
    (d?.nom?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="space-y-16">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.4em] text-secondary">
            <Activity size={12} />
            <span>CORE_STRUCTURES // UNIT_SYNC_ACTIVE</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase">Départements</h1>
          <p className="text-white/40 max-w-sm font-light text-sm leading-relaxed">
            Orchestration of academic units and structural hierarchies within the institutional kernel.
          </p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-secondary transition-colors" size={16} />
          <input
            type="text"
            placeholder="SEARCH_DIVISIONS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-6 py-4 bg-[#080808] border border-white/10 rounded-none focus:border-secondary outline-none w-full lg:w-80 transition-all text-xs font-mono text-white placeholder:text-white/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 overflow-hidden">
        {/* Form Column */}
        <div className="lg:col-span-1 bg-[#080808] p-12">
          <div className="sticky top-12 space-y-12">
            <div className="space-y-6">
               <h2 className="text-xl font-bold uppercase tracking-tighter flex items-center">
                <Terminal size={18} className="mr-3 text-secondary" />
                {editingDept ? 'Edit_Unit' : 'Initialize_Unit'}
              </h2>
              <DepartementForm 
                departement={editingDept} 
                onSubmit={handleSubmit} 
                onCancel={editingDept ? () => setEditingDept(undefined) : undefined} 
              />
            </div>
            
            <div className="p-6 border border-white/5 bg-white/5">
              <h3 className="font-mono text-[9px] text-white/30 mb-4 uppercase tracking-[0.2em]">System_Manifest</h3>
              <p className="text-[10px] font-mono text-white/20 leading-relaxed uppercase">
                Warning: Unit decommissioning is restricted to empty nodes. Ensure all associated records are migrated prior to termination.
              </p>
            </div>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 bg-[#050505] p-12 space-y-8">
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center text-white/10">
               <Loader2 size={32} className="animate-spin text-secondary mb-6" />
               <p className="text-[9px] font-mono uppercase tracking-[0.4em] animate-pulse">Syncing_Units...</p>
            </div>
          ) : filteredDepartements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDepartements.map((dept: Departement) => (
                <div 
                  key={dept.id} 
                  className="group bg-[#0a0a0a] border border-white/5 p-6 flex items-center justify-between hover:border-secondary/40 transition-all duration-500"
                >
                  <div className="flex items-center space-x-5">
                    <div className="w-10 h-10 border border-white/5 flex items-center justify-center text-white/20 group-hover:border-secondary group-hover:text-secondary transition-all">
                      <Building2 size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest group-hover:text-secondary transition-colors">{dept.nom}</h3>
                      <p className="text-[9px] font-mono text-white/20 mt-1 uppercase">UUID: {dept.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-px">
                    <button
                      onClick={() => setEditingDept(dept)}
                      className="p-2.5 border border-white/5 hover:border-secondary hover:text-secondary transition-all"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="p-2.5 border border-white/5 hover:border-red-500 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center border border-dashed border-white/10">
               <div className="mx-auto w-12 h-12 border border-white/5 flex items-center justify-center text-white/10 mb-8">
                <Search size={20} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tighter">Null_Set_Detected</h3>
              <p className="text-white/20 mt-4 text-[10px] font-mono uppercase max-w-xs mx-auto">No units discovered matching the specified search parameters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

