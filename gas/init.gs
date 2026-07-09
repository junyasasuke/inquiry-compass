/**
 * Inquiry Compass
 * init.gs
 * MVP 初期化
 */

function initializeInquiryCompass() {

  // 新しいスプレッドシート作成
  const spreadsheet = SpreadsheetApp.create("Inquiry Compass DB");

  // 最初から存在するシートを取得
  const firstSheet = spreadsheet.getSheets()[0];

  // Usersとして再利用
  firstSheet.setName("Users");

  const sheetDefinitions = [
    {
      sheet: firstSheet,
      headers: [
        "user_id",
        "display_name",
        "created_at"
      ]
    },
    {
      name: "Sessions",
      headers: [
        "session_id",
        "user_id",
        "title",
        "summary",
        "created_at"
      ]
    },
    {
      name: "Nodes",
      headers: [
        "node_id",
        "user_id",
        "session_id",
        "node_type",
        "title",
        "content",
        "tags",
        "created_at"
      ]
    },
    {
      name: "Edges",
      headers: [
        "edge_id",
        "from_node",
        "to_node",
        "relation",
        "created_at"
      ]
    },
    {
      name: "InquiryTargets",
      headers: [
        "target_id",
        "user_id",
        "title",
        "description",
        "status",
        "priority",
        "created_at"
      ]
    },
    {
      name: "ResearchRequests",
      headers: [
        "request_id",
        "user_id",
        "target_id",
        "question",
        "status",
        "created_at"
      ]
    },
    {
      name: "Responses",
      headers: [
        "response_id",
        "request_id",
        "user_id",
        "summary",
        "consent",
        "created_at"
      ]
    },
    {
      name: "Config",
      headers: [
        "key",
        "value"
      ]
    }
  ];

  // Usersシート設定
  setupSheet(sheetDefinitions[0].sheet, sheetDefinitions[0].headers);

  // 残りのシート作成
  for (let i = 1; i < sheetDefinitions.length; i++) {
    const sheet = spreadsheet.insertSheet(sheetDefinitions[i].name);
    setupSheet(sheet, sheetDefinitions[i].headers);
  }

  // Config初期値
  const config = spreadsheet.getSheetByName("Config");

  config.getRange(2, 1, 2, 2).setValues([
    ["version", "0.1.0"],
    ["app_name", "Inquiry Compass"]
  ]);

  SpreadsheetApp.flush();

  Logger.log("==================================");
  Logger.log("Inquiry Compass Initialized");
  Logger.log(spreadsheet.getUrl());
  Logger.log("==================================");
  Logger.log("初期化が完了しました。");

}


/**
 * シート初期設定
 */
function setupSheet(sheet, headers) {

  sheet.clear();

  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers]);

  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight("bold");

  sheet.setFrozenRows(1);

  sheet.getRange(1, 1, sheet.getMaxRows(), headers.length)
    .createFilter();

}
