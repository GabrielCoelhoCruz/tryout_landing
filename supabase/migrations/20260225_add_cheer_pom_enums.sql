-- Add cheer-pom to team_level_type enum
ALTER TYPE team_level_type ADD VALUE IF NOT EXISTS 'cheer-pom';

-- Add cheerpom to athlete_team_type enum
ALTER TYPE athlete_team_type ADD VALUE IF NOT EXISTS 'cheerpom';
