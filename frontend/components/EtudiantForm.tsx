'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, ArrowLeft, Calendar, CreditCard, GraduationCap, Activity, Mail, User } from 'lucide-react';
import { Etudiant, Departement, EtudiantFormData } from '@/types';
import { api } from '@/lib/api';

interface EtudiantFormProps {
  etudiant?: Etudiant;
  departements: Departement[];
}

export default function EtudiantForm({ etudiant, departements }: EtudiantFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<EtudiantFormData>({
    nom: etudiant?.nom || '',
    cin: etudiant?.cin || '',
    email: etudiant?.email || '',
    dateNaissance: etudiant?.dateNaissance || '',
    anneePremiereInscription: etudiant?.anneePremiereInscription || new Date().getFullYear(),
    departementId: etudiant?.departementId || (departements.length > 0 ? departements[0].id : 0),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (etudiant) {
        await api.etudiants.update(etudiant.id, formData);
      } else {
        await api.etudiants.create(formData);
      }
      router.push('/etudiants');
      router.refresh();
    } catch (error) {
      console.error('Error saving etudiant:', error);
      alert('CRITICAL_ERROR: SYSTEM_WRITE_FAILED');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-noir p-12 max-w-4xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
      
      <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
        <div className="flex items-center space-x-3 text-[10px] font-mono tracking-[0.4em] text-primary">
          <Activity size={12} />
          <span>DATA_ENTRY_PROTOCOL // {etudiant ? 'UPDATE' : 'INITIALIZE'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Nom Complet */}
          <div className="space-y-3">
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Full_Identity_Name</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-colors">
                <User size={16} />
              </div>
              <input
                type="text"
                required
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="w-full pl-12 pr-6 py-4 bg-[#050505] border border-white/10 rounded-none focus:border-primary outline-none transition-all text-xs font-mono text-white placeholder:text-white/10"
                placeholder="INPUT_NAME..."
              />
            </div>
          </div>

          {/* CIN */}
          <div className="space-y-3">
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Biometric_Hash (CIN)</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-colors">
                <CreditCard size={16} />
              </div>
              <input
                type="text"
                required
                value={formData.cin}
                onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                className="w-full pl-12 pr-6 py-4 bg-[#050505] border border-white/10 rounded-none focus:border-primary outline-none transition-all text-xs font-mono text-white placeholder:text-white/10"
                placeholder="INPUT_ID_HASH..."
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Date de Naissance */}
          <div className="space-y-3">
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Temporal_Origin</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-colors">
                <Calendar size={16} />
              </div>
              <input
                type="date"
                required
                value={formData.dateNaissance}
                onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                className="w-full pl-12 pr-6 py-4 bg-[#050505] border border-white/10 rounded-none focus:border-primary outline-none transition-all text-xs font-mono text-white invert dark:invert-0"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Datalink_Email</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-colors">
                <Mail size={16} />
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-6 py-4 bg-[#050505] border border-white/10 rounded-none focus:border-primary outline-none transition-all text-xs font-mono text-white placeholder:text-white/10"
                placeholder="ETUDIANT@NODE.AC"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Année d'inscription */}
          <div className="space-y-3">
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Registration_Cycle</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-colors">
                <GraduationCap size={16} />
              </div>
              <input
                type="number"
                required
                min="2000"
                max={new Date().getFullYear()}
                value={formData.anneePremiereInscription}
                onChange={(e) => setFormData({ ...formData, anneePremiereInscription: parseInt(e.target.value) })}
                className="w-full pl-12 pr-6 py-4 bg-[#050505] border border-white/10 rounded-none focus:border-primary outline-none transition-all text-xs font-mono text-white"
              />
            </div>
          </div>

          {/* Département */}
          <div className="space-y-3">
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Assigned_Structural_Unit</label>
            <div className="relative">
              <select
                required
                value={formData.departementId}
                onChange={(e) => setFormData({ ...formData, departementId: parseInt(e.target.value) })}
                className="w-full px-6 py-4 bg-[#050505] border border-white/10 rounded-none focus:border-primary outline-none transition-all text-xs font-mono text-white appearance-none cursor-pointer"
              >
                <option value="">SELECT_UNIT...</option>
                {departements.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.nom.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                <ArrowLeft size={14} className="-rotate-90" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-12 border-t border-white/5">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center text-[10px] font-mono text-white/20 hover:text-white transition-colors uppercase tracking-[0.2em]"
          >
            <ArrowLeft size={16} className="mr-3" />
            Abort_Sequence
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-noir flex items-center space-x-4 px-12"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            <span>{etudiant ? 'COMMIT_DATA' : 'EXECUTE_REGISTRATION'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
