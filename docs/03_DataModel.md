# 03 Data Model

## 概要

探求コンパスは、人の探求プロセスを構造化して蓄積するプラットフォームです。

知識そのものではなく、

- 自己理解
- 他者理解
- 対話
- 問い
- 実践
- 「何を良くしたいか」

という探求活動をNodeとして管理し、それらの関係性をEdgeで表現します。

---

# データ構造

```
User
  └── Session
        ├── Nodes
        └── Edges

InquiryTarget
ResearchRequest
Response
```

---

# Users

ユーザー情報を管理します。

|項目|型|説明|
|---|---|---|
|user_id|UUID|ユーザーID|
|display_name|String|表示名|
|created_at|DateTime|登録日時|

---

# Sessions

1回の対話を管理します。

|項目|型|説明|
|---|---|---|
|session_id|UUID|セッションID|
|user_id|UUID|ユーザー|
|title|String|タイトル|
|summary|Text|AI要約|
|created_at|DateTime|日時|

---

# Nodes

探求活動の最小単位です。

すべての探求活動はNodeとして保存されます。

|項目|型|説明|
|---|---|---|
|node_id|UUID|Node ID|
|user_id|UUID|所有者|
|session_id|UUID|生成元セッション|
|node_type|Enum|探求活動の種類|
|title|String|タイトル|
|content|Text|内容|
|tags|Array<String>|内容の属性|
|created_at|DateTime|作成日時|

---

## NodeType

NodeTypeは

「どんな探求活動か」

を表します。

|NodeType|説明|
|---|---|
|SelfUnderstanding|自己理解|
|OtherUnderstanding|他者理解|
|Dialogue|対話|
|Question|問い|
|Practice|実践|
|InquiryTarget|良くしたいもの|

---

## Tags

Tagsは

「Nodeの内容がどのような性質か」

を表します。

複数設定できます。

例

- Insight（気づき）
- Fact（事実）
- Hypothesis（仮説）
- Value（価値観）
- Emotion（感情）
- Goal（目標）
- Experience（経験）
- Evidence（根拠）

---

# Edges

Node同士の関係を表します。

|項目|型|説明|
|---|---|---|
|edge_id|UUID|Edge ID|
|from_node|UUID|元Node|
|to_node|UUID|先Node|
|relation|Enum|関係|
|created_at|DateTime|日時|

---

## RelationType

|Relation|説明|
|---|---|
|related_to|関連している|
|causes|原因となる|
|supports|根拠になる|
|contradicts|矛盾する|
|leads_to|つながる|
|inspired_by|影響を受けた|
|generated_from|生成された|

---

# InquiryTargets

ユーザーが

「何を良くしたいのか」

を管理します。

探求コンパスの中心となるデータです。

|項目|型|説明|
|---|---|---|
|target_id|UUID|ID|
|user_id|UUID|所有者|
|title|String|対象名|
|description|Text|説明|
|status|Enum|状態|
|priority|Integer|優先度|

---

## Status

- Exploring（探している）
- Practicing（実践中）
- Refining（磨いている）
- Archived（終了）

---

# ResearchRequests

他ユーザーへ知見提供を依頼するデータです。

本人の同意を前提とします。

|項目|型|説明|
|---|---|---|
|request_id|UUID|ID|
|user_id|UUID|依頼者|
|target_id|UUID|対象|
|question|Text|質問|
|status|Enum|状態|
|created_at|DateTime|日時|

---

# Responses

ResearchRequestへの回答です。

|項目|型|説明|
|---|---|---|
|response_id|UUID|ID|
|request_id|UUID|対象リクエスト|
|user_id|UUID|回答者|
|summary|Text|AI要約|
|consent|Enum|公開同意レベル|
|created_at|DateTime|日時|

---

# 設計原則

探求コンパスでは、

**知識を保存するのではなく、探求プロセスを保存する。**

Nodeは探求活動、

Edgeは活動同士の関係、

Tagsは内容の性質を表す。

この構造により、

人の理解・対話・問い・実践がどのように相互作用し、どのような流れを生むかを可視化した流動ネットワークを実現する。

# Backlog

MVP期間中に思いついた改善案はここへ追加する。

実装はしない。

MVP完成後に優先順位を見直す。
