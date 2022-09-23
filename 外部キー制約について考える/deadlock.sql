-- TX１
begin;
update book set id = gen_random_uuid() where id = '3266eca5-67f8-4111-80d6-902e9182a3dc';

-- TX2
-- 排他ロック確認
select * from author where id = '872f264e-9f5c-4c9b-8dcf-653bf3b8554e';

-- 共有ロック確認
update author set name = 'fujita_iori' where id = '872f264e-9f5c-4c9b-8dcf-653bf3b8554e';

-- 上記を実行してもデッドロックにはならなかったが。。後で確認する