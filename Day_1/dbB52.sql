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
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    price double precision,
    "description " text,
    content text NOT NULL,
    teacher_id integer NOT NULL,
    active integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: teacher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher (
    id integer NOT NULL,
    name character varying NOT NULL,
    bio text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.teacher OWNER TO postgres;

--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, name, price, "description ", content, teacher_id, active, created_at, updated_at) FROM stdin;
1	Laravel và PHP	1000000	Học lập trình để đi làm	Học lập trình không khó	1	2023	2023-12-31 18:33:54.924351+07	2023-12-31 18:33:54.924351+07
2	Học SQL nâng cao	300000	Học lập trình để đi làm	Làm chủ SQL	1	2023	2023-12-31 18:34:43.828355+07	2023-12-31 18:34:43.828355+07
3	Học NodeJs từ cơ bản đến nâng cao	500000	Học lập trình để đi làm	Học Nodejs không khó	1	2023	2023-12-31 18:35:31.526578+07	2023-12-31 18:35:31.526578+07
4	HTML CSS Pro	999000	Học lập trình để đi làm	Làm chủ cắt giao diện	2	2022	2023-12-31 18:36:29.829401+07	2023-12-31 18:36:29.829401+07
5	Lập trình Javascript Pro	7000000	Học lập trình để đi làm	Học JS không khó	2	2023	2023-12-31 18:37:20.048892+07	2023-12-31 18:37:20.048892+07
6	Học NextJs Pro	800000	Học lập trình không khó	Học NextJs thật vui	2	2023	2023-12-31 18:38:24.814744+07	2023-12-31 18:38:24.814744+07
7	Luyện thi THPT môn Hóa Học	600000	Học IT đi dạy Hóa	Múa VDC 3 dòng	3	2023	2023-12-31 18:39:42.849621+07	2023-12-31 18:39:42.849621+07
8	Luyện thi HSG Hóa cấp tỉnh	1200000	Học IT đi dạy Hóa	Luyện phản xạ, tốc độ	3	2023	2023-12-31 18:40:41.73834+07	2023-12-31 18:40:41.73834+07
9	Ôn thi học kì môn Hóa lớp 11	100000	Học IT đi dạy Hóa	Mục tiêu 10 điểm cuối kì	3	2023	2023-12-31 18:41:42.286131+07	2023-12-31 18:41:42.286131+07
\.


--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teacher (id, name, bio, created_at, updated_at) FROM stdin;
1	Tạ Hoàng An	Unicode Academy	2023-12-31 18:06:45.128626+07	2023-12-31 18:06:45.128626+07
2	Sơn Đặng	FullstackF8	2023-12-31 18:06:45.128626+07	2023-12-31 18:06:45.128626+07
3	Cường Nguyễn	UET	2023-12-31 18:06:45.128626+07	2023-12-31 18:06:45.128626+07
\.


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: teacher teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (id);


--
-- Name: courses courses_teacher_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_teacher_foreign FOREIGN KEY (teacher_id) REFERENCES public.teacher(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

