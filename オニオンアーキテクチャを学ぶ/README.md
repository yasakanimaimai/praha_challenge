# オニオンアーキテクチャを学ぶ

## 課題1 

<br>

### オニオンアーキテクチャを図解
`オニオンアーキテクチャ図.png`

<br>

###　ドメインモデル層がどの層にも依存しないことのメリット
ドメインモデル層が疎結合になることがメリット。
ドメインモデルはシステムの核となる業務ロジックの集合なので、
アプリケーション側の都合で影響を受けたくない。

<br>

### 層を跨いで依存関係が発生するときにインターフェースに対する依存のみ許可することのメリット
インターフェースは、その実装クラスがある層に囚われないと考えると、
置く場所は自由なので依存の方向を内側に向けるように操作できる。

<br>

### 「依存性の逆転」がオニオンアーキテクチャにおいてどう使われているか
伝統的なレイヤードアーキテクチャではドメイン層がインフラ層に依存している。
システムの核となるドメイン層がDBやデバイスの仕様変更の都度影響を受けるのは大変なので、
それを避けるために依存性の逆転を利用して、ドメイン層からの依存を少なくしている。

<br>

### 特定のユーザだけリソースの追加や更新できるアクセス制限機能を実装したい場合、どの層に記述するのが適切でしょうか？
前提
- 店舗管理システム
- ユーザ：店長と従業員
  - 店長だけ商品の新規追加可能

ドメイン層
- 商品クラス
- ユーザクラス

ドメインサービス層
- 商品リポジトリインターフェース
- 商品登録サービスクラス

アプリケーションサービス層
- 商品サービスインターフェイス
- 商品サービスクラス

インフラ層
- 商品リポジトリクラス

<br>

### データベースをMySQLからPostgreSQLに変更するとします。どの層を変更する必要があるでしょうか？
インフラ層のみ

## 課題2



## 参考記事 & メモ
> [1人開発のコードにオニオンアーキテクチャを導入した経験談 - Akatsuki Hackers Lab | 株式会社アカツキ（Akatsuki Inc.)](https://hackerslab.aktsk.jp/2020/12/16/214956)
> - 「内側のレイヤは外側のレイヤの変更の影響を受けない」と思っていましたが、そうでない場面もありました。パフォーマンスチューニングをするにあたって、例えば DB を使う場面で、複数レコードをまとめて INSERT することで DB との通信回数を減らすなど、ドメインが DB の事情に全く無関心というわけにはいきません。「内側で interface を定義して外側で実装する」というのは「外側の変更の影響を受けない」とはイコールではありませんでした。

> [なぜソフトウェアアーキテクチャを考えるか](https://zenn.dev/sterashima78/articles/e403fc0fe0e96a)
> - MVCがアプリケーションの機能に注目して問題を分割しているのに対して、オニオンアーキテクチャではアプリケーションに必要な問題領域に注目して問題を分割している。
> - 気をつけたいのは、細かく別れているからいいというわけではないという点だ。
はじめに記載したとおり、問題が細かく別れているということは各問題の関係性を適切に管理する必要があるからだ。

> [Onion Architecture. Let’s slice it like a Pro | by Ritesh Kapoor | Expedia Group Technology | Medium](https://medium.com/expedia-group-tech/onion-architecture-deed8a554423)
> - Whenever data crosses layers/boundaries, it should be in a form that is convenient for that layer. E.g. API’s can have DTO’s, DB layer can have Entity Objects depending on how objects stored in a database vary from the domain model.
> - The goal is to minimize coupling between layers and maximize coupling within a vertical slice across layers.
> - Business rules that belong to the domain model, domain services and application services should be tested via Unit Testing. As we move to the outer layer, it makes more sense to have integration tests in infrastructure services. For our application End to End testing and BDD are the most appropriate testing strategies.

> [構造的部分型 (structural subtyping) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/structural-subtyping)
> - 公称型(Nominal Typing)
Java, C++で採用されている定義です。
ある型を基本型にする派生型は、互いに置換ができません。
> - 構造的部分型(Structural Subtyping)
Go, TypeScriptで採用されている定義です。
その型の見た目(シグネチャ)が等しければ置換可能であるという点が公称型と大きく異なっています。公称型ほど硬くはなく、とはいえ型の恩恵は受けたいというやや緩い型付けです。
> [オブジェクト詰め替えが面倒臭い？マルチカーソルを使えば10秒でできます - little hands' lab](https://little-hands.hatenablog.com/entry/2021/09/27/multicursor)
> - オニオンアーキテクチャ、クリーンアーキテクチャなどの階層化されたアーキテクチャを使用する際、レイヤーの境界でオブジェクトの値を詰め替える必要性が発生します。 オブジェクトを詰め替えることでレイヤーの依存関係を断ち切り、一度書いた後の保守性を高めることに大きく貢献するのですが、筆者の観測範囲では単調作業に感じるせいかかなり嫌われる傾向があるように感じます。

> [DDDを意識した際のpackage構成](https://zenn.dev/morio_pg/articles/16777261720294644011)
> DBから取得した値を直接modelやvalueに変換するとやりづらいことが多かった
変換用のDTOを用意してドメインオブジェクトへの変換を任せることで特に外部APIのレスポンスの形式などを意識しなくていい
各DTOの名称は下記のように用途毎に分ける
リクエスト関連：Form（Web）、Request（API）
レスポンス関連（JSON）：Response、View
DBや外部API：Entity


- [クリーンアーキテクチャ完全に理解した](https://gist.github.com/mpppk/609d592f25cab9312654b39f1b357c60)
- [実践クリーンアーキテクチャ with Java │ nrslib](https://nrslib.com/clean-architecture-with-java/#outline__4)
- [[DDD]ドメイン駆動 + オニオンアーキテクチャ概略 - Qiita](https://qiita.com/little_hand_s/items/2040fba15d90b93fc124)
- [Domain層とインフラ層の依存関係を逆転するためのオニオンアーキテクチャ - kidooom's Scrapbox](https://scrapbox.io/kidaaam-92022284/Domain%E5%B1%A4%E3%81%A8%E3%82%A4%E3%83%B3%E3%83%95%E3%83%A9%E5%B1%A4%E3%81%AE%E4%BE%9D%E5%AD%98%E9%96%A2%E4%BF%82%E3%82%92%E9%80%86%E8%BB%A2%E3%81%99%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AE%E3%82%AA%E3%83%8B%E3%82%AA%E3%83%B3%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3)
- [Melzar/onion-architecture-boilerplate: Node.js / Express Onion Architecture boilerplate with Typescript - OOP Variant](https://github.com/Melzar/onion-architecture-boilerplate)
- [実践！ Typescript で DDD - マイクロサービス設計のすすめ - Leverages Tech Blog](https://tech.leverages.jp/entry/2021/08/19/141229)
- [André Bazaglia - Clean architecture with TypeScript: DDD, Onion](https://bazaglia.com/clean-architecture-with-typescript-ddd-onion/)
- [node.js - This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag - Stack Overflow](https://stackoverflow.com/questions/62273153/this-module-is-declared-with-using-export-and-can-only-be-used-with-a-defau)
- [Inversifyを使った、型堅牢なDIコンテナの構築 - kotamat's site](https://kotamat.com/post/inversify/)
- [TypeScriptのno initializer and is not definitelyエラーの対処法 | iwb.jp](https://iwb.jp/typescript-properties-no-initializer-and-is-not-definitely-error/)
- [TypeScript: KoaでPOSTされたフォームの内容を取得する - Qiita](https://qiita.com/suin/items/542f59e1f9723368161d)
- [naoya on Twitter: "オニオンアーキテクチャで、層をまたいだところでデータを受け渡しするのに DTO を作って値を詰め替える、というあれはいったいなんであんなことになってしまったのかというのを、ぼんやり、いろいろなブログなどを読みながら考えていた" / Twitter](https://twitter.com/naoya_ito/status/1539391448881446912)
- [お前らがModelと呼ぶアレをなんと呼ぶべきか。近辺の用語(EntityとかVOとかDTOとか)について整理しつつ考える - Qiita](https://qiita.com/takasek/items/70ab5a61756ee620aee6)
- [DDDに関しての自分のメモ.md](https://gist.github.com/morio-pg/cab2fc4e9e01b3c398f389b64a1fc3be)
- 


- オニオンアーキテクチャの基本概念は「変化が多いものに依存すると修正回数も増えるから、変化の少ないものに依存すべし」