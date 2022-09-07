SELECT 
  *
FROM
  issue
  left outer join (
    case issue.type
      when 'bugs' then 'bugs'
      when 'request' then 'request'
  )
where
  issue.id = 1 -- 特定のissue_id
;



select * from issue;
 id | type 
----+------
  1 |    1 -- bugsに紐づく
  2 |    2 -- requestに紐づく

select * from bugs;
 id 
----
  1

select * from request;
 id 
----
  2
