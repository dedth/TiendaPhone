-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.4
-- PostgreSQL version: 15.0
-- Project Site: pgmodeler.io
-- Model Author: ---
-- -- object: pg_database_owner | type: ROLE --
-- -- DROP ROLE IF EXISTS pg_database_owner;
-- CREATE ROLE pg_database_owner WITH 
-- 	INHERIT
-- 	 PASSWORD '********';
-- -- ddl-end --
-- 

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: celltechproyecto | type: DATABASE --
-- DROP DATABASE IF EXISTS celltechproyecto;
CREATE DATABASE celltechproyecto
	ENCODING = 'UTF8'
	LC_COLLATE = 'Spanish_Mexico.1252'
	LC_CTYPE = 'Spanish_Mexico.1252'
	TABLESPACE = pg_default
	OWNER = postgres;
-- ddl-end --


-- object: "uuid-ossp" | type: EXTENSION --
-- DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;
CREATE EXTENSION "uuid-ossp"
WITH SCHEMA public
VERSION '1.1';
-- ddl-end --
COMMENT ON EXTENSION "uuid-ossp" IS E'generate universally unique identifiers (UUIDs)';
-- ddl-end --

-- object: public.comentario_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.comentario_id_seq CASCADE;
CREATE SEQUENCE public.comentario_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.comentario_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.comentario | type: TABLE --
-- DROP TABLE IF EXISTS public.comentario CASCADE;
CREATE TABLE public.comentario (
	id integer NOT NULL DEFAULT nextval('public.comentario_id_seq'::regclass),
	nombre character varying(50) NOT NULL,
	email character varying(50) NOT NULL,
	comentario character varying(50) NOT NULL,
	CONSTRAINT "PK_c9014211e5fbf491b9e3543bb19" PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.comentario OWNER TO postgres;
-- ddl-end --

-- object: public.contacto_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.contacto_id_seq CASCADE;
CREATE SEQUENCE public.contacto_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.contacto_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.contacto | type: TABLE --
-- DROP TABLE IF EXISTS public.contacto CASCADE;
CREATE TABLE public.contacto (
	id integer NOT NULL DEFAULT nextval('public.contacto_id_seq'::regclass),
	nombre character varying(50) NOT NULL,
	email character varying(50) NOT NULL,
	asunto character varying(50) NOT NULL,
	mensage character varying(200) NOT NULL,
	CONSTRAINT "PK_fcab8128cce0aac92da26cf1883" PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.contacto OWNER TO postgres;
-- ddl-end --

-- object: public.ordenes | type: TABLE --
-- DROP TABLE IF EXISTS public.ordenes CASCADE;
CREATE TABLE public.ordenes (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	adress character varying(50) NOT NULL,
	price numeric(8,2) NOT NULL,
	date character varying(25) NOT NULL,
	"userId" uuid NOT NULL,
	CONSTRAINT "PK_58713affeb8e3b7b30b9eeeee7a" PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.ordenes OWNER TO postgres;
-- ddl-end --

-- object: public."ordenes-productos" | type: TABLE --
-- DROP TABLE IF EXISTS public."ordenes-productos" CASCADE;
CREATE TABLE public."ordenes-productos" (
	"orderId" uuid NOT NULL,
	"productId" uuid NOT NULL,
	quantity integer NOT NULL,
	CONSTRAINT "PK_f7344e04d85653182876bd7c455" PRIMARY KEY ("orderId","productId")
);
-- ddl-end --
ALTER TABLE public."ordenes-productos" OWNER TO postgres;
-- ddl-end --

-- object: public.producto | type: TABLE --
-- DROP TABLE IF EXISTS public.producto CASCADE;
CREATE TABLE public.producto (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	nombre character varying(50) NOT NULL,
	precio double precision NOT NULL,
	descripcion character varying(200) NOT NULL,
	CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.producto OWNER TO postgres;
-- ddl-end --

-- object: public.rol_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.rol_id_seq CASCADE;
CREATE SEQUENCE public.rol_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.rol_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.rol | type: TABLE --
-- DROP TABLE IF EXISTS public.rol CASCADE;
CREATE TABLE public.rol (
	id integer NOT NULL DEFAULT nextval('public.rol_id_seq'::regclass),
	"rolNombre" character varying(10) NOT NULL,
	CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY (id),
	CONSTRAINT "UQ_219757a66cff5ac7898e2ad9a86" UNIQUE ("rolNombre")
);
-- ddl-end --
ALTER TABLE public.rol OWNER TO postgres;
-- ddl-end --

-- object: public.usuario | type: TABLE --
-- DROP TABLE IF EXISTS public.usuario CASCADE;
CREATE TABLE public.usuario (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	"nombreUsuario" character varying(50) NOT NULL,
	email character varying(50) NOT NULL,
	password character varying NOT NULL,
	CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY (id),
	CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE (email),
	CONSTRAINT "UQ_7ea57d693272b94228192c612bf" UNIQUE ("nombreUsuario")
);
-- ddl-end --
ALTER TABLE public.usuario OWNER TO postgres;
-- ddl-end --

-- object: public.usuario_rol | type: TABLE --
-- DROP TABLE IF EXISTS public.usuario_rol CASCADE;
CREATE TABLE public.usuario_rol (
	usuario_id uuid NOT NULL,
	rol_id integer NOT NULL,
	CONSTRAINT "PK_40b321ebb932d588934043a2639" PRIMARY KEY (usuario_id,rol_id)
);
-- ddl-end --
ALTER TABLE public.usuario_rol OWNER TO postgres;
-- ddl-end --

-- object: "IDX_29e9a9079c7ba01c1b301cf555" | type: INDEX --
-- DROP INDEX IF EXISTS public."IDX_29e9a9079c7ba01c1b301cf555" CASCADE;
CREATE INDEX "IDX_29e9a9079c7ba01c1b301cf555" ON public.usuario_rol
USING btree
(
	usuario_id
)
WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: "IDX_ac8911cd54a61461c992654140" | type: INDEX --
-- DROP INDEX IF EXISTS public."IDX_ac8911cd54a61461c992654140" CASCADE;
CREATE INDEX "IDX_ac8911cd54a61461c992654140" ON public.usuario_rol
USING btree
(
	rol_id
)
WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: "FK_c0ec3c873dff0860bd8d4767def" | type: CONSTRAINT --
-- ALTER TABLE public.ordenes DROP CONSTRAINT IF EXISTS "FK_c0ec3c873dff0860bd8d4767def" CASCADE;
ALTER TABLE public.ordenes ADD CONSTRAINT "FK_c0ec3c873dff0860bd8d4767def" FOREIGN KEY ("userId")
REFERENCES public.usuario (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "FK_7c20bda85621d2ea83acf033b9a" | type: CONSTRAINT --
-- ALTER TABLE public."ordenes-productos" DROP CONSTRAINT IF EXISTS "FK_7c20bda85621d2ea83acf033b9a" CASCADE;
ALTER TABLE public."ordenes-productos" ADD CONSTRAINT "FK_7c20bda85621d2ea83acf033b9a" FOREIGN KEY ("orderId")
REFERENCES public.ordenes (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "FK_e041d31050b1ef88652d38e42da" | type: CONSTRAINT --
-- ALTER TABLE public."ordenes-productos" DROP CONSTRAINT IF EXISTS "FK_e041d31050b1ef88652d38e42da" CASCADE;
ALTER TABLE public."ordenes-productos" ADD CONSTRAINT "FK_e041d31050b1ef88652d38e42da" FOREIGN KEY ("productId")
REFERENCES public.producto (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "FK_29e9a9079c7ba01c1b301cf5555" | type: CONSTRAINT --
-- ALTER TABLE public.usuario_rol DROP CONSTRAINT IF EXISTS "FK_29e9a9079c7ba01c1b301cf5555" CASCADE;
ALTER TABLE public.usuario_rol ADD CONSTRAINT "FK_29e9a9079c7ba01c1b301cf5555" FOREIGN KEY (usuario_id)
REFERENCES public.usuario (id) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: "FK_ac8911cd54a61461c9926541401" | type: CONSTRAINT --
-- ALTER TABLE public.usuario_rol DROP CONSTRAINT IF EXISTS "FK_ac8911cd54a61461c9926541401" CASCADE;
ALTER TABLE public.usuario_rol ADD CONSTRAINT "FK_ac8911cd54a61461c9926541401" FOREIGN KEY (rol_id)
REFERENCES public.rol (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "grant_CU_26541e8cda" | type: PERMISSION --
GRANT CREATE,USAGE
   ON SCHEMA public
   TO pg_database_owner;
-- ddl-end --

-- object: "grant_U_cd8e46e7b6" | type: PERMISSION --
GRANT USAGE
   ON SCHEMA public
   TO PUBLIC;
-- ddl-end --


