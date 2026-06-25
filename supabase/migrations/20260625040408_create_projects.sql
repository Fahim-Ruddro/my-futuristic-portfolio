-- DROP EXISTING TABLE IF IT EXISTS (Ensures a perfectly clean slate)
DROP TABLE IF EXISTS public.projects CASCADE;

-- CREATE THE MAIN PROJECTS TABLE WITH RIGID CONSTRAINTS
CREATE TABLE public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('real-time', 'fintech', 'ai-data', 'devops', 'security', 'media', 'automation')),
    tags TEXT[] NOT NULL DEFAULT '{}',
    thumbnail_url TEXT NOT NULL,
    video_url TEXT,
    live_url TEXT,
    github_url TEXT NOT NULL,
    architecture_diagram_url TEXT,
    features TEXT[] NOT NULL DEFAULT '{}',
    tech_stack JSONB NOT NULL DEFAULT '{"frontend": [], "backend": [], "database": [], "devops": []}'::jsonb,
    metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ENABLE ROW LEVEL SECURITY (RLS) FOR ENTERPRISE HARDENING
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- CREATE ANONYMOUS READ POLICY
CREATE POLICY "Allow public read access to projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- CREATE AUTOMATIC UPDATED_AT TIMESTAMP TRIGGER
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_modtime
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();

-- OPTIMIZE QUERY PERFORMANCE WITH INDEXES
CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_category ON public.projects(category);
CREATE INDEX idx_projects_tags ON public.projects USING GIN(tags);
