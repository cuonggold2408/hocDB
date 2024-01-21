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
-- Name: devices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.devices (
    id integer NOT NULL,
    user_id integer,
    device_name character varying(100),
    time_login timestamp with time zone DEFAULT now(),
    device_os character varying(100),
    time_action_last timestamp with time zone DEFAULT now()
);


ALTER TABLE public.devices OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    email character varying(100),
    password character varying(255),
    status boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_device_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_device_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_device_id_seq OWNER TO postgres;

--
-- Name: users_device_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_device_id_seq OWNED BY public.devices.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: devices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices ALTER COLUMN id SET DEFAULT nextval('public.users_device_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: devices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.devices (id, user_id, device_name, time_login, device_os, time_action_last) FROM stdin;
21	5	Chrome	2024-01-22 03:56:27.366+07	Windows 10.0	2024-01-22 04:04:46.741+07
22	5	Edge	2024-01-22 04:05:07.391+07	Windows 10.0	2024-01-22 04:04:46.741+07
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, status, created_at, updated_at) FROM stdin;
2	Cường Nguyễn	cuonggold2408@gmail.com	$2b$10$P3EiBR8Lci0zDOL3U/I2VO7htG.GUJVhOke.q8VYWSVH/Tu95bB7G	f	2024-01-14 23:30:51.276982+07	2024-01-14 23:30:51.276982+07
3	Học JS ko khó	abc@gmail.com	$2b$10$v3vMw9Na7YQjX4AmzhoRRuN8oYuiUG3Wx.0UgjOjgZyl/3oj/TbTq	t	2024-01-15 00:00:49.962525+07	2024-01-15 00:00:49.962525+07
5	test	test@gmail.com	$2b$10$3RTD6eRY8bxiRS4QghOZhuUgEonNEL8LxSBTQV0uutssRK/UANr7W	t	2024-01-21 17:10:27.062453+07	2024-01-21 17:10:27.062453+07
1	Nguyễn Quang Cường	cuongbn2004@gmail.com	$2b$10$ZXKoFvxdH5ULjh4eK4Yoj.EqFTa58RsOqBdFLIZhUzVkZgziGLx4S	t	2024-01-14 23:27:10.505509+07	2024-01-14 23:27:10.505509+07
\.


--
-- Name: users_device_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_device_id_seq', 22, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: devices users_device_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT users_device_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: devices users_device_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT users_device_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

