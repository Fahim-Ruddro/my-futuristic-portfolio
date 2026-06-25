import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';

export async function GET() {
  try {
    const { data: databaseRows, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (databaseRows && databaseRows.length > 0 && !error) {
      const liveTypedProjects: Project[] = databaseRows.map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        description: row.description,
        longDescription: row.long_description,
        category: row.category,
        tags: row.tags,
        thumbnailUrl: row.thumbnail_url,
        videoUrl: row.video_url || undefined,
        liveUrl: row.live_url || undefined,
        githubUrl: row.github_url,
        architectureDiagramUrl: row.architecture_diagram_url || undefined,
        features: row.features,
        techStack: {
          frontend: row.tech_stack?.frontend || [],
          backend: row.tech_stack?.backend || [],
          database: row.tech_stack?.database || [],
          devops: row.tech_stack?.devops || [],
        },
        metrics: row.metrics || [],
        createdAt: row.created_at,
      }));

      return NextResponse.json(liveTypedProjects, { status: 200 });
    }

    // Fallback Mock Data if your database table has 0 rows currently
    const mockShowcaseProjects: Project[] = [
      {
        id: 'proj_01',
        title: 'NexusSync: Enterprise Workspace & Mesh Stream Engine',
        slug: 'nexussync-workspace-engine',
        description: 'High-concurrency collaboration hub handling real-time engine processing.',
        longDescription: 'A massive, multi-tenant collaboration grid architected with persistent WebSockets connections. Features instant workspace shard switching, fully threaded text streams, state-synchronized voice rooms, and dynamic user presence indexing powered by low-latency caching arrays.',
        category: 'real-time',
        tags: ['Next.js 15', 'TypeScript', 'WebSockets', 'Redis', 'PostgreSQL'],
        thumbnailUrl: '/projects/nexussync.jpg',
        githubUrl: 'https://github.com',
        features: ['Real-Time Presence Tracking', 'Operational Transformation Syncing', 'Multi-Tenant Workspace Sharding'],
        techStack: {
          frontend: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Zustand'],
          backend: ['Node.js', 'Fastify', 'WebSockets'],
          database: ['PostgreSQL', 'Redis'],
          devops: ['Docker', 'AWS ECS'],
        },
        metrics: [
          { label: 'WebSocket Latency', value: '< 14ms' },
          { label: 'Concurrent Conns', value: '100k+' }
        ],
        createdAt: new Date().toISOString(),
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
