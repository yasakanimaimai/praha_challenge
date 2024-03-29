# マルチテナントについて

<br>

## 用語について
### マルチテナントアーキテクチャ
- データベースの中に子データベースを作るイメージ
- 管理用のメタデータが格納されているデータベース（CDB）の中に、
実際のユーザーデータを管理する複数のデータベース（PDB）が格納されている
- それぞれ独立したデータベースとして利用できる
- 利点
  - 高密度の統合
  - SQLによる迅速なプロビジョニングとクローニング
  - 高速のパッチ適用とアップグレードの 新たなパラダイム
  - 多数のデータベースを一元管理
  - プラガブル・データベースのリソース管理
  - スケールアップがシンプル
  - パッチ適用やバージョンアップはCDBに対して実行するだけでよい
  - データベースの独立性の担保
    - 顧客ごとにPDBを割り当て、個別のデータベースとして管理することで、
    スキーマレベルでも物理ファイルレベルでもデータが分割管理されるので、
    顧客ごとのデータが論理的にも物理的にも隔離された環境になる。
    これにより、アプリケーションのバグやSQLインジェクションなどで、
    本来は表示されるべきではない無関係な顧客のデータが表示されてしまうようなインシデントを引き起こすことがなくなる。
    - 特定のPDBが他のPDBのパフォーマンスに悪影響を与えないよう予防措置を取ることが可能
- ユースケース
  - 組織統合による複数データベースの統合
  - Webサービスのデータベース水平分割

<br>

## 課題１
マルチテナントアーキテクチャを採用し、顧客ごとにPDBを割り当て、  
他の顧客のデータベースとは独立して扱えるようにする

<br>

## 課題２

### 「テナント毎にデータベースを分割する(サイロモデル)」
概要
- 1つのデータベース上に1つのテナントデータを作成
- 同一構成のデータベースが複数存在
- OSリソースは、CPU、メモリ、ディスクが他のテナントから分離
  
メリット  
- あるテナントのアクティビティが他のテナントに影響を与えない
- テナント固有にスケールアップのチューニングが可能
- 可用性をテナントレベルで管理可能
- データベース障害時の影響を極小化
- 既存構成からの移行が容易

デメリット
- テナント数が多い場合、メンテナンス効率が悪い
- コストが高くなる傾向がある
- アジリティ
- 管理複雑化
- デプロイ
- 分析測定収集


### 「テナント毎にスキーマを分割する(ブリッジモデル：スキーマ分離)」
概要
- 1つのデータベース上にテナント毎のスキーマを作成
- 同一構成のスキーマが複数存在
- CPU、メモリ、ディスクの監視と管理が管理がシンプル

メリット  
- 既存のシングルテナントソリューションの移行が比較的容易
- サイロモデルと比べてコスト削減

デメリット
- テナント数に比例してテーブル数も増加(テナント数に比例してテーブルのオープン数も増加する為、キャッシュ上限に達してパフォーマンスが極端に劣化するケースがある)
- ノイジーネイバーによるパフォーマンスの影響
- 障害発生時、全テナントが停止


### 「すべてのテナントで同じスキーマを使う(プールモデル)」
概要
- すべてのテナントデータを1つのスキーマで共有
- テナントデータへのアクセスを制御するためのIDで管理
- CPU、メモリ、ディスクは他のテナントと共有 

メリット  
- テーブル構成変更や機能拡張などのメンテナンスが容易
- 複数データベース、スキーマによるデータの冗長性が削減
- 新規のテナントの作成はテナントのID作成
- テナント毎のポリシー管理が不要
- CPU、メモリ、ディスクの監視と管理が管理がシンプル
- サイロモデルと比べてコスト削減

デメリット
- 既存アプリケーションの改修が必要
- 別テナントの情報が表示されてしまうリスク
- ノイジーネイバーによるパフォーマンスの影響
- 障害発生時、全テナントが停止

### PostgreSQLのRLS
同じスキーマで複数のテナントデータを扱う場合、  
誤ったテナントIDが指定されたときや、テナントIDが指定されなかったときの影響が甚大。  
それを回避するための、該当のテナントIDのみの結果を取得する方法のこと。  
テナントIDとユーザを紐づけておき、そのユーザの操作によるクエリに対して、  
自動的にテナントIDを条件式に加えることで実現している。  

実装方法  
```SQL
-- テーブル作成
CREATE TABLE users (
  tenant_id VARCHAR(20)
  user_id INT
  user_name VARCHAR(20)
PRIMARY KEY (tenant_id, user_id));

-- データ登録
INSERT INTO users VLUES('tenant1', 1, 'fujita');
INSERT INTO users VLUES('tenant1', 2, 'suzuki');
INSERT INTO users VLUES('tenant2', 1, 'miyazaki');
INSERT INTO users VLUES('tenant2', 2, 'enosima');
INSERT INTO users VLUES('tenant3', 1, 'aizawa');

-- ポリシー作成
CREATE POLICY tenant_isolation_policy ON users 
USING (tenant_id = current_user);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

```

<br>

## 参考記事
- [マルチテナントとは](https://xn--w8j8bac3czf5bl7e.com/2018/06/07/%E3%83%9E%E3%83%AB%E3%83%81%E3%83%86%E3%83%8A%E3%83%B3%E3%83%88%E3%81%A8%E3%81%AF/)
- [これからのOracle Databaseの主流！マルチテナント・コンテナ・データベースに触れる](https://note.com/airitech/n/nfbb4a4b2c204)
- [Oracle Multitenant](https://www.oracle.com/jp/database/technologies/multitenant/overview.html)
- [マルチテナント化で知っておきたいデータベースのこと](https://www.slideshare.net/AmazonWebServicesJapan/20220107-multi-tenant-database)
- [マルチテナント・アーキテクチャ クラウドとオンプレミスの考え方の違い](https://atmarkit.itmedia.co.jp/fdotnet/bookpreview/azureoverview_0301/azureoverview_0301_01.html)
- 