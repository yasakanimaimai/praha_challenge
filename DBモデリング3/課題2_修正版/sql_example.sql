-- 参照ディレクトリ配下のドキュメントを一覧取得する
SELECT 
  *
FROM
  content 
  INNER JOIN
    dicrectory_content_closure AS closure -- 参照ディレクトリ直下のコンテンツを取得
    ON  closure.directory_id = ?
    AND content.content_id = closure.content_id
    AND closure.depth = 1
  INNER JOIN
    dicrectory_content_order AS order -- コンテンツの並び順を取得
    ON  order.directory_id = ? 
    AND content.content_id = closure.content_id
    AND closure.depth = 1
WHERE
  content.id <> (SELECT id FROM deleted_content) -- 削除テーブルに存在するコンテンツを除外
  AND content.content_type = 'document' -- コンテンツ内のドキュメントを指定