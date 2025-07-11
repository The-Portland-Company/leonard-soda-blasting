--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      PERFORM pg_notify(
          'realtime:system',
          jsonb_build_object(
              'error', SQLERRM,
              'function', 'realtime.send',
              'event', event,
              'topic', topic,
              'private', private
          )::text
      );
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: directus_access; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_access (
    id uuid NOT NULL,
    role uuid,
    "user" uuid,
    policy uuid NOT NULL,
    sort integer
);


ALTER TABLE public.directus_access OWNER TO postgres;

--
-- Name: directus_activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_activity (
    id integer NOT NULL,
    action character varying(45) NOT NULL,
    "user" uuid,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ip character varying(50),
    user_agent text,
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    origin character varying(255)
);


ALTER TABLE public.directus_activity OWNER TO postgres;

--
-- Name: directus_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.directus_activity_id_seq OWNER TO postgres;

--
-- Name: directus_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_activity_id_seq OWNED BY public.directus_activity.id;


--
-- Name: directus_collections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_collections (
    collection character varying(64) NOT NULL,
    icon character varying(64),
    note text,
    display_template character varying(255),
    hidden boolean DEFAULT false NOT NULL,
    singleton boolean DEFAULT false NOT NULL,
    translations json,
    archive_field character varying(64),
    archive_app_filter boolean DEFAULT true NOT NULL,
    archive_value character varying(255),
    unarchive_value character varying(255),
    sort_field character varying(64),
    accountability character varying(255) DEFAULT 'all'::character varying,
    color character varying(255),
    item_duplication_fields json,
    sort integer,
    "group" character varying(64),
    collapse character varying(255) DEFAULT 'open'::character varying NOT NULL,
    preview_url character varying(255),
    versioning boolean DEFAULT false NOT NULL
);


ALTER TABLE public.directus_collections OWNER TO postgres;

--
-- Name: directus_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_comments (
    id uuid NOT NULL,
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    comment text NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    user_updated uuid
);


ALTER TABLE public.directus_comments OWNER TO postgres;

--
-- Name: directus_dashboards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_dashboards (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(64) DEFAULT 'dashboard'::character varying NOT NULL,
    note text,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    color character varying(255)
);


ALTER TABLE public.directus_dashboards OWNER TO postgres;

--
-- Name: directus_extensions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_extensions (
    enabled boolean DEFAULT true NOT NULL,
    id uuid NOT NULL,
    folder character varying(255) NOT NULL,
    source character varying(255) NOT NULL,
    bundle uuid
);


ALTER TABLE public.directus_extensions OWNER TO postgres;

--
-- Name: directus_fields; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_fields (
    id integer NOT NULL,
    collection character varying(64) NOT NULL,
    field character varying(64) NOT NULL,
    special character varying(64),
    interface character varying(64),
    options json,
    display character varying(64),
    display_options json,
    readonly boolean DEFAULT false NOT NULL,
    hidden boolean DEFAULT false NOT NULL,
    sort integer,
    width character varying(30) DEFAULT 'full'::character varying,
    translations json,
    note text,
    conditions json,
    required boolean DEFAULT false,
    "group" character varying(64),
    validation json,
    validation_message text
);


ALTER TABLE public.directus_fields OWNER TO postgres;

--
-- Name: directus_fields_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_fields_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.directus_fields_id_seq OWNER TO postgres;

--
-- Name: directus_fields_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_fields_id_seq OWNED BY public.directus_fields.id;


--
-- Name: directus_files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_files (
    id uuid NOT NULL,
    storage character varying(255) NOT NULL,
    filename_disk character varying(255),
    filename_download character varying(255) NOT NULL,
    title character varying(255),
    type character varying(255),
    folder uuid,
    uploaded_by uuid,
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by uuid,
    modified_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    charset character varying(50),
    filesize bigint,
    width integer,
    height integer,
    duration integer,
    embed character varying(200),
    description text,
    location text,
    tags text,
    metadata json,
    focal_point_x integer,
    focal_point_y integer,
    tus_id character varying(64),
    tus_data json,
    uploaded_on timestamp with time zone
);


ALTER TABLE public.directus_files OWNER TO postgres;

--
-- Name: directus_flows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_flows (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(64),
    color character varying(255),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    trigger character varying(255),
    accountability character varying(255) DEFAULT 'all'::character varying,
    options json,
    operation uuid,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);


ALTER TABLE public.directus_flows OWNER TO postgres;

--
-- Name: directus_folders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_folders (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    parent uuid
);


ALTER TABLE public.directus_folders OWNER TO postgres;

--
-- Name: directus_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_migrations (
    version character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.directus_migrations OWNER TO postgres;

--
-- Name: directus_notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_notifications (
    id integer NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(255) DEFAULT 'inbox'::character varying,
    recipient uuid NOT NULL,
    sender uuid,
    subject character varying(255) NOT NULL,
    message text,
    collection character varying(64),
    item character varying(255)
);


ALTER TABLE public.directus_notifications OWNER TO postgres;

--
-- Name: directus_notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.directus_notifications_id_seq OWNER TO postgres;

--
-- Name: directus_notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_notifications_id_seq OWNED BY public.directus_notifications.id;


--
-- Name: directus_operations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_operations (
    id uuid NOT NULL,
    name character varying(255),
    key character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    position_x integer NOT NULL,
    position_y integer NOT NULL,
    options json,
    resolve uuid,
    reject uuid,
    flow uuid NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);


ALTER TABLE public.directus_operations OWNER TO postgres;

--
-- Name: directus_panels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_panels (
    id uuid NOT NULL,
    dashboard uuid NOT NULL,
    name character varying(255),
    icon character varying(64) DEFAULT NULL::character varying,
    color character varying(10),
    show_header boolean DEFAULT false NOT NULL,
    note text,
    type character varying(255) NOT NULL,
    position_x integer NOT NULL,
    position_y integer NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    options json,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);


ALTER TABLE public.directus_panels OWNER TO postgres;

--
-- Name: directus_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_permissions (
    id integer NOT NULL,
    collection character varying(64) NOT NULL,
    action character varying(10) NOT NULL,
    permissions json,
    validation json,
    presets json,
    fields text,
    policy uuid NOT NULL
);


ALTER TABLE public.directus_permissions OWNER TO postgres;

--
-- Name: directus_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.directus_permissions_id_seq OWNER TO postgres;

--
-- Name: directus_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_permissions_id_seq OWNED BY public.directus_permissions.id;


--
-- Name: directus_policies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_policies (
    id uuid NOT NULL,
    name character varying(100) NOT NULL,
    icon character varying(64) DEFAULT 'badge'::character varying NOT NULL,
    description text,
    ip_access text,
    enforce_tfa boolean DEFAULT false NOT NULL,
    admin_access boolean DEFAULT false NOT NULL,
    app_access boolean DEFAULT false NOT NULL
);


ALTER TABLE public.directus_policies OWNER TO postgres;

--
-- Name: directus_presets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_presets (
    id integer NOT NULL,
    bookmark character varying(255),
    "user" uuid,
    role uuid,
    collection character varying(64),
    search character varying(100),
    layout character varying(100) DEFAULT 'tabular'::character varying,
    layout_query json,
    layout_options json,
    refresh_interval integer,
    filter json,
    icon character varying(64) DEFAULT 'bookmark'::character varying,
    color character varying(255)
);


ALTER TABLE public.directus_presets OWNER TO postgres;

--
-- Name: directus_presets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_presets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.directus_presets_id_seq OWNER TO postgres;

--
-- Name: directus_presets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_presets_id_seq OWNED BY public.directus_presets.id;


--
-- Name: directus_relations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_relations (
    id integer NOT NULL,
    many_collection character varying(64) NOT NULL,
    many_field character varying(64) NOT NULL,
    one_collection character varying(64),
    one_field character varying(64),
    one_collection_field character varying(64),
    one_allowed_collections text,
    junction_field character varying(64),
    sort_field character varying(64),
    one_deselect_action character varying(255) DEFAULT 'nullify'::character varying NOT NULL
);


ALTER TABLE public.directus_relations OWNER TO postgres;

--
-- Name: directus_relations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_relations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.directus_relations_id_seq OWNER TO postgres;

--
-- Name: directus_relations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_relations_id_seq OWNED BY public.directus_relations.id;


--
-- Name: directus_revisions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_revisions (
    id integer NOT NULL,
    activity integer NOT NULL,
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    data json,
    delta json,
    parent integer,
    version uuid
);


ALTER TABLE public.directus_revisions OWNER TO postgres;

--
-- Name: directus_revisions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_revisions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.directus_revisions_id_seq OWNER TO postgres;

--
-- Name: directus_revisions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_revisions_id_seq OWNED BY public.directus_revisions.id;


--
-- Name: directus_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_roles (
    id uuid NOT NULL,
    name character varying(100) NOT NULL,
    icon character varying(64) DEFAULT 'supervised_user_circle'::character varying NOT NULL,
    description text,
    parent uuid
);


ALTER TABLE public.directus_roles OWNER TO postgres;

--
-- Name: directus_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_sessions (
    token character varying(64) NOT NULL,
    "user" uuid,
    expires timestamp with time zone NOT NULL,
    ip character varying(255),
    user_agent text,
    share uuid,
    origin character varying(255),
    next_token character varying(64)
);


ALTER TABLE public.directus_sessions OWNER TO postgres;

--
-- Name: directus_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_settings (
    id integer NOT NULL,
    project_name character varying(100) DEFAULT 'Directus'::character varying NOT NULL,
    project_url character varying(255),
    project_color character varying(255) DEFAULT '#6644FF'::character varying NOT NULL,
    project_logo uuid,
    public_foreground uuid,
    public_background uuid,
    public_note text,
    auth_login_attempts integer DEFAULT 25,
    auth_password_policy character varying(100),
    storage_asset_transform character varying(7) DEFAULT 'all'::character varying,
    storage_asset_presets json,
    custom_css text,
    storage_default_folder uuid,
    basemaps json,
    mapbox_key character varying(255),
    module_bar json,
    project_descriptor character varying(100),
    default_language character varying(255) DEFAULT 'en-US'::character varying NOT NULL,
    custom_aspect_ratios json,
    public_favicon uuid,
    default_appearance character varying(255) DEFAULT 'auto'::character varying NOT NULL,
    default_theme_light character varying(255),
    theme_light_overrides json,
    default_theme_dark character varying(255),
    theme_dark_overrides json,
    report_error_url character varying(255),
    report_bug_url character varying(255),
    report_feature_url character varying(255),
    public_registration boolean DEFAULT false NOT NULL,
    public_registration_verify_email boolean DEFAULT true NOT NULL,
    public_registration_role uuid,
    public_registration_email_filter json,
    visual_editor_urls json,
    accepted_terms boolean DEFAULT false,
    project_id uuid
);


ALTER TABLE public.directus_settings OWNER TO postgres;

--
-- Name: directus_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.directus_settings_id_seq OWNER TO postgres;

--
-- Name: directus_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_settings_id_seq OWNED BY public.directus_settings.id;


--
-- Name: directus_shares; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_shares (
    id uuid NOT NULL,
    name character varying(255),
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    role uuid,
    password character varying(255),
    user_created uuid,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_start timestamp with time zone,
    date_end timestamp with time zone,
    times_used integer DEFAULT 0,
    max_uses integer
);


ALTER TABLE public.directus_shares OWNER TO postgres;

--
-- Name: directus_translations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_translations (
    id uuid NOT NULL,
    language character varying(255) NOT NULL,
    key character varying(255) NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.directus_translations OWNER TO postgres;

--
-- Name: directus_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_users (
    id uuid NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    email character varying(128),
    password character varying(255),
    location character varying(255),
    title character varying(50),
    description text,
    tags json,
    avatar uuid,
    language character varying(255) DEFAULT NULL::character varying,
    tfa_secret character varying(255),
    status character varying(16) DEFAULT 'active'::character varying NOT NULL,
    role uuid,
    token character varying(255),
    last_access timestamp with time zone,
    last_page character varying(255),
    provider character varying(128) DEFAULT 'default'::character varying NOT NULL,
    external_identifier character varying(255),
    auth_data json,
    email_notifications boolean DEFAULT true,
    appearance character varying(255),
    theme_dark character varying(255),
    theme_light character varying(255),
    theme_light_overrides json,
    theme_dark_overrides json
);


ALTER TABLE public.directus_users OWNER TO postgres;

--
-- Name: directus_versions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_versions (
    id uuid NOT NULL,
    key character varying(64) NOT NULL,
    name character varying(255),
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    hash character varying(255),
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    user_updated uuid,
    delta json
);


ALTER TABLE public.directus_versions OWNER TO postgres;

--
-- Name: directus_webhooks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directus_webhooks (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    method character varying(10) DEFAULT 'POST'::character varying NOT NULL,
    url character varying(255) NOT NULL,
    status character varying(10) DEFAULT 'active'::character varying NOT NULL,
    data boolean DEFAULT true NOT NULL,
    actions character varying(100) NOT NULL,
    collections character varying(255) NOT NULL,
    headers json,
    was_active_before_deprecation boolean DEFAULT false NOT NULL,
    migrated_flow uuid
);


ALTER TABLE public.directus_webhooks OWNER TO postgres;

--
-- Name: directus_webhooks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directus_webhooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.directus_webhooks_id_seq OWNER TO postgres;

--
-- Name: directus_webhooks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directus_webhooks_id_seq OWNED BY public.directus_webhooks.id;


--
-- Name: navigation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.navigation (
    id integer NOT NULL,
    sort integer,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    label character varying(255) NOT NULL,
    url character varying(255),
    parent_id integer,
    target character varying(255) DEFAULT '_self'::character varying,
    icon character varying(255)
);


ALTER TABLE public.navigation OWNER TO postgres;

--
-- Name: navigation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.navigation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.navigation_id_seq OWNER TO postgres;

--
-- Name: navigation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.navigation_id_seq OWNED BY public.navigation.id;


--
-- Name: pages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pages (
    id integer NOT NULL,
    status character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    meta_title character varying(255),
    meta_description text,
    hero_title character varying(255),
    hero_subtitle text,
    hero_image uuid,
    hero_video uuid,
    content_sections json,
    date_created timestamp with time zone,
    date_updated timestamp with time zone,
    services_cards json,
    page_title character varying(255),
    seo_title character varying(255),
    menu_title character varying(255)
);


ALTER TABLE public.pages OWNER TO postgres;

--
-- Name: pages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pages_id_seq OWNER TO postgres;

--
-- Name: pages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pages_id_seq OWNED BY public.pages.id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id integer NOT NULL,
    status character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    description text,
    featured_image uuid,
    gallery json,
    features json,
    applications json,
    sort_order integer
);


ALTER TABLE public.services OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.services_id_seq OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settings (
    id integer NOT NULL,
    site_title character varying(255) DEFAULT 'Leonard Soda Blasting'::character varying NOT NULL,
    site_tagline character varying(255),
    site_description text,
    phone_number character varying(255),
    email character varying(255),
    address text,
    business_hours text,
    social_facebook character varying(255),
    social_instagram character varying(255),
    social_linkedin character varying(255),
    google_analytics_id character varying(255),
    logo uuid,
    favicon uuid
);


ALTER TABLE public.settings OWNER TO postgres;

--
-- Name: settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.settings_id_seq OWNER TO postgres;

--
-- Name: settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.settings_id_seq OWNED BY public.settings.id;


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testimonials (
    id integer NOT NULL,
    status character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    quote text NOT NULL,
    client_name character varying(255) NOT NULL
);


ALTER TABLE public.testimonials OWNER TO postgres;

--
-- Name: testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.testimonials_id_seq OWNER TO postgres;

--
-- Name: testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.testimonials_id_seq OWNED BY public.testimonials.id;


--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: directus_activity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_activity ALTER COLUMN id SET DEFAULT nextval('public.directus_activity_id_seq'::regclass);


--
-- Name: directus_fields id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_fields ALTER COLUMN id SET DEFAULT nextval('public.directus_fields_id_seq'::regclass);


--
-- Name: directus_notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_notifications ALTER COLUMN id SET DEFAULT nextval('public.directus_notifications_id_seq'::regclass);


--
-- Name: directus_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_permissions ALTER COLUMN id SET DEFAULT nextval('public.directus_permissions_id_seq'::regclass);


--
-- Name: directus_presets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_presets ALTER COLUMN id SET DEFAULT nextval('public.directus_presets_id_seq'::regclass);


--
-- Name: directus_relations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_relations ALTER COLUMN id SET DEFAULT nextval('public.directus_relations_id_seq'::regclass);


--
-- Name: directus_revisions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_revisions ALTER COLUMN id SET DEFAULT nextval('public.directus_revisions_id_seq'::regclass);


--
-- Name: directus_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings ALTER COLUMN id SET DEFAULT nextval('public.directus_settings_id_seq'::regclass);


--
-- Name: directus_webhooks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_webhooks ALTER COLUMN id SET DEFAULT nextval('public.directus_webhooks_id_seq'::regclass);


--
-- Name: navigation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.navigation ALTER COLUMN id SET DEFAULT nextval('public.navigation_id_seq'::regclass);


--
-- Name: pages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pages ALTER COLUMN id SET DEFAULT nextval('public.pages_id_seq'::regclass);


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- Name: settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings ALTER COLUMN id SET DEFAULT nextval('public.settings_id_seq'::regclass);


--
-- Name: testimonials id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials ALTER COLUMN id SET DEFAULT nextval('public.testimonials_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\.


--
-- Data for Name: directus_access; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_access (id, role, "user", policy, sort) FROM stdin;
bd524a14-ffe9-4642-8297-f45d1834460c	\N	\N	abf8a154-5b1c-4a46-ac9c-7300570f4f17	1
ae19360b-39aa-4536-bd01-d115e63c6a41	2cd8f664-3a36-4f12-8aad-bd4d6c0ea0be	\N	410f72a7-1073-4820-9a94-c9298ebd5eb9	\N
752308d3-0bc8-4e3e-8685-8dee9af9281b	1c6e3a8a-f325-4126-90d7-344e6c2e1c01	\N	403cd1e9-afb6-4410-9a9c-e00355a07c5a	\N
\.


--
-- Data for Name: directus_activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_activity (id, action, "user", "timestamp", ip, user_agent, collection, item, origin) FROM stdin;
1	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:22:27.062+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:8055
2	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:22:32.279+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_settings	1	http://localhost:8055
3	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:02.541+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
4	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:03.327+00	127.0.0.1	axios/1.8.4	directus_fields	1	\N
5	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:03.647+00	127.0.0.1	axios/1.8.4	directus_collections	pages	\N
6	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:33.72+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
7	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:36.7+00	127.0.0.1	axios/1.8.4	directus_fields	2	\N
8	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:39.079+00	127.0.0.1	axios/1.8.4	directus_fields	3	\N
9	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:41.5+00	127.0.0.1	axios/1.8.4	directus_fields	4	\N
10	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:43.98+00	127.0.0.1	axios/1.8.4	directus_fields	5	\N
11	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:46.426+00	127.0.0.1	axios/1.8.4	directus_fields	6	\N
12	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:48.88+00	127.0.0.1	axios/1.8.4	directus_fields	7	\N
13	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:51.339+00	127.0.0.1	axios/1.8.4	directus_fields	8	\N
14	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:53.732+00	127.0.0.1	axios/1.8.4	directus_fields	9	\N
15	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:56.179+00	127.0.0.1	axios/1.8.4	directus_fields	10	\N
16	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:30:58.775+00	127.0.0.1	axios/1.8.4	directus_fields	11	\N
17	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:01.275+00	127.0.0.1	axios/1.8.4	directus_fields	12	\N
18	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:03.616+00	127.0.0.1	axios/1.8.4	directus_fields	13	\N
19	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:05.868+00	127.0.0.1	axios/1.8.4	directus_fields	14	\N
20	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:06.183+00	127.0.0.1	axios/1.8.4	directus_collections	navigation	\N
21	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:09.272+00	127.0.0.1	axios/1.8.4	directus_fields	15	\N
22	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:11.571+00	127.0.0.1	axios/1.8.4	directus_fields	16	\N
23	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:13.926+00	127.0.0.1	axios/1.8.4	directus_fields	17	\N
24	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:16.302+00	127.0.0.1	axios/1.8.4	directus_fields	18	\N
25	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:18.589+00	127.0.0.1	axios/1.8.4	directus_fields	19	\N
26	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:20.841+00	127.0.0.1	axios/1.8.4	directus_fields	20	\N
27	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:23.122+00	127.0.0.1	axios/1.8.4	directus_fields	21	\N
28	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:25.318+00	127.0.0.1	axios/1.8.4	directus_fields	22	\N
29	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:25.641+00	127.0.0.1	axios/1.8.4	directus_collections	settings	\N
30	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:28.912+00	127.0.0.1	axios/1.8.4	directus_fields	23	\N
31	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:31.2+00	127.0.0.1	axios/1.8.4	directus_fields	24	\N
32	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:33.58+00	127.0.0.1	axios/1.8.4	directus_fields	25	\N
33	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:35.82+00	127.0.0.1	axios/1.8.4	directus_fields	26	\N
34	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:38.16+00	127.0.0.1	axios/1.8.4	directus_fields	27	\N
35	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:40.404+00	127.0.0.1	axios/1.8.4	directus_fields	28	\N
36	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:42.732+00	127.0.0.1	axios/1.8.4	directus_fields	29	\N
37	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:45.113+00	127.0.0.1	axios/1.8.4	directus_fields	30	\N
38	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:47.491+00	127.0.0.1	axios/1.8.4	directus_fields	31	\N
39	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:49.859+00	127.0.0.1	axios/1.8.4	directus_fields	32	\N
40	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:52.247+00	127.0.0.1	axios/1.8.4	directus_fields	33	\N
41	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:54.64+00	127.0.0.1	axios/1.8.4	directus_fields	34	\N
42	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:57.016+00	127.0.0.1	axios/1.8.4	directus_fields	35	\N
43	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:59.238+00	127.0.0.1	axios/1.8.4	directus_fields	36	\N
44	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:31:59.571+00	127.0.0.1	axios/1.8.4	directus_collections	services	\N
45	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:02.693+00	127.0.0.1	axios/1.8.4	directus_fields	37	\N
46	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:05.082+00	127.0.0.1	axios/1.8.4	directus_fields	38	\N
47	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:07.573+00	127.0.0.1	axios/1.8.4	directus_fields	39	\N
48	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:09.824+00	127.0.0.1	axios/1.8.4	directus_fields	40	\N
49	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:12.158+00	127.0.0.1	axios/1.8.4	directus_fields	41	\N
50	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:14.442+00	127.0.0.1	axios/1.8.4	directus_fields	42	\N
51	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:16.701+00	127.0.0.1	axios/1.8.4	directus_fields	43	\N
52	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:18.974+00	127.0.0.1	axios/1.8.4	directus_fields	44	\N
53	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:21.265+00	127.0.0.1	axios/1.8.4	directus_fields	45	\N
54	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:23.407+00	127.0.0.1	axios/1.8.4	directus_fields	46	\N
55	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:23.717+00	127.0.0.1	axios/1.8.4	directus_collections	testimonials	\N
56	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:26.774+00	127.0.0.1	axios/1.8.4	directus_fields	47	\N
57	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:29.135+00	127.0.0.1	axios/1.8.4	directus_fields	48	\N
58	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:32:31.449+00	127.0.0.1	axios/1.8.4	directus_fields	49	\N
59	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:33:59.072+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
60	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:33:59.718+00	127.0.0.1	axios/1.8.4	directus_roles	1c6e3a8a-f325-4126-90d7-344e6c2e1c01	\N
61	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:01.789+00	127.0.0.1	axios/1.8.4	pages	1	\N
62	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:02.445+00	127.0.0.1	axios/1.8.4	pages	2	\N
63	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:03.101+00	127.0.0.1	axios/1.8.4	pages	3	\N
64	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:03.765+00	127.0.0.1	axios/1.8.4	pages	4	\N
65	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:04.429+00	127.0.0.1	axios/1.8.4	pages	5	\N
66	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:05.1+00	127.0.0.1	axios/1.8.4	navigation	1	\N
67	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:05.745+00	127.0.0.1	axios/1.8.4	navigation	2	\N
68	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:06.369+00	127.0.0.1	axios/1.8.4	navigation	3	\N
69	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:07.001+00	127.0.0.1	axios/1.8.4	navigation	4	\N
70	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:07.658+00	127.0.0.1	axios/1.8.4	navigation	5	\N
71	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:08.321+00	127.0.0.1	axios/1.8.4	services	1	\N
72	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:08.981+00	127.0.0.1	axios/1.8.4	services	2	\N
73	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:09.63+00	127.0.0.1	axios/1.8.4	services	3	\N
74	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:10.277+00	127.0.0.1	axios/1.8.4	services	4	\N
75	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:10.916+00	127.0.0.1	axios/1.8.4	services	5	\N
76	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:11.557+00	127.0.0.1	axios/1.8.4	services	6	\N
77	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:12.326+00	127.0.0.1	axios/1.8.4	testimonials	1	\N
78	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:34:37.878+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
79	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:35:07.658+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
80	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:35:08.627+00	127.0.0.1	axios/1.8.4	directus_policies	6fefad65-fffb-47e3-8790-3bddd62417bc	\N
81	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:35:10.242+00	127.0.0.1	axios/1.8.4	directus_permissions	1	\N
82	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:35:11.991+00	127.0.0.1	axios/1.8.4	directus_permissions	2	\N
83	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:35:13.66+00	127.0.0.1	axios/1.8.4	directus_permissions	3	\N
84	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:35:15.271+00	127.0.0.1	axios/1.8.4	directus_permissions	4	\N
85	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:35:16.859+00	127.0.0.1	axios/1.8.4	directus_permissions	5	\N
86	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:42:57.394+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	pages	1	http://localhost:8055
87	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:43:43.917+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
88	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:50:22.559+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
89	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:50:23.22+00	127.0.0.1	axios/1.8.4	directus_collections	navigation	\N
90	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:50:26.232+00	127.0.0.1	axios/1.8.4	directus_fields	15	\N
91	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:50:28.464+00	127.0.0.1	axios/1.8.4	navigation	1	\N
92	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:50:29.231+00	127.0.0.1	axios/1.8.4	navigation	2	\N
93	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:50:29.97+00	127.0.0.1	axios/1.8.4	navigation	3	\N
94	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:50:30.75+00	127.0.0.1	axios/1.8.4	navigation	4	\N
95	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:50:31.494+00	127.0.0.1	axios/1.8.4	navigation	5	\N
96	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:51:02.869+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
97	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:51:03.893+00	127.0.0.1	axios/1.8.4	directus_permissions	6	\N
98	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:51:05.729+00	127.0.0.1	axios/1.8.4	directus_permissions	7	\N
99	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:51:07.421+00	127.0.0.1	axios/1.8.4	directus_permissions	8	\N
100	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:51:09.11+00	127.0.0.1	axios/1.8.4	directus_permissions	9	\N
101	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:51:10.818+00	127.0.0.1	axios/1.8.4	directus_permissions	10	\N
102	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:51:12.489+00	127.0.0.1	axios/1.8.4	directus_permissions	11	\N
103	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:51:14.28+00	127.0.0.1	axios/1.8.4	directus_permissions	12	\N
104	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:51:15.976+00	127.0.0.1	axios/1.8.4	directus_permissions	13	\N
105	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:51:17.647+00	127.0.0.1	axios/1.8.4	directus_permissions	14	\N
106	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 01:51:19.332+00	127.0.0.1	axios/1.8.4	directus_permissions	15	\N
107	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:26:10.213+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
108	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:26:32.649+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
109	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:26:48.777+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
110	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:11.62+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
111	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:12.91+00	127.0.0.1	axios/1.8.4	directus_roles	1c6e3a8a-f325-4126-90d7-344e6c2e1c01	\N
112	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:31.969+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
113	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:32.498+00	127.0.0.1	axios/1.8.4	directus_permissions	1	\N
114	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:33.973+00	127.0.0.1	axios/1.8.4	directus_permissions	2	\N
115	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:35.34+00	127.0.0.1	axios/1.8.4	directus_permissions	3	\N
116	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:36.769+00	127.0.0.1	axios/1.8.4	directus_permissions	4	\N
117	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:38.149+00	127.0.0.1	axios/1.8.4	directus_permissions	5	\N
118	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:39.553+00	127.0.0.1	axios/1.8.4	directus_permissions	6	\N
119	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:40.949+00	127.0.0.1	axios/1.8.4	directus_permissions	7	\N
120	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:42.332+00	127.0.0.1	axios/1.8.4	directus_permissions	8	\N
121	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:43.763+00	127.0.0.1	axios/1.8.4	directus_permissions	9	\N
122	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:45.24+00	127.0.0.1	axios/1.8.4	directus_permissions	10	\N
123	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:46.643+00	127.0.0.1	axios/1.8.4	directus_permissions	11	\N
124	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:48.051+00	127.0.0.1	axios/1.8.4	directus_permissions	12	\N
125	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:49.623+00	127.0.0.1	axios/1.8.4	directus_permissions	13	\N
126	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:51.067+00	127.0.0.1	axios/1.8.4	directus_permissions	14	\N
127	delete	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 02:27:52.508+00	127.0.0.1	axios/1.8.4	directus_permissions	15	\N
128	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 03:23:59.318+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
129	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 03:24:10.272+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
130	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 03:24:11.264+00	127.0.0.1	axios/1.8.4	directus_policies	90a6c9a7-a9f1-40d3-b987-4a4c842d4a09	\N
131	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 03:24:12.936+00	127.0.0.1	axios/1.8.4	directus_permissions	16	\N
132	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 03:24:14.672+00	127.0.0.1	axios/1.8.4	directus_permissions	17	\N
133	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 03:24:16.352+00	127.0.0.1	axios/1.8.4	directus_permissions	18	\N
134	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 03:24:18.652+00	127.0.0.1	axios/1.8.4	directus_permissions	19	\N
135	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 03:24:20.328+00	127.0.0.1	axios/1.8.4	directus_permissions	20	\N
136	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 03:25:17.914+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
137	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 03:44:09.343+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
138	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 03:51:14.611+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
139	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 03:59:12.752+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	pages	1	http://localhost:8055
140	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:00:30.421+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	settings	1	http://localhost:8055
141	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:26:49.976+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
142	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:26:49.992+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
143	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:26:50.01+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
144	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:26:50.037+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
145	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:26:50.112+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
146	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:26:50.113+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
148	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:26:51.057+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
147	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:26:51.058+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
149	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:26:51.076+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
150	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:26:51.072+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
151	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:26:51.16+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
152	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:26:51.17+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
153	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:27:15.046+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	settings	1	http://localhost:8055
154	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:28:10.24+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
155	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:28:53.067+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	settings	1	http://localhost:8055
156	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:02.315+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
157	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:02.318+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
158	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:02.428+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
159	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:02.428+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
160	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:02.461+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
161	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:02.475+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
163	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:03.387+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
171	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:27.665+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
181	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:28.788+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
187	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:41.161+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
194	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:42.286+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
196	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:43.333+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
198	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:45.503+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
208	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:46.736+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
215	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:53.796+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
218	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:54.934+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
162	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:03.379+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
164	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:03.451+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
168	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:04.463+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
165	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:03.496+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
174	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:27.752+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
178	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:28.775+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
182	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:29.724+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
189	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:41.188+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
190	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:42.285+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
200	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:45.574+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
206	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:46.709+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
211	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:47.748+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
216	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:53.824+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
223	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:55.025+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
167	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:03.499+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
169	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:04.47+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
166	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:29:03.507+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
170	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:27.664+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
173	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:27.676+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
172	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:27.683+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
175	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:27.756+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
176	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:28.686+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
177	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:28.763+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
179	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:28.779+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
180	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:28.795+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
183	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:29.776+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
184	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:41.123+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
185	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:41.159+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
186	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:41.16+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
188	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:41.184+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
191	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:42.285+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
192	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:42.295+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
193	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:42.296+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
195	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:42.305+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
197	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:43.387+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
199	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:45.562+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
201	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:45.584+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
202	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:45.605+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
203	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:45.611+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
204	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:46.645+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
205	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:46.65+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
207	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:46.71+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
209	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:46.744+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
210	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:47.743+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
343	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:41:38.437+00	127.0.0.1	curl/8.7.1	directus_files	c3b703ce-6825-4c66-84c2-7f116b3e0552	\N
214	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:53.796+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
221	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:54.966+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
212	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:53.794+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
220	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:54.965+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
225	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:56.058+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
213	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:53.796+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
219	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:54.96+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
217	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:53.803+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
222	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:54.992+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
224	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:33:56.043+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
226	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:36:08.87+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
227	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:36:08.971+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
229	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:36:08.987+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
228	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:36:08.995+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
230	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:36:09.023+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
231	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:03.508+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
232	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:03.524+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
233	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:03.605+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
234	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:03.616+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
235	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:03.686+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
236	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:03.687+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
237	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:04.628+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
238	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:04.622+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
239	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:04.737+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
240	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:04.738+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
241	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:04.763+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
242	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:04.77+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
243	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:05.764+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
244	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 04:38:05.774+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
245	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:03:31.635+00	127.0.0.1	curl/8.7.1	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
246	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:47.608+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
247	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:47.695+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
248	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:47.686+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
249	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:47.686+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
251	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:47.811+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
250	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:47.81+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
252	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:48.655+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
258	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:49.674+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
253	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:48.843+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
254	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:48.844+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
255	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:48.845+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
256	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:48.915+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
257	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:48.958+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
259	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:11:49.874+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
260	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:22:58.207+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
261	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:22:58.235+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
262	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:22:58.315+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
263	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:22:58.323+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
265	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:22:58.4+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
264	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:22:58.399+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
266	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:22:59.247+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
267	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:22:59.275+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
268	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:22:59.36+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
269	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:22:59.362+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
270	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:22:59.459+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
271	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:22:59.485+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
272	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:00.395+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
273	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:00.408+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
274	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:28.515+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
275	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:28.516+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
276	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:28.516+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
277	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:28.516+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
278	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:28.783+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
279	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:28.795+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
280	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:29.589+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
281	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:29.594+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
282	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:29.602+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
283	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:29.605+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
285	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:29.875+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
284	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:29.874+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
344	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:41:48.375+00	127.0.0.1	curl/8.7.1	directus_files	359082da-6bf6-4a78-adfd-709e37692e33	\N
286	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:30.634+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
292	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:41.342+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
294	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:42.371+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
287	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:30.642+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
293	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:41.354+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
298	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:42.41+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
288	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:41.295+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
296	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:42.414+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
289	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:41.283+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
299	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:42.426+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
301	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:43.434+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
290	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:41.323+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
297	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:42.409+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
291	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:41.339+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
295	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:42.374+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
300	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 05:23:43.433+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:3000
302	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:49:47.904+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
303	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:50:20.367+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
304	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:50:59.997+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
305	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:51:00.982+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_policies	e361d4be-47be-4f74-9b30-5c86f80ec9a8	\N
306	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:51:02.266+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_permissions	21	\N
307	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:51:04.014+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_permissions	22	\N
308	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:51:05.706+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_permissions	23	\N
309	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:51:07.358+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_permissions	24	\N
310	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:51:08.993+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_permissions	25	\N
311	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:51:53.003+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
312	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:52:34.296+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
313	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:52:35.332+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_permissions	26	\N
314	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:52:37.204+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_permissions	27	\N
315	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:52:38.952+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_permissions	28	\N
316	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:52:40.691+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_permissions	29	\N
317	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 19:52:42.427+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_permissions	30	\N
318	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 20:33:41.237+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
319	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 20:33:42.387+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_fields	50	\N
320	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 20:33:44.447+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	pages	1	\N
321	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 20:34:24.161+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
322	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 20:35:58.252+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
323	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 20:35:58.787+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	pages	6	\N
324	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 20:35:59.428+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	pages	7	\N
325	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 20:36:00.065+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	pages	8	\N
326	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 20:38:42.148+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
327	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 20:38:42.976+00	127.0.0.1	node-fetch/1.0 (+https://github.com/bitinn/node-fetch)	pages	1	\N
328	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 20:46:42.817+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	pages	1	http://localhost:8055
329	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 23:04:43.04+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	pages	1	http://localhost:8055
330	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 23:37:01.026+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
331	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 23:37:34.212+00	127.0.0.1	curl/8.7.1	directus_fields	51	\N
332	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 23:38:07.632+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
333	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 23:38:23.658+00	127.0.0.1	curl/8.7.1	directus_fields	52	\N
334	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 23:39:12.332+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
335	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 23:39:28.117+00	127.0.0.1	curl/8.7.1	directus_fields	53	\N
336	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 23:40:06.775+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
337	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 23:42:12.765+00	127.0.0.1	curl/8.7.1	pages	1	\N
338	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-02 23:52:00.448+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
339	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 04:08:45.084+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	pages	1	http://localhost:8055
340	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 04:08:55.884+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	pages	1	http://localhost:8055
341	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 04:09:06.181+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	pages	1	http://localhost:8055
342	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:41:25.152+00	127.0.0.1	curl/8.7.1	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
345	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:41:56.126+00	127.0.0.1	curl/8.7.1	directus_files	914108af-d022-485e-9236-c83d1d40bf53	\N
346	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:42:03.026+00	127.0.0.1	curl/8.7.1	directus_files	7a0552d9-cfee-4e04-b6c7-f5105360b843	\N
347	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:42:09.774+00	127.0.0.1	curl/8.7.1	directus_files	e9d11ac5-a277-4183-ac6a-16fde4667359	\N
348	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:42:19.483+00	127.0.0.1	curl/8.7.1	directus_files	dde5eeeb-f19c-414a-8dd7-03db20f8ea5e	\N
349	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:42:26.951+00	127.0.0.1	curl/8.7.1	directus_files	c1836ea8-d75d-4f70-aada-5854bbce79b5	\N
350	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:43:12.616+00	127.0.0.1	curl/8.7.1	pages	1	\N
351	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 22:00:00.916+00	127.0.0.1	curl/8.7.1	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
352	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 22:13:05.458+00	127.0.0.1	curl/8.7.1	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
353	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 22:15:16.401+00	127.0.0.1	curl/8.7.1	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
354	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 22:16:38.108+00	127.0.0.1	curl/8.7.1	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
355	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 22:19:40.306+00	127.0.0.1	curl/8.7.1	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
356	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-05 18:35:45.764+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:8055
357	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-07 07:08:01.597+00	127.0.0.1	curl/8.7.1	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
358	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-07 07:10:18.666+00	127.0.0.1	curl/8.7.1	directus_policies	4ceef64a-99d8-486e-bcea-c81b7010549d	\N
359	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-07 07:10:36.84+00	127.0.0.1	curl/8.7.1	directus_permissions	31	\N
360	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-07 07:22:41.016+00	127.0.0.1	curl/8.7.1	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
361	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-07 13:43:43.546+00	127.0.0.1	curl/8.7.1	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
362	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-07 14:49:57.103+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
363	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 05:53:07.723+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
364	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 05:59:32.452+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
365	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 06:00:00.227+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
366	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 06:00:01.712+00	127.0.0.1	axios/1.8.4	directus_policies	403cd1e9-afb6-4410-9a9c-e00355a07c5a	\N
367	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 06:00:03.024+00	127.0.0.1	axios/1.8.4	directus_permissions	32	\N
368	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 06:00:04.813+00	127.0.0.1	axios/1.8.4	directus_access	752308d3-0bc8-4e3e-8685-8dee9af9281b	\N
369	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 06:08:48.751+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
370	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 06:09:27.883+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
371	create	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 06:09:28.654+00	127.0.0.1	axios/1.8.4	directus_permissions	33	\N
372	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 06:56:53.124+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
373	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 06:56:54.095+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
374	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 06:56:55.747+00	127.0.0.1	axios/1.8.4	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N
375	login	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 06:57:39.469+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	http://localhost:8574
376	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 07:06:26.686+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	pages	1	http://localhost:8574
377	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 08:35:45.542+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	pages	1	http://localhost:8574
378	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 08:56:56.054+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	pages	1	http://localhost:8574
379	update	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-09 09:05:24.523+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	pages	1	http://localhost:8574
\.


--
-- Data for Name: directus_collections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_collections (collection, icon, note, display_template, hidden, singleton, translations, archive_field, archive_app_filter, archive_value, unarchive_value, sort_field, accountability, color, item_duplication_fields, sort, "group", collapse, preview_url, versioning) FROM stdin;
pages	article	Website pages with editable content	{{title}}	f	f	[{"language":"en-US","translation":"Pages"}]	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N	f
settings	settings	Global website settings	\N	f	t	[{"language":"en-US","translation":"Settings"}]	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N	f
services	build	Service pages and offerings	{{title}}	f	f	[{"language":"en-US","translation":"Services"}]	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N	f
testimonials	format_quote	Customer testimonials and reviews	{{client_name}}	f	f	[{"language":"en-US","translation":"Testimonials"}]	\N	t	\N	\N	\N	all	\N	\N	\N	\N	open	\N	f
navigation	menu	Website navigation menu items	{{label}}	f	f	[{"language":"en-US","translation":"Navigation","singular":"Navigation Item","plural":"Navigation Items"}]	\N	t	\N	\N	sort	all	\N	\N	\N	\N	open	\N	f
\.


--
-- Data for Name: directus_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_comments (id, collection, item, comment, date_created, date_updated, user_created, user_updated) FROM stdin;
\.


--
-- Data for Name: directus_dashboards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_dashboards (id, name, icon, note, date_created, user_created, color) FROM stdin;
\.


--
-- Data for Name: directus_extensions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_extensions (enabled, id, folder, source, bundle) FROM stdin;
\.


--
-- Data for Name: directus_fields; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_fields (id, collection, field, special, interface, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, "group", validation, validation_message) FROM stdin;
1	pages	id	\N	numeric	\N	\N	\N	t	t	1	full	\N	\N	\N	f	\N	\N	\N
2	pages	status	\N	select-dropdown	{"choices":[{"text":"Draft","value":"draft"},{"text":"Published","value":"published"},{"text":"Archived","value":"archived"}]}	\N	\N	f	f	2	half	\N	\N	\N	f	\N	\N	\N
3	pages	title	\N	input	\N	\N	\N	f	f	3	full	\N	\N	\N	t	\N	\N	\N
4	pages	slug	\N	input	\N	\N	\N	f	f	4	half	\N	URL slug for the page	\N	t	\N	\N	\N
5	pages	meta_title	\N	input	\N	\N	\N	f	f	5	half	\N	SEO title tag	\N	f	\N	\N	\N
6	pages	meta_description	\N	input-multiline	\N	\N	\N	f	f	6	full	\N	SEO meta description	\N	f	\N	\N	\N
7	pages	hero_title	\N	input	\N	\N	\N	f	f	7	full	\N	Main hero section title	\N	f	\N	\N	\N
8	pages	hero_subtitle	\N	input-multiline	\N	\N	\N	f	f	8	full	\N	Hero section subtitle/description	\N	f	\N	\N	\N
9	pages	hero_image	\N	file-image	\N	\N	\N	f	f	9	half	\N	Hero section background image	\N	f	\N	\N	\N
10	pages	hero_video	\N	file	\N	\N	\N	f	f	10	half	\N	Hero section background video	\N	f	\N	\N	\N
11	pages	content_sections	\N	list	{"template":"{{type}}: {{title}}"}	\N	\N	f	f	11	full	\N	Editable content sections	\N	f	\N	\N	\N
12	pages	date_created	date-created	datetime	\N	\N	\N	t	t	12	half	\N	\N	\N	f	\N	\N	\N
13	pages	date_updated	date-updated	datetime	\N	\N	\N	t	t	13	half	\N	\N	\N	f	\N	\N	\N
14	navigation	id	\N	numeric	\N	\N	\N	t	t	1	full	\N	\N	\N	f	\N	\N	\N
16	navigation	status	\N	select-dropdown	{"choices":[{"text":"Active","value":"active"},{"text":"Inactive","value":"inactive"}]}	\N	\N	f	f	3	half	\N	\N	\N	f	\N	\N	\N
17	navigation	label	\N	input	\N	\N	\N	f	f	4	half	\N	\N	\N	t	\N	\N	\N
18	navigation	url	\N	input	\N	\N	\N	f	f	5	half	\N	\N	\N	f	\N	\N	\N
19	navigation	parent_id	\N	select-dropdown-m2o	\N	\N	\N	f	f	6	half	\N	Parent menu item for dropdown menus	\N	f	\N	\N	\N
20	navigation	target	\N	select-dropdown	{"choices":[{"text":"Same Window","value":"_self"},{"text":"New Window","value":"_blank"}]}	\N	\N	f	f	7	half	\N	\N	\N	f	\N	\N	\N
21	navigation	icon	\N	input	\N	\N	\N	f	f	8	half	\N	Icon class or name	\N	f	\N	\N	\N
22	settings	id	\N	numeric	\N	\N	\N	t	t	1	full	\N	\N	\N	f	\N	\N	\N
23	settings	site_title	\N	input	\N	\N	\N	f	f	2	half	\N	\N	\N	t	\N	\N	\N
24	settings	site_tagline	\N	input	\N	\N	\N	f	f	3	half	\N	\N	\N	f	\N	\N	\N
25	settings	site_description	\N	input-multiline	\N	\N	\N	f	f	4	full	\N	\N	\N	f	\N	\N	\N
26	settings	phone_number	\N	input	\N	\N	\N	f	f	5	half	\N	\N	\N	f	\N	\N	\N
27	settings	email	\N	input	\N	\N	\N	f	f	6	half	\N	\N	\N	f	\N	\N	\N
28	settings	address	\N	input-multiline	\N	\N	\N	f	f	7	full	\N	\N	\N	f	\N	\N	\N
29	settings	business_hours	\N	input-multiline	\N	\N	\N	f	f	8	full	\N	\N	\N	f	\N	\N	\N
30	settings	social_facebook	\N	input	\N	\N	\N	f	f	9	half	\N	\N	\N	f	\N	\N	\N
31	settings	social_instagram	\N	input	\N	\N	\N	f	f	10	half	\N	\N	\N	f	\N	\N	\N
32	settings	social_linkedin	\N	input	\N	\N	\N	f	f	11	half	\N	\N	\N	f	\N	\N	\N
33	settings	google_analytics_id	\N	input	\N	\N	\N	f	f	12	half	\N	\N	\N	f	\N	\N	\N
34	settings	logo	\N	file-image	\N	\N	\N	f	f	13	half	\N	\N	\N	f	\N	\N	\N
35	settings	favicon	\N	file-image	\N	\N	\N	f	f	14	half	\N	\N	\N	f	\N	\N	\N
36	services	id	\N	numeric	\N	\N	\N	t	t	1	full	\N	\N	\N	f	\N	\N	\N
37	services	status	\N	select-dropdown	{"choices":[{"text":"Draft","value":"draft"},{"text":"Published","value":"published"},{"text":"Archived","value":"archived"}]}	\N	\N	f	f	2	half	\N	\N	\N	f	\N	\N	\N
38	services	title	\N	input	\N	\N	\N	f	f	3	full	\N	\N	\N	t	\N	\N	\N
39	services	slug	\N	input	\N	\N	\N	f	f	4	half	\N	\N	\N	t	\N	\N	\N
40	services	description	\N	input-rich-text-html	\N	\N	\N	f	f	5	full	\N	\N	\N	f	\N	\N	\N
41	services	featured_image	\N	file-image	\N	\N	\N	f	f	6	half	\N	\N	\N	f	\N	\N	\N
42	services	gallery	\N	files	\N	\N	\N	f	f	7	full	\N	Service gallery images	\N	f	\N	\N	\N
43	services	features	\N	tags	\N	\N	\N	f	f	8	full	\N	Service features/benefits	\N	f	\N	\N	\N
44	services	applications	\N	tags	\N	\N	\N	f	f	9	full	\N	Service applications	\N	f	\N	\N	\N
45	services	sort_order	\N	input	\N	\N	\N	f	f	10	half	\N	\N	\N	f	\N	\N	\N
46	testimonials	id	\N	numeric	\N	\N	\N	t	t	1	full	\N	\N	\N	f	\N	\N	\N
47	testimonials	status	\N	select-dropdown	{"choices":[{"text":"Draft","value":"draft"},{"text":"Published","value":"published"},{"text":"Archived","value":"archived"}]}	\N	\N	f	f	2	half	\N	\N	\N	f	\N	\N	\N
48	testimonials	quote	\N	input-multiline	\N	\N	\N	f	f	3	full	\N	\N	\N	t	\N	\N	\N
49	testimonials	client_name	\N	input	\N	\N	\N	f	f	4	half	\N	\N	\N	t	\N	\N	\N
15	navigation	sort	sort	input	{}	raw	{}	f	t	2	half	[{"language":"en-US","translation":"Sort Order"}]	\N	[]	f	\N	\N	\N
50	pages	services_cards	\N	list	{"template":"{{ title }}","addLabel":"Add Service Card","fields":[{"field":"image","name":"Image","type":"uuid","meta":{"interface":"file-image","special":["file"],"options":{}}},{"field":"title","name":"Title","type":"string","meta":{"interface":"input","options":{"placeholder":"Service title"}}},{"field":"text","name":"Text","type":"text","meta":{"interface":"input-multiline","options":{"placeholder":"Service description"}}},{"field":"service_page","name":"Service Page","type":"uuid","meta":{"interface":"select-dropdown-m2o","special":["m2o"],"options":{"template":"{{ title }}"}},"schema":{"foreign_key_column":"id","foreign_key_table":"pages"}}]}	formatted-value	{"format":true}	f	f	\N	full	\N	Service cards to display in the services grid section	\N	f	\N	\N	\N
51	pages	page_title	\N	input	{}	raw	\N	f	f	5	full	\N	This will be the title users see in the Page Header.	\N	f	\N	\N	\N
52	pages	seo_title	\N	input	{}	raw	\N	f	f	6	full	\N	This will be what appears in search engines as well as in your browser tab title.	\N	f	\N	\N	\N
53	pages	menu_title	\N	input	{}	raw	\N	f	f	7	full	\N	This will be what is used in the Navigation for the title.	\N	f	\N	\N	\N
\.


--
-- Data for Name: directus_files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_files (id, storage, filename_disk, filename_download, title, type, folder, uploaded_by, created_on, modified_by, modified_on, charset, filesize, width, height, duration, embed, description, location, tags, metadata, focal_point_x, focal_point_y, tus_id, tus_data, uploaded_on) FROM stdin;
c3b703ce-6825-4c66-84c2-7f116b3e0552	local	c3b703ce-6825-4c66-84c2-7f116b3e0552.jpg	commercial.jpg	Commercial	image/jpeg	\N	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:41:38.334+00	\N	2025-07-03 21:41:38.886+00	\N	209568	1600	1600	\N	\N	\N	\N	\N	{}	\N	\N	\N	\N	2025-07-03 21:41:38.788+00
359082da-6bf6-4a78-adfd-709e37692e33	local	359082da-6bf6-4a78-adfd-709e37692e33.jpg	automotive-1.jpg	Automotive 1	image/jpeg	\N	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:41:48.262+00	\N	2025-07-03 21:41:48.791+00	\N	151324	1600	1600	\N	\N	\N	\N	\N	{}	\N	\N	\N	\N	2025-07-03 21:41:48.69+00
914108af-d022-485e-9236-c83d1d40bf53	local	914108af-d022-485e-9236-c83d1d40bf53.jpg	food-processing-equipment.jpg	Food Processing Equipment	image/jpeg	\N	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:41:56.027+00	\N	2025-07-03 21:41:56.555+00	\N	256923	1600	1600	\N	\N	\N	\N	\N	{}	\N	\N	\N	\N	2025-07-03 21:41:56.452+00
7a0552d9-cfee-4e04-b6c7-f5105360b843	local	7a0552d9-cfee-4e04-b6c7-f5105360b843.jpg	fire-damage.jpg	Fire Damage	image/jpeg	\N	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:42:02.914+00	\N	2025-07-03 21:42:03.431+00	\N	326228	1600	1600	\N	\N	\N	\N	\N	{}	\N	\N	\N	\N	2025-07-03 21:42:03.334+00
e9d11ac5-a277-4183-ac6a-16fde4667359	local	e9d11ac5-a277-4183-ac6a-16fde4667359.jpg	aircraft.jpg	Aircraft	image/jpeg	\N	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:42:09.663+00	\N	2025-07-03 21:42:10.187+00	\N	195158	1600	1600	\N	\N	\N	\N	\N	{}	\N	\N	\N	\N	2025-07-03 21:42:10.086+00
dde5eeeb-f19c-414a-8dd7-03db20f8ea5e	local	dde5eeeb-f19c-414a-8dd7-03db20f8ea5e.jpg	log-homes.jpg	Log Homes	image/jpeg	\N	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:42:19.38+00	\N	2025-07-03 21:42:19.911+00	\N	375129	1600	1600	\N	\N	\N	\N	\N	{}	\N	\N	\N	\N	2025-07-03 21:42:19.815+00
c1836ea8-d75d-4f70-aada-5854bbce79b5	local	c1836ea8-d75d-4f70-aada-5854bbce79b5.jpg	boat-1.jpg	Boat 1	image/jpeg	\N	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-03 21:42:26.832+00	\N	2025-07-03 21:42:27.357+00	\N	458082	1600	1600	\N	\N	\N	\N	\N	{}	\N	\N	\N	\N	2025-07-03 21:42:27.257+00
\.


--
-- Data for Name: directus_flows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_flows (id, name, icon, color, description, status, trigger, accountability, options, operation, date_created, user_created) FROM stdin;
\.


--
-- Data for Name: directus_folders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_folders (id, name, parent) FROM stdin;
\.


--
-- Data for Name: directus_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_migrations (version, name, "timestamp") FROM stdin;
20201028A	Remove Collection Foreign Keys	2025-07-02 00:54:55.299296+00
20201029A	Remove System Relations	2025-07-02 00:54:55.511475+00
20201029B	Remove System Collections	2025-07-02 00:54:55.727432+00
20201029C	Remove System Fields	2025-07-02 00:54:55.95969+00
20201105A	Add Cascade System Relations	2025-07-02 00:54:59.229963+00
20201105B	Change Webhook URL Type	2025-07-02 00:54:59.654021+00
20210225A	Add Relations Sort Field	2025-07-02 00:55:00.014491+00
20210304A	Remove Locked Fields	2025-07-02 00:55:00.225831+00
20210312A	Webhooks Collections Text	2025-07-02 00:55:00.650106+00
20210331A	Add Refresh Interval	2025-07-02 00:55:00.877823+00
20210415A	Make Filesize Nullable	2025-07-02 00:55:01.406273+00
20210416A	Add Collections Accountability	2025-07-02 00:55:01.750309+00
20210422A	Remove Files Interface	2025-07-02 00:55:01.961867+00
20210506A	Rename Interfaces	2025-07-02 00:55:06.433822+00
20210510A	Restructure Relations	2025-07-02 00:55:07.709758+00
20210518A	Add Foreign Key Constraints	2025-07-02 00:55:08.041766+00
20210519A	Add System Fk Triggers	2025-07-02 00:55:09.765766+00
20210521A	Add Collections Icon Color	2025-07-02 00:55:09.985663+00
20210525A	Add Insights	2025-07-02 00:55:10.713689+00
20210608A	Add Deep Clone Config	2025-07-02 00:55:10.921607+00
20210626A	Change Filesize Bigint	2025-07-02 00:55:11.429731+00
20210716A	Add Conditions to Fields	2025-07-02 00:55:11.63766+00
20210721A	Add Default Folder	2025-07-02 00:55:11.957528+00
20210802A	Replace Groups	2025-07-02 00:55:12.324782+00
20210803A	Add Required to Fields	2025-07-02 00:55:12.564823+00
20210805A	Update Groups	2025-07-02 00:55:12.803495+00
20210805B	Change Image Metadata Structure	2025-07-02 00:55:13.055543+00
20210811A	Add Geometry Config	2025-07-02 00:55:13.284777+00
20210831A	Remove Limit Column	2025-07-02 00:55:13.519463+00
20210903A	Add Auth Provider	2025-07-02 00:55:14.591521+00
20210907A	Webhooks Collections Not Null	2025-07-02 00:55:15.151462+00
20210910A	Move Module Setup	2025-07-02 00:55:15.477366+00
20210920A	Webhooks URL Not Null	2025-07-02 00:55:16.026133+00
20210924A	Add Collection Organization	2025-07-02 00:55:16.362138+00
20210927A	Replace Fields Group	2025-07-02 00:55:17.060796+00
20210927B	Replace M2M Interface	2025-07-02 00:55:17.290042+00
20210929A	Rename Login Action	2025-07-02 00:55:17.508986+00
20211007A	Update Presets	2025-07-02 00:55:17.940731+00
20211009A	Add Auth Data	2025-07-02 00:55:18.180758+00
20211016A	Add Webhook Headers	2025-07-02 00:55:18.410468+00
20211103A	Set Unique to User Token	2025-07-02 00:55:18.64476+00
20211103B	Update Special Geometry	2025-07-02 00:55:18.906161+00
20211104A	Remove Collections Listing	2025-07-02 00:55:19.140712+00
20211118A	Add Notifications	2025-07-02 00:55:19.866339+00
20211211A	Add Shares	2025-07-02 00:55:20.970136+00
20211230A	Add Project Descriptor	2025-07-02 00:55:21.215536+00
20220303A	Remove Default Project Color	2025-07-02 00:55:21.802287+00
20220308A	Add Bookmark Icon and Color	2025-07-02 00:55:22.031402+00
20220314A	Add Translation Strings	2025-07-02 00:55:22.250233+00
20220322A	Rename Field Typecast Flags	2025-07-02 00:55:22.506133+00
20220323A	Add Field Validation	2025-07-02 00:55:22.735419+00
20220325A	Fix Typecast Flags	2025-07-02 00:55:22.959579+00
20220325B	Add Default Language	2025-07-02 00:55:23.610088+00
20220402A	Remove Default Value Panel Icon	2025-07-02 00:55:24.207374+00
20220429A	Add Flows	2025-07-02 00:55:25.908997+00
20220429B	Add Color to Insights Icon	2025-07-02 00:55:26.164755+00
20220429C	Drop Non Null From IP of Activity	2025-07-02 00:55:26.394059+00
20220429D	Drop Non Null From Sender of Notifications	2025-07-02 00:55:26.634274+00
20220614A	Rename Hook Trigger to Event	2025-07-02 00:55:26.88484+00
20220801A	Update Notifications Timestamp Column	2025-07-02 00:55:27.411305+00
20220802A	Add Custom Aspect Ratios	2025-07-02 00:55:27.631248+00
20220826A	Add Origin to Accountability	2025-07-02 00:55:27.938034+00
20230401A	Update Material Icons	2025-07-02 00:55:28.571182+00
20230525A	Add Preview Settings	2025-07-02 00:55:28.784072+00
20230526A	Migrate Translation Strings	2025-07-02 00:55:29.199193+00
20230721A	Require Shares Fields	2025-07-02 00:55:29.515187+00
20230823A	Add Content Versioning	2025-07-02 00:55:30.399131+00
20230927A	Themes	2025-07-02 00:55:31.867175+00
20231009A	Update CSV Fields to Text	2025-07-02 00:55:32.087164+00
20231009B	Update Panel Options	2025-07-02 00:55:32.291204+00
20231010A	Add Extensions	2025-07-02 00:55:32.519332+00
20231215A	Add Focalpoints	2025-07-02 00:55:32.719018+00
20240122A	Add Report URL Fields	2025-07-02 00:55:32.944386+00
20240204A	Marketplace	2025-07-02 00:55:35.03109+00
20240305A	Change Useragent Type	2025-07-02 00:55:35.764551+00
20240311A	Deprecate Webhooks	2025-07-02 00:55:36.50299+00
20240422A	Public Registration	2025-07-02 00:55:36.83914+00
20240515A	Add Session Window	2025-07-02 00:55:37.041945+00
20240701A	Add Tus Data	2025-07-02 00:55:37.251354+00
20240716A	Update Files Date Fields	2025-07-02 00:55:37.671202+00
20240806A	Permissions Policies	2025-07-02 00:55:40.339312+00
20240817A	Update Icon Fields Length	2025-07-02 00:55:43.045447+00
20240909A	Separate Comments	2025-07-02 00:55:43.477361+00
20240909B	Consolidate Content Versioning	2025-07-02 00:55:43.697595+00
20240924A	Migrate Legacy Comments	2025-07-02 00:55:44.121644+00
20240924B	Populate Versioning Deltas	2025-07-02 00:55:44.333461+00
20250224A	Visual Editor	2025-07-02 00:55:44.645567+00
20250609A	License Banner	2025-07-02 00:55:44.865744+00
20250613A	Add Project ID	2025-07-02 00:55:45.389549+00
\.


--
-- Data for Name: directus_notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_notifications (id, "timestamp", status, recipient, sender, subject, message, collection, item) FROM stdin;
\.


--
-- Data for Name: directus_operations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_operations (id, name, key, type, position_x, position_y, options, resolve, reject, flow, date_created, user_created) FROM stdin;
\.


--
-- Data for Name: directus_panels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_panels (id, dashboard, name, icon, color, show_header, note, type, position_x, position_y, width, height, options, date_created, user_created) FROM stdin;
\.


--
-- Data for Name: directus_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_permissions (id, collection, action, permissions, validation, presets, fields, policy) FROM stdin;
16	pages	read	{}	{}	{}	*	90a6c9a7-a9f1-40d3-b987-4a4c842d4a09
17	navigation	read	{}	{}	{}	*	90a6c9a7-a9f1-40d3-b987-4a4c842d4a09
18	settings	read	{}	{}	{}	*	90a6c9a7-a9f1-40d3-b987-4a4c842d4a09
19	services	read	{}	{}	{}	*	90a6c9a7-a9f1-40d3-b987-4a4c842d4a09
20	testimonials	read	{}	{}	{}	*	90a6c9a7-a9f1-40d3-b987-4a4c842d4a09
21	pages	read	{}	{}	\N	*	e361d4be-47be-4f74-9b30-5c86f80ec9a8
22	settings	read	{}	{}	\N	*	e361d4be-47be-4f74-9b30-5c86f80ec9a8
23	navigation	read	{}	{}	\N	*	e361d4be-47be-4f74-9b30-5c86f80ec9a8
24	testimonials	read	{}	{}	\N	*	e361d4be-47be-4f74-9b30-5c86f80ec9a8
25	services	read	{}	{}	\N	*	e361d4be-47be-4f74-9b30-5c86f80ec9a8
26	pages	read	{}	{}	\N	*	abf8a154-5b1c-4a46-ac9c-7300570f4f17
27	settings	read	{}	{}	\N	*	abf8a154-5b1c-4a46-ac9c-7300570f4f17
28	navigation	read	{}	{}	\N	*	abf8a154-5b1c-4a46-ac9c-7300570f4f17
29	testimonials	read	{}	{}	\N	*	abf8a154-5b1c-4a46-ac9c-7300570f4f17
30	services	read	{}	{}	\N	*	abf8a154-5b1c-4a46-ac9c-7300570f4f17
31	directus_files	read	{}	{}	\N	*	4ceef64a-99d8-486e-bcea-c81b7010549d
32	directus_files	read	\N	\N	\N	*	403cd1e9-afb6-4410-9a9c-e00355a07c5a
33	directus_files	read	\N	\N	\N	*	abf8a154-5b1c-4a46-ac9c-7300570f4f17
\.


--
-- Data for Name: directus_policies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_policies (id, name, icon, description, ip_access, enforce_tfa, admin_access, app_access) FROM stdin;
abf8a154-5b1c-4a46-ac9c-7300570f4f17	$t:public_label	public	$t:public_description	\N	f	f	f
410f72a7-1073-4820-9a94-c9298ebd5eb9	Administrator	verified	$t:admin_description	\N	f	t	t
6fefad65-fffb-47e3-8790-3bddd62417bc	Public Access Policy	public	Allows public read access to content collections	\N	f	f	f
90a6c9a7-a9f1-40d3-b987-4a4c842d4a09	Public Access Policy	public	Allows public read access to content collections	\N	f	f	f
e361d4be-47be-4f74-9b30-5c86f80ec9a8	Public API Access	public	Public read access policy for pages, settings, navigation, testimonials, services	\N	f	f	f
4ceef64a-99d8-486e-bcea-c81b7010549d	Public Files Access	folder	Allow public access to files		f	f	f
403cd1e9-afb6-4410-9a9c-e00355a07c5a	Public Assets	public	Public access to assets	\N	f	f	f
\.


--
-- Data for Name: directus_presets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_presets (id, bookmark, "user", role, collection, search, layout, layout_query, layout_options, refresh_interval, filter, icon, color) FROM stdin;
1	\N	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N	navigation	\N	\N	{"tabular":{"page":1}}	\N	\N	\N	bookmark	\N
2	\N	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	\N	pages	\N	\N	{"tabular":{"page":1,"fields":["title","slug","meta_title","status"]}}	{"tabular":{"widths":{"title":317,"slug":160,"meta_title":441,"status":160}}}	\N	\N	bookmark	\N
\.


--
-- Data for Name: directus_relations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_relations (id, many_collection, many_field, one_collection, one_field, one_collection_field, one_allowed_collections, junction_field, sort_field, one_deselect_action) FROM stdin;
\.


--
-- Data for Name: directus_revisions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_revisions (id, activity, collection, item, data, delta, parent, version) FROM stdin;
1	2	directus_settings	1	{"id":1,"project_name":"Directus","project_url":null,"project_color":"#6644FF","project_logo":null,"public_foreground":null,"public_background":null,"public_note":null,"auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":null,"project_descriptor":null,"default_language":"en-US","custom_aspect_ratios":null,"public_favicon":null,"default_appearance":"auto","default_theme_light":null,"theme_light_overrides":null,"default_theme_dark":null,"theme_dark_overrides":null,"report_error_url":null,"report_bug_url":null,"report_feature_url":null,"public_registration":false,"public_registration_verify_email":true,"public_registration_role":null,"public_registration_email_filter":null,"visual_editor_urls":null,"accepted_terms":true,"project_id":"0197c8a1-eee7-76df-978f-31025c7a4502"}	{"accepted_terms":true}	\N	\N
2	4	directus_fields	1	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"pages"}	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"pages"}	\N	\N
3	5	directus_collections	pages	{"collection":"pages","icon":"article","note":"Website pages with editable content","display_template":"{{title}}","hidden":false,"singleton":false,"translations":[{"language":"en-US","translation":"Pages"}]}	{"collection":"pages","icon":"article","note":"Website pages with editable content","display_template":"{{title}}","hidden":false,"singleton":false,"translations":[{"language":"en-US","translation":"Pages"}]}	\N	\N
4	7	directus_fields	2	{"sort":2,"width":"half","interface":"select-dropdown","options":{"choices":[{"text":"Draft","value":"draft"},{"text":"Published","value":"published"},{"text":"Archived","value":"archived"}]},"collection":"pages","field":"status"}	{"sort":2,"width":"half","interface":"select-dropdown","options":{"choices":[{"text":"Draft","value":"draft"},{"text":"Published","value":"published"},{"text":"Archived","value":"archived"}]},"collection":"pages","field":"status"}	\N	\N
5	8	directus_fields	3	{"sort":3,"width":"full","interface":"input","required":true,"collection":"pages","field":"title"}	{"sort":3,"width":"full","interface":"input","required":true,"collection":"pages","field":"title"}	\N	\N
6	9	directus_fields	4	{"sort":4,"width":"half","interface":"input","required":true,"note":"URL slug for the page","collection":"pages","field":"slug"}	{"sort":4,"width":"half","interface":"input","required":true,"note":"URL slug for the page","collection":"pages","field":"slug"}	\N	\N
7	10	directus_fields	5	{"sort":5,"width":"half","interface":"input","note":"SEO title tag","collection":"pages","field":"meta_title"}	{"sort":5,"width":"half","interface":"input","note":"SEO title tag","collection":"pages","field":"meta_title"}	\N	\N
8	11	directus_fields	6	{"sort":6,"width":"full","interface":"input-multiline","note":"SEO meta description","collection":"pages","field":"meta_description"}	{"sort":6,"width":"full","interface":"input-multiline","note":"SEO meta description","collection":"pages","field":"meta_description"}	\N	\N
9	12	directus_fields	7	{"sort":7,"width":"full","interface":"input","note":"Main hero section title","collection":"pages","field":"hero_title"}	{"sort":7,"width":"full","interface":"input","note":"Main hero section title","collection":"pages","field":"hero_title"}	\N	\N
10	13	directus_fields	8	{"sort":8,"width":"full","interface":"input-multiline","note":"Hero section subtitle/description","collection":"pages","field":"hero_subtitle"}	{"sort":8,"width":"full","interface":"input-multiline","note":"Hero section subtitle/description","collection":"pages","field":"hero_subtitle"}	\N	\N
11	14	directus_fields	9	{"sort":9,"width":"half","interface":"file-image","note":"Hero section background image","collection":"pages","field":"hero_image"}	{"sort":9,"width":"half","interface":"file-image","note":"Hero section background image","collection":"pages","field":"hero_image"}	\N	\N
12	15	directus_fields	10	{"sort":10,"width":"half","interface":"file","note":"Hero section background video","collection":"pages","field":"hero_video"}	{"sort":10,"width":"half","interface":"file","note":"Hero section background video","collection":"pages","field":"hero_video"}	\N	\N
13	16	directus_fields	11	{"sort":11,"width":"full","interface":"list","note":"Editable content sections","options":{"template":"{{type}}: {{title}}"},"collection":"pages","field":"content_sections"}	{"sort":11,"width":"full","interface":"list","note":"Editable content sections","options":{"template":"{{type}}: {{title}}"},"collection":"pages","field":"content_sections"}	\N	\N
14	17	directus_fields	12	{"sort":12,"width":"half","interface":"datetime","readonly":true,"hidden":true,"special":["date-created"],"collection":"pages","field":"date_created"}	{"sort":12,"width":"half","interface":"datetime","readonly":true,"hidden":true,"special":["date-created"],"collection":"pages","field":"date_created"}	\N	\N
15	18	directus_fields	13	{"sort":13,"width":"half","interface":"datetime","readonly":true,"hidden":true,"special":["date-updated"],"collection":"pages","field":"date_updated"}	{"sort":13,"width":"half","interface":"datetime","readonly":true,"hidden":true,"special":["date-updated"],"collection":"pages","field":"date_updated"}	\N	\N
16	19	directus_fields	14	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"navigation"}	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"navigation"}	\N	\N
17	20	directus_collections	navigation	{"collection":"navigation","icon":"menu","note":"Website navigation menu items","display_template":"{{label}}","hidden":false,"singleton":false,"translations":[{"language":"en-US","translation":"Navigation"}]}	{"collection":"navigation","icon":"menu","note":"Website navigation menu items","display_template":"{{label}}","hidden":false,"singleton":false,"translations":[{"language":"en-US","translation":"Navigation"}]}	\N	\N
18	21	directus_fields	15	{"sort":2,"width":"half","interface":"input","hidden":true,"collection":"navigation","field":"sort"}	{"sort":2,"width":"half","interface":"input","hidden":true,"collection":"navigation","field":"sort"}	\N	\N
19	22	directus_fields	16	{"sort":3,"width":"half","interface":"select-dropdown","options":{"choices":[{"text":"Active","value":"active"},{"text":"Inactive","value":"inactive"}]},"collection":"navigation","field":"status"}	{"sort":3,"width":"half","interface":"select-dropdown","options":{"choices":[{"text":"Active","value":"active"},{"text":"Inactive","value":"inactive"}]},"collection":"navigation","field":"status"}	\N	\N
20	23	directus_fields	17	{"sort":4,"width":"half","interface":"input","required":true,"collection":"navigation","field":"label"}	{"sort":4,"width":"half","interface":"input","required":true,"collection":"navigation","field":"label"}	\N	\N
21	24	directus_fields	18	{"sort":5,"width":"half","interface":"input","collection":"navigation","field":"url"}	{"sort":5,"width":"half","interface":"input","collection":"navigation","field":"url"}	\N	\N
22	25	directus_fields	19	{"sort":6,"width":"half","interface":"select-dropdown-m2o","note":"Parent menu item for dropdown menus","collection":"navigation","field":"parent_id"}	{"sort":6,"width":"half","interface":"select-dropdown-m2o","note":"Parent menu item for dropdown menus","collection":"navigation","field":"parent_id"}	\N	\N
23	26	directus_fields	20	{"sort":7,"width":"half","interface":"select-dropdown","options":{"choices":[{"text":"Same Window","value":"_self"},{"text":"New Window","value":"_blank"}]},"collection":"navigation","field":"target"}	{"sort":7,"width":"half","interface":"select-dropdown","options":{"choices":[{"text":"Same Window","value":"_self"},{"text":"New Window","value":"_blank"}]},"collection":"navigation","field":"target"}	\N	\N
24	27	directus_fields	21	{"sort":8,"width":"half","interface":"input","note":"Icon class or name","collection":"navigation","field":"icon"}	{"sort":8,"width":"half","interface":"input","note":"Icon class or name","collection":"navigation","field":"icon"}	\N	\N
25	28	directus_fields	22	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"settings"}	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"settings"}	\N	\N
26	29	directus_collections	settings	{"collection":"settings","icon":"settings","note":"Global website settings","singleton":true,"hidden":false,"translations":[{"language":"en-US","translation":"Settings"}]}	{"collection":"settings","icon":"settings","note":"Global website settings","singleton":true,"hidden":false,"translations":[{"language":"en-US","translation":"Settings"}]}	\N	\N
27	30	directus_fields	23	{"sort":2,"width":"half","interface":"input","required":true,"collection":"settings","field":"site_title"}	{"sort":2,"width":"half","interface":"input","required":true,"collection":"settings","field":"site_title"}	\N	\N
28	31	directus_fields	24	{"sort":3,"width":"half","interface":"input","collection":"settings","field":"site_tagline"}	{"sort":3,"width":"half","interface":"input","collection":"settings","field":"site_tagline"}	\N	\N
29	32	directus_fields	25	{"sort":4,"width":"full","interface":"input-multiline","collection":"settings","field":"site_description"}	{"sort":4,"width":"full","interface":"input-multiline","collection":"settings","field":"site_description"}	\N	\N
30	33	directus_fields	26	{"sort":5,"width":"half","interface":"input","collection":"settings","field":"phone_number"}	{"sort":5,"width":"half","interface":"input","collection":"settings","field":"phone_number"}	\N	\N
31	34	directus_fields	27	{"sort":6,"width":"half","interface":"input","collection":"settings","field":"email"}	{"sort":6,"width":"half","interface":"input","collection":"settings","field":"email"}	\N	\N
32	35	directus_fields	28	{"sort":7,"width":"full","interface":"input-multiline","collection":"settings","field":"address"}	{"sort":7,"width":"full","interface":"input-multiline","collection":"settings","field":"address"}	\N	\N
33	36	directus_fields	29	{"sort":8,"width":"full","interface":"input-multiline","collection":"settings","field":"business_hours"}	{"sort":8,"width":"full","interface":"input-multiline","collection":"settings","field":"business_hours"}	\N	\N
34	37	directus_fields	30	{"sort":9,"width":"half","interface":"input","collection":"settings","field":"social_facebook"}	{"sort":9,"width":"half","interface":"input","collection":"settings","field":"social_facebook"}	\N	\N
35	38	directus_fields	31	{"sort":10,"width":"half","interface":"input","collection":"settings","field":"social_instagram"}	{"sort":10,"width":"half","interface":"input","collection":"settings","field":"social_instagram"}	\N	\N
36	39	directus_fields	32	{"sort":11,"width":"half","interface":"input","collection":"settings","field":"social_linkedin"}	{"sort":11,"width":"half","interface":"input","collection":"settings","field":"social_linkedin"}	\N	\N
37	40	directus_fields	33	{"sort":12,"width":"half","interface":"input","collection":"settings","field":"google_analytics_id"}	{"sort":12,"width":"half","interface":"input","collection":"settings","field":"google_analytics_id"}	\N	\N
38	41	directus_fields	34	{"sort":13,"width":"half","interface":"file-image","collection":"settings","field":"logo"}	{"sort":13,"width":"half","interface":"file-image","collection":"settings","field":"logo"}	\N	\N
39	42	directus_fields	35	{"sort":14,"width":"half","interface":"file-image","collection":"settings","field":"favicon"}	{"sort":14,"width":"half","interface":"file-image","collection":"settings","field":"favicon"}	\N	\N
40	43	directus_fields	36	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"services"}	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"services"}	\N	\N
41	44	directus_collections	services	{"collection":"services","icon":"build","note":"Service pages and offerings","display_template":"{{title}}","hidden":false,"singleton":false,"translations":[{"language":"en-US","translation":"Services"}]}	{"collection":"services","icon":"build","note":"Service pages and offerings","display_template":"{{title}}","hidden":false,"singleton":false,"translations":[{"language":"en-US","translation":"Services"}]}	\N	\N
42	45	directus_fields	37	{"sort":2,"width":"half","interface":"select-dropdown","options":{"choices":[{"text":"Draft","value":"draft"},{"text":"Published","value":"published"},{"text":"Archived","value":"archived"}]},"collection":"services","field":"status"}	{"sort":2,"width":"half","interface":"select-dropdown","options":{"choices":[{"text":"Draft","value":"draft"},{"text":"Published","value":"published"},{"text":"Archived","value":"archived"}]},"collection":"services","field":"status"}	\N	\N
43	46	directus_fields	38	{"sort":3,"width":"full","interface":"input","required":true,"collection":"services","field":"title"}	{"sort":3,"width":"full","interface":"input","required":true,"collection":"services","field":"title"}	\N	\N
44	47	directus_fields	39	{"sort":4,"width":"half","interface":"input","required":true,"collection":"services","field":"slug"}	{"sort":4,"width":"half","interface":"input","required":true,"collection":"services","field":"slug"}	\N	\N
45	48	directus_fields	40	{"sort":5,"width":"full","interface":"input-rich-text-html","collection":"services","field":"description"}	{"sort":5,"width":"full","interface":"input-rich-text-html","collection":"services","field":"description"}	\N	\N
46	49	directus_fields	41	{"sort":6,"width":"half","interface":"file-image","collection":"services","field":"featured_image"}	{"sort":6,"width":"half","interface":"file-image","collection":"services","field":"featured_image"}	\N	\N
47	50	directus_fields	42	{"sort":7,"width":"full","interface":"files","note":"Service gallery images","collection":"services","field":"gallery"}	{"sort":7,"width":"full","interface":"files","note":"Service gallery images","collection":"services","field":"gallery"}	\N	\N
48	51	directus_fields	43	{"sort":8,"width":"full","interface":"tags","note":"Service features/benefits","collection":"services","field":"features"}	{"sort":8,"width":"full","interface":"tags","note":"Service features/benefits","collection":"services","field":"features"}	\N	\N
49	52	directus_fields	44	{"sort":9,"width":"full","interface":"tags","note":"Service applications","collection":"services","field":"applications"}	{"sort":9,"width":"full","interface":"tags","note":"Service applications","collection":"services","field":"applications"}	\N	\N
50	53	directus_fields	45	{"sort":10,"width":"half","interface":"input","collection":"services","field":"sort_order"}	{"sort":10,"width":"half","interface":"input","collection":"services","field":"sort_order"}	\N	\N
51	54	directus_fields	46	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"testimonials"}	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"testimonials"}	\N	\N
52	55	directus_collections	testimonials	{"collection":"testimonials","icon":"format_quote","note":"Customer testimonials and reviews","display_template":"{{client_name}}","hidden":false,"singleton":false,"translations":[{"language":"en-US","translation":"Testimonials"}]}	{"collection":"testimonials","icon":"format_quote","note":"Customer testimonials and reviews","display_template":"{{client_name}}","hidden":false,"singleton":false,"translations":[{"language":"en-US","translation":"Testimonials"}]}	\N	\N
53	56	directus_fields	47	{"sort":2,"width":"half","interface":"select-dropdown","options":{"choices":[{"text":"Draft","value":"draft"},{"text":"Published","value":"published"},{"text":"Archived","value":"archived"}]},"collection":"testimonials","field":"status"}	{"sort":2,"width":"half","interface":"select-dropdown","options":{"choices":[{"text":"Draft","value":"draft"},{"text":"Published","value":"published"},{"text":"Archived","value":"archived"}]},"collection":"testimonials","field":"status"}	\N	\N
54	57	directus_fields	48	{"sort":3,"width":"full","interface":"input-multiline","required":true,"collection":"testimonials","field":"quote"}	{"sort":3,"width":"full","interface":"input-multiline","required":true,"collection":"testimonials","field":"quote"}	\N	\N
55	58	directus_fields	49	{"sort":4,"width":"half","interface":"input","required":true,"collection":"testimonials","field":"client_name"}	{"sort":4,"width":"half","interface":"input","required":true,"collection":"testimonials","field":"client_name"}	\N	\N
56	60	directus_roles	1c6e3a8a-f325-4126-90d7-344e6c2e1c01	{"name":"Public","icon":"public","description":"Public access role","ip_access":null,"enforce_tfa":false,"admin_access":false,"app_access":false}	{"name":"Public","icon":"public","description":"Public access role","ip_access":null,"enforce_tfa":false,"admin_access":false,"app_access":false}	\N	\N
57	61	pages	1	{"title":"Home","slug":"home","status":"published","meta_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning.","hero_title":"100% Eco-Friendly Cleaning and Stripping","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate.","content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}]}	{"title":"Home","slug":"home","status":"published","meta_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning.","hero_title":"100% Eco-Friendly Cleaning and Stripping","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate.","content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}]}	\N	\N
58	62	pages	2	{"title":"About Soda Blasting","slug":"about-soda-blasting","status":"published","meta_title":"About Soda Blasting - Eco-Friendly Surface Cleaning","meta_description":"Learn about soda blasting, an eco-friendly surface cleaning method using sodium bicarbonate.","hero_title":"About Soda Blasting","hero_subtitle":"The safe, eco-friendly way to clean and strip surfaces.","content_sections":[{"type":"hero","title":"About Soda Blasting","content":"Learn about our eco-friendly surface cleaning process."},{"type":"process_explanation","title":"What is Soda Blasting?","content":"Soda blasting is a revolutionary surface cleaning method that uses sodium bicarbonate (baking soda) to safely remove contaminants, coatings, and buildup from various surfaces without causing damage."}]}	{"title":"About Soda Blasting","slug":"about-soda-blasting","status":"published","meta_title":"About Soda Blasting - Eco-Friendly Surface Cleaning","meta_description":"Learn about soda blasting, an eco-friendly surface cleaning method using sodium bicarbonate.","hero_title":"About Soda Blasting","hero_subtitle":"The safe, eco-friendly way to clean and strip surfaces.","content_sections":[{"type":"hero","title":"About Soda Blasting","content":"Learn about our eco-friendly surface cleaning process."},{"type":"process_explanation","title":"What is Soda Blasting?","content":"Soda blasting is a revolutionary surface cleaning method that uses sodium bicarbonate (baking soda) to safely remove contaminants, coatings, and buildup from various surfaces without causing damage."}]}	\N	\N
59	63	pages	3	{"title":"Services","slug":"services","status":"published","meta_title":"Soda Blasting Services - Commercial, Automotive, Marine","meta_description":"Professional soda blasting services for commercial, automotive, marine, aircraft, and industrial applications.","hero_title":"Our Services","hero_subtitle":"Professional soda blasting solutions for every industry.","content_sections":[{"type":"hero","title":"Our Services","content":"Professional soda blasting solutions for every industry."},{"type":"services_list","title":"Service Categories","content":"We offer specialized soda blasting services across multiple industries."}]}	{"title":"Services","slug":"services","status":"published","meta_title":"Soda Blasting Services - Commercial, Automotive, Marine","meta_description":"Professional soda blasting services for commercial, automotive, marine, aircraft, and industrial applications.","hero_title":"Our Services","hero_subtitle":"Professional soda blasting solutions for every industry.","content_sections":[{"type":"hero","title":"Our Services","content":"Professional soda blasting solutions for every industry."},{"type":"services_list","title":"Service Categories","content":"We offer specialized soda blasting services across multiple industries."}]}	\N	\N
60	64	pages	4	{"title":"Gallery","slug":"gallery","status":"published","meta_title":"Gallery - Soda Blasting Before & After Photos","meta_description":"View our gallery of soda blasting projects showing dramatic before and after transformations.","hero_title":"Our Work","hero_subtitle":"See the amazing transformations we achieve with soda blasting.","content_sections":[{"type":"hero","title":"Our Work","content":"See the amazing transformations we achieve with soda blasting."},{"type":"gallery_grid","title":"Project Gallery","content":"Browse our portfolio of successful soda blasting projects."}]}	{"title":"Gallery","slug":"gallery","status":"published","meta_title":"Gallery - Soda Blasting Before & After Photos","meta_description":"View our gallery of soda blasting projects showing dramatic before and after transformations.","hero_title":"Our Work","hero_subtitle":"See the amazing transformations we achieve with soda blasting.","content_sections":[{"type":"hero","title":"Our Work","content":"See the amazing transformations we achieve with soda blasting."},{"type":"gallery_grid","title":"Project Gallery","content":"Browse our portfolio of successful soda blasting projects."}]}	\N	\N
90	99	directus_permissions	8	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"settings","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"settings","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
61	65	pages	5	{"title":"Contact","slug":"contact","status":"published","meta_title":"Contact Leonard Soda Blasting - Get a Free Quote","meta_description":"Contact Leonard Soda Blasting for a free quote on your cleaning and stripping project.","hero_title":"Contact Us","hero_subtitle":"Get a free quote for your soda blasting project.","content_sections":[{"type":"hero","title":"Contact Us","content":"Get a free quote for your soda blasting project."},{"type":"contact_form","title":"Get in Touch","content":"Fill out the form below or give us a call to discuss your project."}]}	{"title":"Contact","slug":"contact","status":"published","meta_title":"Contact Leonard Soda Blasting - Get a Free Quote","meta_description":"Contact Leonard Soda Blasting for a free quote on your cleaning and stripping project.","hero_title":"Contact Us","hero_subtitle":"Get a free quote for your soda blasting project.","content_sections":[{"type":"hero","title":"Contact Us","content":"Get a free quote for your soda blasting project."},{"type":"contact_form","title":"Get in Touch","content":"Fill out the form below or give us a call to discuss your project."}]}	\N	\N
62	66	navigation	1	{"label":"Home","url":"/","sort":1,"status":"active"}	{"label":"Home","url":"/","sort":1,"status":"active"}	\N	\N
63	67	navigation	2	{"label":"About","url":"/about-soda-blasting","sort":2,"status":"active"}	{"label":"About","url":"/about-soda-blasting","sort":2,"status":"active"}	\N	\N
64	68	navigation	3	{"label":"Services","url":"/services","sort":3,"status":"active"}	{"label":"Services","url":"/services","sort":3,"status":"active"}	\N	\N
65	69	navigation	4	{"label":"Gallery","url":"/gallery","sort":4,"status":"active"}	{"label":"Gallery","url":"/gallery","sort":4,"status":"active"}	\N	\N
66	70	navigation	5	{"label":"Contact","url":"/contact","sort":5,"status":"active"}	{"label":"Contact","url":"/contact","sort":5,"status":"active"}	\N	\N
67	71	services	1	{"title":"Commercial & Industrial","slug":"commercial-industrial","status":"published","description":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","features":["Licensed contractor since 1989","Industrial grade equipment","Safety compliant processes","Scheduled completion","Professional manpower"],"applications":["Warehouse cleaning","Machinery degreasing","Parking garage restoration","Equipment maintenance","Facility preparation"],"sort_order":1}	{"title":"Commercial & Industrial","slug":"commercial-industrial","status":"published","description":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","features":["Licensed contractor since 1989","Industrial grade equipment","Safety compliant processes","Scheduled completion","Professional manpower"],"applications":["Warehouse cleaning","Machinery degreasing","Parking garage restoration","Equipment maintenance","Facility preparation"],"sort_order":1}	\N	\N
68	72	services	2	{"title":"Automotive","slug":"automotive","status":"published","description":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","features":["Paint removal without warping","Rust elimination","Chrome restoration","Engine cleaning","Frame restoration"],"applications":["Classic car restoration","Paint stripping","Rust removal","Chrome polishing","Engine bay cleaning"],"sort_order":2}	{"title":"Automotive","slug":"automotive","status":"published","description":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","features":["Paint removal without warping","Rust elimination","Chrome restoration","Engine cleaning","Frame restoration"],"applications":["Classic car restoration","Paint stripping","Rust removal","Chrome polishing","Engine bay cleaning"],"sort_order":2}	\N	\N
69	73	services	3	{"title":"Aircraft","slug":"aircraft","status":"published","description":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","features":["FAA approved processes","Precision cleaning","No surface damage","Environmentally safe","Certified technicians"],"applications":["Paint stripping","Corrosion removal","Surface preparation","Maintenance cleaning","Restoration work"],"sort_order":3}	{"title":"Aircraft","slug":"aircraft","status":"published","description":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","features":["FAA approved processes","Precision cleaning","No surface damage","Environmentally safe","Certified technicians"],"applications":["Paint stripping","Corrosion removal","Surface preparation","Maintenance cleaning","Restoration work"],"sort_order":3}	\N	\N
70	74	services	4	{"title":"Marine & Boat","slug":"marine-boat","status":"published","description":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","features":["Hull cleaning","Antifouling removal","Gel coat restoration","Blister repair prep","Eco-friendly process"],"applications":["Hull stripping","Antifouling removal","Gel coat preparation","Blister repair","Bottom paint removal"],"sort_order":4}	{"title":"Marine & Boat","slug":"marine-boat","status":"published","description":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","features":["Hull cleaning","Antifouling removal","Gel coat restoration","Blister repair prep","Eco-friendly process"],"applications":["Hull stripping","Antifouling removal","Gel coat preparation","Blister repair","Bottom paint removal"],"sort_order":4}	\N	\N
71	75	services	5	{"title":"Fire & Water Damage","slug":"fire-water-damage","status":"published","description":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","features":["Soot removal","Smoke damage cleanup","Structural cleaning","Safe process","Insurance approved"],"applications":["Soot removal","Smoke damage","Water damage cleanup","Structural restoration","Content cleaning"],"sort_order":5}	{"title":"Fire & Water Damage","slug":"fire-water-damage","status":"published","description":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","features":["Soot removal","Smoke damage cleanup","Structural cleaning","Safe process","Insurance approved"],"applications":["Soot removal","Smoke damage","Water damage cleanup","Structural restoration","Content cleaning"],"sort_order":5}	\N	\N
72	76	services	6	{"title":"Food Processing Equipment","slug":"food-processing-equipment","status":"published","description":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","features":["FDA approved","Food-grade safe","No chemical residue","Equipment-friendly","Minimal downtime"],"applications":["Ovens and baking equipment","Processing machinery","Conveyor systems","Storage tanks","Production lines"],"sort_order":6}	{"title":"Food Processing Equipment","slug":"food-processing-equipment","status":"published","description":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","features":["FDA approved","Food-grade safe","No chemical residue","Equipment-friendly","Minimal downtime"],"applications":["Ovens and baking equipment","Processing machinery","Conveyor systems","Storage tanks","Production lines"],"sort_order":6}	\N	\N
73	77	testimonials	1	{"quote":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team.","client_name":"Jim Clarke","client_title":"President","client_company":"Northwest Restoration","rating":5,"featured":true,"status":"published"}	{"quote":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team.","client_name":"Jim Clarke","client_title":"President","client_company":"Northwest Restoration","rating":5,"featured":true,"status":"published"}	\N	\N
74	80	directus_policies	6fefad65-fffb-47e3-8790-3bddd62417bc	{"name":"Public Access Policy","description":"Allows public read access to content collections","admin_access":false,"app_access":false,"icon":"public"}	{"name":"Public Access Policy","description":"Allows public read access to content collections","admin_access":false,"app_access":false,"icon":"public"}	\N	\N
75	81	directus_permissions	1	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"pages","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"pages","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
76	82	directus_permissions	2	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"navigation","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"navigation","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
77	83	directus_permissions	3	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"settings","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"settings","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
78	84	directus_permissions	4	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"services","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"services","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
79	85	directus_permissions	5	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"testimonials","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"testimonials","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
80	86	pages	1	{"id":1,"status":"published","title":"Home","slug":"home","meta_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate.","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-02T01:42:57.271Z"}	{"meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","date_updated":"2025-07-02T01:42:57.271Z"}	\N	\N
81	89	directus_collections	navigation	{"collection":"navigation","icon":"menu","note":"Website navigation menu items","display_template":"{{label}}","hidden":false,"singleton":false,"translations":[{"language":"en-US","translation":"Navigation","singular":"Navigation Item","plural":"Navigation Items"}],"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":"sort","accountability":"all","color":null,"item_duplication_fields":null,"sort":null,"group":null,"collapse":"open","preview_url":null,"versioning":false}	{"singleton":false,"translations":[{"language":"en-US","translation":"Navigation","singular":"Navigation Item","plural":"Navigation Items"}],"archive_field":null,"archive_value":null,"unarchive_value":null,"sort_field":"sort","accountability":"all"}	\N	\N
82	90	directus_fields	15	{"id":15,"collection":"navigation","field":"sort","special":["sort"],"interface":"input","options":{},"display":"raw","display_options":{},"readonly":false,"hidden":true,"sort":2,"width":"half","translations":[{"language":"en-US","translation":"Sort Order"}],"note":null,"conditions":[],"required":false,"group":null,"validation":null,"validation_message":null}	{"collection":"navigation","field":"sort","special":["sort"],"interface":"input","options":{},"display":"raw","display_options":{},"readonly":false,"hidden":true,"sort":2,"width":"half","translations":[{"language":"en-US","translation":"Sort Order"}],"conditions":[],"required":false,"group":null,"validation":null,"validation_message":null}	\N	\N
83	91	navigation	1	{"id":1,"sort":10,"status":"active","label":"Home","url":"/","parent_id":null,"target":"_self","icon":null}	{"sort":10}	\N	\N
84	92	navigation	2	{"id":2,"sort":20,"status":"active","label":"About","url":"/about-soda-blasting","parent_id":null,"target":"_self","icon":null}	{"sort":20}	\N	\N
85	93	navigation	3	{"id":3,"sort":30,"status":"active","label":"Services","url":"/services","parent_id":null,"target":"_self","icon":null}	{"sort":30}	\N	\N
86	94	navigation	4	{"id":4,"sort":40,"status":"active","label":"Gallery","url":"/gallery","parent_id":null,"target":"_self","icon":null}	{"sort":40}	\N	\N
87	95	navigation	5	{"id":5,"sort":50,"status":"active","label":"Contact","url":"/contact","parent_id":null,"target":"_self","icon":null}	{"sort":50}	\N	\N
88	97	directus_permissions	6	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"pages","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"pages","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
89	98	directus_permissions	7	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"navigation","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"navigation","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
91	100	directus_permissions	9	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"services","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"services","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
92	101	directus_permissions	10	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"testimonials","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"testimonials","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
93	102	directus_permissions	11	{"role":null,"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"pages","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"role":null,"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"pages","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
94	103	directus_permissions	12	{"role":null,"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"navigation","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"role":null,"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"navigation","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
95	104	directus_permissions	13	{"role":null,"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"settings","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"role":null,"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"settings","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
96	105	directus_permissions	14	{"role":null,"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"services","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"role":null,"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"services","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
97	106	directus_permissions	15	{"role":null,"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"testimonials","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"role":null,"policy":"6fefad65-fffb-47e3-8790-3bddd62417bc","collection":"testimonials","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
98	130	directus_policies	90a6c9a7-a9f1-40d3-b987-4a4c842d4a09	{"name":"Public Access Policy","description":"Allows public read access to content collections","admin_access":false,"app_access":false,"icon":"public"}	{"name":"Public Access Policy","description":"Allows public read access to content collections","admin_access":false,"app_access":false,"icon":"public"}	\N	\N
99	131	directus_permissions	16	{"policy":"90a6c9a7-a9f1-40d3-b987-4a4c842d4a09","collection":"pages","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"90a6c9a7-a9f1-40d3-b987-4a4c842d4a09","collection":"pages","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
100	132	directus_permissions	17	{"policy":"90a6c9a7-a9f1-40d3-b987-4a4c842d4a09","collection":"navigation","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"90a6c9a7-a9f1-40d3-b987-4a4c842d4a09","collection":"navigation","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
101	133	directus_permissions	18	{"policy":"90a6c9a7-a9f1-40d3-b987-4a4c842d4a09","collection":"settings","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"90a6c9a7-a9f1-40d3-b987-4a4c842d4a09","collection":"settings","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
102	134	directus_permissions	19	{"policy":"90a6c9a7-a9f1-40d3-b987-4a4c842d4a09","collection":"services","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"90a6c9a7-a9f1-40d3-b987-4a4c842d4a09","collection":"services","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
103	135	directus_permissions	20	{"policy":"90a6c9a7-a9f1-40d3-b987-4a4c842d4a09","collection":"testimonials","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	{"policy":"90a6c9a7-a9f1-40d3-b987-4a4c842d4a09","collection":"testimonials","action":"read","permissions":{},"validation":{},"presets":{},"fields":["*"]}	\N	\N
104	139	pages	1	{"id":1,"status":"published","title":"Home.","slug":"home","meta_title":".Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-02T03:59:12.640Z"}	{"title":"Home.","meta_title":".Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","date_updated":"2025-07-02T03:59:12.640Z"}	\N	\N
105	140	settings	1	{"phone_number":"(503) 319-6711"}	{"phone_number":"(503) 319-6711"}	\N	\N
106	153	settings	1	{"id":1,"site_title":"Leonard Soda Blasting","site_tagline":null,"site_description":null,"phone_number":"(503) 319-67111","email":null,"address":null,"business_hours":null,"social_facebook":null,"social_instagram":null,"social_linkedin":null,"google_analytics_id":null,"logo":null,"favicon":null}	{"phone_number":"(503) 319-67111"}	\N	\N
107	155	settings	1	{"id":1,"site_title":"Leonard Soda Blasting","site_tagline":null,"site_description":null,"phone_number":"(503) 319-6711","email":null,"address":null,"business_hours":null,"social_facebook":null,"social_instagram":null,"social_linkedin":null,"google_analytics_id":null,"logo":null,"favicon":null}	{"phone_number":"(503) 319-6711"}	\N	\N
108	305	directus_policies	e361d4be-47be-4f74-9b30-5c86f80ec9a8	{"name":"Public API Access","icon":"public","description":"Public read access policy for pages, settings, navigation, testimonials, services","ip_access":null,"enforce_tfa":false,"admin_access":false,"app_access":false}	{"name":"Public API Access","icon":"public","description":"Public read access policy for pages, settings, navigation, testimonials, services","ip_access":null,"enforce_tfa":false,"admin_access":false,"app_access":false}	\N	\N
109	306	directus_permissions	21	{"policy":"e361d4be-47be-4f74-9b30-5c86f80ec9a8","collection":"pages","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	{"policy":"e361d4be-47be-4f74-9b30-5c86f80ec9a8","collection":"pages","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	\N	\N
110	307	directus_permissions	22	{"policy":"e361d4be-47be-4f74-9b30-5c86f80ec9a8","collection":"settings","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	{"policy":"e361d4be-47be-4f74-9b30-5c86f80ec9a8","collection":"settings","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	\N	\N
111	308	directus_permissions	23	{"policy":"e361d4be-47be-4f74-9b30-5c86f80ec9a8","collection":"navigation","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	{"policy":"e361d4be-47be-4f74-9b30-5c86f80ec9a8","collection":"navigation","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	\N	\N
112	309	directus_permissions	24	{"policy":"e361d4be-47be-4f74-9b30-5c86f80ec9a8","collection":"testimonials","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	{"policy":"e361d4be-47be-4f74-9b30-5c86f80ec9a8","collection":"testimonials","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	\N	\N
113	310	directus_permissions	25	{"policy":"e361d4be-47be-4f74-9b30-5c86f80ec9a8","collection":"services","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	{"policy":"e361d4be-47be-4f74-9b30-5c86f80ec9a8","collection":"services","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	\N	\N
114	313	directus_permissions	26	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","collection":"pages","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","collection":"pages","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	\N	\N
115	314	directus_permissions	27	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","collection":"settings","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","collection":"settings","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	\N	\N
116	315	directus_permissions	28	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","collection":"navigation","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","collection":"navigation","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	\N	\N
117	316	directus_permissions	29	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","collection":"testimonials","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","collection":"testimonials","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	\N	\N
118	317	directus_permissions	30	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","collection":"services","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","collection":"services","action":"read","permissions":{},"validation":{},"presets":null,"fields":["*"]}	\N	\N
119	319	directus_fields	50	{"sort":null,"collection":"pages","field":"services_cards","special":null,"interface":"list","options":{"template":"{{ title }}","addLabel":"Add Service Card","fields":[{"field":"image","name":"Image","type":"uuid","meta":{"interface":"file-image","special":["file"],"options":{}}},{"field":"title","name":"Title","type":"string","meta":{"interface":"input","options":{"placeholder":"Service title"}}},{"field":"text","name":"Text","type":"text","meta":{"interface":"input-multiline","options":{"placeholder":"Service description"}}},{"field":"service_page","name":"Service Page","type":"uuid","meta":{"interface":"select-dropdown-m2o","special":["m2o"],"options":{"template":"{{ title }}"}},"schema":{"foreign_key_column":"id","foreign_key_table":"pages"}}]},"display":"formatted-value","display_options":{"format":true},"readonly":false,"hidden":false,"width":"full","translations":null,"note":"Service cards to display in the services grid section","conditions":null,"required":false,"group":null,"validation":null,"validation_message":null}	{"sort":null,"collection":"pages","field":"services_cards","special":null,"interface":"list","options":{"template":"{{ title }}","addLabel":"Add Service Card","fields":[{"field":"image","name":"Image","type":"uuid","meta":{"interface":"file-image","special":["file"],"options":{}}},{"field":"title","name":"Title","type":"string","meta":{"interface":"input","options":{"placeholder":"Service title"}}},{"field":"text","name":"Text","type":"text","meta":{"interface":"input-multiline","options":{"placeholder":"Service description"}}},{"field":"service_page","name":"Service Page","type":"uuid","meta":{"interface":"select-dropdown-m2o","special":["m2o"],"options":{"template":"{{ title }}"}},"schema":{"foreign_key_column":"id","foreign_key_table":"pages"}}]},"display":"formatted-value","display_options":{"format":true},"readonly":false,"hidden":false,"width":"full","translations":null,"note":"Service cards to display in the services grid section","conditions":null,"required":false,"group":null,"validation":null,"validation_message":null}	\N	\N
120	320	pages	1	{"id":1,"status":"published","title":"Home.","slug":"home","meta_title":".Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-02T20:33:44.338Z","services_cards":[{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":null,"service_page":null},{"title":"Automotive","text":"Gentle yet effective paint and coating removal for classic cars, motorcycles, and automotive parts without damaging the underlying metal.","image":null,"service_page":null},{"title":"Aircraft","text":"Specialized aircraft cleaning and maintenance services meeting aviation industry standards for safety and precision.","image":null,"service_page":null}]}	{"services_cards":"[{\\"title\\":\\"Commercial & Industrial\\",\\"text\\":\\"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.\\",\\"image\\":null,\\"service_page\\":null},{\\"title\\":\\"Automotive\\",\\"text\\":\\"Gentle yet effective paint and coating removal for classic cars, motorcycles, and automotive parts without damaging the underlying metal.\\",\\"image\\":null,\\"service_page\\":null},{\\"title\\":\\"Aircraft\\",\\"text\\":\\"Specialized aircraft cleaning and maintenance services meeting aviation industry standards for safety and precision.\\",\\"image\\":null,\\"service_page\\":null}]","date_updated":"2025-07-02T20:33:44.338Z"}	\N	\N
121	323	pages	6	{"status":"published","title":"Commercial & Industrial Soda Blasting","slug":"commercial-industrial-soda-blasting","meta_title":"Commercial & Industrial Soda Blasting Services","meta_description":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, and industrial equipment.","hero_title":"Commercial & Industrial","hero_subtitle":"Professional media blasting for industrial applications","content_sections":[{"type":"hero","title":"Commercial & Industrial","content":"Professional media blasting for industrial applications"},{"type":"service_details","title":"Industrial Grade Solutions","content":"Our commercial and industrial soda blasting services provide safe, effective cleaning for large-scale projects including warehouses, manufacturing facilities, and equipment maintenance."}]}	{"status":"published","title":"Commercial & Industrial Soda Blasting","slug":"commercial-industrial-soda-blasting","meta_title":"Commercial & Industrial Soda Blasting Services","meta_description":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, and industrial equipment.","hero_title":"Commercial & Industrial","hero_subtitle":"Professional media blasting for industrial applications","content_sections":[{"type":"hero","title":"Commercial & Industrial","content":"Professional media blasting for industrial applications"},{"type":"service_details","title":"Industrial Grade Solutions","content":"Our commercial and industrial soda blasting services provide safe, effective cleaning for large-scale projects including warehouses, manufacturing facilities, and equipment maintenance."}]}	\N	\N
122	324	pages	7	{"status":"published","title":"Automotive Soda Blasting","slug":"automotive-soda-blasting","meta_title":"Automotive Soda Blasting - Classic Car Restoration","meta_description":"Gentle yet effective paint and coating removal for classic cars, motorcycles, and automotive parts without damaging metal.","hero_title":"Automotive","hero_subtitle":"Safe paint removal for automotive restoration","content_sections":[{"type":"hero","title":"Automotive","content":"Safe paint removal for automotive restoration"},{"type":"service_details","title":"Expert Car Restoration","content":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands. Our gentle process removes paint and coatings without warping or damaging metal."}]}	{"status":"published","title":"Automotive Soda Blasting","slug":"automotive-soda-blasting","meta_title":"Automotive Soda Blasting - Classic Car Restoration","meta_description":"Gentle yet effective paint and coating removal for classic cars, motorcycles, and automotive parts without damaging metal.","hero_title":"Automotive","hero_subtitle":"Safe paint removal for automotive restoration","content_sections":[{"type":"hero","title":"Automotive","content":"Safe paint removal for automotive restoration"},{"type":"service_details","title":"Expert Car Restoration","content":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands. Our gentle process removes paint and coatings without warping or damaging metal."}]}	\N	\N
123	325	pages	8	{"status":"published","title":"Aircraft Soda Blasting","slug":"aircraft-soda-blasting","meta_title":"Aircraft Soda Blasting - Aviation Cleaning Services","meta_description":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques that meet aviation standards.","hero_title":"Aircraft","hero_subtitle":"Precision cleaning for aviation applications","content_sections":[{"type":"hero","title":"Aircraft","content":"Precision cleaning for aviation applications"},{"type":"service_details","title":"Aviation Standards","content":"Specialized aircraft cleaning and maintenance services using eco-friendly soda blasting techniques that meet strict aviation industry standards for safety and precision."}]}	{"status":"published","title":"Aircraft Soda Blasting","slug":"aircraft-soda-blasting","meta_title":"Aircraft Soda Blasting - Aviation Cleaning Services","meta_description":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques that meet aviation standards.","hero_title":"Aircraft","hero_subtitle":"Precision cleaning for aviation applications","content_sections":[{"type":"hero","title":"Aircraft","content":"Precision cleaning for aviation applications"},{"type":"service_details","title":"Aviation Standards","content":"Specialized aircraft cleaning and maintenance services using eco-friendly soda blasting techniques that meet strict aviation industry standards for safety and precision."}]}	\N	\N
124	327	pages	1	{"id":1,"status":"published","title":"Home.","slug":"home","meta_title":".Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-02T20:38:42.856Z","services_cards":[{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":null,"service_page":6},{"title":"Automotive","text":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","image":null,"service_page":7},{"title":"Aircraft","text":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","image":null,"service_page":8},{"title":"Marine & Boat","text":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","image":null,"service_page":null},{"title":"Fire & Water Damage","text":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","image":null,"service_page":null},{"title":"Food Processing Equipment","text":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","image":null,"service_page":null}]}	{"services_cards":"[{\\"title\\":\\"Commercial & Industrial\\",\\"text\\":\\"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.\\",\\"image\\":null,\\"service_page\\":6},{\\"title\\":\\"Automotive\\",\\"text\\":\\"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.\\",\\"image\\":null,\\"service_page\\":7},{\\"title\\":\\"Aircraft\\",\\"text\\":\\"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.\\",\\"image\\":null,\\"service_page\\":8},{\\"title\\":\\"Marine & Boat\\",\\"text\\":\\"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.\\",\\"image\\":null,\\"service_page\\":null},{\\"title\\":\\"Fire & Water Damage\\",\\"text\\":\\"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.\\",\\"image\\":null,\\"service_page\\":null},{\\"title\\":\\"Food Processing Equipment\\",\\"text\\":\\"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.\\",\\"image\\":null,\\"service_page\\":null}]","date_updated":"2025-07-02T20:38:42.856Z"}	\N	\N
125	328	pages	1	{"id":1,"status":"published","title":"Home.","slug":"home","meta_title":".Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-02T20:46:42.716Z","services_cards":[{"title":"Automotive","text":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","image":null,"service_page":7},{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":null,"service_page":6},{"title":"Aircraft","text":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","image":null,"service_page":8},{"title":"Marine & Boat","text":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","image":null,"service_page":null},{"title":"Fire & Water Damage","text":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","image":null,"service_page":null},{"title":"Food Processing Equipment","text":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","image":null,"service_page":null}]}	{"services_cards":"[{\\"title\\":\\"Automotive\\",\\"text\\":\\"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.\\",\\"image\\":null,\\"service_page\\":7},{\\"title\\":\\"Commercial & Industrial\\",\\"text\\":\\"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.\\",\\"image\\":null,\\"service_page\\":6},{\\"title\\":\\"Aircraft\\",\\"text\\":\\"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.\\",\\"image\\":null,\\"service_page\\":8},{\\"title\\":\\"Marine & Boat\\",\\"text\\":\\"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.\\",\\"image\\":null,\\"service_page\\":null},{\\"title\\":\\"Fire & Water Damage\\",\\"text\\":\\"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.\\",\\"image\\":null,\\"service_page\\":null},{\\"title\\":\\"Food Processing Equipment\\",\\"text\\":\\"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.\\",\\"image\\":null,\\"service_page\\":null}]","date_updated":"2025-07-02T20:46:42.716Z"}	\N	\N
145	367	directus_permissions	32	{"policy":"403cd1e9-afb6-4410-9a9c-e00355a07c5a","collection":"directus_files","action":"read","permissions":null,"validation":null,"presets":null,"fields":["*"]}	{"policy":"403cd1e9-afb6-4410-9a9c-e00355a07c5a","collection":"directus_files","action":"read","permissions":null,"validation":null,"presets":null,"fields":["*"]}	\N	\N
146	368	directus_access	752308d3-0bc8-4e3e-8685-8dee9af9281b	{"policy":"403cd1e9-afb6-4410-9a9c-e00355a07c5a","role":"1c6e3a8a-f325-4126-90d7-344e6c2e1c01"}	{"policy":"403cd1e9-afb6-4410-9a9c-e00355a07c5a","role":"1c6e3a8a-f325-4126-90d7-344e6c2e1c01"}	\N	\N
148	373	directus_users	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	{"id":"f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc","first_name":"Admin","last_name":"User","email":"agency@theportlandcompany.com","password":"**********","location":null,"title":null,"description":null,"tags":null,"avatar":null,"language":null,"tfa_secret":null,"status":"active","role":"2cd8f664-3a36-4f12-8aad-bd4d6c0ea0be","token":null,"last_access":"2025-07-09T06:56:53.343Z","last_page":"/content/pages","provider":"default","external_identifier":null,"auth_data":null,"email_notifications":true,"appearance":null,"theme_dark":null,"theme_light":null,"theme_light_overrides":null,"theme_dark_overrides":null,"policies":[]}	{"password":"**********"}	\N	\N
126	329	pages	1	{"id":1,"status":"published","title":"This is a test","slug":"home","meta_title":".Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-02T23:04:42.938Z","services_cards":[{"title":"Automotive","text":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","image":null,"service_page":7},{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":null,"service_page":6},{"title":"Aircraft","text":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","image":null,"service_page":8},{"title":"Marine & Boat","text":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","image":null,"service_page":null},{"title":"Fire & Water Damage","text":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","image":null,"service_page":null},{"title":"Food Processing Equipment","text":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","image":null,"service_page":null}]}	{"title":"This is a test","date_updated":"2025-07-02T23:04:42.938Z"}	\N	\N
127	331	directus_fields	51	{"sort":5,"interface":"input","options":{},"display":"raw","width":"full","note":"This will be the title users see in the Page Header.","collection":"pages","field":"page_title"}	{"sort":5,"interface":"input","options":{},"display":"raw","width":"full","note":"This will be the title users see in the Page Header.","collection":"pages","field":"page_title"}	\N	\N
128	333	directus_fields	52	{"sort":6,"interface":"input","options":{},"display":"raw","width":"full","note":"This will be what appears in search engines as well as in your browser tab title.","collection":"pages","field":"seo_title"}	{"sort":6,"interface":"input","options":{},"display":"raw","width":"full","note":"This will be what appears in search engines as well as in your browser tab title.","collection":"pages","field":"seo_title"}	\N	\N
129	335	directus_fields	53	{"sort":7,"interface":"input","options":{},"display":"raw","width":"full","note":"This will be what is used in the Navigation for the title.","collection":"pages","field":"menu_title"}	{"sort":7,"interface":"input","options":{},"display":"raw","width":"full","note":"This will be what is used in the Navigation for the title.","collection":"pages","field":"menu_title"}	\N	\N
130	337	pages	1	{"id":1,"status":"published","title":"This is a test","slug":"home","meta_title":".Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-02T23:42:12.649Z","services_cards":[{"title":"Automotive","text":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","image":null,"service_page":7},{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":null,"service_page":6},{"title":"Aircraft","text":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","image":null,"service_page":8},{"title":"Marine & Boat","text":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","image":null,"service_page":null},{"title":"Fire & Water Damage","text":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","image":null,"service_page":null},{"title":"Food Processing Equipment","text":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","image":null,"service_page":null}],"page_title":"100% Eco-Friendly Cleaning and Stripping","seo_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","menu_title":"Home"}	{"page_title":"100% Eco-Friendly Cleaning and Stripping","seo_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","menu_title":"Home","date_updated":"2025-07-02T23:42:12.649Z"}	\N	\N
131	339	pages	1	{"id":1,"status":"published","title":"This is a test","slug":"home","meta_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-03T04:08:44.979Z","services_cards":[{"title":"Automotive","text":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","image":null,"service_page":7},{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":null,"service_page":6},{"title":"Aircraft","text":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","image":null,"service_page":8},{"title":"Marine & Boat","text":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","image":null,"service_page":null},{"title":"Fire & Water Damage","text":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","image":null,"service_page":null},{"title":"Food Processing Equipment","text":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","image":null,"service_page":null}],"page_title":"100% Eco-Friendly Cleaning and Stripping","seo_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","menu_title":"Home"}	{"meta_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","date_updated":"2025-07-03T04:08:44.979Z"}	\N	\N
147	371	directus_permissions	33	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","collection":"directus_files","action":"read","permissions":null,"validation":null,"presets":null,"fields":["*"]}	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","collection":"directus_files","action":"read","permissions":null,"validation":null,"presets":null,"fields":["*"]}	\N	\N
132	340	pages	1	{"id":1,"status":"published","title":"This is a test","slug":"home","meta_title":"Leonard Soda Blasting -- Eco-Friendly Cleaning & Stripping","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-03T04:08:55.779Z","services_cards":[{"title":"Automotive","text":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","image":null,"service_page":7},{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":null,"service_page":6},{"title":"Aircraft","text":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","image":null,"service_page":8},{"title":"Marine & Boat","text":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","image":null,"service_page":null},{"title":"Fire & Water Damage","text":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","image":null,"service_page":null},{"title":"Food Processing Equipment","text":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","image":null,"service_page":null}],"page_title":"100% Eco-Friendly Cleaning and Stripping","seo_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","menu_title":"Home"}	{"meta_title":"Leonard Soda Blasting -- Eco-Friendly Cleaning & Stripping","date_updated":"2025-07-03T04:08:55.779Z"}	\N	\N
133	341	pages	1	{"id":1,"status":"published","title":"This is a test","slug":"home","meta_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-03T04:09:06.079Z","services_cards":[{"title":"Automotive","text":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","image":null,"service_page":7},{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":null,"service_page":6},{"title":"Aircraft","text":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","image":null,"service_page":8},{"title":"Marine & Boat","text":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","image":null,"service_page":null},{"title":"Fire & Water Damage","text":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","image":null,"service_page":null},{"title":"Food Processing Equipment","text":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","image":null,"service_page":null}],"page_title":"100% Eco-Friendly Cleaning and Stripping","seo_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","menu_title":"Home"}	{"meta_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","date_updated":"2025-07-03T04:09:06.079Z"}	\N	\N
134	343	directus_files	c3b703ce-6825-4c66-84c2-7f116b3e0552	{"title":"Commercial","filename_download":"commercial.jpg","type":"image/jpeg","storage":"local"}	{"title":"Commercial","filename_download":"commercial.jpg","type":"image/jpeg","storage":"local"}	\N	\N
135	344	directus_files	359082da-6bf6-4a78-adfd-709e37692e33	{"title":"Automotive 1","filename_download":"automotive-1.jpg","type":"image/jpeg","storage":"local"}	{"title":"Automotive 1","filename_download":"automotive-1.jpg","type":"image/jpeg","storage":"local"}	\N	\N
136	345	directus_files	914108af-d022-485e-9236-c83d1d40bf53	{"title":"Food Processing Equipment","filename_download":"food-processing-equipment.jpg","type":"image/jpeg","storage":"local"}	{"title":"Food Processing Equipment","filename_download":"food-processing-equipment.jpg","type":"image/jpeg","storage":"local"}	\N	\N
137	346	directus_files	7a0552d9-cfee-4e04-b6c7-f5105360b843	{"title":"Fire Damage","filename_download":"fire-damage.jpg","type":"image/jpeg","storage":"local"}	{"title":"Fire Damage","filename_download":"fire-damage.jpg","type":"image/jpeg","storage":"local"}	\N	\N
138	347	directus_files	e9d11ac5-a277-4183-ac6a-16fde4667359	{"title":"Aircraft","filename_download":"aircraft.jpg","type":"image/jpeg","storage":"local"}	{"title":"Aircraft","filename_download":"aircraft.jpg","type":"image/jpeg","storage":"local"}	\N	\N
139	348	directus_files	dde5eeeb-f19c-414a-8dd7-03db20f8ea5e	{"title":"Log Homes","filename_download":"log-homes.jpg","type":"image/jpeg","storage":"local"}	{"title":"Log Homes","filename_download":"log-homes.jpg","type":"image/jpeg","storage":"local"}	\N	\N
140	349	directus_files	c1836ea8-d75d-4f70-aada-5854bbce79b5	{"title":"Boat 1","filename_download":"boat-1.jpg","type":"image/jpeg","storage":"local"}	{"title":"Boat 1","filename_download":"boat-1.jpg","type":"image/jpeg","storage":"local"}	\N	\N
141	350	pages	1	{"id":1,"status":"published","title":"This is a test","slug":"home","meta_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-03T21:43:12.506Z","services_cards":[{"title":"Automotive","text":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","image":"359082da-6bf6-4a78-adfd-709e37692e33","service_page":7},{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":"c3b703ce-6825-4c66-84c2-7f116b3e0552","service_page":6},{"title":"Aircraft","text":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","image":"e9d11ac5-a277-4183-ac6a-16fde4667359","service_page":8},{"title":"Marine & Boat","text":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","image":"c1836ea8-d75d-4f70-aada-5854bbce79b5","service_page":null},{"title":"Fire & Water Damage","text":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","image":"7a0552d9-cfee-4e04-b6c7-f5105360b843","service_page":null},{"title":"Food Processing Equipment","text":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","image":"914108af-d022-485e-9236-c83d1d40bf53","service_page":null},{"title":"Log Homes","text":"Log Homes text...","image":"dde5eeeb-f19c-414a-8dd7-03db20f8ea5e","service_page":null}],"page_title":"100% Eco-Friendly Cleaning and Stripping","seo_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","menu_title":"Home"}	{"services_cards":"[{\\"title\\":\\"Automotive\\",\\"text\\":\\"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.\\",\\"image\\":\\"359082da-6bf6-4a78-adfd-709e37692e33\\",\\"service_page\\":7},{\\"title\\":\\"Commercial & Industrial\\",\\"text\\":\\"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.\\",\\"image\\":\\"c3b703ce-6825-4c66-84c2-7f116b3e0552\\",\\"service_page\\":6},{\\"title\\":\\"Aircraft\\",\\"text\\":\\"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.\\",\\"image\\":\\"e9d11ac5-a277-4183-ac6a-16fde4667359\\",\\"service_page\\":8},{\\"title\\":\\"Marine & Boat\\",\\"text\\":\\"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.\\",\\"image\\":\\"c1836ea8-d75d-4f70-aada-5854bbce79b5\\",\\"service_page\\":null},{\\"title\\":\\"Fire & Water Damage\\",\\"text\\":\\"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.\\",\\"image\\":\\"7a0552d9-cfee-4e04-b6c7-f5105360b843\\",\\"service_page\\":null},{\\"title\\":\\"Food Processing Equipment\\",\\"text\\":\\"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.\\",\\"image\\":\\"914108af-d022-485e-9236-c83d1d40bf53\\",\\"service_page\\":null},{\\"title\\":\\"Log Homes\\",\\"text\\":\\"Log Homes text...\\",\\"image\\":\\"dde5eeeb-f19c-414a-8dd7-03db20f8ea5e\\",\\"service_page\\":null}]","date_updated":"2025-07-03T21:43:12.506Z"}	\N	\N
142	358	directus_policies	4ceef64a-99d8-486e-bcea-c81b7010549d	{"name":"Public Files Access","icon":"folder","description":"Allow public access to files","ip_access":[],"enforce_tfa":false,"admin_access":false,"app_access":false}	{"name":"Public Files Access","icon":"folder","description":"Allow public access to files","ip_access":[],"enforce_tfa":false,"admin_access":false,"app_access":false}	\N	\N
143	359	directus_permissions	31	{"policy":"4ceef64a-99d8-486e-bcea-c81b7010549d","collection":"directus_files","action":"read","permissions":{},"validation":{},"fields":["*"]}	{"policy":"4ceef64a-99d8-486e-bcea-c81b7010549d","collection":"directus_files","action":"read","permissions":{},"validation":{},"fields":["*"]}	\N	\N
144	366	directus_policies	403cd1e9-afb6-4410-9a9c-e00355a07c5a	{"name":"Public Assets","icon":"public","description":"Public access to assets","ip_access":null,"enforce_tfa":false,"admin_access":false,"app_access":false}	{"name":"Public Assets","icon":"public","description":"Public access to assets","ip_access":null,"enforce_tfa":false,"admin_access":false,"app_access":false}	\N	\N
149	376	pages	1	{"id":1,"status":"published","title":"This is a test","slug":"home","meta_title":"This is a test","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-09T07:06:26.578Z","services_cards":[{"title":"Automotive","text":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","image":"359082da-6bf6-4a78-adfd-709e37692e33","service_page":7},{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":"c3b703ce-6825-4c66-84c2-7f116b3e0552","service_page":6},{"title":"Aircraft","text":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","image":"e9d11ac5-a277-4183-ac6a-16fde4667359","service_page":8},{"title":"Marine & Boat","text":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","image":"c1836ea8-d75d-4f70-aada-5854bbce79b5","service_page":null},{"title":"Fire & Water Damage","text":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","image":"7a0552d9-cfee-4e04-b6c7-f5105360b843","service_page":null},{"title":"Food Processing Equipment","text":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","image":"914108af-d022-485e-9236-c83d1d40bf53","service_page":null},{"title":"Log Homes","text":"Log Homes text...","image":"dde5eeeb-f19c-414a-8dd7-03db20f8ea5e","service_page":null}],"page_title":"100% Eco-Friendly Cleaning and Stripping","seo_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","menu_title":"Home"}	{"meta_title":"This is a test","date_updated":"2025-07-09T07:06:26.578Z"}	\N	\N
150	377	pages	1	{"id":1,"status":"published","title":"Home","slug":"home","meta_title":"Home - Leonard Soda Blasting","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-09T08:35:45.436Z","services_cards":[{"title":"Automotive","text":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","image":"359082da-6bf6-4a78-adfd-709e37692e33","service_page":7},{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":"c3b703ce-6825-4c66-84c2-7f116b3e0552","service_page":6},{"title":"Aircraft","text":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","image":"e9d11ac5-a277-4183-ac6a-16fde4667359","service_page":8},{"title":"Marine & Boat","text":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","image":"c1836ea8-d75d-4f70-aada-5854bbce79b5","service_page":null},{"title":"Fire & Water Damage","text":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","image":"7a0552d9-cfee-4e04-b6c7-f5105360b843","service_page":null},{"title":"Food Processing Equipment","text":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","image":"914108af-d022-485e-9236-c83d1d40bf53","service_page":null},{"title":"Log Homes","text":"Log Homes text...","image":"dde5eeeb-f19c-414a-8dd7-03db20f8ea5e","service_page":null}],"page_title":"100% Eco-Friendly Cleaning and Stripping","seo_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","menu_title":"Home"}	{"title":"Home","meta_title":"Home - Leonard Soda Blasting","date_updated":"2025-07-09T08:35:45.436Z"}	\N	\N
151	378	pages	1	{"id":1,"status":"published","title":"Home","slug":"home","meta_title":"Home - Leonard Soda Blasting","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping.","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-09T08:56:55.957Z","services_cards":[{"title":"Automotive","text":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","image":"359082da-6bf6-4a78-adfd-709e37692e33","service_page":7},{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":"c3b703ce-6825-4c66-84c2-7f116b3e0552","service_page":6},{"title":"Aircraft","text":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","image":"e9d11ac5-a277-4183-ac6a-16fde4667359","service_page":8},{"title":"Marine & Boat","text":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","image":"c1836ea8-d75d-4f70-aada-5854bbce79b5","service_page":null},{"title":"Fire & Water Damage","text":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","image":"7a0552d9-cfee-4e04-b6c7-f5105360b843","service_page":null},{"title":"Food Processing Equipment","text":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","image":"914108af-d022-485e-9236-c83d1d40bf53","service_page":null},{"title":"Log Homes","text":"Log Homes text...","image":"dde5eeeb-f19c-414a-8dd7-03db20f8ea5e","service_page":null}],"page_title":"100% Eco-Friendly Cleaning and Stripping.","seo_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","menu_title":"Home"}	{"page_title":"100% Eco-Friendly Cleaning and Stripping.","date_updated":"2025-07-09T08:56:55.957Z"}	\N	\N
152	379	pages	1	{"id":1,"status":"published","title":"Home","slug":"home","meta_title":"Home - Leonard Soda Blasting","meta_description":"Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..","hero_title":"100% Eco-Friendly Cleaning and Stripping","hero_subtitle":"Professional soda blasting services using safe, non-toxic sodium bicarbonate..","hero_image":null,"hero_video":null,"content_sections":[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}],"date_created":"2025-07-02T01:34:01.670Z","date_updated":"2025-07-09T09:05:24.418Z","services_cards":[{"title":"Automotive","text":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","image":"359082da-6bf6-4a78-adfd-709e37692e33","service_page":7},{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":"c3b703ce-6825-4c66-84c2-7f116b3e0552","service_page":6},{"title":"Aircraft","text":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","image":"e9d11ac5-a277-4183-ac6a-16fde4667359","service_page":8},{"title":"Marine & Boat","text":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","image":"c1836ea8-d75d-4f70-aada-5854bbce79b5","service_page":null},{"title":"Fire & Water Damage","text":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","image":"7a0552d9-cfee-4e04-b6c7-f5105360b843","service_page":null},{"title":"Food Processing Equipment","text":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","image":"914108af-d022-485e-9236-c83d1d40bf53","service_page":null},{"title":"Log Homes","text":"Log Homes text...","image":"dde5eeeb-f19c-414a-8dd7-03db20f8ea5e","service_page":null}],"page_title":"100% Eco-Friendly Cleaning and Stripping.","seo_title":"Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping","menu_title":"Home"}	{"hero_title":"100% Eco-Friendly Cleaning and Stripping","date_updated":"2025-07-09T09:05:24.418Z"}	\N	\N
\.


--
-- Data for Name: directus_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_roles (id, name, icon, description, parent) FROM stdin;
2cd8f664-3a36-4f12-8aad-bd4d6c0ea0be	Administrator	verified	$t:admin_description	\N
1c6e3a8a-f325-4126-90d7-344e6c2e1c01	Public	public	Public access role	\N
\.


--
-- Data for Name: directus_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_sessions (token, "user", expires, ip, user_agent, share, origin, next_token) FROM stdin;
JaGOt1j8VwTxZS8tQ3QZXgR5Bxno9EPJYPIfh4a5z4obDYI2ZlcdhID_Yuxs_mSC	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-16 06:56:55.43+00	127.0.0.1	axios/1.8.4	\N	\N	\N
9fkRs71kupeC7AF5yVO-BZIb8TNkI7l2HxdJpd8u9ixmCS0dkNeULvd-VGSiA73D	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-10 19:36:01.269+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	\N	http://localhost:8574	wpgt8GGUpNljFVE2HxX6Fy7agKr0g2LBCtBwrCYogCcl7sufsg09D0th7anP_KvC
wpgt8GGUpNljFVE2HxX6Fy7agKr0g2LBCtBwrCYogCcl7sufsg09D0th7anP_KvC	f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	2025-07-11 19:35:51.269+00	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15	\N	http://localhost:8574	\N
\.


--
-- Data for Name: directus_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_settings (id, project_name, project_url, project_color, project_logo, public_foreground, public_background, public_note, auth_login_attempts, auth_password_policy, storage_asset_transform, storage_asset_presets, custom_css, storage_default_folder, basemaps, mapbox_key, module_bar, project_descriptor, default_language, custom_aspect_ratios, public_favicon, default_appearance, default_theme_light, theme_light_overrides, default_theme_dark, theme_dark_overrides, report_error_url, report_bug_url, report_feature_url, public_registration, public_registration_verify_email, public_registration_role, public_registration_email_filter, visual_editor_urls, accepted_terms, project_id) FROM stdin;
1	Directus	\N	#6644FF	\N	\N	\N	\N	25	\N	all	\N	\N	\N	\N	\N	\N	\N	en-US	\N	\N	auto	\N	\N	\N	\N	\N	\N	\N	f	t	\N	\N	\N	t	0197c8a1-eee7-76df-978f-31025c7a4502
\.


--
-- Data for Name: directus_shares; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_shares (id, name, collection, item, role, password, user_created, date_created, date_start, date_end, times_used, max_uses) FROM stdin;
\.


--
-- Data for Name: directus_translations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_translations (id, language, key, value) FROM stdin;
\.


--
-- Data for Name: directus_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_users (id, first_name, last_name, email, password, location, title, description, tags, avatar, language, tfa_secret, status, role, token, last_access, last_page, provider, external_identifier, auth_data, email_notifications, appearance, theme_dark, theme_light, theme_light_overrides, theme_dark_overrides) FROM stdin;
f5d2c9e7-8d30-4fa9-8e67-04378f3e53bc	Admin	User	agency@theportlandcompany.com	$argon2id$v=19$m=65536,t=3,p=4$qSegkkPpCW1PwQIjQV3wqg$qEylXAeNZ4XaTY3F1vWEpIOL6XKX9ObenMneQtoZux0	\N	\N	\N	\N	\N	\N	\N	active	2cd8f664-3a36-4f12-8aad-bd4d6c0ea0be	\N	2025-07-10 19:35:51.553+00	/content/pages/3	default	\N	\N	t	\N	\N	\N	\N	\N
\.


--
-- Data for Name: directus_versions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_versions (id, key, name, collection, item, hash, date_created, date_updated, user_created, user_updated, delta) FROM stdin;
\.


--
-- Data for Name: directus_webhooks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directus_webhooks (id, name, method, url, status, data, actions, collections, headers, was_active_before_deprecation, migrated_flow) FROM stdin;
\.


--
-- Data for Name: navigation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.navigation (id, sort, status, label, url, parent_id, target, icon) FROM stdin;
3	30	active	Services	/services	\N	_self	\N
4	40	active	Gallery	/gallery	\N	_self	\N
5	50	active	Contact	/contact	\N	_self	\N
1	19	active	Home	/	\N	_self	\N
2	20	active	About	/about-soda-blasting	\N	_self	\N
\.


--
-- Data for Name: pages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pages (id, status, title, slug, meta_title, meta_description, hero_title, hero_subtitle, hero_image, hero_video, content_sections, date_created, date_updated, services_cards, page_title, seo_title, menu_title) FROM stdin;
2	published	About Soda Blasting	about-soda-blasting	About Soda Blasting - Eco-Friendly Surface Cleaning	Learn about soda blasting, an eco-friendly surface cleaning method using sodium bicarbonate.	About Soda Blasting	The safe, eco-friendly way to clean and strip surfaces.	\N	\N	[{"type":"hero","title":"About Soda Blasting","content":"Learn about our eco-friendly surface cleaning process."},{"type":"process_explanation","title":"What is Soda Blasting?","content":"Soda blasting is a revolutionary surface cleaning method that uses sodium bicarbonate (baking soda) to safely remove contaminants, coatings, and buildup from various surfaces without causing damage."}]	2025-07-02 01:34:02.346+00	\N	\N	\N	\N	\N
3	published	Services	services	Soda Blasting Services - Commercial, Automotive, Marine	Professional soda blasting services for commercial, automotive, marine, aircraft, and industrial applications.	Our Services	Professional soda blasting solutions for every industry.	\N	\N	[{"type":"hero","title":"Our Services","content":"Professional soda blasting solutions for every industry."},{"type":"services_list","title":"Service Categories","content":"We offer specialized soda blasting services across multiple industries."}]	2025-07-02 01:34:02.993+00	\N	\N	\N	\N	\N
4	published	Gallery	gallery	Gallery - Soda Blasting Before & After Photos	View our gallery of soda blasting projects showing dramatic before and after transformations.	Our Work	See the amazing transformations we achieve with soda blasting.	\N	\N	[{"type":"hero","title":"Our Work","content":"See the amazing transformations we achieve with soda blasting."},{"type":"gallery_grid","title":"Project Gallery","content":"Browse our portfolio of successful soda blasting projects."}]	2025-07-02 01:34:03.666+00	\N	\N	\N	\N	\N
5	published	Contact	contact	Contact Leonard Soda Blasting - Get a Free Quote	Contact Leonard Soda Blasting for a free quote on your cleaning and stripping project.	Contact Us	Get a free quote for your soda blasting project.	\N	\N	[{"type":"hero","title":"Contact Us","content":"Get a free quote for your soda blasting project."},{"type":"contact_form","title":"Get in Touch","content":"Fill out the form below or give us a call to discuss your project."}]	2025-07-02 01:34:04.33+00	\N	\N	\N	\N	\N
6	published	Commercial & Industrial Soda Blasting	commercial-industrial-soda-blasting	Commercial & Industrial Soda Blasting Services	Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, and industrial equipment.	Commercial & Industrial	Professional media blasting for industrial applications	\N	\N	[{"type":"hero","title":"Commercial & Industrial","content":"Professional media blasting for industrial applications"},{"type":"service_details","title":"Industrial Grade Solutions","content":"Our commercial and industrial soda blasting services provide safe, effective cleaning for large-scale projects including warehouses, manufacturing facilities, and equipment maintenance."}]	2025-07-02 20:35:58.689+00	\N	\N	\N	\N	\N
7	published	Automotive Soda Blasting	automotive-soda-blasting	Automotive Soda Blasting - Classic Car Restoration	Gentle yet effective paint and coating removal for classic cars, motorcycles, and automotive parts without damaging metal.	Automotive	Safe paint removal for automotive restoration	\N	\N	[{"type":"hero","title":"Automotive","content":"Safe paint removal for automotive restoration"},{"type":"service_details","title":"Expert Car Restoration","content":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands. Our gentle process removes paint and coatings without warping or damaging metal."}]	2025-07-02 20:35:59.324+00	\N	\N	\N	\N	\N
8	published	Aircraft Soda Blasting	aircraft-soda-blasting	Aircraft Soda Blasting - Aviation Cleaning Services	Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques that meet aviation standards.	Aircraft	Precision cleaning for aviation applications	\N	\N	[{"type":"hero","title":"Aircraft","content":"Precision cleaning for aviation applications"},{"type":"service_details","title":"Aviation Standards","content":"Specialized aircraft cleaning and maintenance services using eco-friendly soda blasting techniques that meet strict aviation industry standards for safety and precision."}]	2025-07-02 20:35:59.965+00	\N	\N	\N	\N	\N
9	published	Food Processing Equipment Soda Blasting	soda-blasting/food-processing-equipment	Food Processing Equipment Soda Blasting - Safe Equipment Cleaning	\N	\N	\N	\N	\N	\N	2025-07-09 08:52:23.207143+00	2025-07-09 08:52:23.207143+00	\N	Food Processing Equipment Soda Blasting	Food Processing Equipment Soda Blasting - Safe Equipment Cleaning	Food Processing Equipment
10	published	Fire and Water Damage Restoration Soda Blasting	soda-blasting/fire-and-water-damage-restoration-soda-blasting	Fire and Water Damage Restoration Soda Blasting - Emergency Cleanup	\N	\N	\N	\N	\N	\N	2025-07-09 08:52:37.206115+00	2025-07-09 08:52:37.206115+00	\N	Fire and Water Damage Restoration Soda Blasting	Fire and Water Damage Restoration Soda Blasting - Emergency Cleanup	Fire & Water Damage Restoration
11	published	Log Homes Soda Blasting	log-homes	Log Homes Soda Blasting - Cabin and Log Home Restoration	\N	\N	\N	\N	\N	\N	2025-07-09 08:52:52.147133+00	2025-07-09 08:52:52.147133+00	\N	Log Homes Soda Blasting	Log Homes Soda Blasting - Cabin and Log Home Restoration	Log Homes
12	published	Boat and Marine Soda Blasting	boat-marine	Boat and Marine Soda Blasting - Hull and Deck Cleaning	\N	\N	\N	\N	\N	\N	2025-07-09 08:53:05.97469+00	2025-07-09 08:53:05.97469+00	\N	Boat and Marine Soda Blasting	Boat and Marine Soda Blasting - Hull and Deck Cleaning	Boat & Marine
1	published	Home	home	Home - Leonard Soda Blasting	Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning..	100% Eco-Friendly Cleaning and Stripping	Professional soda blasting services using safe, non-toxic sodium bicarbonate..	\N	\N	[{"type":"hero","title":"100% Eco-Friendly Cleaning and Stripping","content":"Professional soda blasting services using safe, non-toxic sodium bicarbonate."},{"type":"services_grid","title":"Our Services","content":"We provide professional soda blasting services across multiple industries."},{"type":"about_process","title":"How does soda blasting work?","content":"Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."},{"type":"latest_work","title":"Latest Work","content":"Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."},{"type":"testimonial","title":"Client Testimonial","content":"Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}]	2025-07-02 01:34:01.67+00	2025-07-09 09:05:24.418+00	[{"title":"Automotive","text":"Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.","image":"359082da-6bf6-4a78-adfd-709e37692e33","service_page":7},{"title":"Commercial & Industrial","text":"Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.","image":"c3b703ce-6825-4c66-84c2-7f116b3e0552","service_page":6},{"title":"Aircraft","text":"Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.","image":"e9d11ac5-a277-4183-ac6a-16fde4667359","service_page":8},{"title":"Marine & Boat","text":"One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.","image":"c1836ea8-d75d-4f70-aada-5854bbce79b5","service_page":null},{"title":"Fire & Water Damage","text":"After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.","image":"7a0552d9-cfee-4e04-b6c7-f5105360b843","service_page":null},{"title":"Food Processing Equipment","text":"Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.","image":"914108af-d022-485e-9236-c83d1d40bf53","service_page":null},{"title":"Log Homes","text":"Log Homes text...","image":"dde5eeeb-f19c-414a-8dd7-03db20f8ea5e","service_page":null}]	100% Eco-Friendly Cleaning and Stripping.	Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping	Home
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (id, status, title, slug, description, featured_image, gallery, features, applications, sort_order) FROM stdin;
1	published	Commercial & Industrial	commercial-industrial	Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.	\N	\N	["Licensed contractor since 1989","Industrial grade equipment","Safety compliant processes","Scheduled completion","Professional manpower"]	["Warehouse cleaning","Machinery degreasing","Parking garage restoration","Equipment maintenance","Facility preparation"]	1
2	published	Automotive	automotive	Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.	\N	\N	["Paint removal without warping","Rust elimination","Chrome restoration","Engine cleaning","Frame restoration"]	["Classic car restoration","Paint stripping","Rust removal","Chrome polishing","Engine bay cleaning"]	2
3	published	Aircraft	aircraft	Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.	\N	\N	["FAA approved processes","Precision cleaning","No surface damage","Environmentally safe","Certified technicians"]	["Paint stripping","Corrosion removal","Surface preparation","Maintenance cleaning","Restoration work"]	3
4	published	Marine & Boat	marine-boat	One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.	\N	\N	["Hull cleaning","Antifouling removal","Gel coat restoration","Blister repair prep","Eco-friendly process"]	["Hull stripping","Antifouling removal","Gel coat preparation","Blister repair","Bottom paint removal"]	4
5	published	Fire & Water Damage	fire-water-damage	After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.	\N	\N	["Soot removal","Smoke damage cleanup","Structural cleaning","Safe process","Insurance approved"]	["Soot removal","Smoke damage","Water damage cleanup","Structural restoration","Content cleaning"]	5
6	published	Food Processing Equipment	food-processing-equipment	Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.	\N	\N	["FDA approved","Food-grade safe","No chemical residue","Equipment-friendly","Minimal downtime"]	["Ovens and baking equipment","Processing machinery","Conveyor systems","Storage tanks","Production lines"]	6
\.


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.settings (id, site_title, site_tagline, site_description, phone_number, email, address, business_hours, social_facebook, social_instagram, social_linkedin, google_analytics_id, logo, favicon) FROM stdin;
1	Leonard Soda Blasting	\N	\N	(503) 319-6711	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testimonials (id, status, quote, client_name) FROM stdin;
1	published	Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team.	Jim Clarke
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-06-22 05:56:33
20211116045059	2025-06-22 05:56:36
20211116050929	2025-06-22 05:56:38
20211116051442	2025-06-22 05:56:40
20211116212300	2025-06-22 05:56:43
20211116213355	2025-06-22 05:56:45
20211116213934	2025-06-22 05:56:47
20211116214523	2025-06-22 05:56:51
20211122062447	2025-06-22 05:56:53
20211124070109	2025-06-22 05:56:55
20211202204204	2025-06-22 05:56:57
20211202204605	2025-06-22 05:56:59
20211210212804	2025-06-22 05:57:06
20211228014915	2025-06-22 05:57:09
20220107221237	2025-06-22 05:57:11
20220228202821	2025-06-22 05:57:13
20220312004840	2025-06-22 05:57:15
20220603231003	2025-06-22 05:57:19
20220603232444	2025-06-22 05:57:21
20220615214548	2025-06-22 05:57:24
20220712093339	2025-06-22 05:57:26
20220908172859	2025-06-22 05:57:28
20220916233421	2025-06-22 05:57:30
20230119133233	2025-06-22 05:57:32
20230128025114	2025-06-22 05:57:35
20230128025212	2025-06-22 05:57:38
20230227211149	2025-06-22 05:57:40
20230228184745	2025-06-22 05:57:42
20230308225145	2025-06-22 05:57:44
20230328144023	2025-06-22 05:57:46
20231018144023	2025-06-22 05:57:49
20231204144023	2025-06-22 05:57:53
20231204144024	2025-06-22 05:57:55
20231204144025	2025-06-22 05:57:57
20240108234812	2025-06-22 05:57:59
20240109165339	2025-06-22 05:58:01
20240227174441	2025-06-22 05:58:05
20240311171622	2025-06-22 05:58:08
20240321100241	2025-06-22 05:58:13
20240401105812	2025-06-22 05:58:19
20240418121054	2025-06-22 05:58:23
20240523004032	2025-06-22 05:58:31
20240618124746	2025-06-22 05:58:33
20240801235015	2025-06-22 05:58:35
20240805133720	2025-06-22 05:58:37
20240827160934	2025-06-22 05:58:39
20240919163303	2025-06-22 05:58:42
20240919163305	2025-06-22 05:58:45
20241019105805	2025-06-22 05:58:47
20241030150047	2025-06-22 05:58:55
20241108114728	2025-06-22 05:58:58
20241121104152	2025-06-22 05:59:00
20241130184212	2025-06-22 05:59:03
20241220035512	2025-06-22 05:59:05
20241220123912	2025-06-22 05:59:08
20241224161212	2025-06-22 05:59:10
20250107150512	2025-06-22 05:59:12
20250110162412	2025-06-22 05:59:14
20250123174212	2025-06-22 05:59:16
20250128220012	2025-06-22 05:59:19
20250506224012	2025-06-22 05:59:20
20250523164012	2025-06-22 05:59:22
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-06-22 05:56:30.700225
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-06-22 05:56:30.711498
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-06-22 05:56:30.717313
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-06-22 05:56:30.75221
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-06-22 05:56:30.772181
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-06-22 05:56:30.778982
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-06-22 05:56:30.785358
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-06-22 05:56:30.79467
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-06-22 05:56:30.80098
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-06-22 05:56:30.80703
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-06-22 05:56:30.814539
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-06-22 05:56:30.820875
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-06-22 05:56:30.830503
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-06-22 05:56:30.83855
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-06-22 05:56:30.844984
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-06-22 05:56:30.872494
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-06-22 05:56:30.878687
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-06-22 05:56:30.884637
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-06-22 05:56:30.938957
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-06-22 05:56:30.969534
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-06-22 05:56:31.12355
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-06-22 05:56:31.269829
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-06-22 05:56:31.348673
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-06-22 05:56:31.378377
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-06-22 05:56:31.459468
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-06-22 05:56:31.467551
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: directus_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_activity_id_seq', 379, true);


--
-- Name: directus_fields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_fields_id_seq', 53, true);


--
-- Name: directus_notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_notifications_id_seq', 1, false);


--
-- Name: directus_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_permissions_id_seq', 33, true);


--
-- Name: directus_presets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_presets_id_seq', 2, true);


--
-- Name: directus_relations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_relations_id_seq', 1, false);


--
-- Name: directus_revisions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_revisions_id_seq', 152, true);


--
-- Name: directus_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_settings_id_seq', 1, true);


--
-- Name: directus_webhooks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directus_webhooks_id_seq', 1, false);


--
-- Name: navigation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.navigation_id_seq', 5, true);


--
-- Name: pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pages_id_seq', 12, true);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.services_id_seq', 6, true);


--
-- Name: settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.settings_id_seq', 1, true);


--
-- Name: testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.testimonials_id_seq', 1, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: directus_access directus_access_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_pkey PRIMARY KEY (id);


--
-- Name: directus_activity directus_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_activity
    ADD CONSTRAINT directus_activity_pkey PRIMARY KEY (id);


--
-- Name: directus_collections directus_collections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_collections
    ADD CONSTRAINT directus_collections_pkey PRIMARY KEY (collection);


--
-- Name: directus_comments directus_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_pkey PRIMARY KEY (id);


--
-- Name: directus_dashboards directus_dashboards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_dashboards
    ADD CONSTRAINT directus_dashboards_pkey PRIMARY KEY (id);


--
-- Name: directus_extensions directus_extensions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_extensions
    ADD CONSTRAINT directus_extensions_pkey PRIMARY KEY (id);


--
-- Name: directus_fields directus_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_fields
    ADD CONSTRAINT directus_fields_pkey PRIMARY KEY (id);


--
-- Name: directus_files directus_files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_pkey PRIMARY KEY (id);


--
-- Name: directus_flows directus_flows_operation_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_operation_unique UNIQUE (operation);


--
-- Name: directus_flows directus_flows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_pkey PRIMARY KEY (id);


--
-- Name: directus_folders directus_folders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_folders
    ADD CONSTRAINT directus_folders_pkey PRIMARY KEY (id);


--
-- Name: directus_migrations directus_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_migrations
    ADD CONSTRAINT directus_migrations_pkey PRIMARY KEY (version);


--
-- Name: directus_notifications directus_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_pkey PRIMARY KEY (id);


--
-- Name: directus_operations directus_operations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_pkey PRIMARY KEY (id);


--
-- Name: directus_operations directus_operations_reject_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_reject_unique UNIQUE (reject);


--
-- Name: directus_operations directus_operations_resolve_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_resolve_unique UNIQUE (resolve);


--
-- Name: directus_panels directus_panels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_pkey PRIMARY KEY (id);


--
-- Name: directus_permissions directus_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_permissions
    ADD CONSTRAINT directus_permissions_pkey PRIMARY KEY (id);


--
-- Name: directus_policies directus_policies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_policies
    ADD CONSTRAINT directus_policies_pkey PRIMARY KEY (id);


--
-- Name: directus_presets directus_presets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_pkey PRIMARY KEY (id);


--
-- Name: directus_relations directus_relations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_relations
    ADD CONSTRAINT directus_relations_pkey PRIMARY KEY (id);


--
-- Name: directus_revisions directus_revisions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_pkey PRIMARY KEY (id);


--
-- Name: directus_roles directus_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_roles
    ADD CONSTRAINT directus_roles_pkey PRIMARY KEY (id);


--
-- Name: directus_sessions directus_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_pkey PRIMARY KEY (token);


--
-- Name: directus_settings directus_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_pkey PRIMARY KEY (id);


--
-- Name: directus_shares directus_shares_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_pkey PRIMARY KEY (id);


--
-- Name: directus_translations directus_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_translations
    ADD CONSTRAINT directus_translations_pkey PRIMARY KEY (id);


--
-- Name: directus_users directus_users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_email_unique UNIQUE (email);


--
-- Name: directus_users directus_users_external_identifier_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_external_identifier_unique UNIQUE (external_identifier);


--
-- Name: directus_users directus_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_pkey PRIMARY KEY (id);


--
-- Name: directus_users directus_users_token_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_token_unique UNIQUE (token);


--
-- Name: directus_versions directus_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_pkey PRIMARY KEY (id);


--
-- Name: directus_webhooks directus_webhooks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_webhooks
    ADD CONSTRAINT directus_webhooks_pkey PRIMARY KEY (id);


--
-- Name: navigation navigation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.navigation
    ADD CONSTRAINT navigation_pkey PRIMARY KEY (id);


--
-- Name: pages pages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- Name: pages pages_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_slug_unique UNIQUE (slug);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: services services_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_slug_unique UNIQUE (slug);


--
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: directus_access directus_access_policy_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_policy_foreign FOREIGN KEY (policy) REFERENCES public.directus_policies(id) ON DELETE CASCADE;


--
-- Name: directus_access directus_access_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;


--
-- Name: directus_access directus_access_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_collections directus_collections_group_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_collections
    ADD CONSTRAINT directus_collections_group_foreign FOREIGN KEY ("group") REFERENCES public.directus_collections(collection);


--
-- Name: directus_comments directus_comments_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_comments directus_comments_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id);


--
-- Name: directus_dashboards directus_dashboards_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_dashboards
    ADD CONSTRAINT directus_dashboards_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_files directus_files_folder_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_folder_foreign FOREIGN KEY (folder) REFERENCES public.directus_folders(id) ON DELETE SET NULL;


--
-- Name: directus_files directus_files_modified_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_modified_by_foreign FOREIGN KEY (modified_by) REFERENCES public.directus_users(id);


--
-- Name: directus_files directus_files_uploaded_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_uploaded_by_foreign FOREIGN KEY (uploaded_by) REFERENCES public.directus_users(id);


--
-- Name: directus_flows directus_flows_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_folders directus_folders_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_folders
    ADD CONSTRAINT directus_folders_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_folders(id);


--
-- Name: directus_notifications directus_notifications_recipient_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_recipient_foreign FOREIGN KEY (recipient) REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_notifications directus_notifications_sender_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_sender_foreign FOREIGN KEY (sender) REFERENCES public.directus_users(id);


--
-- Name: directus_operations directus_operations_flow_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_flow_foreign FOREIGN KEY (flow) REFERENCES public.directus_flows(id) ON DELETE CASCADE;


--
-- Name: directus_operations directus_operations_reject_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_reject_foreign FOREIGN KEY (reject) REFERENCES public.directus_operations(id);


--
-- Name: directus_operations directus_operations_resolve_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_resolve_foreign FOREIGN KEY (resolve) REFERENCES public.directus_operations(id);


--
-- Name: directus_operations directus_operations_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_panels directus_panels_dashboard_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_dashboard_foreign FOREIGN KEY (dashboard) REFERENCES public.directus_dashboards(id) ON DELETE CASCADE;


--
-- Name: directus_panels directus_panels_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_permissions directus_permissions_policy_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_permissions
    ADD CONSTRAINT directus_permissions_policy_foreign FOREIGN KEY (policy) REFERENCES public.directus_policies(id) ON DELETE CASCADE;


--
-- Name: directus_presets directus_presets_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;


--
-- Name: directus_presets directus_presets_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_revisions directus_revisions_activity_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_activity_foreign FOREIGN KEY (activity) REFERENCES public.directus_activity(id) ON DELETE CASCADE;


--
-- Name: directus_revisions directus_revisions_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_revisions(id);


--
-- Name: directus_revisions directus_revisions_version_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_version_foreign FOREIGN KEY (version) REFERENCES public.directus_versions(id) ON DELETE CASCADE;


--
-- Name: directus_roles directus_roles_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_roles
    ADD CONSTRAINT directus_roles_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_roles(id);


--
-- Name: directus_sessions directus_sessions_share_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_share_foreign FOREIGN KEY (share) REFERENCES public.directus_shares(id) ON DELETE CASCADE;


--
-- Name: directus_sessions directus_sessions_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_settings directus_settings_project_logo_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_project_logo_foreign FOREIGN KEY (project_logo) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_background_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_background_foreign FOREIGN KEY (public_background) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_favicon_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_favicon_foreign FOREIGN KEY (public_favicon) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_foreground_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_foreground_foreign FOREIGN KEY (public_foreground) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_registration_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_registration_role_foreign FOREIGN KEY (public_registration_role) REFERENCES public.directus_roles(id) ON DELETE SET NULL;


--
-- Name: directus_settings directus_settings_storage_default_folder_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_storage_default_folder_foreign FOREIGN KEY (storage_default_folder) REFERENCES public.directus_folders(id) ON DELETE SET NULL;


--
-- Name: directus_shares directus_shares_collection_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_collection_foreign FOREIGN KEY (collection) REFERENCES public.directus_collections(collection) ON DELETE CASCADE;


--
-- Name: directus_shares directus_shares_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;


--
-- Name: directus_shares directus_shares_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_users directus_users_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE SET NULL;


--
-- Name: directus_versions directus_versions_collection_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_collection_foreign FOREIGN KEY (collection) REFERENCES public.directus_collections(collection) ON DELETE CASCADE;


--
-- Name: directus_versions directus_versions_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_versions directus_versions_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id);


--
-- Name: directus_webhooks directus_webhooks_migrated_flow_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directus_webhooks
    ADD CONSTRAINT directus_webhooks_migrated_flow_foreign FOREIGN KEY (migrated_flow) REFERENCES public.directus_flows(id) ON DELETE SET NULL;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE directus_access; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_access TO anon;
GRANT ALL ON TABLE public.directus_access TO authenticated;
GRANT ALL ON TABLE public.directus_access TO service_role;


--
-- Name: TABLE directus_activity; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_activity TO anon;
GRANT ALL ON TABLE public.directus_activity TO authenticated;
GRANT ALL ON TABLE public.directus_activity TO service_role;


--
-- Name: SEQUENCE directus_activity_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.directus_activity_id_seq TO anon;
GRANT ALL ON SEQUENCE public.directus_activity_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.directus_activity_id_seq TO service_role;


--
-- Name: TABLE directus_collections; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_collections TO anon;
GRANT ALL ON TABLE public.directus_collections TO authenticated;
GRANT ALL ON TABLE public.directus_collections TO service_role;


--
-- Name: TABLE directus_comments; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_comments TO anon;
GRANT ALL ON TABLE public.directus_comments TO authenticated;
GRANT ALL ON TABLE public.directus_comments TO service_role;


--
-- Name: TABLE directus_dashboards; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_dashboards TO anon;
GRANT ALL ON TABLE public.directus_dashboards TO authenticated;
GRANT ALL ON TABLE public.directus_dashboards TO service_role;


--
-- Name: TABLE directus_extensions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_extensions TO anon;
GRANT ALL ON TABLE public.directus_extensions TO authenticated;
GRANT ALL ON TABLE public.directus_extensions TO service_role;


--
-- Name: TABLE directus_fields; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_fields TO anon;
GRANT ALL ON TABLE public.directus_fields TO authenticated;
GRANT ALL ON TABLE public.directus_fields TO service_role;


--
-- Name: SEQUENCE directus_fields_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.directus_fields_id_seq TO anon;
GRANT ALL ON SEQUENCE public.directus_fields_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.directus_fields_id_seq TO service_role;


--
-- Name: TABLE directus_files; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_files TO anon;
GRANT ALL ON TABLE public.directus_files TO authenticated;
GRANT ALL ON TABLE public.directus_files TO service_role;


--
-- Name: TABLE directus_flows; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_flows TO anon;
GRANT ALL ON TABLE public.directus_flows TO authenticated;
GRANT ALL ON TABLE public.directus_flows TO service_role;


--
-- Name: TABLE directus_folders; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_folders TO anon;
GRANT ALL ON TABLE public.directus_folders TO authenticated;
GRANT ALL ON TABLE public.directus_folders TO service_role;


--
-- Name: TABLE directus_migrations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_migrations TO anon;
GRANT ALL ON TABLE public.directus_migrations TO authenticated;
GRANT ALL ON TABLE public.directus_migrations TO service_role;


--
-- Name: TABLE directus_notifications; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_notifications TO anon;
GRANT ALL ON TABLE public.directus_notifications TO authenticated;
GRANT ALL ON TABLE public.directus_notifications TO service_role;


--
-- Name: SEQUENCE directus_notifications_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.directus_notifications_id_seq TO anon;
GRANT ALL ON SEQUENCE public.directus_notifications_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.directus_notifications_id_seq TO service_role;


--
-- Name: TABLE directus_operations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_operations TO anon;
GRANT ALL ON TABLE public.directus_operations TO authenticated;
GRANT ALL ON TABLE public.directus_operations TO service_role;


--
-- Name: TABLE directus_panels; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_panels TO anon;
GRANT ALL ON TABLE public.directus_panels TO authenticated;
GRANT ALL ON TABLE public.directus_panels TO service_role;


--
-- Name: TABLE directus_permissions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_permissions TO anon;
GRANT ALL ON TABLE public.directus_permissions TO authenticated;
GRANT ALL ON TABLE public.directus_permissions TO service_role;


--
-- Name: SEQUENCE directus_permissions_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.directus_permissions_id_seq TO anon;
GRANT ALL ON SEQUENCE public.directus_permissions_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.directus_permissions_id_seq TO service_role;


--
-- Name: TABLE directus_policies; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_policies TO anon;
GRANT ALL ON TABLE public.directus_policies TO authenticated;
GRANT ALL ON TABLE public.directus_policies TO service_role;


--
-- Name: TABLE directus_presets; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_presets TO anon;
GRANT ALL ON TABLE public.directus_presets TO authenticated;
GRANT ALL ON TABLE public.directus_presets TO service_role;


--
-- Name: SEQUENCE directus_presets_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.directus_presets_id_seq TO anon;
GRANT ALL ON SEQUENCE public.directus_presets_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.directus_presets_id_seq TO service_role;


--
-- Name: TABLE directus_relations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_relations TO anon;
GRANT ALL ON TABLE public.directus_relations TO authenticated;
GRANT ALL ON TABLE public.directus_relations TO service_role;


--
-- Name: SEQUENCE directus_relations_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.directus_relations_id_seq TO anon;
GRANT ALL ON SEQUENCE public.directus_relations_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.directus_relations_id_seq TO service_role;


--
-- Name: TABLE directus_revisions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_revisions TO anon;
GRANT ALL ON TABLE public.directus_revisions TO authenticated;
GRANT ALL ON TABLE public.directus_revisions TO service_role;


--
-- Name: SEQUENCE directus_revisions_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.directus_revisions_id_seq TO anon;
GRANT ALL ON SEQUENCE public.directus_revisions_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.directus_revisions_id_seq TO service_role;


--
-- Name: TABLE directus_roles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_roles TO anon;
GRANT ALL ON TABLE public.directus_roles TO authenticated;
GRANT ALL ON TABLE public.directus_roles TO service_role;


--
-- Name: TABLE directus_sessions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_sessions TO anon;
GRANT ALL ON TABLE public.directus_sessions TO authenticated;
GRANT ALL ON TABLE public.directus_sessions TO service_role;


--
-- Name: TABLE directus_settings; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_settings TO anon;
GRANT ALL ON TABLE public.directus_settings TO authenticated;
GRANT ALL ON TABLE public.directus_settings TO service_role;


--
-- Name: SEQUENCE directus_settings_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.directus_settings_id_seq TO anon;
GRANT ALL ON SEQUENCE public.directus_settings_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.directus_settings_id_seq TO service_role;


--
-- Name: TABLE directus_shares; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_shares TO anon;
GRANT ALL ON TABLE public.directus_shares TO authenticated;
GRANT ALL ON TABLE public.directus_shares TO service_role;


--
-- Name: TABLE directus_translations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_translations TO anon;
GRANT ALL ON TABLE public.directus_translations TO authenticated;
GRANT ALL ON TABLE public.directus_translations TO service_role;


--
-- Name: TABLE directus_users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_users TO anon;
GRANT ALL ON TABLE public.directus_users TO authenticated;
GRANT ALL ON TABLE public.directus_users TO service_role;


--
-- Name: TABLE directus_versions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_versions TO anon;
GRANT ALL ON TABLE public.directus_versions TO authenticated;
GRANT ALL ON TABLE public.directus_versions TO service_role;


--
-- Name: TABLE directus_webhooks; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.directus_webhooks TO anon;
GRANT ALL ON TABLE public.directus_webhooks TO authenticated;
GRANT ALL ON TABLE public.directus_webhooks TO service_role;


--
-- Name: SEQUENCE directus_webhooks_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.directus_webhooks_id_seq TO anon;
GRANT ALL ON SEQUENCE public.directus_webhooks_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.directus_webhooks_id_seq TO service_role;


--
-- Name: TABLE navigation; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.navigation TO anon;
GRANT ALL ON TABLE public.navigation TO authenticated;
GRANT ALL ON TABLE public.navigation TO service_role;


--
-- Name: SEQUENCE navigation_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.navigation_id_seq TO anon;
GRANT ALL ON SEQUENCE public.navigation_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.navigation_id_seq TO service_role;


--
-- Name: TABLE pages; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.pages TO anon;
GRANT ALL ON TABLE public.pages TO authenticated;
GRANT ALL ON TABLE public.pages TO service_role;


--
-- Name: SEQUENCE pages_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.pages_id_seq TO anon;
GRANT ALL ON SEQUENCE public.pages_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.pages_id_seq TO service_role;


--
-- Name: TABLE services; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.services TO anon;
GRANT ALL ON TABLE public.services TO authenticated;
GRANT ALL ON TABLE public.services TO service_role;


--
-- Name: SEQUENCE services_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.services_id_seq TO anon;
GRANT ALL ON SEQUENCE public.services_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.services_id_seq TO service_role;


--
-- Name: TABLE settings; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.settings TO anon;
GRANT ALL ON TABLE public.settings TO authenticated;
GRANT ALL ON TABLE public.settings TO service_role;


--
-- Name: SEQUENCE settings_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.settings_id_seq TO anon;
GRANT ALL ON SEQUENCE public.settings_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.settings_id_seq TO service_role;


--
-- Name: TABLE testimonials; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.testimonials TO anon;
GRANT ALL ON TABLE public.testimonials TO authenticated;
GRANT ALL ON TABLE public.testimonials TO service_role;


--
-- Name: SEQUENCE testimonials_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.testimonials_id_seq TO anon;
GRANT ALL ON SEQUENCE public.testimonials_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.testimonials_id_seq TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

