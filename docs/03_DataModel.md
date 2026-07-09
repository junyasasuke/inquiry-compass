# 03 Data Model

## 概要

探求コンパスは、ユーザーとの対話から得られた知識を構造化して蓄積する。

データは「Node」と「Edge」を中心としたグラフ構造で管理する。

Nodeは知識そのもの、Edgeは知識同士の関係を表す。

---

# Users

ユーザー情報を管理する。

|項目|型|説明|
|---|---|---|
|user_id|UUID|ユーザーID|
|display_name|String|表示名|
|created_at|DateTime|登録日時|

---

# Sessions

1回の対話を管理する。

|項目|型|説明|
|---|---|---|
|session_id|UUID|セッションID|
|user_id|UUID|ユーザーID|
|title|String|セッションタイトル|
|summary|Text|AIによる要約|
|created_at|DateTime|作成日時|

---

# Nodes

探求コンパスの最小単位。

AIが対話から抽出した知識を保存する。

|項目|型|説明|
|---|---|---|
|node_id|UUID|Node ID|
|user_id|UUID|所有ユーザー|
|session_id|UUID|生成元セッション|
|node_type|Enum|Nodeの種類|
|title|String|タイトル|
|content|Text|内容|
|created_at|DateTime|作成日時|

---

## NodeType

- Question（問い）
- Insight（気づき）
- Practice（実践）
- Fact（事実）
- Interpretation（解釈）
- Hypothesis（仮説）
- InquiryTarget（良くしたいもの）

---

# Edges

Node同士の関係を管理する。

|項目|型|説明|
|---|---|---|
|edge_id|UUID|Edge ID|
|from_node|UUID|元Node|
|to_node|UUID|先Node|
|relation|Enum|関係性|
|created_at|DateTime|作成日時|

---

## RelationType

- related_to（関連する）
- caused_by（原因）
- supports（根拠）
- contradicts（矛盾する）
- inspired（着想）
- practiced（実践した）

---

# InquiryTargets

ユーザーが「良くしたい」と考えている対象を管理する。

|項目|型|説明|
|---|---|---|
|target_id|UUID|ID|
|user_id|UUID|所有ユーザー|
|title|String|対象名|
|description|Text|説明|
|status|Enum|状態|

---

## Status

- Exploring（探している）
- Practicing（実践中）
- Refining（磨いている）
- Archived（終了）

---

# ResearchRequests

他ユーザーへの探求リクエスト。

|項目|型|説明|
|---|---|---|
|request_id|UUID|ID|
|user_id|UUID|依頼者|
|target_id|UUID|対象|
|question|Text|質問|
|status|Enum|状態|

---

# Responses

探求リクエストへの回答。

|項目|型|説明|
|---|---|---|
|response_id|UUID|ID|
|request_id|UUID|リクエスト|
|user_id|UUID|回答者|
|summary|Text|AI要約|
|consent|Enum|公開同意|
|created_at|DateTime|作成日時|
