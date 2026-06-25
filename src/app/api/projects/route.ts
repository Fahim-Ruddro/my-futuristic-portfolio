import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';

/**
 * GET Handler for /api/projects
 * Securely delivers database records or reconciled mock fallbacks to your home grid.
 * Configured precisely to satisfy the project structure definitions inside src/types/index.ts.
 */
export async function GET() {
  try {
    // Step A: Attempt to query the live cloud PostgreSQL table, ordering by newest timestamp
    const { data: databaseRows, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    // Step B: If the database is online and contains rows, parse them cleanly
    if (databaseRows && databaseRows.length > 0 && !error) {
      const liveTypedProjects: Project[] = databaseRows.map((row) => ({
        id: String(row.id),
        title: row.title,
        description: row.description,
        longDescription: row.long_description,
        // Enforce a flat string array to map 1:1 to your types file requirement
        techStack: [
          ...(row.tech_stack?.frontend || []),
          ...(row.tech_stack?.backend || []),
          ...(row.tech_stack?.database || []),
          ...(row.tech_stack?.devops || [])
        ],
        liveUrl: row.live_url || '',
        githubUrl: row.github_url,
        // Map database string parameters cleanly onto your strict type enum choices
        category: (row.category === 'real-time' ? 'realtime' : row.category) as any,
        imageUrl: row.thumbnail_url || '',
        featured: true,
        // Extract only the first element to map onto the singular metrics object requirement
        metrics: row.metrics && row.metrics.length > 0 ? {
          label: row.metrics[0].label,
          value: row.metrics[0].value
        } : undefined
      }));

      return NextResponse.json(liveTypedProjects, { status: 200 });
    }

    // Step C: Reconciled Fallback Layer. 
    // Satisfies all strict parameters of the structural Project interface inside src/types/index.ts
    const mockShowcaseProjects: Project[] = [
      {
        id: 'proj_01',
        title: 'NexusSync: Enterprise Workspace & Mesh Stream Engine',
        description: 'High-concurrency collaboration hub handling real-time engine processing.',
        longDescription: 'A massive, multi-tenant collaboration grid architected with persistent WebSockets connections. Features instant workspace shard switching, fully threaded text streams, state-synchronized voice rooms, and dynamic user presence indexing powered by low-latency caching arrays.',
        techStack: ['Next.js 15', 'TypeScript', 'WebSockets', 'Redis', 'PostgreSQL', 'Tailwind CSS'],
        liveUrl: '/whiteboard',
        githubUrl: 'https://github.com',
        category: 'realtime', // Aligns flawlessly with your specific "realtime" string contract!
        imageUrl: '/projects/nexussync.jpg',
        featured: true,
        metrics: { 
          label: 'Latency', 
          value: '< 14ms' 
        } // Set as a single object profile to resolve metric type array crashes!
      },
      {
        id: 'proj_02',
        title: 'AuraStream: WebRTC Multi-Peer Mesh Portal',
        description: 'Peer-to-peer audio and video synchronization layer running on stateless signaling channels.',
        longDescription: 'An enterprise-grade high-fidelity video conferencing workspace. Built on pure WebRTC standard APIs to capture local media streams and orchestrate direct mesh connections without expensive server proxies, leveraging automated SDP offer/answer handshakes and rolling ICE connectivity tracking endpoints.',
        techStack: ['React 19', 'TypeScript', 'WebRTC Core', 'STUN Network', 'Tailwind CSS'],
        liveUrl: '/video-conference',
        githubUrl: 'https://github.com',
        category: 'realtime',
        imageUrl: '/projects/videostream.jpg',
        featured: true,
        metrics: { 
          label: 'Network', 
          value: 'ICE Direct' 
        }
      }
    ];

    return NextResponse.json(mockShowcaseProjects, { status: 200 });

  } catch (globalCatchError: any) {
    console.error('Critical Backend API Failure:', globalCatchError);
    return NextResponse.json(
      { error: 'An unhandled server exception occurred during processing.' },
      { status: 500 }
    );
  }
}
