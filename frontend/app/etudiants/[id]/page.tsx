'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import EtudiantForm from '@/components/EtudiantForm';
import { api } from '@/lib/api';
import { UserPlus, UserCircle2, Activity, Terminal } from 'lucide-react';
import { Etudiant, Departement } from '@/types';

export default function EtudiantDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [data, setData] = useState<{ etudiant: Etudiant | null, departements: Departement[] }>({
    etudiant: null,
    departements: []
  });
  const [loading, setLoading] = useState(true);

  const id = params?.id; 
  const isNew = id === 'new';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptsData, etudiantData] = await Promise.all([
          api.departements.getAll().catch(() => []),
          isNew ? Promise.resolve(null) : api.etudiants.getOne(id as string).catch(() => null)
        ]);
        setData({
          departements: Array.isArray(deptsData) ? deptsData : [],
          etudiant: etudiantData
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isNew]);

  if (loading) {
    return (
      <div className="py-48 flex flex-col items-center justify-center text-white/20">
        <Activity size={48} className="animate-spin text-primary mb-8" />
        <p className="text-[10px] font-mono tracking-[0.5em] animate-pulse uppercase">Syncing_Node_Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex items-center space-x-6">
        <div className="w-16 h-16 border border-primary flex items-center justify-center text-primary shadow-[0_0_20px_rgba(0,242,255,0.2)]">
          {isNew ? <UserPlus size={28} /> : <UserCircle2 size={28} />}
        </div>
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] text-primary mb-2">
            <Terminal size={12} />
            <span>NODE_ACCESS // {isNew ? 'PROVISIONING' : 'MODIFICATION'}</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">
            {isNew ? 'Nouvel Étudiant' : `Profil: ${data.etudiant?.nom || 'UNKNOWN'}`}
          </h1>
        </div>
      </div>

      <div className="mt-12">
        {data.departements.length === 0 ? (
          <div className="p-12 border border-dashed border-red-500/20 bg-red-500/5 text-center">
            <p className="text-red-500 font-bold uppercase tracking-widest text-xs mb-4">Integrity_Error</p>
            <p className="text-white/40 text-[10px] font-mono uppercase leading-relaxed">
              Zero structural units detected. Node provisioning requires at least one active department.
            </p>
          </div>
        ) : (
          <EtudiantForm etudiant={data.etudiant || undefined} departements={data.departements} />
        )}
      </div>
    </div>
  );
}

