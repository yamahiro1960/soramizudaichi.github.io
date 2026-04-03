# soramizudaichi

空と水と大地合同会社のトップページを、GitHub Pagesで公開できる静的サイトとして移植したものです。

## 構成

- index.html: トップページ本体
- styles.css: レイアウトとデザイン
- script.js: モバイルメニューとフッター年表示
- assets/images: ローカル画像とローカルSVG素材

## GitHub Pagesで公開する手順

1. このフォルダをGitHubリポジトリへpushする
2. GitHubのSettingsを開く
3. Pagesを開く
4. Build and deployment の Source で Deploy from a branch を選ぶ
5. Branch は main、Folder は / (root) を選ぶ
6. 保存後、数分で公開される

## 補足

- 既存サイトのトップページ内容を、Google Sites依存なしで動く単一ページに再構成しています
- 画像参照はすべてローカル化済みです
- 取得制限で直接ミラーできない一部画像は、同テーマのローカルSVG素材へ置き換えています