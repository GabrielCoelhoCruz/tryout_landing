# Supabase Setup - SkyHigh Tryout Registration

## Project Configuration

Your Supabase project is now configured with the complete database schema for the tryout registration system.

### Environment Variables

Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://sbfvegmzdmepbttowqwh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiZnZlZ216ZG1lcGJ0dG93cXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MTg2MDcsImV4cCI6MjA4MDI5NDYwN30.LfB9W9vwcFXHb4zj5Kr2vJBMK_5tA2mZjN_RltWeU84
```

## Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `registrations` | Main registration data (24 fields + metadata) |
| `guardians` | Guardian information for minors (LGPD compliant) |

### Views

| View | Description |
|------|-------------|
| `registrations_full` | Join of registrations + guardian data |
| `registration_stats` | Dashboard statistics |

### ENUM Types

- `gender_type`: feminino, masculino, outro
- `yes_no_type`: sim, nao
- `yes_no_maybe_type`: sim, nao, talvez
- `experience_time_type`: menos-6-meses, 6-12-meses, 1-2-anos, 2-anos-mais
- `sports_experience_type`: ginastica, tumbling, danca, nenhuma
- `cheer_position_type`: base, flyer, back
- `cheer_level_type`: n2, n3
- `skill_level_type`: basico, intermediario, avancado
- `weekday_type`: segunda, terca, quarta, quinta, sexta, sabado, domingo
- `day_period_type`: manha, tarde, noite
- `registration_status_type`: pending, under_review, accepted, rejected, waitlisted

### Functions

| Function | Description |
|----------|-------------|
| `submit_registration(...)` | Atomic insert of registration + guardian (if minor) |
| `update_registration_status(...)` | Admin function to update status |
| `get_registrations_by_status(...)` | Paginated query by status |
| `check_duplicate_email(...)` | Check for existing email |
| `calculate_age(birthdate)` | Calculate age from date |
| `is_minor_by_date(birthdate)` | Check if person is minor |

## Row Level Security (RLS)

### Public Access (anon)
- ✅ INSERT into `registrations`
- ✅ INSERT into `guardians`
- ❌ SELECT/UPDATE/DELETE blocked

### Authenticated Access (admin)
- ✅ SELECT all registrations
- ✅ UPDATE registrations (status, notes)
- ❌ DELETE blocked (audit trail)

## Usage Examples

### Submit Registration (Client-side)

```typescript
import { supabase } from '@/lib/supabase'

// Using the submit_registration function
const { data, error } = await supabase.rpc('submit_registration', {
  p_nome_completo: 'Maria Silva',
  p_data_nascimento: '2010-05-15',
  p_idade: 14,
  p_genero: 'feminino',
  p_telefone: '(11) 99999-9999',
  p_email: 'maria@email.com',
  // Guardian info (required for minors)
  p_nome_responsavel: 'Ana Silva',
  p_contato_responsavel: '(11) 88888-8888',
  p_email_responsavel: 'ana@email.com',
  // Experience
  p_pratica_cheerleading: 'sim',
  p_tempo_experiencia: '6-12-meses',
  p_posicao_interesse: ['flyer'],
  p_nivel_interesse: ['n2'],
  p_nivel_habilidades: 'intermediario',
  // Availability
  p_dias_disponiveis: ['segunda', 'quarta', 'sexta'],
  p_participa_campeonatos: 'sim',
  // Consent
  p_aceite_termos: true,
  p_autorizacao_responsavel: true,
})

if (data?.success) {
  console.log('Registration ID:', data.registration_id)
}
```

### Get Statistics (Admin)

```typescript
const { data: stats } = await supabase
  .from('registration_stats')
  .select('*')
  .single()

console.log('Total registrations:', stats?.total_registrations)
console.log('Pending:', stats?.pending_count)
```

### Update Status (Admin)

```typescript
const { data } = await supabase.rpc('update_registration_status', {
  p_registration_id: 'uuid-here',
  p_new_status: 'accepted',
  p_admin_notes: 'Approved for N2 team',
})
```

## Migrations Applied

1. `create_enum_types` - All ENUM types
2. `create_registrations_table` - Main table with constraints
3. `create_guardians_table` - Guardian info (LGPD)
4. `create_indexes_and_triggers` - Performance indexes + updated_at trigger
5. `create_rls_policies` - Row Level Security
6. `create_registration_functions` - submit_registration function
7. `create_admin_views` - Dashboard views
8. `create_admin_functions` - Admin helper functions
9. `fix_security_advisories` - Security hardening

## LGPD Compliance Notes

- Guardian data stored in separate table for granular access control
- No DELETE operations allowed (audit trail)
- All sensitive data behind RLS
- Consent fields are required and validated
- Minor status automatically computed

