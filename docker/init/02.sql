INSERT INTO public.tasks (url,"method",body,cron) VALUES
	 ('https://google.com','GET','','*/10 * * * * *'),
	 ('https://api.ipify.org','GET','','1 * * * * *'),
	 ('http://localhost:3000/tasks/','POST','{"cron":"* * * * * *","url":"https://ya.ru","method":"GET"}','* * * * * *');
