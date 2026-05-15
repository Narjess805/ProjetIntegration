import Link from 'next/link';
import { 
  Users, 
  Building2, 
  ArrowRight, 
  Cpu, 
  Activity, 
  Terminal,
  Zap,
  ShieldAlert
} from 'lucide-react';
import { api } from '@/lib/api';

export default async function Home() {
  let stats = { etudiants: 0, departements: 0 };
  
  try {
    const [e, d] = await Promise.all([
      api.etudiants.getAll().catch(() => []),
      api.departements.getAll().catch(() => [])
    ]);
    stats = { etudiants: e.length, departements: d.length };
  } catch (err) {
    console.error("Failed to fetch stats", err);
  }

  const modules = [
    {
      title: 'USER_REGISTRY',
      subtitle: 'DATABASE_01',
      description: 'Access student nodes and personnel data. Full CRUD synchronization active.',
      href: '/etudiants',
      icon: Users,
      count: stats.etudiants.toString().padStart(3, '0'),
      status: 'ONLINE'
    },
    {
      title: 'UNIT_CONTROL',
      subtitle: 'STRUCTURE_02',
      description: 'Departmental hierarchy management. Real-time resource allocation monitoring.',
      href: '/departements',
      icon: Building2,
      count: stats.departements.toString().padStart(3, '0'),
      status: 'STABLE'
    }
  ];

  return (
    <div className="space-y-24">
      {/* System Header */}
      <section className="relative">
        <div className="flex items-center space-x-4 mb-8">
          <div className="h-[1px] flex-1 bg-white/10" />
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] text-primary animate-pulse-glow">
            <Activity size={12} />
            <span>SYSTEM_READY // VER 4.0.2</span>
          </div>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-none">
              ACADEMIC<br />
              <span className="text-glow text-primary">COMMAND</span>
            </h1>
            <p className="text-lg text-white/50 max-w-md font-light leading-relaxed">
              Unified interface for high-frequency institutional management. 
              Secure. Modular. Absolute control.
            </p>
          </div>
          
          <div className="flex flex-col space-y-4 items-start lg:items-end">
            <div className="flex space-x-2">
              <button className="btn-noir">
                INITIALIZE_SESSION
              </button>
              <button className="px-6 py-3 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                DOCUMENTATION
              </button>
            </div>
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
              ENCRYPTION: AES-256-GCM // PORT: 3000
            </div>
          </div>
        </div>
      </section>

      {/* Module Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
        {modules.map((module: any, i: number) => (
          <Link 
            key={module.title} 
            href={module.href}
            className="group relative bg-[#080808] p-12 hover:bg-primary/5 transition-all duration-700"
          >
            <div className="flex justify-between items-start mb-16">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-primary tracking-widest">{module.subtitle}</span>
                <h2 className="text-4xl font-bold tracking-tighter">{module.title}</h2>
              </div>
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all duration-500">
                <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
            </div>

            <p className="text-white/40 text-sm leading-relaxed mb-16 max-w-sm">
              {module.description}
            </p>
            
            <div className="flex items-end justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-6xl font-mono font-black tracking-tighter text-white/10 group-hover:text-primary/20 transition-colors">
                  {module.count}
                </span>
                <div className="h-8 w-[1px] bg-white/10" />
                <span className="text-[10px] font-mono text-white/30 group-hover:text-primary/50 transition-colors uppercase">
                  Active_Nodes
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-[8px] font-mono text-accent">
                <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                <span>{module.status}</span>
              </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-transparent group-hover:border-primary transition-colors" />
          </Link>
        ))}
      </div>

      {/* Quick Access Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Zap, title: 'QUANTUM_SYNC', desc: '0.4ms Gateway Latency' },
          { icon: Terminal, title: 'COMMAND_LINE', desc: 'Kernel Level Access' },
          { icon: Cpu, title: 'NEURAL_PROCESS', desc: 'AI-Driven Predictions' },
        ].map((box: any, i: number) => (
          <div key={i} className="card-noir p-8 group">
            <box.icon className="text-white/20 mb-6 group-hover:text-primary transition-colors" size={24} />
            <h3 className="font-bold text-sm tracking-widest uppercase mb-2">{box.title}</h3>
            <p className="text-[10px] font-mono text-white/40">{box.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer System Status */}
      <footer className="pt-24 pb-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-[10px] font-mono text-white/40">GATEWAY: OK</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-[10px] font-mono text-white/40">DB_CLUSTER: STABLE</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-[10px] font-mono text-white/40">API_CORE: ONLINE</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-[10px] font-mono text-white/20">
            <span>&copy; 2026 // NOIR_OPERATING_SYSTEM</span>
            <span>//</span>
            <span className="flex items-center text-red-500/50">
              <ShieldAlert size={10} className="mr-1" />
              RESTRICTED_ACCESS
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

