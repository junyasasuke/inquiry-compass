/**
 * Inquiry Compass
 * init.gs
 * 初期化処理
 */

function initializeInquiryCompass() {
  const spreadsheet = SpreadsheetApp.create("Inquiry Compass DB");

  const sheets = [
    {
      name: "Users",
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

  // デフォルトシート削除
  const defaultSheet = spreadsheet.getSheets()[0];
  spreadsheet.deleteSheet(defaultSheet);

  // シート作成
  sheets.forEach(sheetInfo => {
    const sheet = spreadsheet.insertSheet(sheetInfo.name);

    sheet.getRange(1, 1, 1, sheetInfo.headers.length)
      .setValues([sheetInfo.headers]);

    sheet.setFrozenRows(1);

    sheet.getRange(1, 1, 1, sheetInfo.headers.length)
      .setFontWeight("bold");

    sheet.getDataRange().createFilter();
  });

  // Config初期値
  const config = spreadsheet.getSheetByName("Config");

  config.getRange(2,1,2,2).setValues([
    ["version","0.1.0"],
    ["app_name","Inquiry Compass"]
  ]);

  Logger.log("==================================");
  Logger.log("Inquiry Compass Initialized!");
  Logger.log(spreadsheet.getUrl());
  Logger.log("==================================");

  SpreadsheetApp.flush();
}
