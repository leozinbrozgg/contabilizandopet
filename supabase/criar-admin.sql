-- Cria usuário admin no Supabase Auth
-- Execute no SQL Editor: https://agente-supabase.b5ijmd.easypanel.host/project/default/sql

DO $$
DECLARE
  novo_id uuid := gen_random_uuid();
BEGIN
  -- Insere o usuário na tabela de autenticação
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    novo_id,
    'authenticated',
    'authenticated',
    'leoclecio@outlook.com',
    crypt('leo@2026', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  );

  -- Insere a identidade vinculada ao usuário
  INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    novo_id,
    'leoclecio@outlook.com',
    json_build_object('sub', novo_id::text, 'email', 'leoclecio@outlook.com'),
    'email',
    now(),
    now(),
    now()
  );

END $$;
