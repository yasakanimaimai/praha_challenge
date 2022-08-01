# 外部キー制約について考える

<br>

## 課題１
### 外部キー制約を一切定義しない場合の問題
- authorテーブルに存在しないauthor_idをbookテーブルに登録できてしまう
  - 迷子のbookレコードを探すのが少し面倒
  - `inner join` の場合、authorと紐づかないbookは取得されない
  - authorにbookを`left outer join` する場合、bookレコードが取得されない
  - bookにauthorを`left outer join`する場合、authorの情報は`null`になる
- 子を持つauthorレコードの削除と更新ができてしまう -> 上記のパターンが発生する

### 外部キーを定義した場合の問題
- authorテーブルに存在するauthor_idしかbookテーブルに登録できない
- authorレコードを削除・更新する場合、参照している子テーブルから削除しなければいけない
  - テストデータを登録するのが面倒
  - リストア時に外部制約をオフにする必要がある

<br>

## 課題２

### MySQLの外部参照アクション
#### RESTRICT（親テーブルのレコードを更新・削除するとエラーになる）
- 参照整合性が厳密に保証される。一般的な外部制約
- 親テーブルを操作する際に参照関係の末端から順に処理するロジックが必要なため、アプリケーションの実装コストが高い

#### CASCADE(親テーブルのレコードを更新・削除すると、子テーブルのレコードも追従して更新・削除される)
- 参照整合性は保たれるが、DB側で更新・削除が行われるためロジックが分離する
- アプリケーション側の実装コストは低いが、操作対象のデータがアプリケーションコードから判断できないため注意が必要
- `ON DELETE`での使用は危険
- 親レコードが存在しない場合、絶対に子レコードが存在しない場合などは`ON DELETE`もあり
  - ユーザの個人情報などを別テーブルに分けている場合、ユーザの物理削除と一緒に削除するケース

#### SET NULL（親テーブルのレコードを更新・削除すると、子テーブルの外部キーがNULLになる）
- 参照整合性を保てない
- アプリケーション側の実装コストは低いが、操作対象のデータがアプリケーションコードから判断できないため注意が必要
- 更新・削除の処理では迷子のレコードが発生するため、バッチ処理などで対応が必要
- 親レコードが存在しない場合でも子レコードが存在する場合は有効
  - 部署に所属する社員が部署異動などで一時的に所属部署が存在しないケース

NO ACTION
- RESTRICTと同じ


その他メモ
- シャーディングされたテーブルには外部キー制約はつけれない
- 外部制約は親テーブルを同時にロックするのでデッドロックの発生が生まれやすくなる
- MySQLのストレージエンジンがMyIsamだと外部キー制約をが効かない。InnoDBは効く
  - テーブル毎に選択可能
- 大雑把には、子レコード 1 に対して親レコード 0 があり得るならば SET NULL、子レコードが正規化によって分離されているのみの親レコードの意味に含まれるものならば CASCADE、どちらでもないか判断がつかないならば RESTRICT を選ぶことになります。

<br>

## 参考記事
- [外部キー制約が一切ないと何に困るのか？](https://zenn.dev/dowanna6/articles/2667cbb1ab7233)
- [PostgreSQLの制約検査を遅延させるとリストア時間が早くなるか検証してみた](https://dev.classmethod.jp/articles/postgresql-restore-to-deferred-fk-check-table/)
- [外部キー制約の設定と動作確認](https://www.wakuwakubank.com/posts/405-mysql-foreign-key/)
- [MySQLにて外部キーが貼れない。エラーは出ていない（MySQLのストレージエンジン・InnoDBとMyISAMの違い）](https://karoten512.hatenablog.com/entry/2017/11/07/232534)
- [1.7.2.3 FOREIGN KEY 制約の違い](https://dev.mysql.com/doc/refman/8.0/ja/ansi-diff-foreign-keys.html)
- [MySQLの外部キー制約RESTRICT,CASCADE,SET NULL,NO ACTIONの違いは？](https://qiita.com/suin/items/21fe6c5a78c1505b19cb)
- [外部キー制約について](https://qiita.com/SLEAZOIDS/items/d6fb9c2d131c3fdd1387)
- [【MySQL】外部キー制約の親レコードの更新時、削除時に起こるアクションの定め方と設定基準](https://cpoint-lab.co.jp/article/202012/18021/)


