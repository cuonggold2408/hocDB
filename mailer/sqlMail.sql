--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: mails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mails (
    id integer NOT NULL,
    email character varying(100),
    title character varying,
    content character varying,
    status boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    time_send time with time zone
);


ALTER TABLE public.mails OWNER TO postgres;

--
-- Name: mailer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mailer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mailer_id_seq OWNER TO postgres;

--
-- Name: mailer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mailer_id_seq OWNED BY public.mails.id;


--
-- Name: mails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mails ALTER COLUMN id SET DEFAULT nextval('public.mailer_id_seq'::regclass);


--
-- Data for Name: mails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mails (id, email, title, content, status, created_at, updated_at, time_send) FROM stdin;
1	cuongbn6c@gmail.com	test test  	hello	f	2024-01-24 23:10:45.593+07	2024-01-24 23:10:45.593+07	16:10:42.941+00
\.


--
-- Name: mailer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mailer_id_seq', 1, true);


--
-- Name: mails mailer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mails
    ADD CONSTRAINT mailer_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

