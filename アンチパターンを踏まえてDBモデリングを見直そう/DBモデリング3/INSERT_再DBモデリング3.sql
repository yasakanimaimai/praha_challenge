-- user
INSERT INTO db_modeling_3.user VALUES 
(
  uuid_generate_v4(),
	'ユーザ１'
);

SELECT * FROM db_modeling_3.user;
                  id                  |   name   
--------------------------------------+----------
 2db7a332-b8b0-4ca6-b334-aaf28c96e302 | ユーザ１


-- directory_status
INSERT INTO db_modeling_3.directory_status VALUES 
(
  uuid_generate_v4(),
	'created'
)
,(
  uuid_generate_v4(),
	'updated'
)
,(
  uuid_generate_v4(),
	'deleted'
)
,(
  uuid_generate_v4(),
	'recovered'
)
;

SELECT * FROM directory_status;
                  id                  |  status   
--------------------------------------+-----------
 ccc7037e-f846-4b25-9e53-8aafbccf84b1 | created
 919cfa98-cbbf-47e1-977e-949b32d099bc | updated
 ae04383e-bcb1-4cce-ba34-6fbfa40e27cb | deleted
 b01dcfbe-2e32-4b1d-9e32-89b28b9a591f | recovered



-- directory
INSERT INTO db_modeling_3.directory VALUES (
  uuid_generate_v4(),
	'ディレクトリ１',
	'ccc7037e-f846-4b25-9e53-8aafbccf84b1'
);

SELECT * FROM directory;
                  id                  |      name      |            latest_status             
--------------------------------------+----------------+--------------------------------------
 32ab497d-662d-48fb-8951-a4232f5bb458 | ディレクトリ１ | ccc7037e-f846-4b25-9e53-8aafbccf84b1



-- directory_activity
INSERT INTO db_modeling_3.directory_activity VALUES (
  uuid_generate_v4(),
  '32ab497d-662d-48fb-8951-a4232f5bb458', -- directory_id
  '2db7a332-b8b0-4ca6-b334-aaf28c96e302', -- actived_user
	'ccc7037e-f846-4b25-9e53-8aafbccf84b1', -- status
	current_timestamp -- actived_at
);

SELECT * FROM directory_activity;
                  id                  |             directory_id             |             actived_user             |                status                |          actived_at           
--------------------------------------+--------------------------------------+--------------------------------------+--------------------------------------+-------------------------------
 3ad6203c-5533-4903-8410-3ef635bba3be | 32ab497d-662d-48fb-8951-a4232f5bb458 | 2db7a332-b8b0-4ca6-b334-aaf28c96e302 | ccc7037e-f846-4b25-9e53-8aafbccf84b1 | 2022-08-31 20:19:10.480237+09


-- directory_relation
INSERT INTO db_modeling_3.directory_relation VALUES (
  '32ab497d-662d-48fb-8951-a4232f5bb458', -- parent_directory
  '32ab497d-662d-48fb-8951-a4232f5bb458', -- child_directory
  0 -- length
);

SELECT * FROM directory_relation;
           parent_directory           |           child_directory            | length 
--------------------------------------+--------------------------------------+--------
 32ab497d-662d-48fb-8951-a4232f5bb458 | 32ab497d-662d-48fb-8951-a4232f5bb458 |      0



-- create_directory
INSERT INTO db_modeling_3.create_directory VALUES (
  '3ad6203c-5533-4903-8410-3ef635bba3be'
);

SELECT * FROM create_directory;
        directory_activity_id         
--------------------------------------
 3ad6203c-5533-4903-8410-3ef635bba3be





-- document_status
INSERT INTO db_modeling_3.document_status VALUES 
(
  uuid_generate_v4(),
	'created'
)
,(
  uuid_generate_v4(),
	'updated'
)
,(
  uuid_generate_v4(),
	'deleted'
)
,(
  uuid_generate_v4(),
	'recovered'
)
;

SELECT * FROM document_status;
                  id                  |  status   
--------------------------------------+-----------
 01b006ff-26b8-4c35-9fad-24abd5d9f499 | created
 f234b341-6e21-40e8-8ac7-77fd52c845e3 | updated
 1b57da24-7e6c-4f0c-9939-ee03436744b5 | deleted
 3b1c1c76-fa39-4c6f-8690-f69362da5df6 | recovered


-- document
INSERT INTO db_modeling_3.document VALUES 
(
  uuid_generate_v4(),
	'ドキュメント3',
	'01b006ff-26b8-4c35-9fad-24abd5d9f499', -- latest_status
	'本文3', -- latest_content
	3 -- order
)
,(
  uuid_generate_v4(),
	'ドキュメント2',
	'01b006ff-26b8-4c35-9fad-24abd5d9f499', -- latest_status
	'本文2', -- latest_content
	2 -- order
)
,(
  uuid_generate_v4(),
	'ドキュメント１',
	'01b006ff-26b8-4c35-9fad-24abd5d9f499', -- latest_status
	'本文１', -- latest_content
	1 -- order
);

SELECT * FROM document;
                  id                  |      name      |            latest_status             | latest_content | order 
--------------------------------------+----------------+--------------------------------------+----------------+-------
 dda19db5-91c3-48e3-9418-6ce905a4b669 | ドキュメント１ | 01b006ff-26b8-4c35-9fad-24abd5d9f499 | 本文１         |     1
 18545720-0d58-48d0-874e-03ad8d1f1f16 | ドキュメント2  | 01b006ff-26b8-4c35-9fad-24abd5d9f499 | 本文2          |     2
 4c6312d4-469e-4c86-bfa7-429889aa7074 | ドキュメント3  | 01b006ff-26b8-4c35-9fad-24abd5d9f499 | 本文3          |     3


-- document_activity
INSERT INTO db_modeling_3.document_activity VALUES 
(
  uuid_generate_v4(),
  '4c6312d4-469e-4c86-bfa7-429889aa7074', -- document_id
  '2db7a332-b8b0-4ca6-b334-aaf28c96e302', -- actived_user
	'01b006ff-26b8-4c35-9fad-24abd5d9f499', -- status
	current_timestamp -- actived_at
)
,(
  uuid_generate_v4(),
  '18545720-0d58-48d0-874e-03ad8d1f1f16', -- document_id
  '2db7a332-b8b0-4ca6-b334-aaf28c96e302', -- actived_user
	'01b006ff-26b8-4c35-9fad-24abd5d9f499', -- status
	current_timestamp -- actived_at
)
,(
  uuid_generate_v4(),
  'dda19db5-91c3-48e3-9418-6ce905a4b669', -- document_id
  '2db7a332-b8b0-4ca6-b334-aaf28c96e302', -- actived_user
	'01b006ff-26b8-4c35-9fad-24abd5d9f499', -- status
	current_timestamp -- actived_at
)
;

SELECT * FROM document_activity;
                  id                  |             document_id              |             actived_user             |                status                |          actived_at           
--------------------------------------+--------------------------------------+--------------------------------------+--------------------------------------+-------------------------------
 371dd25f-c12b-4d67-a8b0-71c90ed3f129 | dda19db5-91c3-48e3-9418-6ce905a4b669 | 2db7a332-b8b0-4ca6-b334-aaf28c96e302 | 01b006ff-26b8-4c35-9fad-24abd5d9f499 | 2022-08-31 20:38:41.012608+09
 0c99d389-edfe-4968-89bb-663469468265 | 4c6312d4-469e-4c86-bfa7-429889aa7074 | 2db7a332-b8b0-4ca6-b334-aaf28c96e302 | 01b006ff-26b8-4c35-9fad-24abd5d9f499 | 2022-08-31 20:52:01.835278+09
 1d136ac7-ba6f-4369-9911-37bf82988a67 | 18545720-0d58-48d0-874e-03ad8d1f1f16 | 2db7a332-b8b0-4ca6-b334-aaf28c96e302 | 01b006ff-26b8-4c35-9fad-24abd5d9f499 | 2022-08-31 20:52:01.835278+09

-- directory_document_relation
INSERT INTO db_modeling_3.directory_document_relation VALUES 
(
  '32ab497d-662d-48fb-8951-a4232f5bb458', -- parent_directory
  '4c6312d4-469e-4c86-bfa7-429889aa7074', -- child_document
  1 -- length
)
,(
  '32ab497d-662d-48fb-8951-a4232f5bb458', -- parent_directory
  '18545720-0d58-48d0-874e-03ad8d1f1f16', -- child_document
  1 -- length
)
,(
  '32ab497d-662d-48fb-8951-a4232f5bb458', -- parent_directory
  'dda19db5-91c3-48e3-9418-6ce905a4b669', -- child_document
  1 -- length
)
;

SELECT * FROM directory_document_relation;
           parent_directory           |            child_document            | length 
--------------------------------------+--------------------------------------+--------
 32ab497d-662d-48fb-8951-a4232f5bb458 | dda19db5-91c3-48e3-9418-6ce905a4b669 |      1



-- create_document
INSERT INTO db_modeling_3.create_document VALUES 
(
  '1d136ac7-ba6f-4369-9911-37bf82988a67',
  '本文3' -- content
)
,(
  '0c99d389-edfe-4968-89bb-663469468265',
  '本文2' -- content
)
,(
  '371dd25f-c12b-4d67-a8b0-71c90ed3f129',
  '本文１' -- content
)
;

SELECT * FROM create_document;
         document_activity_id         | content 
--------------------------------------+---------
 371dd25f-c12b-4d67-a8b0-71c90ed3f129 | 本文１

