--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 'dd2291f3-4a84-4594-8c38-cc07b316ed62', 5);
INSERT INTO public.sessions VALUES (2, '38fe2f16-1fb5-4141-9603-1ee5775f01d6', 5);
INSERT INTO public.sessions VALUES (3, '4837bde1-bf70-455b-b109-34490ec96c5f', 6);
INSERT INTO public.sessions VALUES (4, 'a736ba5c-774e-4c4b-99b8-04c89a414f67', 5);
INSERT INTO public.sessions VALUES (5, 'fce344f5-7c6a-4a5c-8023-fabe7a5cbea3', 2);
INSERT INTO public.sessions VALUES (6, '06db3992-a9bc-4b3c-b8f7-0c90ed42731b', 1);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (3, 1, 'https://www.youtube.com/@viniccius13', 'YMqRbJ0kCh', 1, '2022-12-21');
INSERT INTO public.urls VALUES (1, 1, 'https://www.acorujaboo.com/jogos_educativos.php', 'noBl-hSBWS', 2, '2022-12-21');
INSERT INTO public.urls VALUES (2, 1, 'https://www.youtube.com/@viniccius13', '_39pMqAuSP', 7, '2022-12-21');
INSERT INTO public.urls VALUES (4, 1, 'https://www.youtube.com/watch?v=FcvY6cWdR70&ab_channel=ShinGiwonPiano', 'WV_MZoRaTi', 1, '2022-12-21');
INSERT INTO public.urls VALUES (13, 6, 'https://br.pinterest.com/pin/6966574417272510/', '1ctOHWXfNG', 1, '2022-12-22');
INSERT INTO public.urls VALUES (15, 6, 'https://www.youtube.com/watch?v=Cl4N6LxG0sA&ab_channel=ChillPiano', 'DCUq0HYRiu', 0, '2022-12-22');
INSERT INTO public.urls VALUES (16, 5, 'https://www.youtube.com/@HDDaviGamer', 'QqaRHZ7lEx', 0, '2022-12-22');
INSERT INTO public.urls VALUES (17, 5, 'https://www.supercoloring.com/coloring-pages/reptiles/snakes', 'PhAVwKEOPE', 2, '2022-12-22');
INSERT INTO public.urls VALUES (18, 2, 'https://www.youtube.com/@DiegoFaustino68', '59shIqjxWb', 0, '2022-12-22');
INSERT INTO public.urls VALUES (19, 2, 'https://reverb.com/', 'pHtTOnNWja', 4, '2022-12-22');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Bruna', 'bruna@gmail.com', '$2b$10$4Fbj.BAmSi/pDNevIaZyD./QApxq2CMVF.bEZW7qDICzyVKudOLie', '2022-12-21');
INSERT INTO public.users VALUES (2, 'Juan', 'juan@gmail.com', '$2b$10$ljfZQK6PAKPv7yjT4mFj6.U7d5RQXnFY/q1XIZhFMoatxvDQ1v3NK', '2022-12-20');
INSERT INTO public.users VALUES (5, 'Isaque', 'isaque@gmail.com', '$2b$10$3fHTmo6yJrXTEP5RUKFz7eFg47jnqQ3/.1wgAr46JrEi4dJ3lA3O6', '2022-12-21');
INSERT INTO public.users VALUES (6, 'Ana', 'ana@gmail.com', '$2b$10$mjHX00Ju6WJw9ublg3SGpOBvg.e7x8J4ZdeYqVLbgCkZgWkSI.fsa', '2022-12-22');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 6, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 19, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

