import React from 'react';
import Link from 'next/link';
import { User, Mail, Building2, Edit2, Trash2, Fingerprint } from 'lucide-react';
import { Etudiant } from '@/types';

interface EtudiantCardProps {
  etudiant: Etudiant;
  onDelete?: (id: number) => Promise<void> | void;
}

export default function EtudiantCard({ etudiant, onDelete }: EtudiantCardProps) {
  return (
    <div data-testid="etudiant-item" className="card-noir group">
      <div className="p-8">
        <div className="flex justify-between items-start mb-8">
          <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/20 group-hover:border-primary group-hover:text-primary transition-all">
            <User size={24} />
          </div>
          {etudiant.age !== undefined && (
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest border-b border-white/10 pb-1">
              AGE: {etudiant.age}
            </div>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold tracking-tighter uppercase group-hover:text-primary transition-colors">
            {etudiant.nom}
          </h3>
          <div className="flex items-center text-[10px] font-mono text-white/30 mt-2 uppercase tracking-wider">
            <Building2 size={10} className="mr-2" />
            {etudiant.departementNom || 'UNASSIGNED_UNIT'}
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex items-center text-[10px] font-mono text-white/40">
            <Mail size={12} className="mr-3 text-white/10" />
            {(etudiant?.email || 'NO_EMAIL').toUpperCase()}
          </div>
          <div className="flex items-center text-[10px] font-mono text-white/40">
            <Fingerprint size={12} className="mr-3 text-white/10" />
            HASH: <span className="text-white/60 ml-2">{etudiant?.cin || 'N/A'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex space-x-px">
            <Link
              href={`/etudiants/${etudiant.id}`}
              className="p-3 border border-white/5 hover:border-primary hover:text-primary transition-all"
            >
              <Edit2 size={14} />
            </Link>
            <button
              onClick={() => onDelete?.(etudiant.id)}
              className="p-3 border border-white/5 hover:border-red-500 hover:text-red-500 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <div className="text-[9px] font-mono text-white/10 uppercase tracking-tighter">
            REF_ID: {(etudiant?.id || 0).toString().padStart(4, '0')}
          </div>
        </div>
      </div>
      
      {/* Visual Decor */}
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 group-hover:border-primary transition-colors" />
    </div>
  );
}
